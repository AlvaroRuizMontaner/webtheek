import AppLayout from '@/layouts/AppLayout';
import React from 'react'

export default function ProjectLayout({children}: {children: JSX.Element}): JSX.Element {
  return (
    <>
      <AppLayout>
        {children}
      </AppLayout>
    </>
  );
}
