export interface ArrivalDetails {
  flightNumber: string;
  arrivalTime: string;
  arrivalDate: string;
}

export interface ServiceSelection {
  vipTransport: boolean;
  fiveGSIM: boolean;
  digitalLanding: boolean;
}

export interface ClientInfo {
  passportName: string;
  whatsappNumber: string;
  telegramUsername?: string;
}

export interface BookingData {
  arrivalDetails: ArrivalDetails;
  serviceSelection: ServiceSelection;
  clientInfo: ClientInfo;
}

export interface BookingState extends BookingData {
  currentStep: number;
  isComplete: boolean;
}

export interface BookingActions {
  setArrivalDetails: (details: ArrivalDetails) => void;
  setServiceSelection: (services: ServiceSelection) => void;
  setClientInfo: (info: ClientInfo) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetBooking: () => void;
  setStep: (step: number) => void;
}
