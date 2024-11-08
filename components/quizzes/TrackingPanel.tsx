import { useSolvableQuizContext } from '@/contexts/solvableQuizContext';
import { Question } from '@/types/quiz';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import "./quizzes.scss"

export default function TrackingPanel() {
    const { state } = useSolvableQuizContext();
    const questions = state as Question[];  // Aserción de tipo aquí
    const path = usePathname()

  return (
    <div className="sticky h-0 w-0 right-0 top-40 tracker">
      <div className="absolute -top-40 right-0 h-36 w-[172px] bg-white border-2 border-primary-400 flex flex-wrap gap-2 shadow-md rounded-md p-2">
        {questions.map((_, questionIndex) => (
          <div className='h-fit' key={`track${questionIndex}`}>
            <Link
              href={`${path}#trackId${questionIndex}`}
            >
              <span className="bg-primary-100 h-6 w-6 rounded-sm flex justify-center items-center">
                {questionIndex + 1}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
