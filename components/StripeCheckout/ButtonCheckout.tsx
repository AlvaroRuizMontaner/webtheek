"use client"
import { createSession } from '@/services/StripeAPI'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

type ButtonCheckoutProps = {
  id: string
  nickname: string | null
}

export default function ButtonCheckout({id, nickname}: ButtonCheckoutProps) {

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
    <button
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
    </button>
  );
}
