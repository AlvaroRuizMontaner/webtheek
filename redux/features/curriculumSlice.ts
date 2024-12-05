import { SectionCentralBodyInfoType, SectionSideBodyInfoType } from "@/components/template/curriculum.info";
import { createSlice } from "@reduxjs/toolkit"

type InitialStateType = {
    body: SectionCentralBodyInfoType[]
    side: SectionSideBodyInfoType[]
}[]

/* const initialState: SectionCentralBodyInfoType[][] = [
    [
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
                    date: "2020",
                    list: [
                        "Flexbox, grid and multicolumn layouts",
                        "Frameworks like Tailwind, Sass and styled-components",
                        "Design systems and variables"
                    ]
                },
                {
                    main: "",
                    detail: "React",
                    date: "2020",
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
                    date: "2020",
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
] */

const initialState: InitialStateType = [
    {
        body: [
 /*            {
                title: {
                    text: "hola",
                    nameIcon: "",
                    classNameIcon: "hola"
                },
                info: [
                    {
                        main: "hola",
                        detail: "hola",
                        date: "hola"
                    },
                ],
            }, */
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
                        date: "2020",
                        list: [
                            "Flexbox, grid and multicolumn layouts",
                            "Frameworks like Tailwind, Sass and styled-components",
                            "Design systems and variables"
                        ]
                    },
                    {
                        main: "",
                        detail: "React",
                        date: "2020",
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
                        date: "2020",
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
        ],
        side: [
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
    }
]
const page = initialState[0]
const bodyChild = page.body[0]
const infoChild = bodyChild.info[0]
const listChild = infoChild && infoChild.list && infoChild.list[0] || "listElement"

export const curriculumSlice = createSlice({
    name: "curriculum",
    initialState,
    reducers: {
        // Add elements
        addPage: (state) => {
            state.push(page);
        },
        addBodyChild: (state, action) => {
            const { pageNumber } = action.payload; // El nuevo objeto body que se quiere añadir
            state[pageNumber].body.push(bodyChild);
        },
        addInfoChild: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex } = action.payload; // Desestructuramos los parámetros necesarios
            if (state[pageNumber].body[bodyChildIndex]) { // Validamos que el índice sea válido
                state[pageNumber].body[bodyChildIndex].info.splice(infoChildIndex+1, 0, infoChild);
            }
        },
        addListChild: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, listChild } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state[pageNumber].body[bodyChildIndex]
            const infoChild = bodyChild.info[infoChildIndex]

            if (bodyChild && infoChild && infoChild.list) { // Validamos que los índices sean válidos
                infoChild.list.push(listChild);
            }
        },


        // Add by index
        addBodyChildByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex } = action.payload; // El nuevo objeto body que se quiere añadir
            if (bodyChildIndex >= 0 && bodyChildIndex < state[pageNumber].body.length) {
                state[pageNumber].body.splice(bodyChildIndex+1, 0, bodyChild);
            }
        },
        addInfoChildByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, infoChild } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state[pageNumber].body[bodyChildIndex]
            if (bodyChild) { // Validamos que el índice sea válido
                if (infoChildIndex >= 0 && infoChildIndex <= bodyChild.info.length) {
                    bodyChild.info.splice(infoChildIndex, 0, infoChild);
                }
            }
        },
        addListChildByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, listChildIndex, /* listChild */ } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state[pageNumber].body[bodyChildIndex]
            const infoChild = bodyChild.info[infoChildIndex]
            if (bodyChild && infoChild && infoChild.list) { // Validamos que los índices sean válidos
                if (listChildIndex >= 0 && listChildIndex <= infoChild.list.length) {
                    infoChild.list.splice(listChildIndex+1, 0, listChild);
                }
            }
        },


        // Delete by index
        deletePage: (state, action) => {
            const { pageNumber } = action.payload; // El nuevo objeto body que se quiere añadir
            state.splice(pageNumber,1);
        },
        deleteBodyChildByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex} = action.payload; // El nuevo objeto body que se quiere añadir
            state[pageNumber].body.splice(bodyChildIndex,1);
            //state.filter((_,index) => bodyChildIndex !== index)
        },
        deleteInfoChildByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state[pageNumber].body[bodyChildIndex]
            if (bodyChild) { // Validamos que el índice sea válido
                bodyChild.info.splice(infoChildIndex,1);
            }
        },
        deleteMainByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state[pageNumber].body[bodyChildIndex]
            if (bodyChild) { // Validamos que el índice sea válido
                bodyChild.info[infoChildIndex].main = "";
            }
        },
        deleteDetailByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state[pageNumber].body[bodyChildIndex]
            if (bodyChild) { // Validamos que el índice sea válido
                bodyChild.info[infoChildIndex].detail = "";
            }
        },
        deleteDateByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state[pageNumber].body[bodyChildIndex]
            if (bodyChild) { // Validamos que el índice sea válido
                bodyChild.info[infoChildIndex].date = "";
            }
        },
        deleteListChildByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, listChildIndex } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state[pageNumber].body[bodyChildIndex]
            const infoChild = bodyChild.info[infoChildIndex]

            if (bodyChild && infoChild && infoChild.list) { // Validamos que los índices sean válidos
                infoChild.list.splice(listChildIndex,1);
            }
        },

        // Edit texts
        editTitleText: (state, action) => {
            const { pageNumber, bodyChildIndex, value} = action.payload
            if(state[pageNumber].body?.[bodyChildIndex]) {
                state[pageNumber].body[bodyChildIndex].title.text = value;
            }
        },
        editInfoChildDetail: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, detail } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state[pageNumber].body?.[bodyChildIndex];
            const infoChild = bodyChild?.info?.[infoChildIndex];

            if (infoChild) {
                infoChild.detail = detail;
            }
        },
        editInfoChildDate: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, date } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state[pageNumber].body?.[bodyChildIndex];
            const infoChild = bodyChild?.info?.[infoChildIndex];

            if (infoChild) {
                infoChild.date = date;
            }
        },
        editInfoChildMain: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, main } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state[pageNumber].body?.[bodyChildIndex];
            const infoChild = bodyChild?.info?.[infoChildIndex];

            if (infoChild) {
                infoChild.main = main;
            }
        },
        editListChild: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, listChildIndex, value } = action.payload; // Desestructuramos los parámetros necesarios
        
            const bodyChild = state[pageNumber].body[bodyChildIndex]
            const infoChild = bodyChild.info[infoChildIndex]

            if (bodyChild && infoChild && Array.isArray(infoChild.list) && listChildIndex >= 0 && listChildIndex < infoChild.list.length) {
                infoChild.list[listChildIndex] = value;
            }
        },

        /* ------------------------------------------------------Side------------------------------------------------------ */
    }
})

const {
    addPage,
    addBodyChild,
    addInfoChild, 
    addListChild, 
    addBodyChildByIndex, 
    addInfoChildByIndex, 
    addListChildByIndex, 
    deletePage,
    deleteBodyChildByIndex, 
    deleteInfoChildByIndex, 
    deleteMainByIndex,
    deleteDetailByIndex,
    deleteDateByIndex,
    deleteListChildByIndex,
    editTitleText,
    editInfoChildDetail,
    editInfoChildDate,
    editInfoChildMain,
    editListChild,
} = curriculumSlice.actions

const curriculumReducer = curriculumSlice.reducer

export {
    addPage,
    addBodyChild,
    addInfoChild,
    addListChild,
    addBodyChildByIndex,
    addInfoChildByIndex,
    addListChildByIndex,
    deletePage,
    deleteBodyChildByIndex,
    deleteInfoChildByIndex,
    deleteMainByIndex,
    deleteDetailByIndex,
    deleteDateByIndex,
    deleteListChildByIndex,
    editTitleText,
    editInfoChildDetail,
    editInfoChildDate,
    editInfoChildMain,
    editListChild,
    curriculumReducer
}