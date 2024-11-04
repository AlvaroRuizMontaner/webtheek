import "./footer.scss"

const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
        <img src="/logoconborde.png" alt="" className="logo" />
      <div className="socials">
        <a className="fa-brands fa-linkedin">ln</a>
      </div>
      <div className="links">
        <ul>
          <li>
            <h2>Services</h2>
          </li>
          <li>
            <a>Staking</a>
          </li>
          <li>
            <a>Hardware</a>
          </li>
          <li>
            <a>Monitoring</a>
          </li>
          <li>
            <a>Status</a>
          </li>
          <li>
            <a>Endpoints</a>
          </li>
        </ul>
        <ul>
          <li>
            <h2>Resources</h2>
          </li>
          <li>
            <a>Pricing</a>
          </li>
          <li>
            <a>Listings</a>
          </li>
          <li>
            <a>Reports</a>
          </li>
          <li>
            <a>API</a>
          </li>
          <li>
            <a>FAQ</a>
          </li>
        </ul>
        <ul>
          <li>
            <h2>Company</h2>
          </li>
          <li>
            <a>Blog</a>
          </li>
          <li>
            <a>Newsroom</a>
          </li>
          <li>
            <a>About us</a>
          </li>
          <li>
            <a>Assets</a>
          </li>
        </ul>
        <ul>
          <li>
            <h2>Alltools Inc.</h2>
          </li>
          <li>
            <address>
              12546 Hopeful St.
              <br />
              LA, CA 34543
              <br />
              +1 (345) 432 4332
            </address>
          </li>
        </ul>
      </div>
    </footer>
  );
};
/*     <div className="w-full h-40 flex flex-col gap-2 justify-center bg-primary-900 space-y-3u py-4u">
      <div className="text-center font-bold text-white">
        Web en desarrollo por Álvaro Ruiz Montaner
      </div>

      <div className="text-center text-white">
        LinkedIn:{" "}
        <a
          className=" underline text-accent-warning-300"
          href="https://www.linkedin.com/in/%C3%A1lvaro-ruiz-montaner-221a2b206"
        >
          https://www.linkedin.com/in/%C3%A1lvaro-ruiz-montaner-221a2b206
        </a>
      </div>

      <div>
        <p className='text-center text-accent-danger-200'>Todos los derechos reservados {new Date().getFullYear()}</p>
      </div>
    </div> */

export default Footer;
