import Footer from "@/components/footer/Footer";


export default function Bedroom({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <section className="min-h-screen flex flex-col">
      {/* <Nav /> */}
      {/* <Header /> */}
      {children}
      <Footer />
    </section>
  );
}
