import { z } from "zod";

export const arrivalDetailsSchema = z.object({
  flightNumber: z
    .string()
    .min(3, "Flight number must be at least 3 characters")
    .max(10, "Flight number must be less than 10 characters")
    .regex(/^[A-Z0-9]+$/, "Flight number must contain only uppercase letters and numbers"),
  arrivalTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Please enter a valid time (HH:MM)"),
  arrivalDate: z
    .string()
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, "Arrival date must be today or in the future"),
});

export const serviceSelectionSchema = z.object({
  vipTransport: z.boolean(),
  fiveGSIM: z.boolean(),
  digitalLanding: z.boolean(),
}).refine((data) => {
  return data.vipTransport || data.fiveGSIM || data.digitalLanding;
}, {
  message: "Please select at least one service",
  path: ["services"],
});

export const clientInfoSchema = z.object({
  passportName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"),
  whatsappNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number with country code"),
  telegramUsername: z
    .string()
    .optional(),
});

export type ArrivalDetailsFormData = z.infer<typeof arrivalDetailsSchema>;
export type ServiceSelectionFormData = z.infer<typeof serviceSelectionSchema>;
export type ClientInfoFormData = z.infer<typeof clientInfoSchema>;
