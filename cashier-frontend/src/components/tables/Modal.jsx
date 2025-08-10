import React, {useState} from 'react'
import { motion } from 'framer-motion'
//npm install -g npm@11.3.0
// npm i framer-motion
import { GrClose } from "react-icons/gr";
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
            className ='bg-[#1f1f1f] p-6 rounded-lg shadow-lg w-96 h-[calc(100vh-5rem)]'
            >
            
            {/*Modal Header */}
            <div className ='flex justify-between items-center mb-4'>
                <h2 className ='text-sky-400 text-md font-semibold'>
                    Add Table
                </h2>
                <button onClick ={handleCloseModal} className ='text-[#be3e3f] font-bold text-sm '>
                    <GrClose size={20}/>
                </button>
            </div>

            {/*Modal Body */}
     
            <form className ='space-y-4 mt-10'  onSubmit ={handleSubmit}>

                <div>
                    <label htmlFor='' className ='block text-sky-400 mb-2 text-xs mt-5'>Table Number</label>
                        <div className = 'flex items-center rounded-lg p-5 px-4 bg-[#262626]'>
                            <input 
                                type='text'
                                name ='tabNo'
                                value  ={tableData.tabNo}
                                onChange ={handleInputChange}

                                placeholder ='Enter table number'
                                className ='bg-transparent flex-1 text-white focus:outline-none'
                                autoComplete='off'
                                required
                            />
                        </div>
                </div>

                <div>
                    <label className ='block text-sky-400 text-xs mb-2 mt-5'>Number of seats</label>
                        <div className ='flex items-center rounded-lg p-5 bg-[#262626]'>
                            <input
                            type ="number"
                            name ='seats'
                            value  ={tableData.seats}
                            onChange ={handleInputChange}

                            autoComplete ='off'
                            placeholder ="Number of seats"
                            className ='bg-transparent flex-1 text-white focus: outline-none'
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