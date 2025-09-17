import { SystemState } from "@/types/eos";
import { createSlice } from "@reduxjs/toolkit";

const volumes: number[] = [];
for (let v = 1.7e-5; v <= 2.32e-4 + 1e-12; v += 1e-6) {
  volumes.push(Number(v.toExponential(6))); // redondea a 6 cifras
}


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
    ],
    temperatures: {
        data: [
            25
        ],
        increment: 25
    },
    pressures: {
        data: [ 
            5e5, 10e5, 15e5, 20e5, 25e5, 30e5, 35e5, 40e5, 45e5, 50e5, 55e5, 60e5, 65e5, 70e5, 75e5, 80e5, 85e5, 90e5
        ],
        increment: 1e5
    },
    volumes: {
        data: /* [
            3.20050097e-05, 3.68130904e-05, 4.23434842e-05, 4.87047036e-05,
            5.60215626e-05, 6.44376260e-05, 7.41180263e-05, 8.52527034e-05,
            9.80601319e-05, 1.12791608e-04, 1.29736178e-04, 1.49226315e-04,
            1.71644435e-04, 1.97430407e-04, 2.27090180e-04, 2.61205711e-04,
            3.00446385e-04, 3.45582145e-04, 3.97498606e-04, 4.57214425e-04
        ], */
        volumes,
        increment: 1e-5
    }
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
            if (state.gases[gasIndex]) { // Validamos que el índice sea válido
                state.gases.splice(gasIndex+1, 0, gas);
            }
        },
        editGasByIndex: (state, action) => {
            const {gas, gasIndex} = action.payload
            if (state.gases[gasIndex]) { // Validamos que el índice sea válido
                state.gases[gasIndex] = gas;
            }
        },
        deleteGas: (state, action) => {
            const { gasIndex } = action.payload;
            state.gases.splice(gasIndex, 1);
        },
        editGasMolarfraction: (state, action) => {
            const {newMolarFraction, gasIndex} = action.payload
            if (state.gases[gasIndex]) { // Validamos que el índice sea válido
                state.gases[gasIndex].molarFraction = newMolarFraction;
            }
        },

        //Temperatures
        addTemperature: (state, action) => {
            const temperature = action.payload
            state.temperatures.data.push(temperature);
        },
        editTemperatureByIndex: (state, action) => {
            const {temperature, temperatureIndex} = action.payload
            if (Number.isFinite(state.temperatures.data[temperatureIndex])) { // Validamos que el índice sea válido
                state.temperatures.data[temperatureIndex] = parseFloat(temperature);
            }
        },
        deleteTemperatureByIndex: (state, action) => {
            const { temperatureIndex } = action.payload;
            if (Number.isFinite(state.temperatures.data[temperatureIndex])) { // Validamos que el índice sea válido
                state.temperatures.data.splice(temperatureIndex, 1);
            }
        },
        plusIncrementTemperature: (state) => {
            const currentIncrement = state.temperatures.increment
            state.temperatures.increment =  currentIncrement + 25
        },
        minusIncrementTemperature: (state) => {
            const currentIncrement = state.temperatures.increment
            state.temperatures.increment =  currentIncrement - 25
        },

        // Pressures
        addPressure: (state, action) => {
            const pressure = action.payload
            state.pressures.data.push(pressure);
        },
        editPressureByIndex: (state, action) => {
            const {pressure, pressureIndex} = action.payload
            if (state.pressures.data[pressureIndex]) { // Validamos que el índice sea válido
                state.pressures.data[pressureIndex] = parseFloat(pressure);
            }
        },
        deletePressureByIndex: (state, action) => {
            const { pressureIndex } = action.payload;
            if (state.pressures.data[pressureIndex]) { // Validamos que el índice sea válido
                state.pressures.data.splice(pressureIndex, 1);
            }
        },
        plusIncrementPressure: (state) => {
            const currentIncrement = state.pressures.increment
            state.pressures.increment =  currentIncrement + 5e5
        },
        minusIncrementPressure: (state) => {
            const currentIncrement = state.pressures.increment
            state.pressures.increment =  currentIncrement - 5e5
        },


        // Volumes
        addVolume: (state, action) => {
            const volume = action.payload
            state.volumes.data.push(volume);
        },
        editVolumeByIndex: (state, action) => {
            const {volume, volumeIndex} = action.payload
            if (state.volumes.data[volumeIndex]) { // Validamos que el índice sea válido
                state.volumes.data[volumeIndex] = parseFloat(volume);
            }
        },
        deleteVolumeByIndex: (state, action) => {
            const { volumeIndex } = action.payload;
            if (state.volumes.data[volumeIndex]) { // Validamos que el índice sea válido
                state.volumes.data.splice(volumeIndex, 1);
            }
        },
        plusIncrementVolume: (state) => {
            const currentIncrement = state.volumes.increment
            state.volumes.increment =  currentIncrement + 1e-5
        },
        minusIncrementVolume: (state) => {
            const currentIncrement = state.volumes.increment
            state.volumes.increment =  currentIncrement - 1e-5
        },

        // All
        deleteAll: (state, action) => {
            const dataName: 'pressures' | 'temperatures' | 'volumes' = action.payload;
            state[dataName].data = [];
        },


    }
})

export const {
    sincronizeGases,
    addGas,
    addGasByIndex,
    editGasByIndex,
    deleteGas,
    editGasMolarfraction,
    //Temperatures
    addTemperature,
    editTemperatureByIndex,
    deleteTemperatureByIndex,
    plusIncrementTemperature,
    minusIncrementTemperature,
    //Pressures
    addPressure,
    editPressureByIndex,
    deletePressureByIndex,
    plusIncrementPressure,
    minusIncrementPressure,
    //Volumes
    addVolume,
    editVolumeByIndex,
    deleteVolumeByIndex,
    plusIncrementVolume,
    minusIncrementVolume,

    deleteAll
} = eosSlice.actions

export const eosReducer = eosSlice.reducer