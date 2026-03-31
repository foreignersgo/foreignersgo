"use client";

import { useState } from "react";
import { Menu, X, Plane } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-navy to-gold rounded-lg flex items-center justify-center">
              <Plane className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-navy">
              Foreigners<span className="text-gold">Go</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-700 hover:text-navy transition-colors font-medium">
              Services
            </a>
            <a href="#about" className="text-gray-700 hover:text-navy transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-navy transition-colors font-medium">
              Contact
            </a>
            <a 
              href="/booking" 
              className="group relative bg-gradient-to-r from-gold to-yellow-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Book Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-gold opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-navy transition-colors p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-in slide-in-from-top duration-300">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              <a
                href="#services"
                className="block px-3 py-3 text-gray-700 hover:text-navy hover:bg-gray-50 rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#about"
                className="block px-3 py-3 text-gray-700 hover:text-navy hover:bg-gray-50 rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="block px-3 py-3 text-gray-700 hover:text-navy hover:bg-gray-50 rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <div className="px-3 py-3">
                <a 
                  href="/booking" 
                  className="w-full bg-gradient-to-r from-gold to-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
