"use client";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-8 sm:mb-12">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={stepNumber} className="flex items-center">
            <div
              className={`
                w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base transition-all duration-300 relative
                ${isActive 
                  ? "bg-gradient-to-r from-gold to-yellow-600 text-white scale-110 shadow-lg" 
                  : isCompleted 
                  ? "bg-navy text-white" 
                  : "bg-gray-200 text-gray-500"
                }
              `}
            >
              {isCompleted ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                stepNumber
              )}
              
              {/* Active step pulse effect */}
              {isActive && (
                <div className="absolute inset-0 bg-gold rounded-full animate-ping opacity-20"></div>
              )}
            </div>
            
            {stepNumber < totalSteps && (
              <div
                className={`
                  w-8 sm:w-12 h-1 mx-2 sm:mx-3 transition-all duration-300
                  ${isCompleted ? "bg-navy" : "bg-gray-200"}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
