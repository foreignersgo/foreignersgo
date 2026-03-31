"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plane, Calendar } from "lucide-react";
import { useBookingStore } from "@/lib/stores/bookingStore";
import { arrivalDetailsSchema, ArrivalDetailsFormData } from "@/lib/utils/validation";
import Input from "@/components/ui/Input";

export default function ArrivalDetails() {
  const { arrivalDetails, setArrivalDetails, nextStep } = useBookingStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<ArrivalDetailsFormData>({
    resolver: zodResolver(arrivalDetailsSchema),
    defaultValues: arrivalDetails,
    mode: "onChange",
  });

  const watchedValues = watch();

  const onSubmit = (data: ArrivalDetailsFormData) => {
    setArrivalDetails(data);
    nextStep();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gold/10 rounded-full mx-auto flex items-center justify-center">
          <Plane className="w-8 h-8 text-gold" />
        </div>
        <h2 className="text-3xl font-bold text-navy">Arrival Details</h2>
        <p className="text-gray-600">
          Tell us about your flight to Guangzhou so we can arrange your welcome
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Flight Number"
            placeholder="e.g., CZ348"
            error={errors.flightNumber?.message}
            helperText="As shown on your boarding pass"
            {...register("flightNumber", {
              onChange: (e) => {
                const value = e.target.value.toUpperCase();
                e.target.value = value;
              },
            })}
          />

          <Input
            label="Arrival Time"
            type="time"
            error={errors.arrivalTime?.message}
            helperText="Local Guangzhou time"
            {...register("arrivalTime")}
          />
        </div>

        <Input
          label="Arrival Date"
          type="date"
          error={errors.arrivalDate?.message}
          helperText="Your arrival date in Guangzhou"
          min={new Date().toISOString().split('T')[0]}
          {...register("arrivalDate")}
        />

        {/* Flight Summary */}
        {watchedValues.flightNumber && watchedValues.arrivalTime && watchedValues.arrivalDate && (
          <div className="bg-light-gray rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-navy mb-3 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-gold" />
              Flight Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Flight:</span>
                <p className="font-medium text-navy">{watchedValues.flightNumber}</p>
              </div>
              <div>
                <span className="text-gray-600">Time:</span>
                <p className="font-medium text-navy">{watchedValues.arrivalTime}</p>
              </div>
              <div>
                <span className="text-gray-600">Date:</span>
                <p className="font-medium text-navy">
                  {new Date(watchedValues.arrivalDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid}
          className="w-full bg-gold text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Service Selection
        </button>
      </form>
    </div>
  );
}
