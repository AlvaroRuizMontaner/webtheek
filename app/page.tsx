import HomeLayout from "@/layouts/HomeLayout";
import DashboardView from "@/views/DashboardView";

// `app/page.tsx` is the UI for the `/` URL
export default function Page(): JSX.Element {

  //useToastSuccess()
  return (

    <>
    <HomeLayout>
      <DashboardView />
    </HomeLayout>
    </>
  );
}


{/* <Nav /> */}
{/* <Header /> */}
{/* <Footer /> */}
