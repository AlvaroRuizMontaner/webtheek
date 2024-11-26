import React from 'react'
import { Section } from './templates.info'
import "./curriculum.css"

type SeccionCuerpoCentralProps = {
    title: Section[0]
    info: Section[1]
}

export default function SeccionCuerpoCentral({title, info}: SeccionCuerpoCentralProps) {
    console.log(title)
  return (
    <div className="flex flex-col seccion-cuerpo-central">
      {title && <div className="flex gap-2 items-center relative -translate-x-8">
        <div className="bg-blue-500 h-8 w-8 rounded-full flex items-center justify-center">
          <span className={`text-white ${title.classNameIcon}`}>
            {title.nameIcon}
          </span>
        </div>
        <h2 className="text-xl text-indigo-700 font-bold uppercase">
          {title.text}
        </h2>
      </div>}

      {info && <div className="subseccion-info-cuerpo-central">
        {info.map((el, index) => (
            <div className="subseccion-cuerpo-central" key={index}>
                {el[0] && <p className="font-bold text-blue-900">{el[0]}</p>} {/* main */}

                {el[1] && (
                <div className="flex justify-between text-gray-400 text-sm">
                    <p className=" ">{el[1].detail}</p>
                    <p>{el[1].date}</p>
                </div>)}

                {el[2] && (
                <ul className=" text-[14px] list-disc">
                    {el[2].map((subEl, subIndex) => (
                    <li key={"" + index + subIndex}>{subEl}</li>
                    ))}
                </ul>
                )}
            </div>
        ))}
      </div>}
    </div>
  );
}
