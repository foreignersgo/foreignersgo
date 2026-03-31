"use client";

import { Car, Smartphone, Globe } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  icon: "car" | "phone" | "globe";
  selected: boolean;
  onClick: () => void;
}

const iconMap = {
  car: Car,
  phone: Smartphone,
  globe: Globe,
};

export default function ServiceCard({
  title,
  description,
  price,
  icon,
  selected,
  onClick,
}: ServiceCardProps) {
  const IconComponent = iconMap[icon];

  return (
    <div
      onClick={onClick}
      className={`
        relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200
        ${selected 
          ? "border-gold bg-gold/5 shadow-lg" 
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
        }
      `}
    >
      {selected && (
        <div className="absolute top-4 right-4 w-6 h-6 bg-gold rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg ${selected ? "bg-gold text-white" : "bg-navy/10 text-navy"}`}>
          <IconComponent className="w-6 h-6" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-navy text-lg mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-3">{description}</p>
          <p className="font-bold text-gold text-lg">{price}</p>
        </div>
      </div>
    </div>
  );
}
