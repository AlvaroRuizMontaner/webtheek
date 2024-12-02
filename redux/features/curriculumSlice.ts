import { SectionCentralBodyInfoType } from "@/components/template/curriculum.info";
import { createSlice } from "@reduxjs/toolkit"

/* const initialState = [
    [
        {
            title: {
                text: "",
                name: "",
                className: ""
            },
            info: [
                {
                    main: "",
                    detail: "",
                    date: "",
                    list: [
                        "",
                        "",
                        ""
                    ]
                }
            ]
        }
    ]
] */
const initialState: SectionCentralBodyInfoType[][] = [
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
    ],
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
    ]
]

export const curriculumSlice = createSlice({
    name: "curriculum",
    initialState,
    reducers: {
        // Add elements
        addBodyChild: (state, action) => {
            const { pageNumber, bodyChild } = action.payload; // El nuevo objeto body que se quiere añadir
            state[pageNumber].push(bodyChild);
        },
        addInfoChild: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChild } = action.payload; // Desestructuramos los parámetros necesarios
            if (state[pageNumber][bodyChildIndex]) { // Validamos que el índice sea válido
                state[pageNumber][bodyChildIndex].info.push(infoChild);
            }
        },
        addListChild: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, listChild } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state[pageNumber][bodyChildIndex]
            const infoChild = bodyChild.info[infoChildIndex]

            if (bodyChild && infoChild && infoChild.list) { // Validamos que los índices sean válidos
                infoChild.list.push(listChild);
            }
        },


        // Add by index
        addBodyChildByIndex: (state, action) => {
            const { pageNumber, bodyChild, bodyChildIndex } = action.payload; // El nuevo objeto body que se quiere añadir
            if (bodyChildIndex >= 0 && bodyChildIndex < state[pageNumber].length) {
                state[pageNumber].splice(bodyChildIndex, 0, bodyChild);
            }
        },
        addInfoChildByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, infoChild } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state[pageNumber][bodyChildIndex]
            if (bodyChild) { // Validamos que el índice sea válido
                if (infoChildIndex >= 0 && infoChildIndex <= bodyChild.info.length) {
                    bodyChild.info.splice(infoChildIndex, 0, infoChild);
                }
            }
        },
        addListChildByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, listChildIndex, listChild } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state[pageNumber][bodyChildIndex]
            const infoChild = bodyChild.info[infoChildIndex]
            if (bodyChild && infoChild && infoChild.list) { // Validamos que los índices sean válidos
                if (listChildIndex >= 0 && listChildIndex <= infoChild.list.length) {
                    infoChild.list.splice(listChildIndex, 0, listChild);
                }
            }
        },


        // Delete by index
        deleteBodyChildByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex} = action.payload; // El nuevo objeto body que se quiere añadir
            state[pageNumber].splice(bodyChildIndex,1);
            //state.filter((_,index) => bodyChildIndex !== index)
        },
        deleteInfoChildByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state[pageNumber][bodyChildIndex]
            if (bodyChild) { // Validamos que el índice sea válido
                bodyChild.info.splice(infoChildIndex,1);
            }
        },
        deleteListChildByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, listChildIndex } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state[pageNumber][bodyChildIndex]
            const infoChild = bodyChild.info[infoChildIndex]

            if (bodyChild && infoChild && infoChild.list) { // Validamos que los índices sean válidos
                infoChild.list.splice(listChildIndex,1);
            }
        },

        // Edit texts
        editTitleText: (state, action) => {
            const { pageNumber, bodyChildIndex, value} = action.payload
            if(state[pageNumber]?.[bodyChildIndex]) {
                state[pageNumber][bodyChildIndex].title.text = value;
            }
        },
        editInfoChildDetail: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, detail } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state[pageNumber]?.[bodyChildIndex];
            const infoChild = bodyChild?.info?.[infoChildIndex];

            if (infoChild) {
                infoChild.detail = detail;
            }
        },
        editInfoChildDate: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, date } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state[pageNumber]?.[bodyChildIndex];
            const infoChild = bodyChild?.info?.[infoChildIndex];

            if (infoChild) {
                infoChild.date = date;
            }
        },
        editInfoChildMain: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, main } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state[pageNumber]?.[bodyChildIndex];
            const infoChild = bodyChild?.info?.[infoChildIndex];

            if (infoChild) {
                infoChild.main = main;
            }
        },
        editListChild: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, listChildIndex, value } = action.payload; // Desestructuramos los parámetros necesarios
        
            const bodyChild = state[pageNumber][bodyChildIndex]
            const infoChild = bodyChild.info[infoChildIndex]

            if (bodyChild && infoChild && Array.isArray(infoChild.list) && listChildIndex >= 0 && listChildIndex < infoChild.list.length) {
                infoChild.list[listChildIndex] = value;
            }
        },
    }
})

const {
    addBodyChild,
    addInfoChild, 
    addListChild, 
    addBodyChildByIndex, 
    addInfoChildByIndex, 
    addListChildByIndex, 
    deleteBodyChildByIndex, 
    deleteInfoChildByIndex, 
    deleteListChildByIndex,
    editTitleText,
    editInfoChildDetail,
    editInfoChildDate,
    editInfoChildMain,
    editListChild,
} = curriculumSlice.actions

const curriculumReducer = curriculumSlice.reducer

export {
    addBodyChild,
    addInfoChild,
    addListChild,
    addBodyChildByIndex,
    addInfoChildByIndex,
    addListChildByIndex,
    deleteBodyChildByIndex,
    deleteInfoChildByIndex,
    deleteListChildByIndex,
    editTitleText,
    editInfoChildDetail,
    editInfoChildDate,
    editInfoChildMain,
    editListChild,
    curriculumReducer
}