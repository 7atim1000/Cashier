import { configureStore } from "@reduxjs/toolkit";
import customerSlice from './slices/customerSlice';
import cartSlice from './slices/cartSlice';
import userSlice from './slices/userSlice';

import tableSlice from './slices/tableSlice';

const store = configureStore({
    reducer : {
        customer: customerSlice,
        cart : cartSlice,
        user : userSlice,
        
        table : tableSlice
    },

    devTools: import.meta.env.NODE_ENV !== 'production',
    // this code to see data in redux store
});

export default store;