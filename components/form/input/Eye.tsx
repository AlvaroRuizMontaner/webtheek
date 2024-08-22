import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import React, { SetStateAction } from 'react'

type EyeProps = {
    showPass: boolean
    setShowPass: (value: SetStateAction<boolean>) => void
}

export default function Eye({showPass, setShowPass}: EyeProps) {
  return (
    <div>
      {showPass && (
        <span
          onClick={() => setShowPass(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 inline-block cursor-pointer"
        >
          <EyeIcon className="w-8 h-8 text-gray-500 " />
        </span>
      )}
      {!showPass && (
        <span
          onClick={() => setShowPass(true)}
          className="absolute right-4 top-1/2 -translate-y-1/2 inline-block cursor-pointer"
        >
          <EyeSlashIcon className="w-8 h-8 text-gray-500 " />
        </span>
      )}
    </div>
  );
}
