"use client"
import { useToastSuccess } from "@/hooks/toast"
import QuizzesView from "@/views/quizzes/QuizzesView";

// `app/page.tsx` is the UI for the `/` URL
export default function Page(): JSX.Element {

  useToastSuccess()
  return (

    <>
      <QuizzesView />
    </>
  );
}