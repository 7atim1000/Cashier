import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
    name : 'cart' ,    // name of collectoion or table

    initialState,
    reducers : {
    
        addItems : (state, action) => {     // addItems adding in menuContainer page in dispatch(addItems)
       // rether than fields or objects elements
            state.push(action.payload);
       },

        removeItem: (state, action) => {
            return state.filter(item => item.id != action.payload);
        },

        removeAllItems :(state) => {
            return [];
        }
    }
})

export const getTotalPrice = (state) => state.cart.reduce((total, item) => total + item.price, 0)  // , 0   if empty


export const { addItems, removeItem, removeAllItems} = cartSlice.actions;
export default cartSlice.reducer;
