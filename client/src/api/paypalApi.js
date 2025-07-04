// Backend API configuration
const API_BASE_URL = 'http://localhost:5000/api/paypal';

// PayPal API functions
export const paypalApi = {
  // Create PayPal order
  async createOrder(orderData) {
    try {
      const response = await fetch(`${API_BASE_URL}/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: orderData.amount,
          currency: 'USD',
          items: orderData.items || []
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create PayPal order');
      }

      const data = await response.json();
      return data.order;
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      throw error;
    }
  },

  // Capture PayPal payment
  async capturePayment(orderID) {
    try {
      const response = await fetch(`${API_BASE_URL}/capture-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderID })
      });

      if (!response.ok) {
        throw new Error('Failed to capture PayPal payment');
      }

      const data = await response.json();
      return data.payment;
    } catch (error) {
      console.error('Error capturing PayPal payment:', error);
      throw error;
    }
  },

  // Get order details
  async getOrderDetails(orderId) {
    try {
      const response = await fetch(`${API_BASE_URL}/order/${orderId}`);
      
      if (!response.ok) {
        throw new Error('Failed to get order details');
      }

      const data = await response.json();
      return data.order;
    } catch (error) {
      console.error('Error getting order details:', error);
      throw error;
    }
  },

  // Process refund
  async processRefund(captureId, amount, reason) {
    try {
      const response = await fetch(`${API_BASE_URL}/refund`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          captureId,
          amount,
          reason
        })
      });

      if (!response.ok) {
        throw new Error('Failed to process refund');
      }

      const data = await response.json();
      return data.refund;
    } catch (error) {
      console.error('Error processing refund:', error);
      throw error;
    }
  }
};

// PayPal configuration for React PayPal JS
export const paypalConfig = {
  'client-id': 'AY7RNSS5-LcZ2u_VS2Ay9qBbN5JFpi1rwd1ySioJKIn1a9NNdkgNM2ZemRSsIA7gmBLYgKZmOEUKFsCQ', // Replace with your actual PayPal Client ID
  currency: 'USD',
  intent: 'capture'
};

export default paypalApi; 