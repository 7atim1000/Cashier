import React, { useState } from 'react'

import { motion } from 'framer-motion'
import { IoCloseCircle } from "react-icons/io5";

import { useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { addOrder, addTransaction, updateCustomer } from '../../https';
import { toast } from 'react-toastify'
import PaymentInvoice from './PaymentInvoice';


const CustomerPayment = ({setIsPaymentModal}) => {
    const customerData = useSelector((state) => state.customer);
    const userData = useSelector((state) => state.user)

    const [formData, setFormData] = useState({
        payed : 0 ,  description :''  ,  
        date: new Date().toISOString().slice(0, 10)
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name] : value}));
    };
    
    const handleClose = () => {
        setIsPaymentModal(false)
    };


    const [paymentMethod, setPaymentMethod] = useState();
      
    //  Invoice
    const [paymentInvoice, setPaymentInvoice] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState();
    /////////////////


    const handlePlaceOrder = async () => {

        if (!paymentMethod) {
            toast.warning('Please select payment method !')
            return;
        }
        if (formData.payed === 0 ) {
            toast.warning('Please specified payment amount !')
            return;
        }

        if (paymentMethod === "Cash" || paymentMethod === 'Online') {

            const paymentOrderData = {

                invoiceNumber : `${Date.now()}`,
                type :'customersPayment',
                orderStatus: "Completed",
                invoiceType: "customersPayment",

                customer: customerData.customerId,
                //customerName : customerData.customerName ,

                 customerDetails: {
                 name: customerData.customerName,
             
                },

                bills: {
                    total: 0,
                    tax: 0,
                    totalWithTax: 0,
                    payed : formData.payed,
                    balance: 0
                },

                // to save New Items || NEEDED
                items: null,
                paymentMethod: paymentMethod,

                // date :  new Date(formData.date + 'T00:00:00Z').toISOString().slice(0, 10)
                date :formData.date,
                user: userData._id

            };

            setTimeout(() => {
                paymentMutation.mutate(paymentOrderData);
            }, 1500);

        }
    };

    const paymentMutation = useMutation({
        mutationFn: (reqData) => addOrder(reqData),

        onSuccess: (resData) => {
            const { data } = resData.data; // data comes from backend ... resData default on mutation
            console.log(data);

            setPaymentInfo(data)  // to show details in report            

            toast.success('Customer payment confirm successfully .');

            // transfer to financial 
             const transactionData = {   
                
                transactionNumber :`${Date.now()}`,
                amount :formData.payed,
                type :'Income',
                category :'customerPayment',
                refrence :customerData.customerName,
                description : '-',
                date : formData.date,
                user : userData._id
                    
                }
    
                setTimeout(() => {
                    transactionMutation.mutate(transactionData)
                }, 1500)


           

            // Update customer 
            const balanceData = {
                balance: customerData.balance - formData.payed,
                customerId: customerData.customerId  
            }

            setTimeout(() => {
                customerUpdateMutation.mutate(balanceData)
            }, 1500)

            setPaymentInvoice(true); // to open report 
            setPaymentMethod('')

        },


        onError: (error) => {
            console.log(error);
        }
    });

    // update Customer balance ...

    const customerUpdateMutation = useMutation({

        mutationFn: (reqData) => updateCustomer(reqData),
        onSuccess: (resData) => {

            console.log(resData);

        },
        onError: (error) => {
            console.log(error)
        }
    });

    // add transaction  ...
    const transactionMutation = useMutation({
        mutationFn: (reqData) => addTransaction(reqData),

        onSuccess: (resData) => {
            const { data } = resData.data; // data comes from backend ... resData default on mutation
            //console.log(data);       
            toast.success('The revenue was transferred to the finance department .');
        },
        onError: (error) => {
            console.log(error);
        }
    });


    return (
        <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center z-50' style={{ backgroundColor:  'rgba(0, 0, 0, 0.4)'}} >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ durayion: 0.3, ease: 'easeInOut' }}
                className='bg-[#1f1f1f] p-2 rounded-lg  w-120 md:mt-5 mt-5 h-[calc(100vh-3rem)] border-b-3 border-[#0ea5e9]'
            >

                {/*Modal Header */}
                <div className="flex justify-between items-center  bg-[#383838] p-2 rounded-md">

                    <div className ='flex flex-col gap-2'>
                        <h2 className='text-[#f5f5f5] text-md font-medium'>Customers Payment</h2>
                        <p className='text-sm text-[#f5f5f5] font-normal'> 
                            <span className='text-[#0ea5e9] font-normal text-sm'>Make a payment to the customer : </span> 
                            {customerData.customerName}
                        </p>
                        <p className='text-sm text-[#0ea5e9] font-normal'> 
                            <span className='text-[#f5f5f5] font-normal text-md font-medium'>he has debt of : </span> 
                            {customerData.balance.toFixed(2)}
                            <span className='text-xs font-normal text-[#f5f5f5]'> AED</span></p>
                    </div>
                    <button onClick={handleClose} className='rounded-full  text-white hover:text-[#be3e3f] cursor-pointer'>
                        <IoCloseCircle size={25} />
                    </button>
                
                </div>

                {/*Modal Body  onSubmit={handlePlaceOrder}*/}
                <form className='mt-5 space-y-6' >

                    <div className='mt-12 flex items-center justify-between'>
                        <label className='w-[15%] text-[#0ea5e9] block mb-2 mt-3 text-xs font-medium'>Date :</label>
                        <div className='w-[85%] flex items-center  p-3 bg-[#1f1f1f] shadow-xl'>
                            <input
                                type='date'
                                name='date'
                                value={formData.date}
                                onChange={handleInputChange}

                                placeholder='Enter date'
                                className='bg-transparent text-white focus:outline-none text-xs font-normal font-semibold border-b border-[#0ea5e9] w-full'
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <label className='w-[15%] text-[#0ea5e9] block mb-2 mt-3 text-xs font-medium'>Amount :</label>
                        <div className='w-[85%] flex items-center  p-3 bg-[#1f1f1f] shadow-xl'>
                            <input
                                type='text'
                                name='payed'
                                value={formData.payed}
                                onChange={handleInputChange}

                                placeholder='Enter amount'
                                className='bg-transparent text-white focus:outline-none text-xs font-normal font-semibold border-b border-[#0ea5e9] w-full'
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>

            
                    <div className ='flex items-center justify-between'>
                        <label className='w-[15%] text-[#0ea5e9] block mb-2 mt-3 text-xs font-medium'>Descripion :</label>
                        <div className='flex w-[85%] items-center p-3 bg-[#1f1f1f] shadow-xl'>
                            <input
                                type='text'
                                name='description'
                                value={formData.description}
                                onChange={handleInputChange}

                                placeholder='Enter description'
                                className='bg-transparent flex-1 text-white border-b border-[#0ea5e9] focus:outline-none font-normal text-xs'
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>

           

                    <hr className='border-[#383838] b-t-2' />

                    <div className='flex items-center gap-3 px-5 py-2  mt-10 mb-2'>
                        <button className ={`text-[#f5f5f5] px-4 py-3 w-full rounded-lg  text-sm font-semibold  cursor-pointer
                        ${paymentMethod === 'Cash' ? "bg-[#f6b100] text-[#0ea5e9]" : "bg-[#383838]"}`}
                            //onClick ={() => setPaymentMethod('Cash')}
                            type ='button'
                            onClick={() => setPaymentMethod('Cash')}


                        >Cash</button>

                        <button className ={`text-[#f5f5f5] px-4 py-3 w-full rounded-lg  text-sm font-semibold  cursor-pointer
                        ${paymentMethod === 'Online' ? "bg-[#f6b100] text-[#0ea5e9]" : "bg-[#383838]"}`}
                            onClick={() => setPaymentMethod('Online')}
                            type ='button'
                        >Online</button>
                    </div>

                    <div className='flex items-center gap-3 px-5 '>
                        {/*bg-[#F6B100] */}
                        <button className ='bg-[#0ea5e9] text-[#f5f5f5] px-4 py-4 w-full rounded-lg  cursor-pointer
                        font-semibold text-sm font-medium'
                        type ='button'
                        onClick ={handlePlaceOrder}
                        >Confirm Payment</button>
                    </div>

                    {paymentInvoice && (
                        <PaymentInvoice paymentInfo ={paymentInfo} setPaymentInvoice ={setPaymentInvoice} />
                    )}


                </form>
            </motion.div>
        </div>

    );
};


export default CustomerPayment ;
