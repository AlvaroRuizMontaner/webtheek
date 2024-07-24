"use client"

import { generatePDF } from "@/services/PDFAPI";
import { getHtmlWithStyles } from "@/utils/generateHtml";
import { useMutation } from "@tanstack/react-query";
import { useRef, /* useState */ } from "react";
import "./curriculum.css";
import EncabezadoLateral from "@/components/curriculum/EncabezadoLateral";
import CuerpoLateral from "@/components/curriculum/CuerpoLateral";

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
          <div className="contenedor max-w-2xl min-h-[200vh] bg-yellow-200  mx-auto p-12">
            <section className=""></section>
            <section className="lateral">
              <EncabezadoLateral />
              <CuerpoLateral />
              <div className="flex gap-2">
                <div>lol</div>
                <div> Lorem ipsum dolor sit amet consectetur adipisicing elit. Et fuga debitis consequatur autem tempora error architecto quaerat iusto. Esse nisi vel tempora dignissimos modi tenetur iure molestias aliquam nesciunt commodi!</div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="bg-yellow-200 relative">
        <button
          onClick={handleClick}
          className="py-4 px-10 bg-secondary shadow-1 rounded-lg mb-10 mx-auto block absolute left-1/2 -translate-x-1/2"
        >
          Convert to pdf
        </button>
      </div>
    </>
  );
}

