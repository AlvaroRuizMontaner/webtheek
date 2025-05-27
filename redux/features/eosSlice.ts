import { SystemState } from "@/types/eos";
import { createSlice } from "@reduxjs/toolkit";


export const initialState: SystemState = {
    gases: [
        {
            name: "Carbon Dioxide",
            formula: "CO2",
            molarFraction: 0.45,
            molarMass: 0.0440095,
            Tc: 304.1282,
            Pc: 7.3773e6,
            omega: 0.225
        },
        {
            name: "Oxygen",
            formula: "O2",
            molarFraction: 0.55,
            molarMass: 0.031998,
            Tc: 154.581,
            Pc: 5.043e6,
            omega: 0.318
        },
/*         {
            name: "Nitrogen",
            formula: "N2",
            molarFraction: 0.3,
            molarMass: 0.02802,
            Tc: 126.2,
            Pc: 3.39e6,
            omega: 0.039
        },
        {
            name: "Hydrogen",
            formula: "H2",
            molarFraction: 0.25,
            molarMass: 0.00201568,
            Tc: 32.938,
            Pc: 12.8e5,
            omega: -0.216
        },
        {
            name: "Water",
            formula: "H2O",
            molarFraction: 0.15,
            molarMass: 0.01801528,
            Tc: 647.096,
            Pc: 22.064e6,
            omega: 0.344
        }, */
    ]
}

export const eosSlice = createSlice({
    name: "eos",
    initialState,
    reducers: {
        // Sincronize state with database
        sincronizeGases: (_, action) => {
            return action.payload
        },
        addGas: (state, action) => {
            const gas = action.payload
            state.gases.push(gas);
        },
        addGasByIndex: (state, action) => {
            const {gas, gasIndex} = action.payload
            state.gases.splice(gasIndex+1, 0, gas);
        },
        deleteGas: (state, action) => {
            const { gasIndex } = action.payload; // El nuevo objeto body que se quiere añadir
            state.gases.splice(gasIndex, 1);
        },
        editGasMolarfraction: (state, action) => {
            const {newMolarFraction, gasIndex} = action.payload
            if (state.gases[gasIndex]) { // Validamos que el índice sea válido
                state.gases[gasIndex].molarFraction = newMolarFraction;
            }
        },
    }
})

export const {
    sincronizeGases,
    addGas,
    addGasByIndex,
    deleteGas,
    editGasMolarfraction,
} = eosSlice.actions

export const eosReducer = eosSlice.reducer