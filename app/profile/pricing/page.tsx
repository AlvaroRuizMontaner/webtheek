import ButtonCheckout from '@/components/StripeCheckout/ButtonCheckout'
import UserStatus from '@/components/user-status/UserStatus'
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

  return (
    <div className='space-y-12u mt-14 my-6u'>
        <UserStatus/>
      <div className=" flex flex-col items-center justify-center gap-8">
        <header>
          <h2 className="text-center my-5 headline2 font-bold text-primary-800">
            Precios
          </h2>
        </header>
        <div className="w-full">
          <div className="flex-col sm:flex-row flex px-4 justify-center items-center gap-4">
            {prices.map((price) => (
              <div
                key={price.id}
                className="bg-primary-50 mb-2 p-5 lg:p-7 space-y-5 shadow-md flex-1 max-w-60 min-w-52 rounded-md"
              >
                <h3 className="text-primary-600 text-center text-xl">{`Plan ${price.nickname}`}</h3>
                <h2 className="text-3xl font-bold text-center">
                  {(price.unit_amount as number) / 100}€
                </h2>
                <ButtonCheckout {...price} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
