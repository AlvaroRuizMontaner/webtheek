// app/head.tsx  (no pongas "use client")
export default function Head() {
  return (
    <>
      {/* Optimización opcional */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* Orbitron vía <link> */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap"
      />

      {/* Material Symbols Outlined */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0"
      />
    </>
  );
}
