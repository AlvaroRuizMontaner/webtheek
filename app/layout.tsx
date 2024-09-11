import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.scss";
import Provider from "@/utils/Providers";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Webtheek: Tu biblioteca de recursos web",
  description: "Crea tus proyectos, tests, curriculum y más, todo ello lo puedes hacer aquí",
  icons: {
    icon: "/logosinborde.png",
  },
  openGraph: {
    images: ["https://webtheek.com/"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0" />
      </head>
      <body className={`${poppins.className} min-h-screen flex flex-col body3 bg-gray-100`}>
        <Provider>
            {children}
        </Provider>
      </body>
    </html>
  );
}
