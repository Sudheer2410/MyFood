import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-2 sm:px-4 md:px-8 py-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-8 gap-4">
        <Logo size="default" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Cart</h1>
      </div>
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg sm:text-xl text-gray-600 mb-4">Your cart is empty.</p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition w-full sm:w-auto"
            onClick={() => navigate('/menu')}
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center sm:items-stretch bg-white rounded-xl shadow-sm p-3 sm:p-4 gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-32 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300 transition"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="font-semibold text-sm sm:text-base">{item.quantity}</span>
                    <button
                      className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="ml-2 text-xs sm:text-sm text-red-500 hover:underline"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right sm:text-left mt-2 sm:mt-0">
                  <div className="text-base sm:text-lg font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">${item.price.toFixed(2)} each</div>
                </div>
              </div>
            ))}
          </div>
          {/* Cart Summary */}
          <div className="w-full md:w-80 bg-white rounded-xl shadow-sm p-4 h-fit mt-6 md:mt-0">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm sm:text-base text-gray-700">Subtotal</span>
              <span className="text-base sm:text-lg font-semibold text-gray-900">${getTotalPrice().toFixed(2)}</span>
            </div>
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold mt-4 transition"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage; 