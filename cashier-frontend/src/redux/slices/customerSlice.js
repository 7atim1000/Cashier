import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderId: '',

    customerId :"",
    customerName: '',
    
    contactNo : "",
    address :"",
    balance : "",
    guests: 0,

    table: null
}

const customerSlice = createSlice({
    name : 'customer',     // name of collection or table
 
    initialState,
    reducers : {
      
        setCustomer: (state, action) => {
            
            const { customerId, customerName, contactNo, address, balance, guests } = action.payload; 
            
            state.orderId = `${Date.now()}`;

            state.customerId = customerId ;
            state.customerName = customerName ;
      
            state.contactNo = contactNo;
            state.address = address;
            state.balance = balance;
            state.guests = guests;
           // state.table.tableId = table ;
           
        },
        
        removeCustomer: (state) => { 

            state.customerId = '',
            state.customerName = '',
     
            state.contactNo = '',
            state.address = '',
            state.balance = '',
            state.guests = '',

            //state.tableNo = ''
            state.table = null; 
        },



        updateTable: (state, action) => {
            //state.tableNo = action.payload.tableNo;
            state.table = action.payload.table;
        } 



    }
})


export const { setCustomer, removeCustomer, updateTable } = customerSlice.actions;
export default customerSlice.reducer;