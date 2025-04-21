import React from 'react'
import "./price.scss"

const formatPrice = (price: number): string => {
    return price.toLocaleString("es-ES", {
      minimumFractionDigits: 2
})}

type PriceProps = {
    price?: number
    haveIva?: boolean
}

export default function Price({price=10, haveIva=true}: PriceProps) {
    const pagoUnico = true
    const ivaText = "iva Inc."
    const subtitle = "Pago único"
  return (
    <section className={`flex flex-col items-center __pop`}>
    <div className='flex gap-1 min-w-max'>
      <div className={`flex items-center m-0 body1 font-bold line-height-1 font-orbitron price-number`}>
        {Number.isInteger(price) ? price : formatPrice(price)}
      </div>
      <section className='flex flex-col ml-[3px]'>
        <p className='m-0 flex items-center line-height-1'>
          <b className="font-bold text-[24px]">€</b>
          {!pagoUnico && <b className={"text-[14px]"}>/mes</b>}
        </p>
        <p className={"text-[10px] line-height-1"}>{pagoUnico && <b>{subtitle}</b>}</p>
        {haveIva && <p className={"text-[10px] text-start"}>{ivaText}</p>}
      </section>
    </div>
  </section>
  )
}
