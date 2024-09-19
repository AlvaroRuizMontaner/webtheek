import React from 'react'
import { ZigzagItem } from './zigzag.info'
import Image from 'next/image'

type ZigzagProps = {
    info: ZigzagItem[]
}

function calculateDirection(index: number) {
    return index % 2
}

export default function Zigzag({info}: ZigzagProps) {
  return (
    <div className='space-y-24u my-24u'>
    {info.map((item, index) => {
        return (
          <div key={item.title} className="h-[400px]">
            <section className={`flex md:flex h-full gap-24u ${calculateDirection(index) ? "flex-row" : "flex-row-reverse" }`}>
              <div className="relative flex-1 h-full max-w-[400px]">
                <Image fill={true} src={item.image} alt="" className='rounded-xl' />
              </div>
              <div className="h-full flex-1 flex items-center md:leading-8 lg:leading-10">{item.text}</div>
            </section>
          </div>
        );
    })}
    </div>
  );
}
