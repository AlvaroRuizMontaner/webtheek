"use client"

import { generatePDF } from "@/services/PDFAPI";
import { getHtmlWithStyles } from "@/utils/generateHtml";
import { useMutation } from "@tanstack/react-query";
import { useRef, /* useState */ } from "react";

export default function Page(): JSX.Element {
  /* const [pdf, setPdf] = useState(false) */
  const { mutate } = useMutation({
    mutationFn: generatePDF,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      console.log("Exito");
    },
  });

  const referrer = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    const html: string | undefined = getHtmlWithStyles(referrer);
    if (html) {
      console.log(html);
      mutate(html);
      /* setPdf(true) */
    }
  };

  return (
    <>
    {/* El referrer se ha colodado en un ancestro extra porque de otro modo no cogia el background-color */}
      <div ref={referrer}>
        <div className=" bg-yellow-200 min-h-screen">
          <div className="space-y-12 max-w-2xl min-h-[200vh] bg-yellow-200  mx-auto p-12">
            <h1 className="headline1 font-black text-black text-center underline">
              Hola a todos esto es una prueba que te cagas
            </h1>
            <section className=" flex justify-around text-white font-bold">
              <div className="w-32 h-32 bg-teal-300 flex items-center justify-center border-8 rounded-full border-white">
                <p className="text-center">Card Name</p>
              </div>
              <div className="w-32 h-32 bg-indigo-600 flex items-center justify-center border-8 rounded-full border-white">
                <p className="text-center">Card Name</p>
              </div>
              <div className="w-32 h-32 bg-blue-600 flex items-center justify-center border-8 rounded-full border-white">
                <p className="text-center">Card Name</p>
              </div>
            </section>
            <div className="text-black text-center shadow-1 bg-[#c7cbd1] p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              modi natus, omnis nemo cum animi, accusamus veritatis dolor
              laborum quis magnam libero, maiores quisquam. Dignissimos
              voluptate quas et repudiandae culpa?
            </div>
            <div className="text-black text-center shadow-1 bg-[#c7cbd1] p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              modi natus, omnis nemo cum animi, accusamus veritatis dolor
              laborum quis magnam libero, maiores quisquam. Dignissimos
              voluptate quas et repudiandae culpa?
            </div>
            <div className="text-black text-center shadow-1 bg-[#c7cbd1] p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              modi natus, omnis nemo cum animi, accusamus veritatis dolor
              laborum quis magnam libero, maiores quisquam. Dignissimos
              voluptate quas et repudiandae culpa?
            </div>
            <div className="text-black text-center shadow-1 bg-[#c7cbd1] p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              modi natus, omnis nemo cum animi, accusamus veritatis dolor
              laborum quis magnam libero, maiores quisquam. Dignissimos
              voluptate quas et repudiandae culpa?
            </div>
            <div className="text-black text-center shadow-1 bg-[#c7cbd1] p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              modi natus, omnis nemo cum animi, accusamus veritatis dolor
              laborum quis magnam libero, maiores quisquam. Dignissimos
              voluptate quas et repudiandae culpa?
            </div>
            <div className="text-black text-center shadow-1 bg-[#c7cbd1] p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              modi natus, omnis nemo cum animi, accusamus veritatis dolor
              laborum quis magnam libero, maiores quisquam. Dignissimos
              voluptate quas et repudiandae culpa?
            </div>
            <div className="text-black text-center shadow-1 bg-[#c7cbd1] p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              modi natus, omnis nemo cum animi, accusamus veritatis dolor
              laborum quis magnam libero, maiores quisquam. Dignissimos
              voluptate quas et repudiandae culpa?
            </div>
          </div>
        </div>
      </div>
      <div className="bg-yellow-200">
        <button
          onClick={handleClick}
          className="py-4 px-10 bg-secondary shadow-1 rounded-lg mb-10 mx-auto block"
        >
          Convert to pdf
        </button>
      </div>
    </>
  );
}

