import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";

// `app/page.tsx` is the UI for the `/` URL
export default function Page(): JSX.Element {
  return (
    <>
      <AppLayout>
        <section className=" max-w-screen-2xl mx-auto mt-10 p-5">
          <DashboardView />
        </section>
      </AppLayout>
      

      <footer className="py-5">
        <p className="text-center">
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </footer>

    </>
  );
}


{/* <Nav /> */}
{/* <Header /> */}
{/* <Footer /> */}
