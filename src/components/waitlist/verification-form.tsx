
"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { FixedHoverButton } from "@/components/ui/fixed-hover-button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface VerificationFormProps {
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}

export const VerificationForm = ({ email, onSuccess, onBack }: VerificationFormProps) => {
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const { toast } = useToast();

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleVerify = async () => {
    if (!otp || otp.length < 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter the 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    setVerifying(true);

    try {
      const { data, error } = await supabase.functions.invoke("verify-otp", {
        method: 'POST',
        body: { email, otp }
      });

      if (error) {
        throw new Error(error.message || 'Failed to verify code');
      }
      
      toast({
        title: "Success!",
        description: "Your email has been verified and you've been added to our waitlist!",
      });
      
      onSuccess();
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to verify code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <>
      <div className="text-white/80 text-center mb-4">
        We've sent a verification code to <span className="font-medium">{email}</span>
      </div>
      <Input
        type="text"
        placeholder="Enter 6-digit code"
        className="w-full max-w-md z-10 mb-4 md:mb-6"
        value={otp}
        onChange={handleOtpChange}
        maxLength={6}
        disabled={verifying}
      />
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <FixedHoverButton 
          className="text-white w-full sm:w-1/2"
          height="48px"
          style={{
            "--circle-start": "#6344F5",
            "--circle-end": "#18CCFC",
          } as React.CSSProperties}
          onClick={handleVerify}
          disabled={verifying}
        >
          {verifying ? "Verifying..." : "Verify Code"}
        </FixedHoverButton>
        <FixedHoverButton 
          className="text-white/80 w-full sm:w-1/2 bg-transparent"
          height="48px"
          style={{
            "--circle-start": "#6344F5",
            "--circle-end": "#18CCFC",
          } as React.CSSProperties}
          onClick={onBack}
          disabled={verifying}
        >
          Back
        </FixedHoverButton>
      </div>
    </>
  );
};
