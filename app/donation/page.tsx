import ButtonCheckout from '@/components/StripeCheckout/ButtonCheckout'
import Price from '@/components/StripeCheckout/price/Price'
import React from 'react'
import Stripe from 'stripe'

// Obtención de precios de productos de stripe

async function loadPrices() {
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_API_SECRET as string)
    const prices = await stripe.prices.list()
    const sortedPrices = prices.data.filter((price) => price.nickname?.toLowerCase() === "donación")
    return sortedPrices
}

export default async function PricingPage() {

  const prices = await loadPrices()

  return (
    <div className=" flex flex-col items-center justify-center gap-8">
    <header>
      <h2 className="text-center my-5 headline2 font-bold text-primary-800">
        Precios
      </h2>
    </header>
    <div className="w-full">
      <div className="flex-col sm:flex-row flex justify-center items-center gap-4">
        {prices.map((price) => (
          <div
            key={price.id}
            className="bg-primary-50 mb-2 flex-col p-5 s md:p-5 lg:p-7 space-y-5 shadow-md flex-1 max-w-64 sm:min-w-40 rounded-md"
          >
            <h3 className="text-primary-600 text-center text-xl font-bold underline">{`${price.nickname}`}</h3>
            <h2 className="font-bold text-center">
              {/* {(price.unit_amount as number) / 100}€ */}
              <Price price={(price.unit_amount as number) / 100} />
            </h2>
            <p className='text-center text-[14px] lg:text-[16px]'>Ayúdanos a mejorar</p>
            <ButtonCheckout text={"Donar"} {...price} purpose="donation" />
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}
