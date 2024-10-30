import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {

    const body = await request.json()

    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_API_SECRET as string)
    
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        // A través del metadata es como yo puedo decirle al webhook que producto se ha adquirido
        metadata: {
            productId: body.id
        },
        line_items: [
            {
                //price: priceId,
                price_data: {
                    currency: "eur",
                    product_data: {
                        name: body.name
                    },
                    unit_amount: 400
                },
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