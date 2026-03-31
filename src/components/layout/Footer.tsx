"use client";

import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              Foreigners<span className="text-gold">Go</span>
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner for seamless arrival and premium travel concierge services in Guangzhou. 
              Specializing in Canton Fair assistance and VIP welcome services.
            </p>
            
            {/* Business License */}
            <div className="bg-navy/50 rounded-lg p-4 border border-gold/20">
              <p className="text-sm text-gray-300 mb-2">
                <strong>Business License:</strong> Endubis Trading (广州市恩杜比斯贸易有限公司)
              </p>
              <p className="text-xs text-gray-400">
                Registered in Guangzhou, China | Licensed Travel Service Provider
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Airport Transfer
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  VIP Welcome Kit
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  5G SIM Setup
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Digital Landing
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gold" />
                <span className="text-gray-300">+86 20 8888 8888</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gold" />
                <span className="text-gray-300">info@foreignersgo.cn</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gold" />
                <span className="text-gray-300">Guangzhou, China</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-gold" />
                <span className="text-gray-300">www.foreignersgo.cn</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 ForeignersGo - Endubis Trading (广州市恩杜比斯贸易有限公司). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
