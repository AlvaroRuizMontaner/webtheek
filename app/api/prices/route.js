import {NextResponse} from "next/server"
import {Stripe} from "stripe"

// Una pequeña muestra sobre como poner una ruta de backend en Next

export async function GET() {
    const stripe = new Stripe(process.env.STRIPE_API_SECRET)
    const prices = await stripe.prices.list()
    console.log(prices)

    return NextResponse.json(prices.data)
}