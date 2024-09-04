"use client"
import { useDeviceSize } from '@/hooks/useDeviceSize';
import React, { useRef, useState } from 'react'
import { whatInfo } from './whatCard.info';
import WhatCard from './WhatCard';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/20/solid';

export default function What() {
    const [width] = useDeviceSize()
    const [slideIndex, setSlideIndex] = useState(1)
  
    const swiperRef = useRef<SwiperType>();

  return (
    <section className="max-w-[1200px] mx-auto">
      {width > 865 ? (
        <div className="my-16 flex flex-col gap-14">
          <h2 className="text-center text-3xl font-bold font-lato">
            {whatInfo.title}
          </h2>
          <div className="grid grid-cols-1 md:flex gap-10 justify-center">
            {whatInfo.cards.map((card) => (
              <WhatCard key={card.name} {...card} />
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-[600px] mx-auto flex flex-col my-16u items-center justify-center relative">
          <h2 className="text-center text-3xl font-bold font-lato">
            {whatInfo.title}
          </h2>
          <div className="swiper-container-home ml-0 md:ml-0">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(e) => {
                setSlideIndex(e.activeIndex + 1);
              }}
            >
              {whatInfo.cards.map((card, index) => (
                <SwiperSlide key={index} className="text-center">
                  <div className="h-[450px] flex justify-center items-center">
                    <WhatCard key={card.name} {...card} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button
            className={`absolute left-10 top-1/2 z-10 hidden sm:block ${slideIndex === 1 && "disabled opacity-20"}`}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ArrowLeftCircleIcon className="w-12 h-12 text-primary-400 " />
          </button>
          <button
            className={`absolute right-10 top-1/2 z-10 hidden sm:block ${slideIndex === 3 && "disabled opacity-20"}`}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ArrowRightCircleIcon className="w-12 h-12 text-primary-400 " />
          </button>
        </div>
      )}
    </section>
  );
}
