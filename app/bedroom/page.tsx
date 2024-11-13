
import "../globals.scss"
export default function Page(): JSX.Element {
  return (
    <>
      <div className="container flex flex-1">
        <div className="flex flex-wrap text-center justify-center my-20 gap-32">
          {/* --------------------------Plano 1-------------------------- */}
          <div className=" w-[32rem] h-[32.3rem] relative bg-accent flex justify-center items-center">
            {/* Mesa */}
            <div
              className="w-[11.7rem] h-[5.1rem] absolute text-sm
          bg-yellow-500 flex flex-col items-center justify-center
           bottom-[14rem] right-[0rem]
          "
            >
              <div className="">
                Mesa
                <div>117 largo x 51 ancho</div>
              </div>
            </div>

            {/* Mueble TV */}
            <div
              className="w-[3.5rem] h-[12rem] absolute text-sm
          bg-cyan-500 flex flex-col items-center justify-center
           top-[0rem] left-[0rem]
          "
            >
              <div className="">
                Mueble TV
                <div>120 largo x 35 ancho</div>
              </div>
            </div>

            {/* Columna */}
            <div
              className="flex items-center text-[1rem]
           text-blue-400 w-[3.6rem] h-[3.6rem] 
           justify-center bg-red-200 absolute
           top-[13.7rem] left-[4.35rem]
           "
            >
              Col.
              <div className="absolute w-[10rem] h-[15rem] bg-black top-[3.6rem] right-1/2"></div>
            </div>

            <div className="bg-black absolute w-[16.4rem] h-[6rem] right-0 top-[26.3rem]"></div>

            {/* Cama */}
            <div
              className="w-[19rem] h-[13.5rem] absolute
          bg-orange-500 right-0 flex flex-col items-center justify-center
           top-0
          "
            >
              Cama
              <div>190 largo x 135 ancho</div>
            </div>
          </div>

          {/* ------------------------Plano 2------------------------ */}
          <div className=" w-[32rem] h-[32.3rem] relative bg-accent flex justify-center items-center">
            {/* Mesa */}
            <div
              className="w-[11.7rem] h-[5.1rem] absolute text-sm
          bg-yellow-500 flex flex-col items-center justify-center
           top-[0rem] left-[7.95rem]
          "
            >
              <div className="">
                Mesa
                <div>117 largo x 51 ancho</div>
              </div>
            </div>

            {/* Columna */}
            <div
              className="flex items-center text-[1rem]
           text-blue-400 w-[3.6rem] h-[3.6rem] 
           justify-center bg-red-200 absolute
           top-[13.7rem] left-[4.35rem]
           "
            >
              Col.
              <div className="absolute w-[10rem] h-[15rem] bg-black top-[3.6rem] right-1/2"></div>
            </div>

            <div className="bg-black absolute w-[16.4rem] h-[6rem] right-0 top-[26.3rem]"></div>

            {/* Cama */}
            <div
              className="w-[13.5rem] h-[19rem] absolute
          bg-orange-500 right-0 flex flex-col items-center justify-center
           top-0
          "
            >
              Cama
              <div>190 largo x 135 ancho</div>
            </div>
          </div>

          {/* ----------------------------Plano 3---------------------------- */}
          <div className=" w-[32rem] h-[32.3rem] relative bg-accent flex justify-center items-center">
            {/* Ropero */}
            <div
              className="w-[5.5rem] h-[11.7rem] absolute text-sm
          bg-lime-500 flex flex-col items-center justify-center
           top-[0] left-[7.5rem]
          "
            >
              <div className="rotate-90">
                Ropero
                <div>117 largo x 55 ancho</div>
              </div>
            </div>

            {/* Mesa */}
            <div
              className="w-[5.1rem] h-[11.7rem] absolute text-sm
          bg-yellow-500 flex flex-col items-center justify-center
           bottom-[7.1rem] right-[0rem]
          "
            >
              <div className="rotate-90">
                Mesa
                <div>117 largo x 51 ancho</div>
              </div>
            </div>

            {/* Columna */}
            <div
              className="flex items-center text-[1rem]
           text-blue-400 w-[3.6rem] h-[3.6rem] 
           justify-center bg-red-200 absolute
           top-[13.7rem] left-[4.35rem]
           "
            >
              Col.
              <div className="absolute w-[10rem] h-[15rem] bg-black top-[3.6rem] right-1/2"></div>
            </div>

            <div className="bg-black absolute w-[16.4rem] h-[6rem] right-0 top-[26.3rem]"></div>

            {/* Cama */}
            <div
              className="w-[19rem] h-[10.5rem] absolute
          bg-orange-500 right-0 flex flex-col items-center justify-center
           top-0
          "
            >
              Cama
              <div>190 largo x 105 ancho</div>
            </div>
          </div>
        </div>
      </div>
      <section className="flex gap-4">
        <div className="h-72 w-72 rounded-md m-auto shine-effect from-accent-200 to-accent-800 bg-gradient-to-b">
          <div className=""></div>
        </div>
        <br />
        <div className="h-72 w-72 rounded-md m-auto shine-effect from-blue-200 to-blue-800 bg-gradient-to-b">
          <div className=""></div>
        </div>
        <br />
        <div className="h-72 w-72 rounded-md m-auto shine-effect from-accent-danger-200 to-accent-danger-800 bg-gradient-to-b">
          <div className=""></div>
        </div>
      </section>
      <br />
    </>
  );
}
