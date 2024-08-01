import React from "react";
import { Seo } from "./seo";

type SeoHome = Record<"index", Seo>;

export const seoHome: SeoHome = {
  index: {
    title: (key: number) => (
      <title key={key}>
        Webtheek: Tu biblioteca de recursos web
      </title>
    ),
    description: (key: number) => (
      <meta
        key={key}
        name="description"
        content="Crea tus proyectos, tests, curriculum y más, todo ello lo puedes hacer aquí"
      />
    ),
    canonical: (key: number) => (
      <link key={key} rel="canonical" href="https://webtheek.com/" />
    ),
    metas: (key: number) => (
      <React.Fragment key={key}>
        <meta
          property="og:title"
          content="Webtheek: Biblioteca de recursos web"
        />
        <meta property="og:site_name" content="Webtheek" />
        <meta property="og:url" content="https://webtheek.com/" />
        <meta
          property="og:description"
          content="Crea tus proyectos, tests, curriculum y más, todo ello lo puedes hacer aquí"
        />
        <meta property="og:type" content="website" />
        <meta property="twitter:site" content="@masmovil" />
        <meta property="twitter:creator" content="@masmovil" />
        <meta
          property="twitter:description"
          content="Crea tus proyectos, tests, curriculum y más, todo ello lo puedes hacer aquí"
        />
        <meta
          property="twitter:title"
          content="Webtheek: Biblioteca de recursos web"
        />
        <meta property="twitter:card" content="summary" />
        <meta
          property="og:image"
          content="https://webtheek.com/logo.png"
        />
        <meta
          property="twitter:image"
          content="https://webtheek.com/logo.png"
        />
        <meta property="og:locale" content="ES" />
      </React.Fragment>
    ),
    schema: (key: number) => (
      <script
        key={key}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org/",
            "@type": "Organization",
            url: "https://webtheek.com/",
            name: "Webtheek",
            logo: "logo.png",
            alternatename:
              "Webtheek: Biblioteca de recursos web",
            description:
              "Crea tus proyectos, tests, curriculum y más, todo ello lo puedes hacer aquí",
/*             contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "900622996",
                areaServed: "ES",
                contactOption: "TollFree",
                contactType: "customer service",
              },
            ],
            sameAs: [
              "https://www.twitter.com/masmovil",
              "https://www.instagram.com/masmovil/",
              "https://www.facebook.com/masmovil",
            ], */
          }),
        }}
      />
    ),
  },
};
