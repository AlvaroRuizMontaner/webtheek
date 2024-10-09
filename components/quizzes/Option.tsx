import { OptionType } from '@/types/quiz';

type OptionProps = {
    option: OptionType
    /* questionIndex: number */
    optionIndex: number
    correctIndex: string
}

export default function Option({option, /* questionIndex, */ optionIndex, correctIndex}:OptionProps) {
  return (
    <div
      className={`flex gap-2 items-center min-h-[42px]  ${optionIndex.toString() === correctIndex ? "bg-accent-100" : "bg-gray-100"}`}
    >
{/*       <input
        type="radio"
        name={"question" + questionIndex}
        id={"question" + questionIndex}
      /> */}
      <div className={`px-2`}>{option.text}</div>
    </div>
  );
}
