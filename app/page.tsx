"use client"
import { useToastSuccess } from "@/hooks/toast";
import DashboardView from "@/views/DashboardView";

// `app/page.tsx` is the UI for the `/` URL
export default function Page(): JSX.Element {

  useToastSuccess()
  return (

    <>
      <DashboardView />
    </>
  );
}


{/* <Nav /> */}
{/* <Header /> */}
{/* <Footer /> */}
