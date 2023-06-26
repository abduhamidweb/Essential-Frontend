import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
    isSaved: false,
    allProducts: [],
    category: "",
    allCategory: [],
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
        isSavedment: (state) => {
            state.isSaved = !state.isSaved
        },
        setAllProducts: (state, action) => {
            state.allProducts = action.payload;
        },
        setAllCategory: (state, action) => {
            state.allCategory = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, isSavedment, setAllProducts, setCategory, setAllCategory } = counterSlice.actions

export default counterSlice.reducer