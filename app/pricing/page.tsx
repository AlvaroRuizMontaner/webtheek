import ButtonCheckout from '@/components/StripeCheckout/ButtonCheckout'
import React from 'react'
import Stripe from 'stripe'

// Obtención de precios de productos de stripe

async function loadPrices() {
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_API_SECRET as string)
    const prices = await stripe.prices.list()
    const sortedPrices = prices.data.sort((a,b) => (a.unit_amount as number) - (b.unit_amount as number))
    return sortedPrices
}

export default async function PricingPage() {

  const prices = await loadPrices()
  console.log(prices)

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <header>
          <h1 className='text-center my-5'>Pricing</h1>
        </header>
        <div className='flex gap-x-2'>
          {prices.map((price) => (
            <div key={price.id} className="bg-slate-300 mb-2 p-7">
              <h3>{`Plan ${price.nickname}`}</h3>
              <h2 className='text-3xl font-bold'>{(price.unit_amount as number) / 100}$</h2>
              <ButtonCheckout {...price} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
