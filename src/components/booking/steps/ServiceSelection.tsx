"use client";

import { useBookingStore } from "@/lib/stores/bookingStore";
import ServiceCard from "../ui/ServiceCard";

export default function ServiceSelection() {
  const { serviceSelection, setServiceSelection, nextStep, previousStep } = useBookingStore();

  const services = [
    {
      id: "vipTransport" as const,
      title: "VIP Transport",
      description: "Premium airport pickup with luxury vehicle and professional driver",
      price: "¥588",
      icon: "car" as const,
    },
    {
      id: "fiveGSIM" as const,
      title: "5G SIM Setup",
      description: "Local 5G SIM card with data plan activated before arrival",
      price: "¥288",
      icon: "phone" as const,
    },
    {
      id: "digitalLanding" as const,
      title: "Digital Landing",
      description: "Complete digital immigration assistance and document preparation",
      price: "¥388",
      icon: "globe" as const,
    },
  ];

  const toggleService = (serviceId: keyof typeof serviceSelection) => {
    setServiceSelection({
      ...serviceSelection,
      [serviceId]: !serviceSelection[serviceId],
    });
  };

  const hasSelectedServices = Object.values(serviceSelection).some(Boolean);

  const calculateTotal = () => {
    const prices = {
      vipTransport: 588,
      fiveGSIM: 288,
      digitalLanding: 388,
    };

    return Object.entries(serviceSelection).reduce((total, [service, selected]) => {
      return selected ? total + prices[service as keyof typeof prices] : total;
    }, 0);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-navy">Select Your Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the services you need for a seamless arrival in Guangzhou
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            price={service.price}
            icon={service.icon}
            selected={serviceSelection[service.id]}
            onClick={() => toggleService(service.id)}
          />
        ))}
      </div>

      {/* Service Summary */}
      {hasSelectedServices && (
        <div className="bg-light-gray rounded-lg p-6 border border-gray-200">
          <h3 className="font-semibold text-navy mb-4">Selected Services</h3>
          <div className="space-y-2">
            {services
              .filter((service) => serviceSelection[service.id])
              .map((service) => (
                <div key={service.id} className="flex justify-between items-center">
                  <span className="text-gray-700">{service.title}</span>
                  <span className="font-semibold text-navy">{service.price}</span>
                </div>
              ))}
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-navy text-lg">Total</span>
                <span className="font-bold text-gold text-xl">¥{calculateTotal()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={previousStep}
          className="flex-1 border-2 border-navy text-navy py-4 rounded-lg font-semibold hover:bg-navy hover:text-white transition-all duration-200"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          disabled={!hasSelectedServices}
          className="flex-1 bg-gold text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Client Information
        </button>
      </div>
    </div>
  );
}
