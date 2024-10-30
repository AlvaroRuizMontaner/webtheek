import React from 'react'
import HomeLayout from "@/layouts/HomeLayout";

export default function ProjectLayout({children}: {children: JSX.Element}): JSX.Element {
  return (
    <>
      <HomeLayout>
        {children}
      </HomeLayout>
    </>
  );
}