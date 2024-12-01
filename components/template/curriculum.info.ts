export type SectionCentralBodyInfoType = {
    title: {
        text: string;
        name: string;
        className: string;
    }
    info: {
        main: string;
        detail: string;
        date: string;
        list?: string[]
    }[];
}


/* Cuerpo lateral */

export type SectionSideBodyInfoType = {
    title: {
        text: string;
        name: string;
        className: string;
    }
    info: {
        icon: {
            name: string;
            className: string;
        };
        main: string;
        aux: string;
        bar?: string
    }[];
}



/* Pagina 1 */

export const lateralPagina1: SectionSideBodyInfoType[] = [
    {
        title: {
            text: "Contact",
            name: "person",
            className: "material-symbols-outlined"
        },
        info: [
            {
                icon: {
                    name: "mail",
                    className: "material-symbols-outlined"
                },
                main: "alvaro.ruiz.montaner@gmail.com",
                aux: ""
            },
            {
                icon: {
                    name: "call",
                    className: "material-symbols-outlined"
                },
                main: "675 967 289",
                aux: ""
            },
    /*         {
                icon: {
                    name: "group",
                    className: "material-symbols-outlined"
                },
                main: "www.linkedin.com/in/%C3%A1lvaro-ruiz-montaner-221a2b206",
                aux: ""
            }, */
            {
                icon: {
                    name: "computer",
                    className: "material-symbols-outlined"
                },
                main: "github.com/Varojausz",
                aux: ""
            },
            {
                icon: {
                    name: "captive_portal",
                    className: "material-symbols-outlined"
                },
                main: "webtheek.com",
                aux: ""
            }
        ],
    },
    {
        title: {
            text: "Languages",
            name: "translate",
            className: "material-symbols-outlined"
        },
        info: [
            {
                icon: {
                    name: "",
                    className: ""
                },
                main: "Spanish",
                aux: "Native"
            },
            {
                icon: {
                    name: "",
                    className: ""
                },
                main: "English",
                aux: "Intermediate"
            },
            {
                icon: {
                    name: "",
                    className: ""
                },
                main: "Portuguese",
                aux: "Professional"
            },
            {
                icon: {
                    name: "",
                    className: ""
                },
                main: "Dutch",
                aux: "Amateur"
            }
        ],
    },
    {
        title: {
            text: "Code Skills",
            name: "code",
            className: "material-symbols-outlined"
        },
        info: [
            {
                icon: {
                    name: "",
                    className: ""
                },
                main: "CSS",
                aux: "",
                bar: "80%"
            },
            {
                icon: {
                    name: "",
                    className: ""
                },
                main: "React",
                aux: "",
                bar: "70%"
            },
            {
                icon: {
                    name: "",
                    className: ""
                },
                main: "MERN Stack",
                aux: "",
                bar: "60%"
            },
            {
                icon: {
                    name: "",
                    className: ""
                },
                main: "Python",
                aux: "",
                bar: "30%"
            }
        ],
    }

]

export const cuerpoCentralPagina1: SectionCentralBodyInfoType[] = [
    {
        title: {
            text: "Education",
            name: "school",
            className: "material-symbols-outlined"
        },
        info: [
            {
                main: "Chemical Engineering Degree",
                detail: "Universidad de Cádiz",
                date: "2012-2020"
            },
            {
                main: "Python bootcamp 30h course",
                detail: "Udemy - Online",
                date: "2021"
            },
            {
                main: "Web Developer Bootcamp 60h Course",
                detail: "Udemy - Online",
                date: "2021"
            },
            {
                main: "Creation, programming, and design of websites with HTML5 and CSS3 210h Course",
                detail: "SEPE - Online",
                date: "2021"
            },
            {
                main: "React & TypeScript - The Complete Guide Creating +10 Projects",
                detail: "Udemy - Online",
                date: "2024"
            },
        ],
    },
    {
        title: {
            text: "Career Profile",
            name: "manage_accounts",
            className: "material-symbols-outlined"
        },
        info: [
            {
                main: "Front-End Skills",
                detail: "CSS",
                date: "",
                list: [
                    "Flexbox, grid and multicolumn layouts",
                    "Frameworks like Tailwind, Sass and styled-components",
                    "Design systems and variables"
                ]
            },
            {
                main: "",
                detail: "React",
                date: "",
                list: [
                    "TypeScript integrated",
                    "Function components, hooks, state, life cycles, routing",
                    "Testing with Jest and react-testing-library",
                    "Global state with Redux, useReducer, useContext",
                    "Frameworks like Next.js and Vite",
                    "Communication with Restful APIs",
                    "SEO built on Next.js"
                ]
            },
            {
                main: "Full-Stack Skills",
                detail: "MERN & PERN",
                date: "",
                list: [
                    "MVC and decoupled architectures on express",
                    "CRUD APIs",
                    "Nested routing",
                    "Validation with ZOD and Express-validator",
                    "MongoDB and PostgreSQL"
                ]
            },
        ],
    }
]


/* Pagina 2 */

export const lateralPagina2: SectionSideBodyInfoType[] = [
    {
        title: {
            text: "Soft Skills",
            name: "rocket_launch",
            className: "material-symbols-outlined"
        },
        info: [
            {
                icon: {
                    name: "",
                    className: ""
                },
                main: "Persistence",
                aux: "",
                bar: "100%"
            },
            {
                icon: {
                    name: "",
                    className: ""
                },
                main: "Curiosity",
                aux: "",
                bar: "80%"
            },
            {
                icon: {
                    name: "",
                    className: ""
                },
                main: "Optimism",
                aux: "",
                bar: "60%"
            },
            {
                icon: {
                    name: "",
                    className: ""
                },
                main: "Brainstorming",
                aux: "",
                bar: "60%"
            }
        ],
    }
]

export const cuerpoCentralPagina2: SectionCentralBodyInfoType[] = [
    {
        title: {
            text: "Experience",
            name: "business_center",
            className: "material-symbols-outlined"
        },
        info: [
            {
                main: "Full-Stack Developer",
                detail: "MásMóvil Alarms Project", /* (Subcontracted on TalentoMobile) */
                date: "June 2022 - July 2024",
                list: [
                    "Solely responsible of developing of three websites related to the MásMóvil alarms project.",
                    "Debugging, update, optimization, and separate deployment of the backend (Express + PostgreSQL), and the frontend (React + Next.js + Typescript).",
                    "Conducted layouts tasks from Figma designs",
                    "Translation system of one of these webpages",
                    "Implementation of functions from Google Analytics for user traffic measurements",
                    "Collaboration with Byside for improvement of marketing campaigns and user conversions"
                ]
            },
            {
                main: "Freelancing Developer",
                detail: "Freelance",
                date: "April 2021 - June 2022",
                list: [
                    "Social Media built on top of React & Firebase",
                    "Basic authentication, account creation and basic validation",
                    "Hosted images on Imgur and integrated with its API",
                    "Enabled features for commenting, following, making posts, and configuring user profiles",
                ]
            },
        ],
    },
    {
        title: {
            text: "Highlighted Own Projects",
            name: "settings_accessibility",
            className: "material-symbols-outlined"
        },
        info: [
            {
                main: "Project Management App",
                detail: "https://webtheek.com/",
                date: "2024 - present",
                list: [
                    "Built on top of MongoDB, Express, React, Node (MERN)",
                    "MVC and decoupled architectures",
                    "One section is similar to Jira and Zendesk, enabling creation, editing and deletion of projects, tasks and notes, with the ability to add collaborators",
                    "Includes another section which enables the creation of quizzes with any statement, answers and the capability of sharing to another person for solving",
                    "Lets you manage collaborator permissions and your user profile",
                    "Secured routes with JWT for authentication",
                    "Back-End validation, email authentication, password recovery by email (emails by Zoho)",
                    "Typescript, ZOD, Jest",
                    "Currently developing a curriculum PDF creator for profiles"
                ]
            },
        ],
    }
]