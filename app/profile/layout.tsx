import Redirect from '@/components/Redirect';
import AppLayout from '@/layouts/AppLayout';
import ProfileLayout from '@/layouts/ProfileLayout';
import React from 'react'

export default function Layout({children}: {children: JSX.Element}): JSX.Element {
  return (
    <>
      <AppLayout>
        <ProfileLayout>
            {children}
        </ProfileLayout>
        <Redirect />
      </AppLayout>
    </>
  );
}
