import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, Smartphone, MapPin, Clock, ArrowLeft, Check, Lock, ChefHat, ShoppingBag, AlertCircle, Navigation, Target } from 'lucide-react';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';
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
  const { userLocation, deliveryAddress: locationAddress, getCurrentLocation, getEstimatedDeliveryTime } = useLocation();

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
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition w-fit"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Cart</span>
        </button>
        <Logo size="default" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Column - Checkout Form */}
        <div className="space-y-6">
          {/* Delivery Address */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <h2 className="text-xl font-bold text-gray-900">Delivery Address</h2>
              </div>
              {locationAddress && (
                <button
                  onClick={getCurrentLocation}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  <Target className="w-4 h-4" />
                  <span>Use Current Location</span>
                </button>
              )}
            </div>
            
            {/* Location Address Display */}
            {locationAddress && (
              <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2">
                  <Navigation className="w-4 h-4 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-900">Detected Location:</p>
                    <p className="text-xs text-green-700">{locationAddress.formatted}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={deliveryAddress.street}
                    onChange={(e) => handleAddressChange('street', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.street ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="City"
                    value={deliveryAddress.city}
                    onChange={(e) => handleAddressChange('city', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
          </div>
              
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="State"
                    value={deliveryAddress.state}
                    onChange={(e) => handleAddressChange('state', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.state ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={deliveryAddress.zipCode}
                    onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      errors.zipCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                </div>
              </div>
              
              <div>
                <textarea
                  placeholder="Delivery Instructions (Optional)"
                  value={deliveryInstructions}
                  onChange={(e) => setDeliveryInstructions(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  rows="3"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
            </div>
            
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition ${
                    paymentMethod === method.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === method.id
                      ? 'border-red-500 bg-red-500'
                      : 'border-gray-300'
                  }`}>
                    {paymentMethod === method.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <method.icon className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{method.name}</div>
                    <div className="text-sm text-gray-600">{method.description}</div>
                  </div>
                </label>
              ))}
            </div>

            {/* PayPal Buttons */}
            {paymentMethod === 'paypal' && (
              <div className="mt-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Lock className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Secure payment powered by PayPal</span>
                  </div>
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: total.toFixed(2),
                              currency_code: 'USD'
                            },
                            description: `MyFood Order - ${cartItems.length} items`
                          }
                        ]
                      });
                    }}
                    onApprove={async (data, actions) => {
                      return actions.order.capture().then((details) => {
                        handlePayPalSuccess(details);
                      });
                    }}
                    onError={handlePayPalError}
                    style={{
                      layout: 'vertical',
                      color: 'blue',
                      shape: 'rect',
                      label: 'pay'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Credit Card Payment */}
            {paymentMethod === 'card' && (
              <div className="mt-6">
                <button
                  onClick={handleCreditCardPayment}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Pay with Credit Card
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:pl-8">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
            <div className="flex items-center space-x-2 mb-4">
              <ChefHat className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
            </div>
            
            {/* Cart Items */}
            <div className="space-y-3 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <ChefHat className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                    </div>
                  </div>
                  <div className="font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Price Breakdown */}
            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Delivery Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">Estimated Delivery</span>
              </div>
              <p className="text-sm text-gray-600">30-45 minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage; 