import { createSlice } from "@reduxjs/toolkit"

const initialState = [
    [
        {
            title: {
                text: "",
                nameItem: "",
                classNameIcon: ""
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
]

export const curriculumSlice = createSlice({
    name: "curriculum",
    initialState,
    reducers: {
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
            if (state[pageNumber][bodyChildIndex] && state[pageNumber][bodyChildIndex].info[infoChildIndex]) { // Validamos que los índices sean válidos
                state[pageNumber][bodyChildIndex].info[infoChildIndex].list.push(listChild);
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
            if (state[pageNumber][bodyChildIndex]) { // Validamos que el índice sea válido
                if (infoChildIndex >= 0 && infoChildIndex <= state[pageNumber][bodyChildIndex].info.length) {
                    state[pageNumber][bodyChildIndex].info.splice(infoChildIndex, 0, infoChild);
                }
            }
        },
        addListChildByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, listChildIndex, listChild } = action.payload; // Desestructuramos los parámetros necesarios
            if (state[pageNumber][bodyChildIndex] && state[pageNumber][bodyChildIndex].info[infoChildIndex]) { // Validamos que los índices sean válidos
                if (listChildIndex >= 0 && listChildIndex <= state[pageNumber][bodyChildIndex].info[infoChildIndex].list.length) {
                    state[pageNumber][bodyChildIndex].info[infoChildIndex].list.splice(listChildIndex, 0, listChild);
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
            if (state[pageNumber][bodyChildIndex]) { // Validamos que el índice sea válido
                state[pageNumber][bodyChildIndex].info.splice(infoChildIndex,1);
            }
        },
        deleteListChildByIndex: (state, action) => {
            const { pageNumber, bodyChildIndex, infoChildIndex, listChildIndex } = action.payload; // Desestructuramos los parámetros necesarios
            if (state[pageNumber][bodyChildIndex] && state[pageNumber][bodyChildIndex].info[infoChildIndex]) { // Validamos que los índices sean válidos
                state[pageNumber][bodyChildIndex].info[infoChildIndex].list.splice(listChildIndex,1);
            }
        },
    }
})

const {addBodyChild, addInfoChild, addListChild, addBodyChildByIndex, addInfoChildByIndex, addListChildByIndex, deleteBodyChildByIndex, deleteInfoChildByIndex, deleteListChildByIndex} = curriculumSlice.actions

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
    curriculumReducer
}