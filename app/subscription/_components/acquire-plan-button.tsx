"use client";

import { Button } from "@/app/_components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { createStripeCheckout } from "../_actions/create-checkout";

export function AcquirePlanButton() {
  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY) {
      throw new Error("Missing stripe publish key environment variable");
    }

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY);

    if (!stripe) {
      throw new Error("Stripe is not found");
    }

    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <Button className="w-full rounded-full font-bold" onClick={handleAcquirePlanClick}>
      Adquirir plano
    </Button>
  );
}
