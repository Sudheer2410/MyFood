import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, Smartphone, MapPin, Clock, ArrowLeft, Check, Lock, ChefHat, ShoppingBag, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { paypalApi, paypalConfig } from '../api/paypalApi';
import Logo from '../components/Logo';

function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { items: cartItems, getTotalPrice, clearCart } = useCart();

  const subtotal = getTotalPrice();
  const deliveryFee = cartItems.length > 0 ? 3.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const paymentMethods = [
    {
      id: 'paypal',
      name: 'PayPal',
      icon: Wallet,
      description: 'Pay securely with PayPal'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Pay with Visa, Mastercard, or American Express'
    }
  ];

  // Validation function
  const validateAddress = () => {
    const newErrors = {};
    
    if (!deliveryAddress.street.trim()) {
      newErrors.street = 'Street address is required';
    }
    if (!deliveryAddress.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!deliveryAddress.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!deliveryAddress.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{6}$/.test(deliveryAddress.zipCode.trim())) {
      newErrors.zipCode = 'Please enter a valid 6-digit ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if address is complete
  const isAddressComplete = () => {
    const streetValid = deliveryAddress.street.trim() !== '';
    const cityValid = deliveryAddress.city.trim() !== '';
    const stateValid = deliveryAddress.state.trim() !== '';
    const zipValid = /^\d{6}$/.test(deliveryAddress.zipCode.trim());
    
    const isComplete = streetValid && cityValid && stateValid && zipValid;
    
    // Debug logging
    console.log('Address validation:', {
      street: deliveryAddress.street.trim(),
      city: deliveryAddress.city.trim(),
      state: deliveryAddress.state.trim(),
      zipCode: deliveryAddress.zipCode.trim(),
      streetValid,
      cityValid,
      stateValid,
      zipValid,
      isComplete
    });
    
    return isComplete;
  };

  const handlePayPalSuccess = async (details) => {
    if (!isAddressComplete()) {
      toast.error('Please complete your delivery address first');
      return;
    }

    try {
      // Capture the payment
      const payment = await paypalApi.capturePayment(details.orderID);
      
      if (payment.status === 'COMPLETED') {
        toast.success('Payment successful! Your order has been placed.');
        clearCart(); // Clear cart after successful payment
        navigate('/orders');
      } else {
        toast.error('Payment failed');
      }
    } catch (error) {
      console.error('Payment capture error:', error);
      toast.error('Payment failed. Please try again.');
    }
  };

  const handlePayPalError = (err) => {
    console.error('PayPal error:', err);
    toast.error('Payment failed. Please try again.');
  };

  const handleAddressChange = (field, value) => {
    setDeliveryAddress(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCreditCardPayment = () => {
    if (!isAddressComplete()) {
      toast.error('Please complete your delivery address first');
      validateAddress();
      return;
    }
    toast.info('Credit card payment coming soon!');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ShoppingBag className="text-white w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6 text-base">Add some items to your cart before checkout</p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-4 md:px-8 py-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-8 gap-4">
        <Logo size="default" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Checkout</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Checkout Form */}
        <form className="flex-1 bg-white rounded-xl shadow-sm p-4 sm:p-6 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold mb-2">Delivery Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base" />
            <input type="text" placeholder="Last Name" className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base" />
          </div>
          <input type="text" placeholder="Address" className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="City" className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base" />
            <input type="text" placeholder="Postal Code" className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base" />
          </div>
          <input type="text" placeholder="Phone Number" className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base" />
          <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold mt-2 transition">Place Order</button>
        </form>
        {/* Order Summary */}
        <div className="w-full md:w-80 bg-white rounded-xl shadow-sm p-4 h-fit mt-6 md:mt-0">
          <h2 className="text-lg sm:text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between text-sm sm:text-base">
                <span>{item.name} x {item.quantity}</span>
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t pt-2 mt-2">
            <span className="text-sm sm:text-base text-gray-700">Total</span>
            <span className="text-base sm:text-lg font-semibold text-gray-900">${total.toFixed(2)}</span>
          </div>
          <button
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold mt-4 transition"
            onClick={() => navigate('/cart')}
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage; 