"use client";

import { Button } from "@/app/_components/ui/button";
import { useUser } from "@clerk/nextjs";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { createStripeCheckout } from "../_actions/create-checkout";

export function AcquirePlanButton() {
  const { user } = useUser();

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

  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";

  if (hasPremiumPlan) {
    return (
      <Button className="w-full rounded-full font-bold" variant={"link"}>
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
        >
          Gerenciar plano
        </Link>
      </Button>
    );
  }

  return (
    <Button className="w-full rounded-full font-bold" onClick={handleAcquirePlanClick}>
      Adquirir plano
    </Button>
  );
}
