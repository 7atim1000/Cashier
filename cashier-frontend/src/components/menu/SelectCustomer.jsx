import React, { useState, useEffect } from 'react' ;

import { motion } from 'framer-motion'

import { IoCloseCircle } from 'react-icons/io5';
import { useDispatch } from 'react-redux'
import { PiUserCircleCheckLight } from "react-icons/pi";

import { toast } from 'react-toastify'
import { enqueueSnackbar } from 'notistack';
import { setCustomer } from '../../redux/slices/customerSlice';
import { api } from '../../https';

const SelectCustomer = ({setIsSelectCustomer}) => {
    
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        guests :"" 
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };



    const handleClose = (customerId, customerName, contactNo, balance, guests) => {
        if(formData.guests === ''){
            enqueueSnackbar('please specify number of guests', {variant: "warning"});
            return;
        }

        dispatch(setCustomer({ customerId, customerName , contactNo, balance, guests }));
        setIsSelectCustomer(false);
    };

    const [list, setList] = useState([]);

    const fetchCustomers = async () => {
        try {
            const response = await api.get('/api/customers/')

            if (response.data.success) {
                setList(response.data.customers)
            } else {
                toast.error(response.data.message || 'customer not found')
            }

        } catch (error) {
            // Show backend error message if present in error.response
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message)
            }
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCustomers()
    }, []);



   return(
       
       <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center shadow-lg/10 z-50' style={{ backgroundColor:  'rgba(0, 0, 0, 0.4)'}}>

           <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               transition={{ durayion: 0.3, ease: 'easeInOut' }}
               className='bg-[#1a1a1a] p-6 rounded-lg shadow-lg/30 w-150 h-[calc(100vh-5rem)] md:mt-5 mt-5 
               border-b-2 border-[#e6e6e6] 
               border-l-6 border-[#e6e6e6] '
           >


               {/*Modal Header */}
               <div className="flex justify-between items-center mb-4">
                    <h2 className='text-sm font-semibold underline text-[#f6b100]'>Please select customer </h2>
                    <form>

                        <input
                            name ='guests'
                            value ={formData.guests}
                            onChange ={handleInputChange}
                            autoComplete='none'
                            placeholder ='Guests No'
                            className ='bg-[#262626] text-[#e6e6e6] p-1 rounded-lg text-sm font-medium'
                            required 
                        />

                  </form>
                   
                   <button onClick={()=> setIsSelectCustomer(false)} className='rounded-full  text-[#e6e6e6] hover:text-[#be3e3f] cursor-pointer'>
                       <IoCloseCircle size={25} />
                   </button>
               </div>

               {/*Modal Body*/}
               <div className='mt-5 bg-[#1f1f1f]'>


                   <div className='overflow-x-auto bg-[#1f1f1f]'>
                       <table className='text-left w-full'>
                           <thead className=''>
                               <tr className='border-b-1 border-[#e6e6e6] text-xs font-normal text-sky-400'>
                                   <th className='p-2'>Name</th>
                                   
                                   <th className='p-2'>Contact No</th>
                                   <th className='p-2'>Address</th>
                                   <th className='p-2'></th>
                                   <th className='p-2'></th>
                               </tr>
                           </thead>

                           <tbody>

                               {list.length === 0
                                   ? (<p className='ml-5 mt-5 text-xs text-[#be3e3f] flex items-start justify-start'>Your customers list is empty . Start adding customers !</p>)
                                   : list.map((customer, index) => (

                                       <tr
                                           // key ={index}
                                           className='border-b border-[#e6e6e6] text-xs font-normal text-[#e6e6e6]'
                                       >
                                           <td className='p-2' hidden>{customer._id}</td>
                                           <td className='p-4'>{customer.customerName}</td>
                                     
                                           <td className='p-2'>{customer.contactNo}</td>
                                           <td className='p-2'>{customer.address}</td>
                                           <td className={`p-2 ${customer.balance === 0 ? 'text-[#e6e6e6]' : 'text-[#be3e3f]'} text-sm font-bold`}>  {(Number(customer.balance) || 0).toFixed(2)}</td>
                                           <td className='p-2'>

                                               <button className={`text-red-700 cursor-pointer text-sm font-semibold`}>
                                                   <PiUserCircleCheckLight size={20} className='w-7 h-7 text-[#f6b100] rounded-full   flex justify-end'
                                                       onClick={() => handleClose(customer._id, customer.customerName, customer.contactNo ,customer.balance, formData.guests)} />
                                               </button>

                                           </td>

                                       </tr>

                                   ))}


                           </tbody>
                       </table>

                   </div>
               </div>

           </motion.div>
       </div>

   );
};


export default SelectCustomer ;
 
