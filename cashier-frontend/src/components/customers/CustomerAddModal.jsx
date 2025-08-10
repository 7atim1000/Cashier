import React, {useState} from 'react' 

import { motion } from 'framer-motion'
import { enqueueSnackbar } from 'notistack';
import { IoCloseCircle } from 'react-icons/io5'; 


import { useMutation } from '@tanstack/react-query'
import { addCustomer } from '../../https';


const CustomerAddModal = ({setIsAddCustomerModal}) => {
    
    const handleClose = () => {
        setIsAddCustomerModal(false);
    };

    const [formData, setFormData] = useState({
        customerName :"" , contactNo :"" , address :"" , balance :0
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)

        CustomerMutation.mutate(formData)
        window.location.reload()
        setIsAddCustomerModal(false)
    };


    const CustomerMutation = useMutation({
        mutationFn: (reqData) => addCustomer(reqData),
        onSuccess: (res) => {

            const { data } = res;
            //console.log(data)
            enqueueSnackbar(data.message, { variant: "success" });
        },

        onError: (error) => {
            const { response } = error;
            enqueueSnackbar(response.data.message, { variant: "error" });

            console.log(error);
        },
    });






    return(
        <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center  z-50' style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ durayion: 0.3, ease: 'easeInOut' }}
                className='bg-[#1f1f1f] p-6 rounded-lg shadow-lg/30 w-120 md:mt-5 mt-5 h-[calc(100vh-5rem)] overflow-y-scroll scrollbar-hidden'
            >


                {/*Modal Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className='text-sky-400 text-sm font-bold'>Add Customer</h2>
                    <button onClick={handleClose} className='rounded-full  text-[#be3e3f] cursor-pointer'>
                        <IoCloseCircle size={25} />
                    </button>
                </div>

                {/*Modal Body*/}
                <form className='mt-3 space-y-6' onSubmit={handleSubmit}>
                    <div className='mt-12'>
                        <label className='text-sky-400 block mb-2 mt-3 text-xs font-medium'>Customer Name :</label>
                        <div className='flex items-center rounded-lg p-2 px-4 bg-[#262626] shadow-lg/30'>
                            <input
                                type='text'
                                name='customerName'
                                value={formData.customerName}
                                onChange={handleInputChange}

                                placeholder='Enter customer name'
                                className='bg-transparent flex-1 text-white focus:outline-none text-xs font-normal text-sm font-semibold'
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>


                    <div>
                        <label className='text-sky-400 block mb-2 mt-3 text-xs font-medium'>Contact number : </label>
                        <div className='flex items-center rounded-lg p-2 px-4 bg-[#262626] shadow-lg/30'>
                            <input
                                type='text'
                                name='contactNo'
                                value={formData.contactNo}
                                onChange={handleInputChange}

                                placeholder='+971 9999999'
                                className='bg-transparent flex-1 text-white focus:outline-none text-xs font-normal text-sm font-semibold'
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>

                    <div>
                        <label className='text-sky-400 block mb-2 mt-3 text-xs font-medium'>Address : </label>
                        <div className='flex items-center rounded-lg p-2 px-4 bg-[#262626] shadow-lg/30'>
                            <input
                                type='text'
                                name='address'
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder='Enter address of customer'
                                className='bg-transparent flex-1 text-white focus:outline-none text-xs font-normal text-sm font-semibold'
                                required
                                autoComplete='none'
                            />

                        </div>
                    </div>

                    <div>
                        <label className='text-sky-400 block mb-2 mt-3 text-xs font-medium'>Balance : </label>
                        <div className='flex items-center rounded-lg p-2 px-4 bg-[#262626] shadow-lg/30'>
                            <input
                                type='text'
                                name='balance'
                                value={formData.balance}
                                onChange={handleInputChange}

                                placeholder='Enter opening balance of customer'
                                className='bg-transparent flex-1 text-white focus:outline-none text-xs font-normal text-sm font-semibold'
                                required
                                autoComplete='none'
                            />

                        </div>
                    </div>




                    <button
                        type='submit'
                        className='p-3 rounded-lg mt-6 py-3 text-sm bg-sky-400 text-[#1a1a1a] font-semibold cursor-pointer hover:bg-green-600 hover:text-white'
                    >
                        Add Customer
                    </button>


                </form>

            </motion.div>
        </div>
    );
};



export default CustomerAddModal;