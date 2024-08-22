import { ReactNode } from "react"

type SubtitleProps = {
    highlight: string
    text: string
    children?: ReactNode
    variant?: string
}

export default function Subtitle({highlight, text, children, variant="light"}: SubtitleProps) {
  return (
    <>
      {!children ? (
        <p className={`body1 font-light my-6u ${variant === "light" ? "text-white" : "text-gray-700"}`}>
          {text} {""}
          <span className={`font-bold ${variant === "light" ? "text-accent-300" : "text-accent-500"}`}>{highlight}</span>
        </p>
      ) : (
        children
      )}
    </>
  );
}
