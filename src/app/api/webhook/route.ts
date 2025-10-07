import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature") as string;
  const body = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const businessId = session.metadata?.businessId;
      const stripeSubscriptionId = session.subscription as string;
      const stripeCustomerId = session.customer as string;
      const planName = session.metadata?.planName || "pro"; // opcional
      const status = "ACTIVE";

      const userEmail = session.metadata?.token;
      const stripeSessionId = session.id;
      const paymentStatus = session.payment_status;

      if (paymentStatus !== "paid") {
        console.warn("El pago no se ha completado:", paymentStatus);
        return NextResponse.json({ received: true });
      }

      const backendUrl = process.env.BACKEND_URL; // ej: http://localhost:8080
      const apiToken = process.env.INTERNAL_API_TOKEN; // opcional, por seguridad

      console.log("\n\n")

      const response = await fetch(`${backendUrl}/subscriptions/activate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({
          businessId,
          stripeSubscriptionId,
          stripeCustomerId,
          stripeSessionId,
          planName,
          status,
        }),
      });

      if (!response.ok) {
        console.error(
          "Error notificando al backend:",
          await response.text()
        );
      } else {
        console.log("Backend notificado correctamente");
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Error en webhook:", err.message);
    return new NextResponse(`Webhook error: ${err.message}`, { status: 400 });
  }
}
