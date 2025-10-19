import React from "react";
import { Check, X } from "lucide-react";
import Button from "@/app/ui/Button";
import { planDetails } from "@/app/constants/plans";
import { isLoggedIn } from "@/app/utils/roles";
import { auth } from "@/auth";
import { getPlanName } from "@/app/utils/plans";
import clsx from "clsx";
import { loadStripe } from "@stripe/stripe-js";
import { PlanCard } from "../components/PlanCard";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const PricingPlans = async () => {
  const session = await auth();

  return (
    <div className="py-24 bg-gradient-to-b from-white to-[#f3f6fb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-display text-title sm:text-4xl lg:text-5xl">
            Planes que se ajustan a tu negocio
          </h2>
          <p className="mt-4 text-xl text-gray-600 font-app">
            Escoge el plan perfecto para tu necesidad
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {planDetails.map((plan) => (
            <PlanCard key={plan.name} plan={plan} session={session} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return <PricingPlans />;
}
