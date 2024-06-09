import AppLayout from "@/layouts/AppLayout";

// `app/page.tsx` is the UI for the `/` URL
export default function Page(): JSX.Element {
  return (
    <section className="min-h-screen">
      {/* <Nav /> */}
      {/* <Header /> */}
      <AppLayout>
        <span>Hola Mundo</span>
      </AppLayout>
      {/* <Footer /> */}
    </section>
  );
}
