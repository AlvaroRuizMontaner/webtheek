import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";

// `app/page.tsx` is the UI for the `/` URL
export default function Page(): JSX.Element {

  //useToastSuccess()
  return (

    <>
    <AppLayout>
      <DashboardView />
    </AppLayout>
    </>
  );
}


{/* <Nav /> */}
{/* <Header /> */}
{/* <Footer /> */}
