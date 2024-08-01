"use client"
import { useToastSuccess } from "@/hooks/toast"
import ProjectsView from "@/views/projects/ProjectsView";

// `app/page.tsx` is the UI for the `/` URL
export default function Page(): JSX.Element {

  useToastSuccess()
  return (

    <>
      <ProjectsView />
    </>
  );
}


{/* <Nav /> */}
{/* <Header /> */}
{/* <Footer /> */}