"use client";

import { useBookingStore } from "@/lib/stores/bookingStore";
import StepIndicator from "./ui/StepIndicator";
import ArrivalDetails from "./steps/ArrivalDetails";
import ServiceSelection from "./steps/ServiceSelection";
import ClientInfo from "./steps/ClientInfo";

export default function BookingEngine() {
  const { currentStep, resetBooking } = useBookingStore();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ArrivalDetails />;
      case 2:
        return <ServiceSelection />;
      case 3:
        return <ClientInfo />;
      default:
        return <ArrivalDetails />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-light-gray to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center bg-gold/10 border border-gold/20 rounded-full px-4 py-2 text-sm font-medium text-gold">
              Secure Booking Process
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-navy">
              Book Your Guangzhou Arrival
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Complete our simple 3-step booking process for a seamless arrival experience
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={3} />

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A059' fill-opacity='0.1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          
          <div className="relative z-10">
            {renderStep()}
          </div>
        </div>

        {/* Reset Button */}
        <div className="text-center mt-8">
          <button
            onClick={resetBooking}
            className="text-gray-500 hover:text-navy transition-colors text-sm underline underline-offset-4 hover:underline-offset-2"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
