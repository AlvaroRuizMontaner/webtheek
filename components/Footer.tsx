import React from "react";

const Footer = (): JSX.Element => {
  return (
    <div className="w-full h-40 flex flex-col gap-2 justify-center bg-primary">
      <div className="text-center">
        Web en desarrollo por Álvaro Ruiz Montaner
      </div>
      <div className="text-center">
        LinkedIn:{" "}
        <a
          className="text-tertiary"
          href="https://www.linkedin.com/in/%C3%A1lvaro-ruiz-montaner-221a2b206"
        >
          https://www.linkedin.com/in/%C3%A1lvaro-ruiz-montaner-221a2b206
        </a>
      </div>
    </div>
  );
};

export default Footer;
