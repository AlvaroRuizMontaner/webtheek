import NewPasswordToken from '@/components/auth/NewPasswordToken'
import NewPasswordForm from '@/components/auth/NewPasswordForm'
import React, { useEffect, useState } from 'react'
import { ConfirmToken } from '@/types'

export default function NewPasswordView() {

  const [token, setToken] = useState<ConfirmToken["token"]>("")
  const [isValidToken, setIsValidToken] = useState(false)


  return (
    <>
      <h1 className="text-5xl font-black text-white">Restablecer Password</h1>
      <p className="text-2xl font-light text-white mt-5">
        introduce el codigo que recibiste {''}
        <span className=" text-fuchsia-500 font-bold"> por email</span>
      </p>
    
      {!isValidToken ? (
        <NewPasswordToken setToken={setToken} token={token} setIsValidToken={setIsValidToken} />
      ) : (
        <NewPasswordForm token={token} />
      )}

    </>
  )
}