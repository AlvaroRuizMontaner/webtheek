"use client"
import { useToastSuccess } from "@/hooks/toast";
import CurriculumsView from "@/views/curriculums/CurriculumsView";

// `app/page.tsx` is the UI for the `/` URL
export default function Page(): JSX.Element {

  useToastSuccess()
  return (

    <>
      <CurriculumsView />
    </>
  );
}