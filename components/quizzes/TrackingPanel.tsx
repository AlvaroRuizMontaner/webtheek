import { useSolvableQuizContext } from '@/contexts/solvableQuizContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import "./quizzes.scss"
import { Question } from '@/types/quiz';
import QuizTimer from './QuizTimer';

  function trackQuestion(selectedIndex: string, correctIndex: string) {
    return selectedIndex.toString() === correctIndex.toString() ? "bg-accent-200" : "bg-accent-danger-200"
  }

  function checkAnswer(selectedIndex: string) {
    return selectedIndex ? "bg-blue-300" : "bg-gray-200"
  }

export default function TrackingPanel() {
    const { state } = useSolvableQuizContext();
    const questions = state.questions as Question[];  // Aserción de tipo aquí
    const path = usePathname()

  return (
      <div className="tracker flex sm:flex-col gap-2">
        <section className="bg-white border-2 rounded-md border-primary-400 shadow-md p-2 gap-2">
          {questions.map((question, questionIndex) => (
            <div className="h-fit" key={`track${questionIndex}`}>
              <Link scroll={true} href={`${path}#trackId${questionIndex}`}>
                <span
                  className={`h-6 w-6 font-bold rounded-md flex justify-center items-center ${question.isSubmit ? trackQuestion(question.selectedIndex as string, question.correctIndex) : checkAnswer(question.selectedIndex as string)}`}
                >
                  {questionIndex + 1}
                </span>
              </Link>
            </div>
          ))}
        </section>
        <section className="bg-white w-fit border-2 rounded-md border-primary-400 shadow-md p-2 sm:p-1 ml-auto">
          <QuizTimer />
        </section>
      </div>
  );
}
