import { create } from "zustand";
import { BookingState, BookingActions, ArrivalDetails, ServiceSelection, ClientInfo } from "@/components/booking/types";

type BookingStore = BookingState & BookingActions;

const initialState: Omit<BookingState, keyof BookingActions> = {
  arrivalDetails: {
    flightNumber: "",
    arrivalTime: "",
    arrivalDate: "",
  },
  serviceSelection: {
    vipTransport: false,
    fiveGSIM: false,
    digitalLanding: false,
  },
  clientInfo: {
    passportName: "",
    whatsappNumber: "",
    telegramUsername: "",
  },
  currentStep: 1,
  isComplete: false,
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  ...initialState,

  setArrivalDetails: (details: ArrivalDetails) =>
    set((state) => ({
      ...state,
      arrivalDetails: details,
    })),

  setServiceSelection: (services: ServiceSelection) =>
    set((state) => ({
      ...state,
      serviceSelection: services,
    })),

  setClientInfo: (info: ClientInfo) =>
    set((state) => ({
      ...state,
      clientInfo: info,
    })),

  nextStep: () => {
    const { currentStep } = get();
    if (currentStep < 3) {
      set((state) => ({ ...state, currentStep: currentStep + 1 }));
    } else {
      set((state) => ({ ...state, isComplete: true }));
    }
  },

  previousStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set((state) => ({ ...state, currentStep: currentStep - 1 }));
    }
  },

  setStep: (step: number) =>
    set((state) => ({ ...state, currentStep: Math.max(1, Math.min(3, step)) })),

  resetBooking: () => set(initialState),
}));
