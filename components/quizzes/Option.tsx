import { OptionType } from '@/types/quiz';

type OptionProps = {
    option: OptionType
    optionIndex: number
    correctIndex: string
}

export default function Option({option, optionIndex, correctIndex}:OptionProps) {
  return (
    <div
      className={`flex gap-2 items-center min-h-[42px]  ${optionIndex.toString() === correctIndex ? "bg-accent-100" : "bg-gray-100"}`}
    >
      <div className={`px-2`}>{option.text}</div>
    </div>
  );
}
