import React from 'react'
import "./banner-home.scss"

type BannerHomeProps = {
    titles: {
      text: string
    }[]
/*     ctas : {
      text: string,
      href: string
    }[] */
}

export default function BannerHome({titles, /* ctas */}: BannerHomeProps) {
  return (
    <div className="contenedor-banner-home">
      <section className="banner-home w-full h-full">
        <div className="container grid-container h-full">
          <article className="w-fit h-full flex flex-col justify-end md:justify-center">
            <div className="content-banner p-6u sm:p-8u rounded-lg space-y-6u">
              <ul className="space-y-6u list-disc pl-5 text-lg text-white">
                {titles.map((title, index) => (
                  <li className="" key={"title" + index}>
                    {title.text}
                  </li>
                ))}
              </ul>
{/*               <div className="flex flex-col sm:flex-row gap-4u justify-center">
                {ctas.map((cta, index) => (
                  <Button
                    key={index + "cta"}
                    text={cta.text}
                    href={cta.href}
                    variant="outline"
                  />
                ))}
              </div> */}
            </div>
          </article>
          <article></article>
        </div>
      </section>
    </div>
  );
}
