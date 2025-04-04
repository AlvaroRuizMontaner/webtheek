import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.scss";
import Provider from "@/utils/Providers";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'], // Asegúrate de incluir todos los pesos que necesitas
});

export const metadata: Metadata = {
  title: "Webtheek: Tu biblioteca de recursos web",
  description: "Crea tus proyectos, tests, curriculum y más, todo ello lo puedes hacer aquí",
  icons: {
    icon: "/logosinborde.png",
    other: {
      rel: 'stylesheet',
      url: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0",
      precedence: "default"
    },
  },
  openGraph: {
    images: [
      {
        url: "https://webtheek.com/logosinborde.png",
        width: 1200,  // Opcional, pero recomendable
        height: 630,  // Opcional, pero recomendable
        alt: "Webtheek logo",  // Opcional pero recomendado
      }
    ],
  }
} as unknown as Metadata // Solucion temporal al tipado de precedence

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html className="" lang="en">
  {/* Eliminado por estar obsoleto, movido a metadata */}
  {/* <head><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0" /></head> */}
      <body className={`${poppins.className} min-h-screen flex flex-col body3 bg-gray-100`}>
        <Provider>
            {children}
        </Provider>
      </body>
    </html>
  );
}
