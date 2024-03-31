export const navInfo: navItemProps[] = [
  {
    url: "/profile",
    text: "Profile",
  },
  {
    url: "/signin",
    text: "SignIn",
  },
  {
    url: "/signup",
    text: "SignUp",
  },
];
export const navInfoLogged: navItemProps[] = [
  {
    url: "/profile",
    text: "Profile",
  },
  {
    url: "/signout",
    text: "SignOut",
  },
];

export const headerInfo: navItemProps[] = [
  {
    url: "/curriculares",
    text: "Curriculares",
  },
  {
    url: "/herramientas",
    text: "Herramientas",
  },
  {
    url: "/imagenes",
    text: "Imagenes",
  },
];

export interface navItemProps {
  url: string;
  text: string;
}
