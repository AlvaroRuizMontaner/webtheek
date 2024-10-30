import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {

    const {priceId} = await request.json()

    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_API_SECRET as string)
    
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ],
        success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/payment-success`,
        cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/pricing`

    })

    return NextResponse.json({
        url: session.url
    })
}