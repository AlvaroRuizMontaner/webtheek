import { slideCardInfo } from '@/components/team/SlideCard/SlideCardInfo';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React from 'react'

type RadioPermissionInputProps = {
    className?: string;
    index: number;
    name: string;
    selectState: number;
    title: string;
    onChange: (e: any) => void
}

export default function RadioPermissionInput({className="", index, name, selectState, title, onChange}: RadioPermissionInputProps) {
  return (
    <div
      className={`${className} cursor-pointer ${selectState === index ? "bg-accent-100" : "bg-primary-100"}`}
    >
      <label htmlFor={name + index} className="flex flex-col h-full relative cursor-pointer">
        <input
          type="radio"
          name={name}
          value={index}
          id={name + index}
          className="absolute opacity-0"
          onChange={onChange}
        />
        <h4 className="text-center">
          <span className="border-b border-b-primary-700">{title}</span>
        </h4>
        <div className="flex flex-col items-center justify-center flex-1 space-y-4u">
          <div className='w-max space-y-4u'>
            {slideCardInfo
              .filter((_, filterIndx) => filterIndx + 1 <= index)
              .map((msg, index) => (
                <p key={index} className="flex items-center">
                  <span className="w-8 h-8 flex items-center justify-center">
                    <CheckIcon className="w-6 h-6 text-accent-700 " />
                  </span>
                  <span>{msg}</span>
                </p>
              ))}
            {slideCardInfo
              .filter((_, filterIndx) => filterIndx + 1 > index)
              .map((msg, index) => (
                <p key={index} className="flex items-center">
                  <span className="w-8 h-8 flex items-center justify-center">
                    <XMarkIcon className="w-8 h-8 text-accent-danger-600" />
                  </span>
                  <span>{msg}</span>
                </p>
              ))}
          </div>
        </div>
      </label>
    </div>
  );
}
