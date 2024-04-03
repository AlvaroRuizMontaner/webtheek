import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import Nav from "@/components/nav/Nav";

export default function SigninLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <section className="min-h-screen flex flex-col">
      <Nav />
      <Header />
      {children}
      <Footer />
    </section>
  );
}
