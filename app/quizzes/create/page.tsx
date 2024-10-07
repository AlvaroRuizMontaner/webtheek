"use client"
import { useToastSuccess } from "@/hooks/toast";
import CreateQuizView from "@/views/quizzes/CreateQuizView";

// `app/page.tsx` is the UI for the `/` URL
export default function Page(): JSX.Element {

  useToastSuccess()
  return (

    <>
      <CreateQuizView />
    </>
  );
}