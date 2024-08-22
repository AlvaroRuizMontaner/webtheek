import NewPasswordToken from '@/components/auth/NewPasswordToken'
import NewPasswordForm from '@/components/auth/NewPasswordForm'
import React, { useState } from 'react'
import { ConfirmToken } from '@/types'
import Title from '@/components/title/Title'
import Subtitle from '@/components/title/Subtitle'

export default function NewPasswordView() {

  const [token, setToken] = useState<ConfirmToken["token"]>("")
  const [isValidToken, setIsValidToken] = useState(false)


  return (
    <>
      <Title>Restablecer Password</Title>
      <Subtitle
        text={"Introduce el código que recibiste"}
        highlight="por email"
      />

      {!isValidToken ? (
        <NewPasswordToken
          setToken={setToken}
          token={token}
          setIsValidToken={setIsValidToken}
        />
      ) : (
        <NewPasswordForm token={token} />
      )}
    </>
  );
}