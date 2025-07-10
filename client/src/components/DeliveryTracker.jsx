import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Truck, CheckCircle, Circle, Navigation } from 'lucide-react';

const DeliveryTracker = ({ order, isVisible, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(25);

  const deliverySteps = [
    {
      id: 'ordered',
      title: 'Order Placed',
      description: 'Your order has been confirmed',
      icon: CheckCircle,
      completed: true
    },
    {
      id: 'preparing',
      title: 'Preparing',
      description: 'Restaurant is preparing your food',
      icon: Circle,
      completed: currentStep >= 1
    },
    {
      id: 'onway',
      title: 'On the Way',
      description: 'Driver is heading to you',
      icon: Truck,
      completed: currentStep >= 2
    },
    {
      id: 'delivered',
      title: 'Delivered',
      description: 'Enjoy your meal!',
      icon: CheckCircle,
      completed: currentStep >= 3
    }
  ];

  // Simulate delivery progress
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < 3) {
          return prev + 1;
        }
        return prev;
      });
    }, 10000); // Change step every 10 seconds for demo

    return () => clearInterval(interval);
  }, [isVisible]);

  // Update estimated time
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setEstimatedTime(prev => {
        if (prev > 0) {
          return prev - 1;
        }
        return 0;
      });
    }, 60000); // Decrease by 1 minute every minute

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Order #{order?.id || '12345'}</h3>
            <p className="text-sm text-gray-500">Estimated delivery: {estimatedTime} min</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <span className="text-gray-500">×</span>
        </button>
      </div>

      {/* Progress Steps */}
      <div className="p-4">
        <div className="space-y-4">
          {deliverySteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === index;
            const isCompleted = step.completed;

            return (
              <div key={step.id} className="flex items-start space-x-3">
                {/* Step Icon */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-green-500 text-white' 
                    : isActive 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium text-sm ${
                    isActive ? 'text-red-500' : isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                  
                  {/* Active step details */}
                  {isActive && step.id === 'onway' && (
                    <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2 text-xs text-blue-700">
                        <Navigation className="w-3 h-3" />
                        <span>Driver is 2.3 km away</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Time indicator */}
                {isActive && (
                  <div className="flex-shrink-0">
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>Now</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
        <div className="flex space-x-3">
          <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            Contact Driver
          </button>
          <button className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:scale-105 transition-transform">
            Track on Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracker; 