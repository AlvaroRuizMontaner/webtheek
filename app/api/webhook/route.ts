/* import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Muestra de webhook en Next (deshuso)

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_API_SECRET as string)

// sign secret del webhook
const endpointSecret = ""

export async function POST(request: Request) {

    const body = await request.text()
    const headerList = headers()
    const sig = headerList.get("stripe-signature")

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, sig as string, endpointSecret)
    } catch(error) {
        console.log(error)
        return NextResponse.json({error: error}, {status: 400})
    }

    switch(event.type) {
        case "checkout.session.completed": {
            const checkoutSessionCompleted = event.data.object

            // guardar en base de datos

            // enviar un correo
            console.log({checkoutSessionCompleted})
            break
        }
        default:
            console.log(`Evento no manejado: ${event.type}`)
    }

    // Confirma a stripe que todo ha ido correctamente
    return new Response(null, {status: 200})
} */