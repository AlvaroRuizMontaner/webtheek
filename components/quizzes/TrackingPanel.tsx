import { useSolvableQuizContext } from '@/contexts/solvableQuizContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import "./quizzes.scss"
import { QuestionWithSelectedIndex } from '@/views/quizzes/SolvableQuizView';

  function trackQuestion(selectedIndex: string, correctIndex: string) {
    return selectedIndex.toString() === correctIndex.toString() ? "bg-accent-200" : "bg-accent-danger-200"
  }

  function checkAnswer(selectedIndex: string) {
    return selectedIndex ? "bg-blue-300" : "bg-gray-200"
  }

export default function TrackingPanel() {
    const { state } = useSolvableQuizContext();
    const questions = state as QuestionWithSelectedIndex[];  // Aserción de tipo aquí
    const path = usePathname()

  return (
    <div className="tracker">
      <div className="tracker-content bg-white border-2 border-primary-400 gap-2 shadow-md rounded-md p-2">
        {questions.map((question, questionIndex) => (
          <div className='h-fit' key={`track${questionIndex}`}>
            <Link
              scroll={true}
              href={`${path}#trackId${questionIndex}`}
            >
              <span className={`h-6 w-6 rounded-sm flex justify-center items-center ${question.isSubmit ? trackQuestion(question.selectedIndex, question.correctIndex) : checkAnswer(question.selectedIndex)}`}>
                {questionIndex + 1}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
