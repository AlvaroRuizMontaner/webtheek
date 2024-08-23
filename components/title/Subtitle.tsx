type SubtitleProps = {
    highlight?: string
    text: string
    variant?: string
}

export default function Subtitle({highlight, text, variant="light"}: SubtitleProps) {
  return (
    <p className={`body1 font-light my-6u ${variant === "light" ? "text-white" : "text-gray-700"}`}>
      {text && text} {""}
      {highlight && <span
        className={`font-bold ${variant === "light" ? "text-accent-300" : "text-accent-500"}`}
      >
        {highlight}
      </span>}
    </p>
  );
}
