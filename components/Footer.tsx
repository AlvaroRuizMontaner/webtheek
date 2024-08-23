const Footer = (): JSX.Element => {
  return (
    <div className="w-full h-40 flex flex-col gap-2 justify-center bg-primary-900 space-y-3u py-4u">
      <div className="text-center text-white font-bold">
        Web en desarrollo por Álvaro Ruiz Montaner
      </div>

      <div className="text-center text-accent-300">
        LinkedIn:{" "}
        <a
          className="text-white underline"
          href="https://www.linkedin.com/in/%C3%A1lvaro-ruiz-montaner-221a2b206"
        >
          https://www.linkedin.com/in/%C3%A1lvaro-ruiz-montaner-221a2b206
        </a>
      </div>

      <div>
        <p className='text-center text-accent-danger-200'>Todos los derechos reservados {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default Footer;
