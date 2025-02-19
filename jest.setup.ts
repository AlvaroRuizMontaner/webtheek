import "@testing-library/jest-dom/jest-globals"; // Hubo que añadir el final (/jest-globals) para quitar unos warning en los .test
import { TextEncoder, /* TextDecoder */ } from "util"; // Polyfill para node para poder usar la API TextEncoder

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

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { _id: "1", projectName: "Test Project", clientName: "Client A", description: "Description A" },
      ]),
  })
) as jest.Mock;

global.TextEncoder = TextEncoder;
/* global.TextDecoder = TextDecoder; */

export {};