import { SectionCentralBodyInfoType, SectionHeader, SectionSideBodyInfoType } from "@/components/template/curriculum.info";
import { createSlice } from "@reduxjs/toolkit"

export type InitialStateType = {
    themeName: string
    pages: {
        body: SectionCentralBodyInfoType[]
        header?: SectionHeader
        side: SectionSideBodyInfoType[]
    }[]
}

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

export const initialState: InitialStateType = {
    themeName: "blue-indigo",
    pages: [
        {
            body: [
                {
                    title: {
                        text: "Education",
                        nameIcon: "school",
                        classNameIcon: "material-symbols-outlined"
                    },
                    /* info: [
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
                    ], */
                    info: [
                        {
                            main: "Lorem Ipsum Degree",
                            detail: "Universidad de internet",
                            date: "2012-2016"
                        },
                        {
                            main: "Placeholder Bootcamp 30h Course",
                            detail: "Algún lugar - Online",
                            date: "2021"
                        },
                        {
                            main: "Lorem ipsum dolor 60h Course",
                            detail: "Algún lugar - Online",
                            date: "2021"
                        },
                        {
                            main: "Lorem Ipsum Creation & Design Course",
                            detail: "Algún lugar - Online",
                            date: "2021"
                        },
                        {
                            main: "Lorem ipsum dolor Course",
                            detail: "Algún lugar - Online",
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
    /*                 info: [
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
                    ], */
                    info: [
                        {
                            main: "Placeholder Skills",
                            detail: "Placeholder",
                            date: "2020",
                            list: [
                                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                                "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                            ]
                        },
                        {
                            main: "",
                            detail: "Placeholder",
                            date: "2020",
                            list: [
                                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                                "Lorem ipsum dolor sit amet consectetur adipisicing elit."
                            ]
                        },
                        {
                            main: "Placeholder Skills",
                            detail: "Placeholder",
                            date: "2020",
                            list: [
                                "Lorem ipsum dolor sit amet",
                                "Lorem ipsum dolor sit amet",
                                "Lorem ipsum dolor sit amet",
                                "Lorem ipsum dolor sit amet",
                                "Lorem ipsum dolor sit amet"
                            ]
                        },
                    ],
                }
            ],
            header : {
                photoUrl: "https://i.imgur.com/5H0KCsy.png",
                name: "Name Surname Surname",
                charge: "Your work",
                birthday: " 01-01-2000",
            },
            side: [
                {
                    title: {
                        text: "Contact",
                        nameIcon: "person",
                        classNameIcon: "material-symbols-outlined"
                    },
    /*                 info: [
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
                    ], */
                    info: [
                        {
                            icon: {
                                nameIcon: "mail",
                                classNameIcon: "material-symbols-outlined"
                            },
                            main: "lorem.ipsum@example.com",
                            aux: "",
                            mainType: 0
                        },
                        {
                            icon: {
                                nameIcon: "call",
                                classNameIcon: "material-symbols-outlined"
                            },
                            main: "123 456 789",
                            aux: "",
                            mainType: 0
                        },
                        {
                            icon: {
                                nameIcon: "computer",
                                classNameIcon: "material-symbols-outlined"
                            },
                            main: "github.com/place",
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
    /*                 info: [
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
                    ], */
                    info: [
                        {
                            icon: {
                                nameIcon: "",
                                classNameIcon: ""
                            },
                            main: "Lang 1",
                            aux: "Native",
                            mainType: 1
                        },
                        {
                            icon: {
                                nameIcon: "",
                                classNameIcon: ""
                            },
                            main: "Lang 2",
                            aux: "Intermediate",
                            mainType: 1
                        },
                        {
                            icon: {
                                nameIcon: "",
                                classNameIcon: ""
                            },
                            main: "Lang 3",
                            aux: "Professional",
                            mainType: 1
                        },
                        {
                            icon: {
                                nameIcon: "",
                                classNameIcon: ""
                            },
                            main: "Lang 4",
                            aux: "Amateur",
                            mainType: 1
                        }
                    ],
                },
                {
                    title: {
                        text: "Skills",
                        nameIcon: "code",
                        classNameIcon: "material-symbols-outlined"
                    },
    /*                 info: [
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
                    ], */
                    info: [
                        {
                            icon: {
                                nameIcon: "",
                                classNameIcon: ""
                            },
                            main: "Skill 1",
                            aux: "",
                            bar: "80%",
                            mainType: 2
                        },
                        {
                            icon: {
                                nameIcon: "",
                                classNameIcon: ""
                            },
                            main: "Skill 2",
                            aux: "",
                            bar: "70%",
                            mainType: 2
                        },
                        {
                            icon: {
                                nameIcon: "",
                                classNameIcon: ""
                            },
                            main: "Skill 3",
                            aux: "",
                            bar: "60%",
                            mainType: 2
                        },
                        {
                            icon: {
                                nameIcon: "",
                                classNameIcon: ""
                            },
                            main: "Skill 4",
                            aux: "",
                            bar: "30%",
                            mainType: 2
                        }
                    ],
                }
            
            ]
        }
    ]
}
const newInitialState: InitialStateType = JSON.parse(JSON.stringify(initialState))
const page = newInitialState.pages[0]
delete page.header
const bodyChild = page.body[1]
const infoChild = bodyChild.info[0]
const listChild = infoChild && infoChild.list && infoChild.list[0] || "listElement"

const sideBodyChild = page.side[0]
const sideBodyChild2 = page.side[1]
const sideBodyChild3 = page.side[2]

const sideInfoChild = sideBodyChild.info[1]
const sideInfoChild2 = sideBodyChild2.info[1]
const sideInfoChild3 = sideBodyChild3.info[1]

export const curriculumSlice = createSlice({
    name: "curriculum",
    initialState,
    reducers: {
        // Sincronize state with database
        sincronize: (_, action) => {
            return action.payload
        },
        // Theme
        selectTheme: (state, action) => {
            const {color} = action.payload
            state.themeName = color
        },
        // Add elements
        addPage: (state) => {
            state.pages.push(page);
        },
        addBodyChild: (state, action) => {
            const { pageNumber } = action.payload; // El nuevo objeto body que se quiere añadir
            state.pages[pageNumber].body.push(bodyChild);
        },
        addInfoChild: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex } = action.payload; // Desestructuramos los parámetros necesarios
            if (state.pages[pageNumber].body[bodyChildIndex]) { // Validamos que el índice sea válido
                state.pages[pageNumber].body[bodyChildIndex].info.splice(infoChildIndex+1, 0, infoChild);
            }
        },
        addListChild: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, listChild } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state.pages[pageNumber].body[bodyChildIndex]
            const infoChild = bodyChild.info[infoChildIndex]

            if (bodyChild && infoChild && infoChild.list) { // Validamos que los índices sean válidos
                infoChild.list.push(listChild);
            }
        },


        // Add by index
        addBodyChildByIndex: (state, action) => {
            console.log("hola")
            const { pageNumber, bodyChildIndex } = action.payload; // El nuevo objeto body que se quiere añadir
            if (bodyChildIndex >= 0 /* && bodyChildIndex < state[pageNumber].body.length */) {
                state.pages[pageNumber].body.splice(bodyChildIndex+1, 0, bodyChild);
            }
        },
        addInfoChildByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, infoChild } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state.pages[pageNumber].body[bodyChildIndex]
            if (bodyChild) { // Validamos que el índice sea válido
                if (infoChildIndex >= 0 && infoChildIndex <= bodyChild.info.length) {
                    bodyChild.info.splice(infoChildIndex, 0, infoChild);
                }
            }
        },
        addListChildByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, listChildIndex, /* listChild */ } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state.pages[pageNumber].body[bodyChildIndex]
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
            state.pages.splice(pageNumber,1);
        },
        deleteBodyChildByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex} = action.payload; // El nuevo objeto body que se quiere añadir
            state.pages[pageNumber].body.splice(bodyChildIndex,1);
            //state.filter((_,index) => bodyChildIndex !== index)
        },
        deleteInfoChildByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state.pages[pageNumber].body[bodyChildIndex]
            if (bodyChild) { // Validamos que el índice sea válido
                bodyChild.info.splice(infoChildIndex,1);
            }
        },
        deleteMainByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state.pages[pageNumber].body[bodyChildIndex]
            if (bodyChild) { // Validamos que el índice sea válido
                bodyChild.info[infoChildIndex].main = "";
            }
        },
        deleteDetailByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state.pages[pageNumber].body[bodyChildIndex]
            if (bodyChild) { // Validamos que el índice sea válido
                bodyChild.info[infoChildIndex].detail = "";
            }
        },
        deleteDateByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state.pages[pageNumber].body[bodyChildIndex]
            if (bodyChild) { // Validamos que el índice sea válido
                bodyChild.info[infoChildIndex].date = "";
            }
        },
        deleteListChildByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, listChildIndex } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state.pages[pageNumber].body[bodyChildIndex]
            const infoChild = bodyChild.info[infoChildIndex]

            if (bodyChild && infoChild && infoChild.list) { // Validamos que los índices sean válidos
                infoChild.list.splice(listChildIndex,1);
            }
        },

        // Edit texts
        editTitleText: (state, action) => {
            const { pageNumber, bodyChildIndex, value} = action.payload
            if(state.pages[pageNumber].body?.[bodyChildIndex]) {
                state.pages[pageNumber].body[bodyChildIndex].title.text = value;
            }
        },
        editInfoChildDetail: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, detail } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state.pages[pageNumber].body?.[bodyChildIndex];
            const infoChild = bodyChild?.info?.[infoChildIndex];

            if (infoChild) {
                infoChild.detail = detail;
            }
        },
        editInfoChildDate: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, date } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state.pages[pageNumber].body?.[bodyChildIndex];
            const infoChild = bodyChild?.info?.[infoChildIndex];

            if (infoChild) {
                infoChild.date = date;
            }
        },
        editInfoChildMain: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, main } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state.pages[pageNumber].body?.[bodyChildIndex];
            const infoChild = bodyChild?.info?.[infoChildIndex];

            if (infoChild) {
                infoChild.main = main;
            }
        },
        editListChild: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, listChildIndex, value } = action.payload; // Desestructuramos los parámetros necesarios
        
            const bodyChild = state.pages[pageNumber].body[bodyChildIndex]
            const infoChild = bodyChild.info[infoChildIndex]

            if (bodyChild && infoChild && Array.isArray(infoChild.list) && listChildIndex >= 0 && listChildIndex < infoChild.list.length) {
                infoChild.list[listChildIndex] = value;
            }
        },
        editIcon: (state, action) => {
            const { pageNumber, bodyChildIndex, nameIcon } = action.payload
            if(state.pages[pageNumber].body?.[bodyChildIndex]) {
                state.pages[pageNumber].body[bodyChildIndex].title.nameIcon = nameIcon;
            }
        },

        /* -----------------------------------------------------Header----------------------------------------------------- */
        editPhotoUrl: (state, action) => {
            const {photoUrl, pageNumber} = action.payload
            if(pageNumber === 0 && state.pages[pageNumber].header) {
                state.pages[pageNumber].header!.photoUrl = photoUrl;
            }
        },
        editName: (state, action) => {
            const { pageNumber, value} = action.payload
            if(pageNumber === 0 && state.pages[pageNumber].header) {
                state.pages[pageNumber].header!.name = value;
            }
        },
        editCharge: (state, action) => {
            const { pageNumber, value} = action.payload
            if(pageNumber === 0 && state.pages[pageNumber].header) {
                state.pages[pageNumber].header!.charge = value;
            }
        },
        editBirthday: (state, action) => {
            const { pageNumber, value} = action.payload
            if(pageNumber === 0 && state.pages[pageNumber].header) {
                state.pages[pageNumber].header!.birthday = value;
            }
        },

        /* ------------------------------------------------------Side------------------------------------------------------ */
        addSideBodyChildByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex } = action.payload; // El nuevo objeto body que se quiere añadir
            if (bodyChildIndex >= 0 && bodyChildIndex < state.pages[pageNumber].body.length) {
                state.pages[pageNumber].side.splice(bodyChildIndex+1, 0, sideBodyChild);
            }
        },
        addSideBodyChildByIndex2: (state, action) => {
            const { pageNumber, bodyChildIndex } = action.payload; // El nuevo objeto body que se quiere añadir
            if (bodyChildIndex >= 0 && bodyChildIndex < state.pages[pageNumber].body.length) {
                state.pages[pageNumber].side.splice(bodyChildIndex+1, 0, sideBodyChild2);
            }
        },
        addSideBodyChildByIndex3: (state, action) => {
            const { pageNumber, bodyChildIndex } = action.payload; // El nuevo objeto body que se quiere añadir
            if (bodyChildIndex >= 0 && bodyChildIndex < state.pages[pageNumber].body.length) {
                state.pages[pageNumber].side.splice(bodyChildIndex+1, 0, sideBodyChild3);
            }
        },
        addSideInfoChildByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex } = action.payload; // El nuevo objeto body que se quiere añadir
            if (state.pages[pageNumber].side[bodyChildIndex]) { // Validamos que el índice sea válido
                state.pages[pageNumber].side[bodyChildIndex].info.splice(infoChildIndex+1, 0, sideInfoChild);
            }
        },
        addSideInfoChildByIndex2: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex } = action.payload; // El nuevo objeto body que se quiere añadir
            if (state.pages[pageNumber].side[bodyChildIndex]) { // Validamos que el índice sea válido
                state.pages[pageNumber].side[bodyChildIndex].info.splice(infoChildIndex+1, 0, sideInfoChild2);
            }
        },
        addSideInfoChildByIndex3: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex } = action.payload; // El nuevo objeto body que se quiere añadir
            if (state.pages[pageNumber].side[bodyChildIndex]) { // Validamos que el índice sea válido
                state.pages[pageNumber].side[bodyChildIndex].info.splice(infoChildIndex+1, 0, sideInfoChild3);
            }
        },
        deleteSideBodyChildByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex} = action.payload; // El nuevo objeto body que se quiere añadir
            state.pages[pageNumber].side.splice(bodyChildIndex,1);
            //state.filter((_,index) => bodyChildIndex !== index)
        },
        deleteSideInfoChildByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state.pages[pageNumber].side[bodyChildIndex]
            if (bodyChild) { // Validamos que el índice sea válido
                bodyChild.info.splice(infoChildIndex,1);
            }
        },
        deleteAuxByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state.pages[pageNumber].side[bodyChildIndex]
            if (bodyChild) { // Validamos que el índice sea válido
                bodyChild.info[infoChildIndex].aux = "";
            }
        },
        editSideTitleText: (state, action) => {
            const { pageNumber, bodyChildIndex, value} = action.payload
            if(state.pages[pageNumber].side?.[bodyChildIndex]) {
                state.pages[pageNumber].side[bodyChildIndex].title.text = value;
            }
        },
        editSideInfoChildMain: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, main } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state.pages[pageNumber].side?.[bodyChildIndex];
            const infoChild = bodyChild?.info?.[infoChildIndex];

            if (infoChild) {
                infoChild.main = main;
            }
        },
        editInfoChildAux: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, aux } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state.pages[pageNumber].side?.[bodyChildIndex];
            const infoChild = bodyChild?.info?.[infoChildIndex];

            if (infoChild) {
                infoChild.aux = aux;
            }
        },
        editBarWidth: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, barWidth } = action.payload; // Desestructuramos los parámetros necesarios
            const bodyChild = state.pages[pageNumber].side?.[bodyChildIndex];
            const infoChild = bodyChild?.info?.[infoChildIndex];

            if (infoChild) {
                infoChild.bar = barWidth;
            }
        },
        editSideIcon: (state, action) => {
            const { pageNumber, bodyChildIndex, nameIcon } = action.payload
            if(state.pages[pageNumber].side?.[bodyChildIndex]) {
                state.pages[pageNumber].side[bodyChildIndex].title.nameIcon = nameIcon;
            }
        },
        editSideInfoIcon: (state, action) => {
            const { pageNumber, bodyChildIndex, nameIcon, infoChildIndex } = action.payload
            const bodyChild = state.pages[pageNumber].side?.[bodyChildIndex];
            const infoChild = bodyChild?.info?.[infoChildIndex];

            if(infoChild) {
                infoChild.icon.nameIcon = nameIcon;
            }
        },
    }
})

const {
    sincronize,
    selectTheme,
    /* Body */
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
    editIcon,
    /* Header */
    editPhotoUrl,
    editName,
    editCharge,
    editBirthday,
    /* Side */
    addSideBodyChildByIndex, 
    addSideBodyChildByIndex2,
    addSideBodyChildByIndex3,
    addSideInfoChildByIndex, 
    addSideInfoChildByIndex2,
    addSideInfoChildByIndex3,
    deleteSideBodyChildByIndex,
    deleteSideInfoChildByIndex,
    deleteAuxByIndex,
    editSideInfoChildMain,
    editSideTitleText,
    editInfoChildAux,
    editBarWidth,
    editSideIcon,
    editSideInfoIcon,
} = curriculumSlice.actions

const curriculumReducer = curriculumSlice.reducer

export {
    sincronize,
    selectTheme,
    /* Body */
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
    editIcon,
    /* Header */
    editPhotoUrl,
    editName,
    editCharge,
    editBirthday,
    /* Side */
    addSideBodyChildByIndex, 
    addSideBodyChildByIndex2,
    addSideBodyChildByIndex3,
    addSideInfoChildByIndex, 
    addSideInfoChildByIndex2,
    addSideInfoChildByIndex3,
    deleteSideBodyChildByIndex,
    deleteSideInfoChildByIndex,
    deleteAuxByIndex,
    editSideInfoChildMain,
    editSideTitleText,
    editInfoChildAux,
    editBarWidth,
    editSideIcon,
    editSideInfoIcon,
    curriculumReducer
}