import Link from 'next/link'
import React from 'react'
import "./button.scss"

type Props = {
    href?: string
    variant?: "normal" | "outline"
    text: string
    className: string
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

/*                 " text-xl
                font-bold cursor-pointer transition-colors flex justify-center mt-5 shadow-inset" */

type ActionButtonProps = Pick<Props, "text" | "className" | "onClick">
type LinkButtonProps = Pick<Props, "text" | "href" | "className">
type ButtonProps = Omit<Props, "className">

const LinkButton = ({text, className, href}: LinkButtonProps): JSX.Element => {
    return (
      <nav>
        <Link
          className={className}
          href={href!}
        >
          {text}
          <div className='corner'></div>
        <div className='corner'></div>
        <div className='corner'></div>
        <div className='corner'></div>
        </Link>
      </nav>
    );
}

const ActionButton = ({text, className, onClick}: ActionButtonProps): JSX.Element => {

    return (
      <div className={className} onClick={onClick}>
        <span>
          {text}
        </span>
        <div className='corner'></div>
        <div className='corner'></div>
        <div className='corner'></div>
        <div className='corner'></div>
      </div>
    );
}

export default function Button({href, text, variant="normal", onClick}: ButtonProps) {

    
    let className = "relative select-none cut-button __press-drop w-full text-xl min-w-full sm:min-w-fit sm:max-w-fit bg-primary-200 hover:bg-primary-400 font-bold text-primary-900 cursor-pointer flex justify-center items-center transition-colors duration-300"
    if(variant === "outline") className += " " + "bg-white hover:!bg-primary-100 border-2 border-primary-900 !text-primary-900 font-bold shadow-inset"

  return (
    <>
      {href ? (
        <LinkButton href={href} text={text} className={className} />
      ) : (
        <ActionButton text={text} className={className} onClick={onClick} />
      )}
    </>
  );
}
