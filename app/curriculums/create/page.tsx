"use client"
import { useToastSuccess } from "@/hooks/toast";
import CreateCurriculumView from "@/views/curriculums/CreateCurriculumView";

// `app/page.tsx` is the UI for the `/` URL
export default function Page(): JSX.Element {

  useToastSuccess()
  return (

    <>
      <CreateCurriculumView />
    </>
  );
}