const express = require('express');
const router = express.Router();
const axios = require('axios');

// PayPal configuration
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api-m.paypal.com' 
  : 'https://api-m.sandbox.paypal.com';

// Get PayPal access token
const getAccessToken = async () => {
  try {
    // Check if we have valid PayPal credentials
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET || PAYPAL_CLIENT_SECRET === 'your_paypal_client_secret_here') {
      console.log('PayPal credentials not configured, using mock mode');
      return 'mock_access_token';
    }
    
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
    const response = await axios.post(`${PAYPAL_BASE_URL}/v1/oauth2/token`, 
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting PayPal access token:', error);
    throw error;
  }
};

// Create PayPal order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'USD', items = [] } = req.body;

    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    const accessToken = await getAccessToken();

    // Calculate item total from items array
    let itemTotal = 0;
    if (items.length > 0) {
      itemTotal = items.reduce((sum, item) => {
        return sum + (parseFloat(item.unit_amount.value) * parseInt(item.quantity));
      }, 0);
    } else {
      itemTotal = parseFloat(amount);
    }

    // Ensure the total amount matches the item total
    const finalAmount = Math.max(parseFloat(amount), itemTotal);

    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: finalAmount.toFixed(2)
          },
          description: 'Food delivery order'
        }
      ],
      application_context: {
        return_url: 'http://localhost:3000/payment-success',
        cancel_url: 'http://localhost:3000/payment-cancelled'
      }
    };

    console.log('Creating PayPal order with data:', JSON.stringify(orderData, null, 2));
    
    // If using mock mode, return a mock order
    if (accessToken === 'mock_access_token') {
      console.log('Using mock PayPal order creation');
      const mockOrder = {
        id: 'mock_order_' + Date.now(),
        status: 'CREATED',
        links: [
          {
            href: 'https://www.sandbox.paypal.com/checkoutnow?token=mock_token',
            rel: 'approve',
            method: 'GET'
          }
        ]
      };
      
      console.log('Mock PayPal order created successfully:', mockOrder);
      
      res.json({
        success: true,
        order: mockOrder
      });
      return;
    }
    
    const response = await axios.post(
      `${PAYPAL_BASE_URL}/v2/checkout/orders`,
      orderData,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('PayPal order created successfully:', response.data);

    // Handle both mock and real responses
    const orderResponse = response.data || response;
    
    res.json({
      success: true,
      order: {
        id: orderResponse.id,
        status: orderResponse.status,
        links: orderResponse.links
      }
    });
  } catch (error) {
    console.error('Error creating PayPal order:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create PayPal order',
      details: error.response?.data || error.message
    });
  }
});

// Capture PayPal payment
router.post('/capture-payment', async (req, res) => {
  try {
    const { orderID } = req.body;

    if (!orderID) {
      return res.status(400).json({ 
        success: false, 
        error: 'Order ID is required' 
      });
    }

    const accessToken = await getAccessToken();

    // If using mock mode, return a mock payment
    if (accessToken === 'mock_access_token') {
      console.log('Using mock PayPal payment capture');
      const mockPayment = {
        id: 'mock_payment_' + Date.now(),
        status: 'COMPLETED',
        amount: {
          currency_code: 'USD',
          value: '25.99'
        },
        transaction_id: 'mock_transaction_' + Date.now()
      };
      
      console.log('Mock PayPal payment captured successfully:', mockPayment);
      return res.json({
        success: true,
        payment: mockPayment
      });
    }

    const response = await axios.post(
      `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({
      success: true,
      payment: {
        id: response.data.id,
        status: response.data.status,
        amount: response.data.purchase_units[0].payments.captures[0].amount,
        transaction_id: response.data.purchase_units[0].payments.captures[0].id
      }
    });
  } catch (error) {
    console.error('Error capturing PayPal payment:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to capture payment' 
    });
  }
});

// Get order details
router.get('/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const accessToken = await getAccessToken();

    const response = await axios.get(
      `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    res.json({
      success: true,
      order: response.data
    });
  } catch (error) {
    console.error('Error fetching PayPal order:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch order details' 
    });
  }
});

// Refund payment
router.post('/refund', async (req, res) => {
  try {
    const { captureId, amount, reason = 'Customer request' } = req.body;

    if (!captureId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Capture ID is required' 
      });
    }

    const accessToken = await getAccessToken();

    const refundData = {
      amount: amount ? {
        value: amount.toString(),
        currency_code: 'USD'
      } : undefined,
      note_to_payer: reason
    };

    const response = await axios.post(
      `${PAYPAL_BASE_URL}/v2/payments/captures/${captureId}/refund`,
      refundData,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({
      success: true,
      refund: response.data
    });
  } catch (error) {
    console.error('Error processing PayPal refund:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process refund' 
    });
  }
});

module.exports = router; 