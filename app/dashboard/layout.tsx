import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Nav from "@/components/nav/Nav";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Nav />
      <Header />

      {children}
      <Footer />
    </section>
  );
}
