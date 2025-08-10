import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   // _id: "",
    seats: ""

}


const tableSlice = createSlice({
    name: "table",

    initialState,

    reducers: {
        
        setTable: (state, action) => {

            const {  seats } = action.payload;
          
            state.seats = seats;
       

        },
 
  
    }
})


export const { setTable } = tableSlice.actions ;
export default tableSlice.reducer ;