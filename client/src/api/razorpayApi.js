// Backend API configuration
const API_BASE_URL = 'http://localhost:5000/api/payments';

// Load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(window.Razorpay);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(window.Razorpay);
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      resolve(null);
    };
    document.body.appendChild(script);
  });
};

// Create order on backend
const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: orderData.amount,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes: {
          address: orderData.deliveryAddress,
          instructions: orderData.deliveryInstructions
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const data = await response.json();
    return data.order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Initialize Razorpay payment
export const initializeRazorpayPayment = async (orderData) => {
  try {
    const Razorpay = await loadRazorpayScript();
    
    if (!Razorpay) {
      throw new Error('Failed to load Razorpay');
    }

    // Create order
    const order = await createOrder(orderData);

    // Razorpay options
    const options = {
      key: 'rzp_test_YOUR_KEY_ID', // This will be replaced with actual key from backend
      amount: order.amount,
      currency: order.currency,
      name: 'MyFood',
      description: 'Food Delivery Order',
      image: 'https://your-logo-url.com/logo.png',
      order_id: order.id,
      handler: function (response) {
        // Payment successful
        console.log('Payment successful:', response);
        return {
          success: true,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature
        };
      },
      prefill: {
        name: orderData.customerName || '',
        email: orderData.customerEmail || '',
        contact: orderData.customerPhone || ''
      },
      notes: order.notes,
      theme: {
        color: '#EF4444' // Red color matching our theme
      },
      modal: {
        ondismiss: function() {
          console.log('Payment modal closed');
          return {
            success: false,
            error: 'Payment cancelled by user'
          };
        }
      }
    };

    // Create Razorpay instance
    const rzp = new Razorpay(options);
    
    // Open payment modal
    rzp.open();

    // Return a promise that resolves when payment is completed
    return new Promise((resolve, reject) => {
      rzp.on('payment.success', (response) => {
        resolve({
          success: true,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature
        });
      });

      rzp.on('payment.failed', (response) => {
        reject({
          success: false,
          error: response.error.description || 'Payment failed'
        });
      });

      rzp.on('payment.cancelled', () => {
        reject({
          success: false,
          error: 'Payment cancelled by user'
        });
      });
    });

  } catch (error) {
    console.error('Error initializing Razorpay payment:', error);
    throw error;
  }
};

// Verify payment signature (this should be done on backend)
export const verifyPayment = async (paymentData) => {
  try {
    // In a real app, this verification should be done on the backend
    // For demo purposes, we'll return success
    console.log('Verifying payment:', paymentData);
    
    return {
      success: true,
      verified: true
    };
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

// Get payment status
export const getPaymentStatus = async (paymentId) => {
  try {
    // In a real app, this would be a call to Razorpay API or your backend
    // For demo purposes, we'll return a mock status
    return {
      status: 'captured',
      amount: 1000,
      currency: 'INR',
      method: 'card',
      bank: 'HDFC',
      wallet: null,
      vpa: null,
      email: 'customer@example.com',
      contact: '+919999999999',
      fee: 20,
      tax: 3,
      error_code: null,
      error_description: null,
      created_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error getting payment status:', error);
    throw error;
  }
};

// Mock payment methods for demo
export const getPaymentMethods = () => {
  return [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Pay with Visa, Mastercard, or American Express',
      icon: '💳',
      supported: true
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      description: 'Pay using UPI apps like PhonePe, Google Pay',
      icon: '📱',
      supported: true
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      description: 'Pay using your bank account',
      icon: '🏦',
      supported: true
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      description: 'Pay with Paytm, PhonePe, or other wallets',
      icon: '👛',
      supported: true
    }
  ];
};

export default {
  initializeRazorpayPayment,
  verifyPayment,
  getPaymentStatus,
  getPaymentMethods
}; 