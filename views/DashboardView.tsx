import { renderPageSeo, seoHome } from '@/seo'
import WhatCard from '@/components/what/WhatCard'
import { whatInfo } from '@/components/what/whatCard.info';
import Head from 'next/head'
import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { useDeviceSize } from '@/hooks/window';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/20/solid';


export default function DashboardView() {

  const [width] = useDeviceSize()
  const [slideIndex, setSlideIndex] = useState(1)

  const swiperRef = useRef<SwiperType>();


  return (
    <>
      <Head>{renderPageSeo(seoHome, "index")}</Head>
      <div className="space-y-16 mb-10 mt-4 divide-y-2">
        <section className='flex flex-col mx-auto rounded max-w-[1200px]'>
          <h1 className="text-center headline1 font-bold bg-primary-400 text-white">¿Qué es Webtheek?</h1>

          <div className="flex justify-center p-4 bg-white">
            <h2 className="text-center body1">
              {" "}
              Webtheek es una plataforma que aspira en el futuro a ser una biblioteca de
              recursos web de todo tipo, una webteca.
            </h2>
          </div>
        </section>

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
            <div className="max-w-[600px] mx-auto flex items-center justify-center relative">
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
      </div>
    </>
  );
}
