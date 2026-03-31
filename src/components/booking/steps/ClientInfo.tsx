"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Phone } from "lucide-react";
import { useBookingStore } from "@/lib/stores/bookingStore";
import { clientInfoSchema, ClientInfoFormData } from "@/lib/utils/validation";
import Input from "@/components/ui/Input";

export default function ClientInfo() {
  const { clientInfo, setClientInfo, previousStep } = useBookingStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ClientInfoFormData>({
    resolver: zodResolver(clientInfoSchema),
    defaultValues: clientInfo,
    mode: "onChange",
  });

  const onSubmit = (data: ClientInfoFormData) => {
    setClientInfo(data);
    // Handle booking submission
    console.log("Booking submitted:", data);
    // Here you would typically send the data to your backend
    alert("Booking submitted successfully! We'll contact you soon.");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gold/10 rounded-full mx-auto flex items-center justify-center">
          <User className="w-8 h-8 text-gold" />
        </div>
        <h2 className="text-3xl font-bold text-navy">Client Information</h2>
        <p className="text-gray-600">
          Please provide your details exactly as they appear on your passport
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Passport Name"
          placeholder="John Doe"
          error={errors.passportName?.message}
          helperText="Full name as shown on your passport"
          {...register("passportName")}
        />

        <div className="space-y-4">
          <h3 className="font-semibold text-navy flex items-center">
            <Phone className="w-5 h-5 mr-2 text-gold" />
            Contact Information
          </h3>
          
          <Input
            label="WhatsApp Number"
            placeholder="+86 138 0013 8000"
            error={errors.whatsappNumber?.message}
            helperText="Include country code for international numbers"
            {...register("whatsappNumber")}
          />

          <Input
            label="Telegram Username (Optional)"
            placeholder="@username"
            helperText="For alternative communication"
            {...register("telegramUsername")}
          />
        </div>

        {/* Terms and Conditions */}
        <div className="bg-light-gray rounded-lg p-6 border border-gray-200">
          <h3 className="font-semibold text-navy mb-3">Booking Confirmation</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• By submitting this form, you confirm that all provided information is accurate</p>
            <p>• You agree to our terms of service and privacy policy</p>
            <p>• Payment will be processed upon confirmation of your booking</p>
            <p>• You&apos;ll receive a confirmation email with all booking details</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={previousStep}
            className="flex-1 border-2 border-navy text-navy py-4 rounded-lg font-semibold hover:bg-navy hover:text-white transition-all duration-200"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="flex-1 bg-gold text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Booking
          </button>
        </div>
      </form>
    </div>
  );
}
