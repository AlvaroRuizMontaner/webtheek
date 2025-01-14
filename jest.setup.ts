import "@testing-library/jest-dom";

jest.mock("swiper/css", jest.fn());

jest.mock('next/router', () => ({
    useRouter: jest.fn(() => ({
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
    })),
  }));

  jest.mock("next/navigation", () => ({
    usePathname: jest.fn(() => "localhost:3000/"), // Devuelve una ruta simulada
  }));

export {};