import NewPasswordToken from '@/components/auth/NewPasswordToken'
import NewPasswordForm from '@/components/auth/NewPasswordForm'
import React, { useState } from 'react'
import { ConfirmToken } from '@/types'

export default function NewPasswordView() {

  const [token, setToken] = useState<ConfirmToken["token"]>("")
  const [isValidToken, setIsValidToken] = useState(false)


  return (
    <>
      <h1 className="headline2 font-black text-white">Restablecer Password</h1>
      <p className="text-2xl font-light text-white mt-5">
        Introduce el codigo que recibiste {''}
        <span className=" text-secondary font-bold"> por email</span>
      </p>
    
      {!isValidToken ? (
        <NewPasswordToken setToken={setToken} token={token} setIsValidToken={setIsValidToken} />
      ) : (
        <NewPasswordForm token={token} />
      )}

    </>
  )
}