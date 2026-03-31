"use client";

import { ArrowRight, Calendar, MapPin, Users, Star, Shield, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative py-12 lg:py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-light-gray to-white">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/5 via-transparent to-gold/5"></div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-20 left-10 w-32 h-32 bg-gold/10 rounded-full blur-xl transition-all duration-1000 ${isLoaded ? 'translate-y-0' : 'translate-y-10'}`}></div>
        <div className={`absolute top-40 right-20 w-40 h-40 bg-navy/10 rounded-full blur-xl transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0' : 'translate-y-10'}`}></div>
        <div className={`absolute bottom-20 left-1/4 w-24 h-24 bg-gold/5 rounded-full blur-lg transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0' : 'translate-y-10'}`}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className={`space-y-8 transition-all duration-700 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center bg-gold/10 border border-gold/20 rounded-full px-4 py-2 text-sm font-medium text-gold">
              <Shield className="w-4 h-4 mr-2" />
              Trusted by 10,000+ International Visitors
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-navy leading-tight">
                Legit & Seamless
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-600">
                  Arrival in Guangzhou
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                Your trusted partner for 139th Canton Fair and beyond. 
                Experience VIP service from touchdown to your destination with 
                <span className="font-semibold text-navy"> 24/7 support</span>.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="bg-gradient-to-br from-gold/20 to-gold/10 p-3 rounded-lg">
                  <Star className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-bold text-navy text-lg">4.9/5</p>
                  <p className="text-xs text-gray-600">Rating</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="bg-gradient-to-br from-navy/20 to-navy/10 p-3 rounded-lg">
                  <Clock className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <p className="font-bold text-navy text-lg">24/7</p>
                  <p className="text-xs text-gray-600">Support</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="bg-gradient-to-br from-gold/20 to-gold/10 p-3 rounded-lg">
                  <Users className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-bold text-navy text-lg">10K+</p>
                  <p className="text-xs text-gray-600">Clients</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/booking" 
                className="group relative bg-gradient-to-r from-gold to-yellow-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 overflow-hidden"
              >
                <span className="relative z-10">Book Your Arrival</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-gold opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
              <button className="group border-2 border-navy text-navy px-8 py-4 rounded-xl font-semibold hover:bg-navy hover:text-white transition-all duration-300 relative overflow-hidden">
                <span className="relative z-10">Learn More</span>
                <div className="absolute inset-0 bg-navy transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </button>
            </div>
          </div>

          {/* Right Side - VIP Welcome Kit */}
          <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-navy/20 rounded-2xl blur-lg"></div>
              
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-navy/10 rounded-xl"></div>
                    <div className="relative bg-gradient-to-br from-gold via-yellow-500 to-yellow-600 rounded-xl p-8">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full mx-auto flex items-center justify-center mb-4">
                        <Users className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        VIP Welcome Kit
                      </h3>
                      <p className="text-white/90 text-sm">
                        Everything you need for a smooth arrival
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 text-left">
                    {[
                      { icon: "📱", title: "Local SIM Card", desc: "5G connectivity ready" },
                      { icon: "🚗", title: "Premium Transport", desc: "Luxury vehicle pickup" },
                      { icon: "🛂", title: "Digital Landing", desc: "Express immigration" },
                      { icon: "🎯", title: "24/7 Support", desc: "Round-the-clock help" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="text-2xl">{item.icon}</div>
                        <div className="flex-1">
                          <p className="font-semibold text-navy text-sm">{item.title}</p>
                          <p className="text-xs text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
