import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Provider from "@/utils/Providers";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Webtheek",
  description: "The tools site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={`${poppins.className} min-h-screen bg-gray-100`}>
        <Provider>
            {children}
        </Provider>
      </body>
    </html>
  );
}
