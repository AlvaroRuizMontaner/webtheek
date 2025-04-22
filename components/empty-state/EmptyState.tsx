import React from 'react'
import "./empty-state.scss"

type EmptyStateProps = {
    text: string
}

export default function EmptyState({text}: EmptyStateProps) {
  return (
    <div className='w-full h-full flex flex-col gap-4u bg-primary-200'>
      <div className="empty-state flex-1"></div>
      <div className='text-center text-xl'>{text}</div>
    </div>
  );
}
