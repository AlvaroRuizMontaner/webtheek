import Link from "next/link";
import "./footer.scss"

const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      <img src="/logoconborde.png" width={50} alt="" className="logo" />
      <div className="socials">
        <div className="w-[50px] relative bg-white rounded-md">
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/%C3%A1lvaro-ruiz-montaner-221a2b206"
            >
              <img src="/icons/linkedin.png" />
            </Link>
        </div>
      </div>
      <div className="links">
        <ul>
          <li>
            <h2>Servicios</h2>
          </li>
          <li>
            <Link href="/projects">Proyectos</Link>
          </li>
          <li>
            <Link href="/quizzes">Quizzes</Link>
          </li>
          {/*           <li>
            <a>Monitoring</a>
          </li>
          <li>
            <a>Status</a>
          </li>
          <li>
            <a>Endpoints</a>
          </li> */}
        </ul>
        <ul>
          <li>
            <h2>Recursos</h2>
          </li>
          <li>
            <Link href="/pricing">Precios</Link>
          </li>
          {/*           <li>
            <a>Listings</a>
          </li> */}
          {/*           <li>
            <a>Reports</a>
          </li>
          <li>
            <a>API</a>
          </li>
          <li>
            <a>FAQ</a>
          </li> */}
        </ul>
        <ul>
          <li>
            <h2>Compañía</h2>
          </li>
          <li>
            <Link href="/privacy-policy">Privacidad</Link>
          </li>
          <li>
            <Link href="/legal-advice">Aviso legal</Link>
          </li>
{/*           <li>
            <Link href="/about">Acerca de</Link>
          </li> */}
          {/*           <li>
            <a>Assets</a>
          </li> */}
        </ul>
        <ul>
          <li>
            <h2>Webtheek Studio</h2>
          </li>
          <li>
          <a className="ellipsis" href="mailto:contacto@webtheekstudio.com">Support</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
