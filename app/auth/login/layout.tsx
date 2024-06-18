import AuthLayout from '@/layouts/AuthLayout';
import React from 'react'

export default function Login({children}: {children: JSX.Element}): JSX.Element {
  return (
    <>
        <AuthLayout>
            {children}
        </AuthLayout>
    </>
  );
}