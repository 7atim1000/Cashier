import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getAvatarName, getBgColor } from '../../utils';
import { useDispatch } from 'react-redux';
import { updateTable } from '../../redux/slices/customerSlice';
import { MdArrowRight } from "react-icons/md";

import { setTable } from '../../redux/slices/tableSlice';

// was key rether than id 
const TableCard = ({id, name, status, initials, seats}) => {
    // for redux
    const dispatch = useDispatch();
    //
    const navigate = useNavigate();

          

    const handleClick = (name) => {  // change onClick table "name" on menu SCREEN
        
        if (status === 'Booked') return;
        // else
        const table = { tableId: id, tableNo: name}
        
        // was tableNo: name
        dispatch(updateTable({table})) // name object or field in TABLES collection -- go to menu page
        dispatch(setTable({seats}))    // to move seats 
    
        navigate('/menu')
    }

    return (
    // was key={key} rether than key={id}
    <div onClick ={() => handleClick(name)} key={id} className ='w-[270px]  h-[195px] bg-[#1f1f1f] hover:bg-[#2c2c2c] p-4 rounded-lg cursor-pointer shadow-lg/30 mb-3 mt-2'>
        
        <div className ='flex  gap-1 items-center justify-between px-1 '>

            <h1 className ='text-sky-400 text-lg font-semibold'><span className ='text-xs font-normal text-[#e6e6e6]'>Tabel</span> <MdArrowRight className ='inline ml-2 text-[#f6b100]' size={25}/> {name}</h1>
            <p className={`${status==='Booked' ? 'text-[#be3e3f] bg-red-100'
            : 'text-green-600 bg-green-100' } px-2 py-1 text-xs font-semibold rounded-lg`}>{status}</p>

        </div>


    {/*bg-[#025cca] */}
        <div className ='flex items-center justify-center mt-5 mb-5'>
            <h1 className ={`text-white rounded-full p-4 text-sm`} style ={{ backgroundColor: name ? getBgColor(): "#1f1f1f"}}>{getAvatarName(name) || ' N/A'}</h1>
        </div>

        <p className ='text-[#ababab] text-sm'>Seats : <span className ='text-[#e6e6e6] text-lg'> {seats}</span></p>

  
        
    </div>
    )
    
}

export default TableCard;