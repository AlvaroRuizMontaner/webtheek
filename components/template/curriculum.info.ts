export type InfoChildType = {
    main: string;
    detail: string;
    date: string;
    list?: string[]
}

export type SideInfoChildType = {
    icon: {
        nameIcon: string;
        classNameIcon: string;
    };
    main: string;
    aux: string
    bar?: string
    mainType: number
}

export type SectionCentralBodyInfoType = {
    title: {
        text: string;
        nameIcon: string;
        classNameIcon: string;
    }
    info: InfoChildType[]
}

export type SectionHeader = {
    photoUrl: string
    name: string
    charge: string
    birthday: string
}


/* Cuerpo lateral */

export type SectionSideBodyInfoType = {
    title: {
        text: string;
        nameIcon: string;
        classNameIcon: string;
    }
    info: SideInfoChildType[]
}



/* Pagina 1 */

export const lateralPagina1: SectionSideBodyInfoType[] = [
    {
        title: {
            text: "Contact",
            nameIcon: "person",
            classNameIcon: "material-symbols-outlined"
        },
        info: [
            {
                icon: {
                    nameIcon: "mail",
                    classNameIcon: "material-symbols-outlined"
                },
                main: "alvaro.ruiz.montaner@gmail.com",
                aux: "",
                mainType: 0
            },
            {
                icon: {
                    nameIcon: "call",
                    classNameIcon: "material-symbols-outlined"
                },
                main: "675 967 289",
                aux: "",
                mainType: 0
            },
    /*         {
                icon: {
                    nameIcon: "group",
                    classNameIcon: "material-symbols-outlined"
                },
                main: "www.linkedin.com/in/%C3%A1lvaro-ruiz-montaner-221a2b206",
                aux: "",
                mainType: 0
            }, */
            {
                icon: {
                    nameIcon: "computer",
                    classNameIcon: "material-symbols-outlined"
                },
                main: "github.com/Varojausz",
                aux: "",
                mainType: 0
            },
            {
                icon: {
                    nameIcon: "captive_portal",
                    classNameIcon: "material-symbols-outlined"
                },
                main: "webtheek.com",
                aux: "",
                mainType: 0
            }
        ],
    },
    {
        title: {
            text: "Languages",
            nameIcon: "translate",
            classNameIcon: "material-symbols-outlined"
        },
        info: [
            {
                icon: {
                    nameIcon: "",
                    classNameIcon: ""
                },
                main: "Spanish",
                aux: "Native",
                mainType: 1
            },
            {
                icon: {
                    nameIcon: "",
                    classNameIcon: ""
                },
                main: "English",
                aux: "Intermediate",
                mainType: 1
            },
            {
                icon: {
                    nameIcon: "",
                    classNameIcon: ""
                },
                main: "Portuguese",
                aux: "Professional",
                mainType: 1
            },
            {
                icon: {
                    nameIcon: "",
                    classNameIcon: ""
                },
                main: "Dutch",
                aux: "Amateur",
                mainType: 1
            }
        ],
    },
    {
        title: {
            text: "Code Skills",
            nameIcon: "code",
            classNameIcon: "material-symbols-outlined"
        },
        info: [
            {
                icon: {
                    nameIcon: "",
                    classNameIcon: ""
                },
                main: "CSS",
                aux: "",
                bar: "80%",
                mainType: 2
            },
            {
                icon: {
                    nameIcon: "",
                    classNameIcon: ""
                },
                main: "React",
                aux: "",
                bar: "70%",
                mainType: 2
            },
            {
                icon: {
                    nameIcon: "",
                    classNameIcon: ""
                },
                main: "MERN Stack",
                aux: "",
                bar: "60%",
                mainType: 2
            },
            {
                icon: {
                    nameIcon: "",
                    classNameIcon: ""
                },
                main: "Python",
                aux: "",
                bar: "30%",
                mainType: 2
            }
        ],
    }

]

export const cuerpoCentralPagina1: SectionCentralBodyInfoType[] = [
    {
        title: {
            text: "Education",
            nameIcon: "school",
            classNameIcon: "material-symbols-outlined"
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
            nameIcon: "manage_accounts",
            classNameIcon: "material-symbols-outlined"
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
            nameIcon: "rocket_launch",
            classNameIcon: "material-symbols-outlined"
        },
        info: [
            {
                icon: {
                    nameIcon: "",
                    classNameIcon: ""
                },
                main: "Persistence",
                aux: "",
                bar: "100%",
                mainType: 2
            },
            {
                icon: {
                    nameIcon: "",
                    classNameIcon: ""
                },
                main: "Curiosity",
                aux: "",
                bar: "80%",
                mainType: 2
            },
            {
                icon: {
                    nameIcon: "",
                    classNameIcon: ""
                },
                main: "Optimism",
                aux: "",
                bar: "60%",
                mainType: 2
            },
            {
                icon: {
                    nameIcon: "",
                    classNameIcon: ""
                },
                main: "Brainstorming",
                aux: "",
                bar: "60%",
                mainType: 2
            }
        ],
    }
]

export const cuerpoCentralPagina2: SectionCentralBodyInfoType[] = [
    {
        title: {
            text: "Experience",
            nameIcon: "business_center",
            classNameIcon: "material-symbols-outlined"
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
            nameIcon: "settings_accessibility",
            classNameIcon: "material-symbols-outlined"
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
                    /* "Currently developing a curriculum PDF creator for profiles" */
                ]
            },
        ],
    }
]