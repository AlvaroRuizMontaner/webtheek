import Link from 'next/link'
import React from 'react'

export type AuthLink = {
    text: string
    linkText: string
    href: string
}

type AuthLinksProps = {
    info: AuthLink[]
}

export default function AuthLinks({info}: AuthLinksProps) {
  return (
    <nav className="mt-6u flex flex-col space-y-2u body2">
      {info.map((link, index) => (
        <div key={index} className="text-gray-300 flex gap-1 justify-center">
          <span>{link.text}</span>
          <Link
            href={link.href}
            className="text-center font-bold text-accent-300"
          >
            {link.linkText}
          </Link>
        </div>
      ))}
    </nav>
  );
}
