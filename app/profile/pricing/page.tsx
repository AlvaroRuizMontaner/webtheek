import ButtonCheckout from '@/components/StripeCheckout/ButtonCheckout'
import UserStatus from '@/components/user-status/UserStatus'
import React from 'react'
import Stripe from 'stripe'
import "../../../app/globals.scss"
import Price from '@/components/StripeCheckout/price/Price'

// Obtención de precios de productos de stripe

async function loadPrices() {
    const stripe = new Stripe(process.env.STRIPE_API_SECRET as string)
    const prices = await stripe.prices.list()
    const sortedPrices = prices.data.slice(1).sort((a,b) => (a.unit_amount as number) - (b.unit_amount as number))
    return sortedPrices
}

const priceDescriptions = {
  silver: "El más barato",
  gold: "El más equilibrado",
  platinum: "El más poderoso"
}

// Parece ser que esto es un server component, lo cual es necesario para que pueda ser asincrono, y ademas esto ocurre
// a pesar de que esta envuelto por layouts que son client components
export default async function PricingPage() {

  const prices = await loadPrices()
  console.log(process.env.STRIPE_API_SECRET as string)

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
          <div className="flex-col sm:flex-row flex justify-center items-center gap-4">
            {prices.map((price) => (
              <div
                key={price.id}
                className="bg-primary-50 mb-2 flex-col p-5 s md:p-5 lg:p-7 space-y-5 shadow-md flex-1 max-w-64 sm:min-w-40 rounded-md"
              >
                <h3 className="text-primary-600 text-center text-xl font-bold underline">{`Plan ${price.nickname}`}</h3>
                <h2 className="font-bold text-center">
                  {/* {(price.unit_amount as number) / 100}€ */}
                  <Price price={(price.unit_amount as number) / 100} />
                </h2>
                <p className='text-center text-[14px] lg:text-[16px]'>{priceDescriptions[price.nickname?.toLowerCase() as keyof typeof priceDescriptions]}</p>
                <ButtonCheckout {...price} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        <ul className='w-fit'>
          <li><strong className='text-primary-600'>Silver</strong>: Ofrece una cobertura básica, permite tener hasta 10 proyectos y 6 quizzes.</li>
          <li><strong className='text-primary-600'>Gold</strong>: Ofrece una cobertura estándar de hasta 15 proyectos y 10 quizzes.</li>
          <li><strong className='text-primary-600'>Platinum</strong>: Ofrece una amplia cobertura con un máximo de hasta 20 proyectos y 15 quizzes.</li>
        </ul>
      </div>
      <p className='text-sm text-accent-danger-500 text-center'>*El plan gratuito está restringido a 5 proyectos y 3 quizzes</p>
    </div>
  );
}
