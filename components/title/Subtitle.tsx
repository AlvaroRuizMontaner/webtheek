import { ReactNode } from "react"

type SubtitleProps = {
    highlight: string
    text: string
    children?: ReactNode
}

export default function Subtitle({highlight, text, children}: SubtitleProps) {
  return (
    <>
      {!children ? (
        <p className="body1 font-light text-white my-6u">
          {text} {""}
          <span className=" text-accent-300 font-bold">{highlight}</span>
        </p>
      ) : (
        children
      )}
    </>
  );
}
