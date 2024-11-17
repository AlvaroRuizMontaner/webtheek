"use client"
import { createSession } from '@/services/StripeAPI'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'
import SubmitInput from '../form/input/SubmitInput'

type ButtonCheckoutProps = {
  id: string
  nickname: string | null
  unit_amount: number | null
  text?: string
}

export default function ButtonCheckout({id, unit_amount, nickname, text="Comprar"}: ButtonCheckoutProps) {

  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: createSession,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        toast.success(data)
        router.push(data.url)
    }
  })

  return (
    <div
      className=" shadow-lg rounded-lg"
      onClick={() => {
        mutate({id, planType: nickname ?? "default name", unit_amount: unit_amount ?? 400})
      }}
  >
    <SubmitInput className="" isLoading={isPending} value={text} />
  </div>
/*     <button
    className="bg-sky-500 text-white px-4 py-2 rounded"
    onClick={async () => {
        const res = await fetch('/api/checkout', {
          method: "POST",
          body: JSON.stringify({
            id,
            name: nickname
          }),
          headers: {
            'content-Type': 'application/json'
          }
        })
        const data = await res.json()
        window.location.href = data.url
      }}
    >
      Buy
    </button> */
  );
}
