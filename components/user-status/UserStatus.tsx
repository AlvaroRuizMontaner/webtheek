"use client"
import { useAuth } from '@/hooks/useAuth'
import React from 'react'

export default function UserStatus() {
    const {data, isLoading} = useAuth()

    if(data && !isLoading) return (
      <div className="space-y-12u">
        <h1 className="headline1 font-bold text-center text-primary-800">
          Estado de la cuenta
        </h1>
        <div className='space-y-4u'>
          <p className="text-center">
            Hola <strong>{data.name}</strong> tu cuenta tiene actualmente el
            status de <strong>{data.planType}</strong>.
          </p>
          <p className="text-center">
            Si deseas pasar al siguiente nivel considera nuestros planes de
            precios.
          </p>
        </div>
      </div>
    );

}
