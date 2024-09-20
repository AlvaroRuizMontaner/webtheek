import React from 'react'
import { ZigzagItem } from './zigzag.info'
import Image from 'next/image'
import "./zigzag.scss"
import Title from '../title/Title'

type ZigzagProps = {
    info: ZigzagItem[]
}

function isEven(index: number) {
    return index % 2 === 0
}

export default function Zigzag({info}: ZigzagProps) {
  return (
    <div className=''>
    {info.map((item, index) => {
        return (
          <section key={item.title} className={`py-8u md:py-12u lg:py-24u ${isEven(index) ? "bg-primary-100" : "bg-accent-100"}`}>
            <div
              key={item.title}
              className="md:h-[400px] body2 md:body3 container-element"
              /* className="md:min-h-[400px] lg:h-[400px] body2 md:body3 container-element md:flex flex-col justify-center" alternativa de alturas variables */
            >
              <div
                className={`flex flex-col md:flex-row h-full gap-12u lg:gap-24u ${isEven(index) ? "md:flex-row-reverse" : "md:flex-row"}`}
              >
                <div className="relative image-item flex-1 flex-basis-[80%] md:min-w-[400px] md:max-w-[400px]">
                  <Image
                    fill={true}
                    src={item.image}
                    alt=""
                    className="rounded-xl object-contain md:object-cover"
                  />
                </div>
                <div className="h-full flex-1 flex gap-4 flex-col justify-center md:leading-6 lg:leading-8">
                  <Title as="h3" className='text-primary-500 headline4'>{item.title}</Title>
                  <div>{item.text}</div>
                </div>
              </div>
            </div>
          </section>
        );
    })}
    </div>
  );
}
