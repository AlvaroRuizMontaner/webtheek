/* export type seccionCuerpoCentralInfoType = {
    title: {
        text: string,
        nameIcon: string,
        classNameIcon: string
    }
    info: {
        main: string;
        detail: string;
        date: string;
        list?: string[]
    }[];
    
} */

type DetailItem = [
    string, // Título principal
    {
        detail: string; // Descripción o detalle
        date: string;   // Fecha asociada
    },
    string[]?  // Lista opcional de elementos
];
    

type SectionHeader = {
    text: string;
    nameIcon: string;
    classNameIcon: string;
};

export type Section = [SectionHeader, DetailItem[]];
export type CuerpoCentralPaginas = Section[];


export type seccionCuerpoLateralInfoType = {
    title: {
        nameIcon: string;
        classNameIcon: string;
        text: string;
    };
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

/* export const lateralPagina1: seccionCuerpoLateralInfoType[] = [
    {
        title: {
            text: "Contact",
            nameIcon: "person",
            classNameIcon: "material-symbols-outlined"
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
            nameIcon: "translate",
            classNameIcon: "material-symbols-outlined"
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
            nameIcon: "code",
            classNameIcon: "material-symbols-outlined"
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

export const cuerpoCentralPagina1: seccionCuerpoCentralInfoType[] = [
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
 */

/* Pagina 2 */

/* export const lateralPagina2: seccionCuerpoLateralInfoType[] = [
    {
        title: {
            text: "Soft Skills",
            nameIcon: "rocket_launch",
            classNameIcon: "material-symbols-outlined"
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

export const cuerpoCentralPagina2: seccionCuerpoCentralInfoType[] = [
    {
        title: {
            text: "Experience",
            nameIcon: "business_center",
            classNameIcon: "material-symbols-outlined"
        },
        info: [
            {
                main: "Full-Stack Developer",
                detail: "MásMóvil Alarms Project", 
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
                    "Currently developing a curriculum PDF creator for profiles"
                ]
            },
        ],
    }
]
 */
/* --------------------------------------------------Páginas-------------------------------------------------- */

export const cuerpoCentralPaginas: CuerpoCentralPaginas = [
    [
        {
            text: "Education",
            nameIcon: "school",
            classNameIcon: "material-symbols-outlined"
        },
        [
            [
                "Chemical Engineering Degree", /* main */
                {
                    detail: "Universidad de Cádiz",
                    date: "2012-2020"
                },
            ],
            [
                "Python bootcamp 30h course", /* main */
                {
                    detail: "Udemy - Online",
                    date: "2021"
                }
            ],
            [
                "Web Developer Bootcamp 60h Course", /* main */
                {
                    detail: "Udemy - Online",
                    date: "2021"
                }
            ],
            [
                "Creation, programming, and design of websites with HTML5 and CSS3 210h Course", /* main */
                {
                    detail: "SEPE - Online",
                    date: "2021"
                }
            ],
            [
                "React & TypeScript - The Complete Guide Creating +10 Projects", /* main */
                {
                    detail: "Udemy - Online",
                    date: "2024"
                }
            ],
        ],
    ],
    [
        {
            text: "Career Profile",
            nameIcon: "manage_accounts",
            classNameIcon: "material-symbols-outlined"
        },
        [
            [
                "Front-End Skills", /* main */
                {
                    detail: "CSS",
                    date: "",
                },
                [
                    "Flexbox, grid and multicolumn layouts",
                    "Frameworks like Tailwind, Sass and styled-components",
                    "Design systems and variables"
                ]
            ],
/*             [
                "",
                {
                    detail: "React",
                    date: "",
                },
                [
                    "TypeScript integrated",
                    "Function components, hooks, state, life cycles, routing",
                    "Testing with Jest and react-testing-library",
                    "Global state with Redux, useReducer, useContext",
                    "Frameworks like Next.js and Vite",
                    "Communication with Restful APIs",
                    "SEO built on Next.js"
                ]
            ], */
            [
                "Full-Stack Skills", /* main */
                {
                    detail: "MERN & PERN",
                    date: "",
                },
                [
                    "MVC and decoupled architectures on express",
                    "CRUD APIs",
                    "Nested routing",
                    "Validation with ZOD and Express-validator",
                    "MongoDB and PostgreSQL"
                ]
            ],
        ],
    ],
    [
        {
            text: "Experience",
            nameIcon: "business_center",
            classNameIcon: "material-symbols-outlined"
        },
        [
            [
                "Full-Stack Developer", /* main */
                {
                    detail: "MásMóvil Alarms Project", 
                    date: "June 2022 - July 2024",
                },
                [
                    "Solely responsible of developing of three websites related to the MásMóvil alarms project.",
                    "Debugging, update, optimization, and separate deployment of the backend (Express + PostgreSQL), and the frontend (React + Next.js + Typescript).",
                    "Conducted layouts tasks from Figma designs",
                    "Translation system of one of these webpages",
                    "Implementation of functions from Google Analytics for user traffic measurements",
                    "Collaboration with Byside for improvement of marketing campaigns and user conversions"
                ]
            ],
            [
                "Freelancing Developer", /* main */
                {
                    detail: "Freelance",
                    date: "April 2021 - June 2022",
                },
                [
                    "Social Media built on top of React & Firebase",
                    "Basic authentication, account creation and basic validation",
                    "Hosted images on Imgur and integrated with its API",
                    "Enabled features for commenting, following, making posts, and configuring user profiles",
                ]
            ],
        ],
    ],
    [
        {
            text: "Highlighted Own Projects",
            nameIcon: "settings_accessibility",
            classNameIcon: "material-symbols-outlined"
        },
        [
            [
                "Project Management App", /* main */
                {
                    detail: "https://webtheek.com/",
                    date: "2024 - present",
                },
                [
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
            ],
        ],
    ]
]

export const lateralPaginas: seccionCuerpoLateralInfoType[] = [
    {
        title: {
            text: "Contact",
            nameIcon: "person",
            classNameIcon: "material-symbols-outlined"
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
            nameIcon: "translate",
            classNameIcon: "material-symbols-outlined"
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
            nameIcon: "code",
            classNameIcon: "material-symbols-outlined"
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
    },
    {
        title: {
            text: "Soft Skills",
            nameIcon: "rocket_launch",
            classNameIcon: "material-symbols-outlined"
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