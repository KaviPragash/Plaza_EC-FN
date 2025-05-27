"use client";

import { Award, Truck, CheckCircle, Heart, Star, Shield, Zap, Users, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function TrustBadges() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const badges = [
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "All products are quality checked",
      accent: "from-blue-500 to-blue-600",
      hoverAccent: "from-blue-600 to-blue-700",
      iconBg: "bg-blue-500/10",
      stat: "100%",
      detail: "Quality Assured",
      particles: "bg-blue-400"
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Express delivery nationwide",
      accent: "from-cyan-500 to-blue-500",
      hoverAccent: "from-cyan-600 to-blue-600",
      iconBg: "bg-cyan-500/10",
      stat: "24H",
      detail: "Express Available",
      particles: "bg-cyan-400"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Bank-level security protection",
      accent: "from-blue-600 to-indigo-600",
      hoverAccent: "from-blue-700 to-indigo-700",
      iconBg: "bg-indigo-500/10",
      stat: "SSL",
      detail: "256-bit Encryption",
      particles: "bg-indigo-400"
    },
    {
      icon: Heart,
      title: "Customer Love",
      description: "Exceptional satisfaction rating",
      accent: "from-sky-500 to-blue-500",
      hoverAccent: "from-sky-600 to-blue-600",
      iconBg: "bg-sky-500/10",
      stat: "98%",
      detail: "Happy Customers",
      particles: "bg-sky-400"
    }
  ];

  const floatingElements = [
    { icon: Trophy, delay: 0, position: "top-4 left-4" },
    { icon: Zap, delay: 1000, position: "top-8 right-8" },
    { icon: Users, delay: 2000, position: "bottom-12 left-8" },
    { icon: CheckCircle, delay: 1500, position: "bottom-4 right-4" }
  ];

  return (
    <div className="mt-12 relative">
      {floatingElements.map((elem, index) => {
        const IconComp = elem.icon;
        return (
          <div
            key={index}
            className={`absolute ${elem.position} opacity-5 pointer-events-none animate-pulse`}
            style={{ animationDelay: `${elem.delay}ms` }}
          >
            <IconComp size={32} className="text-blue-600" />
          </div>
        );
      })}

      <div className="bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20 rounded-3xl shadow-2xl border border-blue-100/50 p-6 md:p-10 backdrop-blur-lg relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-cyan-400/15 to-blue-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/5 to-cyan-100/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-1000 blur-sm"></div>

        {/* Header */}
        <div className="text-center mb-8 md:mb-12 relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Star size={24} className="text-blue-600 fill-blue-600 animate-spin" style={{ animationDuration: '8s' }} />
              <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-md animate-pulse"></div>
            </div>
            <h3 className="text-2xl md:text-4xl font-black bg-gradient-to-r from-gray-800 via-blue-700 to-cyan-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              Why Choose Us
            </h3>
            <div className="relative">
              <Star size={24} className="text-cyan-600 fill-cyan-600 animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }} />
              <div className="absolute inset-0 bg-cyan-600/20 rounded-full blur-md animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
          <div className="relative">
            <p className="text-base md:text-lg text-gray-600 font-medium">
              Trusted by <span className="font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">50,000+</span> customers worldwide
            </p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-50"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 relative z-10">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={index}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-100/50 hover:border-blue-200/80 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1"
                style={{ 
                  animationDelay: `${index * 200}ms`,
                  animation: animateStats ? 'slideInUp 0.6s ease-out forwards' : 'none'
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${badge.accent} opacity-0 group-hover:opacity-8 rounded-2xl transition-all duration-500`}></div>
                <div className={`absolute inset-0 bg-gradient-to-tr from-white/50 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-300`}></div>
                {isHovered && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-1 h-1 ${badge.particles} rounded-full animate-float opacity-60`}
                        style={{
                          left: `${20 + i * 12}%`,
                          top: `${15 + i * 8}%`,
                          animationDelay: `${i * 0.3}s`,
                          animationDuration: `${2 + i * 0.5}s`
                        }}
                      />
                    ))}
                  </>
                )}

                {/* Content */}
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative mb-4 md:mb-6">
                    <div className={`${badge.iconBg} p-4 md:p-6 rounded-2xl group-hover:scale-125 transition-all duration-500 relative overflow-hidden shadow-lg group-hover:shadow-xl`}>
                      <div className={`absolute inset-0 bg-gradient-to-r ${badge.accent} opacity-0 group-hover:opacity-30 transition-all duration-500 rounded-2xl blur-md`}></div>
                      <div className={`absolute inset-0 bg-gradient-to-r ${badge.accent} opacity-0 group-hover:opacity-15 transition-all duration-300 rounded-2xl`}></div>
                      <IconComponent size={32} className="text-blue-600 relative z-10 group-hover:text-white transition-all duration-500 drop-shadow-lg" />
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${badge.accent} opacity-0 group-hover:opacity-60 transition-all duration-500 animate-spin`} style={{ animationDuration: '3s' }}></div>
                      <div className="absolute inset-1 rounded-xl bg-white/90 group-hover:bg-transparent transition-all duration-500"></div>
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${badge.accent} opacity-0 group-hover:opacity-20 rounded-full blur-xl scale-150 animate-pulse transition-all duration-500`}></div>
                  </div>
                  <div className={`absolute -top-3 -right-3 bg-gradient-to-r ${badge.accent} text-white text-sm font-black px-3 py-2 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-110 animate-bounce`}>
                    <div className="relative z-10">{badge.stat}</div>
                    <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm"></div>
                  </div>

                  {/* Title */}
                  <h4 className="font-black text-gray-800 text-base md:text-lg mb-3 group-hover:bg-gradient-to-r group-hover:from-gray-800 group-hover:to-blue-700 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 tracking-tight">
                    {badge.title}
                  </h4>

                  {/* Description */}
                  <p className="text-sm md:text-base text-gray-600 group-hover:text-gray-700 transition-all duration-300 leading-relaxed mb-3">
                    {badge.description}
                  </p>

                  {/* Detail text */}
                  <p className="text-xs text-gray-500 group-hover:text-blue-600 font-semibold transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                    {badge.detail}
                  </p>

                  {/* Multiple accent lines */}
                  <div className="mt-4 flex gap-1">
                    <div className={`w-0 group-hover:w-8 h-1 bg-gradient-to-r ${badge.accent} transition-all duration-300 rounded-full`}></div>
                    <div className={`w-0 group-hover:w-4 h-1 bg-gradient-to-r ${badge.accent} transition-all duration-500 rounded-full`} style={{ transitionDelay: '100ms' }}></div>
                    <div className={`w-0 group-hover:w-2 h-1 bg-gradient-to-r ${badge.accent} transition-all duration-700 rounded-full`} style={{ transitionDelay: '200ms' }}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* bottom trust section */}
        <div className="mt-8 md:mt-12 text-center relative z-10">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-100/50 shadow-inner">
            <div className="flex items-center justify-center gap-1 text-yellow-500 mb-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="relative">
                  <Star 
                    size={20} 
                    className="fill-current animate-pulse" 
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                  <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-sm scale-150 animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent">
                4.9/5 Customer Rating
              </p>
              <p className="text-sm md:text-base text-gray-600">
                Join <span className="font-black text-blue-600 text-lg">50,000+</span> satisfied customers who trust our service
              </p>
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Orders shipped daily
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  24/7 Support
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  Money-back guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
      `}</style>
    </div>
  );
}