"use client";

import { ShoppingCart, FileText, CheckCircle, Sparkles, Package, Truck, Star, Gift } from 'lucide-react';
import { useState, useEffect } from 'react';

type OrderStatus = "item_selected" | "checkout" | "purchase_confirmed";

interface OrderStatusTrackerProps {
  orderStatus: OrderStatus;
}

export default function OrderStatusTracker({ orderStatus }: OrderStatusTrackerProps) {
  const [animateProgress, setAnimateProgress] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const getStepIndex = (status: OrderStatus) => {
    switch(status) {
      case "item_selected": return 0;
      case "checkout": return 1;
      case "purchase_confirmed": return 2;
      default: return 0;
    }
  };

  const getProgressWidth = () => {
    switch(orderStatus) {
      case "item_selected": return "33%";
      case "checkout": return "66%";
      case "purchase_confirmed": return "100%";
      default: return "0%";
    }
  };

  const getStatusMessage = () => {
    switch(orderStatus) {
      case "item_selected": return "Items added to cart. Proceed to checkout to complete your purchase.";
      case "checkout": return " You're at checkout. Review your order and complete payment.";
      case "purchase_confirmed": return "Your purchase has been confirmed! Estimated delivery: May 22nd, 2025";
      default: return "";
    }
  };

  useEffect(() => {
    const message = getStatusMessage();
    let index = 0;
    setTypewriterText("");
    
    const timer = setInterval(() => {
      if (index < message.length) {
        setTypewriterText(prev => prev + message[index]);
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [orderStatus]);

  useEffect(() => {
    setCurrentStep(getStepIndex(orderStatus));
    setAnimateProgress(true);
    
    if (orderStatus === "purchase_confirmed") {
      const timer = setTimeout(() => setShowConfetti(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [orderStatus]);

  const steps = [
    {
      id: "item_selected",
      icon: ShoppingCart,
      title: "Item Selected",
      subtitle: "Added to cart",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500",
      completedColor: "bg-gradient-to-r from-green-400 to-emerald-500"
    },
    {
      id: "checkout",
      icon: FileText,
      title: "Checkout",
      subtitle: "Payment process",
      color: "from-purple-500 to-blue-500",
      bgColor: "bg-purple-500",
      completedColor: "bg-gradient-to-r from-green-400 to-emerald-500"
    },
    {
      id: "purchase_confirmed",
      icon: CheckCircle,
      title: "Purchase Confirmed",
      subtitle: "Order complete",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500",
      completedColor: "bg-gradient-to-r from-green-400 to-emerald-500"
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-8 relative">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 rounded-3xl shadow-2xl border border-blue-100/50 p-6 md:p-10 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Header */}
        <div className="text-center mb-10 md:mb-12 relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles size={24} className="text-blue-600 animate-spin" style={{ animationDuration: '4s' }} />
            <h2 className="text-2xl md:text-4xl font-black bg-gradient-to-r from-gray-800 via-blue-700 to-purple-600 bg-clip-text text-transparent">
              Your Journey
            </h2>
            <Gift size={24} className="text-purple-600 animate-bounce" />
          </div>
          <p className="text-gray-600 font-medium">Track your order progress in real-time</p>
        </div>
        
        <div className="relative mb-12 md:mb-16">
          <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-300 animate-pulse"></div>
            
            {/* Main progress bar */}
            <div 
              className="relative h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 transition-all duration-2000 ease-out rounded-full shadow-lg"
              style={{ width: animateProgress ? getProgressWidth() : "0%" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                    style={{
                      right: `${i * 4}px`,
                      opacity: 1 - (i * 0.2),
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Status Steps */}
          <div className="flex justify-between mt-6 md:mt-8 relative">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;
              const isPending = currentStep < index;
              
              return (
                <div key={step.id} className="flex flex-col items-center relative group">
                  {index < steps.length - 1 && (
                    <div className="absolute top-5 left-1/2 w-full h-0.5 bg-gray-200 -z-10 hidden md:block">
                      <div 
                        className={`h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ${
                          currentStep > index ? 'w-full' : 'w-0'
                        }`}
                      />
                    </div>
                  )}
                  <div className="relative mb-4">
                    <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                      isActive ? 'animate-pulse bg-gradient-to-r ' + step.color + ' blur-md scale-150 opacity-50' :
                      isCompleted ? 'bg-green-400/30 blur-md scale-140 opacity-40' : ''
                    }`}></div>
                    <div className={`relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full transition-all duration-500 shadow-xl ${
                      isActive ? `${step.completedColor} scale-110 animate-bounce` :
                      isCompleted ? `${step.completedColor} scale-105` :
                      isPending ? 'bg-gray-200 scale-95' : step.bgColor
                    }`}>
                      {(isActive || isCompleted) && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-shimmer"></div>
                      )}
                      <IconComponent 
                        size={20} 
                        className={`transition-all duration-300 ${
                          isActive || isCompleted ? 'text-white' : 'text-gray-400'
                        } ${isActive ? 'animate-pulse' : ''}`} 
                      />
                      {isCompleted && step.id !== "purchase_confirmed" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <CheckCircle size={16} className="text-white animate-ping" />
                        </div>
                      )}
                    </div>
                    {isActive && (
                      <>
                        <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping"></div>
                        <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-ping" style={{ animationDelay: '0.5s' }}></div>
                      </>
                    )}
                  </div>
                  <div className="text-center max-w-24 md:max-w-32">
                    <span className={`text-sm md:text-base font-bold transition-all duration-300 ${
                      isActive ? 'text-blue-700 bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent' :
                      isCompleted ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                    <p className={`text-xs md:text-sm mt-1 transition-all duration-300 ${
                      isActive ? 'text-blue-600' :
                      isCompleted ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {step.subtitle}
                    </p>
                  </div>
                  
                  {isCompleted && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-green-400 rounded-full animate-float opacity-60"
                          style={{
                            top: `${-10 + i * 5}px`,
                            left: `${20 + i * 8}px`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${2 + i * 0.3}s`
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="relative">
          <div className={`p-6 md:p-8 rounded-2xl text-center shadow-inner backdrop-blur-sm border transition-all duration-500 ${
            orderStatus === "purchase_confirmed" 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200/50' 
              : orderStatus === "checkout"
              ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200/50'
              : 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200/50'
          }`}>
            <div className="flex justify-center mb-4">
              {orderStatus === "purchase_confirmed" && (
                <div className="relative">
                  <CheckCircle size={40} className="text-green-600 animate-bounce" />
                  <div className="absolute inset-0 bg-green-400/30 rounded-full blur-lg animate-pulse"></div>
                </div>
              )}
              {orderStatus === "checkout" && (
                <div className="relative">
                  <Package size={40} className="text-purple-600 animate-pulse" />
                  <div className="absolute inset-0 bg-purple-400/30 rounded-full blur-lg animate-pulse"></div>
                </div>
              )}
              {orderStatus === "item_selected" && (
                <div className="relative">
                  <ShoppingCart size={40} className="text-blue-600 animate-pulse" />
                  <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-lg animate-pulse"></div>
                </div>
              )}
            </div>
            <p className={`text-base md:text-lg font-medium transition-all duration-300 ${
              orderStatus === "purchase_confirmed" ? 'text-green-800' :
              orderStatus === "checkout" ? 'text-purple-800' : 'text-blue-800'
            }`}>
              {typewriterText}
              <span className="animate-blink">|</span>
            </p>
            {orderStatus === "purchase_confirmed" && (
              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-green-700">
                <div className="flex items-center gap-2">
                  <Truck size={16} className="animate-bounce" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={16} className="animate-spin" style={{ animationDuration: '3s' }} />
                  <span>Premium Service</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .animate-confetti {
          animation: confetti 3s linear infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
}