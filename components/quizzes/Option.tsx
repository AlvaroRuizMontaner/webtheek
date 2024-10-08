import { OptionType } from '@/types/quiz';

type OptionProps = {
    option: OptionType
    questionIndex: number
}

export default function Option({option, questionIndex}:OptionProps) {
  return (
    <div
      className="flex gap-2 items-center"
    >
      <input
        type="radio"
        name={"question" + questionIndex}
        id={"question" + questionIndex}
      />
      <div>{option.text}</div>
    </div>
  );
}
