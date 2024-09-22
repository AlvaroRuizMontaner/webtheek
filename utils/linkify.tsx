import Link from "next/link";

export const linkify = (text: string) => {
  // Modificar el regex para capturar enlaces que comiencen con http(s):// o www.
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;

  // Dividir el texto en fragmentos con y sin enlaces
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    // Si el fragmento coincide con el regex, es un enlace
    if (urlRegex.test(part)) {
      // Si el enlace comienza con "www.", añadir "https://" por delante
      const href = part.startsWith("www.") ? `https://${part}` : part;

      return (
        <Link href={href} className="underline font-bold" key={index} target="_blank" rel="noopener noreferrer">
          {part}
        </Link>
      );
    }
    // Si no coincide, es texto normal
    return <span key={index}>{part}</span>;
  });
};