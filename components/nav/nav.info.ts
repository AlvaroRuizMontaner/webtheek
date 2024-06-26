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
    url: "/Signin",
    text: "SignIn",
  },
  {
    url: "/SignUp",
    text: "SignOut",
  },
  {
    url: "/profile",
    text: "Perfil",
  },
  {
    url: "/tools",
    text: "Herramientas",
    subitems: [
      {
        url: "/curriculars",
        text: "Curriculares",
      },
      {
        url: "/images",
        text: "Imagenes",
      },
    ],
  },
];

export interface navItemProps {
  url?: string;
  text: string;
  subitems?: {
    url: string;
    text: string;
  }[];
}
