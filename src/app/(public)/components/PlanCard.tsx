"use client";
import Button from "@/app/ui/Button";
import { isLoggedIn } from "@/app/utils/roles";
import { planDetails } from "@/app/constants/plans";

import { Check, X } from "lucide-react";
import React from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export const PlanCard = ({
  plan,
  session,
}: {
  plan: (typeof planDetails)[number];
  session: any;
}) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleClick = async (planId: string) => {
    const currentPlan = session?.user.plan?.name;
    setLoading(true);
    console.log("Current Plan:", planId);

    try {
      switch (planId) {
        case "free":
          if (currentPlan === "free") {
              router.push("/dashboard");
          }
          
          break;

        case "pro":
          const res = await fetch("/api/subscribe", { method: "POST" });
          const data = await res.json();
          if (data.url) router.push(data.url); //window.location.href = data.url;

          break;

        case "ultra":
          // Lógica para usuarios con plan ultra
          break;

        default:
          // Lógica para usuarios sin plan
          break;
      }
    } catch (error) {
      console.error("Error al iniciar la suscripción:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      key={plan.name}
      className={`relative flex flex-col rounded-2xl border border-gray-200 p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
        plan.highlighted
          ? "border-blue-500 shadow-blue-100 hover:shadow-blue-100"
          : "hover:border-gray-300"
      }`}
    >
      {plan.highlighted && (
        <div className="absolute -top-4 left-0 right-0">
          <div className="mx-auto w-32 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-white">
            Más popular
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-bold font-display text-title">
          {plan.name}
        </h3>
        <p className="mt-2 font-app text-gray-500">{plan.description}</p>
        <div className="mt-4">
          <span className="text-4xl font-bold font-display text-title">
            {plan.price}
          </span>
          <span className="text-gray-500 font-app">{plan.period}</span>
        </div>
      </div>

      <ul className="mb-6 space-y-4 flex-1">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            {feature.included ? (
              <Check className="h-5 w-5 text-primary" />
            ) : (
              <X className="h-5 w-5 text-gray-400" />
            )}
            <span
              className={`font-app ${
                feature.included ? "text-gray-700" : "text-gray-500"
              }`}
            >
              {feature.name}
            </span>
          </li>
        ))}
      </ul>

      {isLoggedIn(session?.user) ? (
        <Button
          // href={plan.buttonLink}
          onClick={() => handleClick(plan.id)}
          loading={loading}
          variant={session?.user.plan?.name === plan.id ? "outline" : "primary"}
          className={clsx(
            "btn-main w-full text-center h-12",
            "disabled:opacity-100!",
            plan.highlighted
              ? "bg-primary hover:bg-primary/90"
              : "bg-gray-800 hover:bg-gray-900",
            session?.user.plan?.name === plan.id
              ? "cursor-default! pointer-none!"
              : "x"
          )}
          disabled={session?.user.plan?.name === plan.id}
        >
          {session?.user.plan?.name === plan.id ? "Adquirido" : plan.buttonText}
        </Button>
      ) : (
        <Button
          href={plan.buttonLink}
          className={`btn-main w-full text-center ${
            plan.highlighted
              ? "bg-primary hover:bg-primary/90"
              : "bg-gray-800 hover:bg-gray-900"
          }`}
        >
          {plan.buttonText}
        </Button>
      )}
    </div>
  );
};
