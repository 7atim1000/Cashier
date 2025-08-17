import React, {useState} from 'react'
import { motion } from 'framer-motion'
//npm install -g npm@11.3.0
// npm i framer-motion
import { IoCloseCircle } from 'react-icons/io5';
import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

import { addTable } from '../../https';


const Modal = ({setIsAddTableModal}) => {
   
    const [tableData, setTableData] = useState({
       tabNo :"", seats :""
    });

    const handleInputChange =(e) => {
    //    setTableData({...tableData, [e.target.name]: e.target.value})
        const {name, value} = e.target;
        setTableData((prev) => ({...prev, [name]: value}))   
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(tableData);

        tableMutation.mutate(tableData);
    }

    const tableMutation = useMutation({
        mutationFn :(reqData) => addTable(reqData),
        
        onSuccess: (data) => {
            setIsAddTableModal(false);
          //  console.log(data);
            enqueueSnackbar(data.message, { variant: "success" })
            
        },
        onError: (error) => {
            const { data } = error.response;
            enqueueSnackbar(data.message, { variant: "error" })
            console.log(error)
        }
     });



    const handleCloseModal = ()=>{
        setIsAddTableModal(false)
    }

    


    return (
        <div className ='fixed inset-0  bg-opacity-50 flex items-center justify-center z-50' style={{ backgroundColor:  'rgba(0, 0, 0, 0.4)'}}>
            <motion.div 

            initial={{opacity :0, scale :0.9}}
            animate= {{opacity :1, scale: 1}}
            exit={{opacity: 0, scale: 0.9}}
            transition={{duration: 0.3, ease: "easeInOut"}}
            className ='bg-[#1f1f1f] p-2 rounded-lg shadow-lg w-96 h-[calc(100vh-5rem)] border-b-3 border-[#0ea5e9]'
            >
            
            {/*Modal Header */}
            <div className ='flex justify-between items-center  bg-[#383838] p-2 rounded-md'>
                <h2 className ='text-[#f5f5f5] text-sm font-semibold'>
                    New Table
                </h2>
                <button onClick ={handleCloseModal} className ='rounded-full  text-white hover:text-[#be3e3f] cursor-pointer'>
                    <IoCloseCircle size={20}/>
                </button>
            </div>

            {/*Modal Body */}
     
            <form className ='space-y-4 mt-10'  onSubmit ={handleSubmit}>

                <div className ='mt-12 flex items-center justify-between'>
                    <label htmlFor='' className ='w-[30%] text-[#0ea5e9] block mb-2 mt-3 text-xs font-medium'>Table Number</label>
                        <div className = 'w-[70%] flex items-center  p-3 bg-[#1f1f1f] shadow-xl'>
                            <input 
                                type='text'
                                name ='tabNo'
                                value  ={tableData.tabNo}
                                onChange ={handleInputChange}

                                placeholder ='Enter table number'
                                className ='bg-transparent text-white focus:outline-none text-xs font-normal font-semibold border-b border-[#0ea5e9] w-full'
                                autoComplete='off'
                                required
                            />
                        </div>
                </div>

                <div className='mt-12 flex items-center justify-between'>
                    <label className ='w-[30%] text-[#0ea5e9] block mb-2 mt-3 text-xs font-medium'>Number of seats</label>
                        <div className ='w-[70%] flex items-center  p-3 bg-[#1f1f1f] shadow-xl'>
                            <input
                            type ="number"
                            name ='seats'
                            value  ={tableData.seats}
                            onChange ={handleInputChange}

                            autoComplete ='off'
                            placeholder ="Number of seats"
                            className ='bg-transparent text-white focus:outline-none text-xs font-normal font-semibold border-b border-[#0ea5e9] w-full'
                            required
                            
                            />
                        </div>
                </div>


                <button
                type ="submit"
                className ='w-full rounded-lg mt-6 py-3 text-medium bg-sky-400 text-[#1a1a1a] font-semibold'
                >
                Add Table
                </button>

            </form>
            </motion.div>

        </div>
    )
 }


 export default Modal ;