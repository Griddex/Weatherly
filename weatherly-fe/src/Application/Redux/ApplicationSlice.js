import { createSlice } from "@reduxjs/toolkit";
import applicationState from "./State";
export var applicationSlice = createSlice({
    name: "application",
    initialState: applicationState,
    reducers: {
        persistCityOption: function (state, action) {
            state.selectedCityOption = action.payload;
        },
    },
});
export var persistCityOption = applicationSlice.actions.persistCityOption;
export default applicationSlice.reducer;
