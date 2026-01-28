import { Gas } from "@/components/gases/gas.info";
import { createSlice } from "@reduxjs/toolkit"

export type InitialStateType = {
    themeName: string
    gases: Gas[]
}


export const initialState: InitialStateType = {
    themeName: "prueba",
    gases: [
        {
            number: 0,
            name: "Oxygen",
            formula: "O2",
            molarFraction: 0.2
        },
        {
            number: 1,
            name: "Carbon dioxide",
            formula: "CO2",
            molarFraction: 0.1
        },
        {
            number: 2,
            name: "Nitrogen",
            formula: "N2",
            molarFraction: 0.3
        },
        {
            number: 3,
            name: "Hidrogen",
            formula: "H2",
            molarFraction: 0.25
        },
        {
            number: 4,
            name: "Water",
            formula: "H2O",
            molarFraction: 0.15
        },
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