import React from 'react'

export default function DonationSuccess() {
  return (
    <div className="bg-primary-200 rounded-2xl h-[800px] flex items-center justify-center p-10">
      <div className='space-y-8 p-7 sm:p-10 justify-center items-center flex-col flex border-lg border-primary rounded-md'>
        <p className="text-center text-primary-900 headline2 font-bold ">
          Donación completada
        </p>
        <p className="text-gray-900">
          La donación se ha efectuado con éxito, gracias por aportar tu granito de arena para que{" "}
          <span className="font-bold text-accent-500">webtheek</span> siga mejorando.
        </p>
      </div>
    </div>
  );
}
