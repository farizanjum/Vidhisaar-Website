
import { useState } from 'react';
import { ShinyButton } from "@/components/ui/shiny-button";
import { toast } from "@/components/ui/use-toast";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've been added to our waitlist. We'll notify you when we launch!",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div id="waitlist" className="relative w-full max-w-4xl mx-auto py-16 z-10">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-8 text-white">Join the Waitlist</h2>
      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-white/10">
        <p className="text-center text-white/70 mb-6">
          Be the first to experience the future of AI-powered legal assistance. Join our exclusive waitlist today!
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full max-w-md px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            required
          />
          <ShinyButton 
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 text-white bg-indigo-500/20 hover:bg-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Joining..." : "Join Waitlist"}
          </ShinyButton>
        </form>
      </div>
    </div>
  );
}
