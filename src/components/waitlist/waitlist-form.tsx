
"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { FixedHoverButton } from "@/components/ui/fixed-hover-button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface WaitlistFormProps {
  onSuccess: (email: string) => void;
  onAlreadyWaitlisted: () => void;
}

export const WaitlistForm = ({ onSuccess, onAlreadyWaitlisted }: WaitlistFormProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-otp", {
        method: 'POST',
        body: { email }
      });

      if (error) {
        throw new Error(error.message || 'Failed to send verification code');
      }

      if (data.alreadyWaitlisted) {
        toast({
          title: "Already on Waitlist",
          description: "You are already on our waitlist!",
        });
        onAlreadyWaitlisted();
        return;
      }

      toast({
        title: "Verification Code Sent",
        description: "Please check your email for the verification code",
      });
      
      onSuccess(email);
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
      <h3 className="text-center text-white text-lg mb-4">Join the Waitlist</h3>
      <Input
        type="email"
        placeholder="your@email.com"
        className="w-full z-10 mb-4 md:mb-6 bg-white/10 border-white/20 text-white placeholder:text-white/50"
        value={email}
        onChange={handleEmailChange}
        disabled={isSubmitting}
      />
      <FixedHoverButton 
        className="text-white w-full"
        height="48px"
        style={{
          "--circle-start": "#000046",
          "--circle-end": "#1cb5e0",
        } as React.CSSProperties}
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Join Waitlist Now"}
      </FixedHoverButton>
    </div>
  );
};
