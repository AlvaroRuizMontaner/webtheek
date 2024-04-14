import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import Offer from "@/components/offer/Offer";

// `app/page.tsx` is the UI for the `/` URL
export default function Page(): JSX.Element {
  return (
    <section className="min-h-screen flex flex-col">
      {/* <Nav /> */}
      <Header />
      <div className="container flex-1">
        <Offer />
      </div>
      <Footer />
    </section>
  );
}
