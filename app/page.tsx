import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import Nav from "@/components/nav/Nav";

// `app/page.tsx` is the UI for the `/` URL
export default function Page(): JSX.Element {
  return (
    <div>
      <Nav />
      <Header />
      <div>home</div>
      <Footer />
    </div>
  );
}
