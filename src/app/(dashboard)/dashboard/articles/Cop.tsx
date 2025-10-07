"use client";
import Button from "@/app/ui/Button";
import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = 
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function Cop() {
  const handleSubscribe = async () => {
    const res = await fetch("/api/subscribe", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Suscripción mensual</h1>
      <Button onClick={handleSubscribe}>Suscribirme ($10/mes)</Button>
    </div>
  );
}
