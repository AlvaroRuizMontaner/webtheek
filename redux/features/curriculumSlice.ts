import { createSlice } from "@reduxjs/toolkit"

const initialState = [
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

export const curriculumSlice = createSlice({
    name: "curriculum",
    initialState,
    reducers: {
        addBodyChild: (state, action) => {
            const bodyChild = action.payload; // El nuevo objeto body que se quiere añadir
            state.push(bodyChild);
        },
        addInfoChild: (state, action) => {
            const { bodyChildIndex, infoChild } = action.payload; // Desestructuramos los parámetros necesarios
            if (state[bodyChildIndex]) { // Validamos que el índice sea válido
                state[bodyChildIndex].info.push(infoChild);
            }
        },
        addListChild: (state, action) => {
            const { bodyChildIndex, infoChildIndex, listChild } = action.payload; // Desestructuramos los parámetros necesarios
            if (state[bodyChildIndex] && state[bodyChildIndex].info[infoChildIndex]) { // Validamos que los índices sean válidos
                state[bodyChildIndex].info[infoChildIndex].list.push(listChild);
            }
        },


        // Add by index
        addBodyChildByIndex: (state, action) => {
            const {bodyChild, bodyChildIndex} = action.payload; // El nuevo objeto body que se quiere añadir
            if (bodyChildIndex >= 0 && bodyChildIndex < state.length) {
                state.splice(bodyChildIndex, 0, bodyChild);
            }
        },
        addInfoChildByIndex: (state, action) => {
            const { bodyChildIndex, infoChildIndex, infoChild } = action.payload; // Desestructuramos los parámetros necesarios
            if (state[bodyChildIndex]) { // Validamos que el índice sea válido
                if (infoChildIndex >= 0 && infoChildIndex <= state[bodyChildIndex].info.length) {
                    state[bodyChildIndex].info.splice(infoChildIndex, 0, infoChild);
                }
            }
        },
        addListChildByIndex: (state, action) => {
            const { bodyChildIndex, infoChildIndex, listChildIndex, listChild } = action.payload; // Desestructuramos los parámetros necesarios
            if (state[bodyChildIndex] && state[bodyChildIndex].info[infoChildIndex]) { // Validamos que los índices sean válidos
                if (listChildIndex >= 0 && listChildIndex <= state[bodyChildIndex].info[infoChildIndex].list.length) {
                    state[bodyChildIndex].info[infoChildIndex].list.splice(listChildIndex, 0, listChild);
                }
            }
        },


        // Delete by index
        deleteBodyChildByIndex: (state, action) => {
            const bodyChildIndex = action.payload; // El nuevo objeto body que se quiere añadir
            state.splice(bodyChildIndex,1);
            //state.filter((_,index) => bodyChildIndex !== index)
        },
        deleteInfoChildByIndex: (state, action) => {
            const { bodyChildIndex, infoChildIndex } = action.payload; // Desestructuramos los parámetros necesarios
            if (state[bodyChildIndex]) { // Validamos que el índice sea válido
                state[bodyChildIndex].info.splice(infoChildIndex,1);
            }
        },
        deleteListChildByIndex: (state, action) => {
            const { bodyChildIndex, infoChildIndex, listChildIndex } = action.payload; // Desestructuramos los parámetros necesarios
            if (state[bodyChildIndex] && state[bodyChildIndex].info[infoChildIndex]) { // Validamos que los índices sean válidos
                state[bodyChildIndex].info[infoChildIndex].list.splice(listChildIndex,1);
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