import React from 'react'

export default function PaymentSuccess() {
  return (
    <div className="bg-primary-200 rounded-2xl h-[800px] flex items-center justify-center p-10">
      <div className='space-y-8 p-7 sm:p-10 justify-center items-center flex-col flex border-lg border-primary rounded-md'>
        <p className="text-center text-primary-900 headline2 font-bold ">
          Pago efectuado
        </p>
        <p className="text-gray-900">
          El pago se ha efectuado con éxito, ya puedes disfrutar de tu condición{" "}
          <span className="font-bold text-accent-500">premium</span> desde este
          momento.
        </p>
      </div>
    </div>
  );
}
