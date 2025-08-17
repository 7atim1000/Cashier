import React, { useEffect, useState, useRef } from 'react'

import { motion } from 'framer-motion'
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify'
import { api } from '../../https';


const DetailsModal = ({ setIsDetailsModal }) => {
    const customerData = useSelector((state) => state.customer);

    const customer = customerData.customerId;
    console.log(customer);

 
    const [customerInvoices, setCustomerInvoices] = useState([]);


    // fetch customer orders
    const fetchCustomerDetails = async () => {

        try {

            const res = await api.post('/api/order/customerDetails',

                {
                    customer
                }
            );

            setCustomerInvoices(res.data)
            console.log(res.data)


        } catch (error) {
            console.log(error)
            message.error('Fetch Issue with order')
        }
    }


    useEffect(() => {
        fetchCustomerDetails()
    }, [customer])






    // Printing
    const invoiceRef = useRef(null);
    const handlePrint = () => {
        const printContent = invoiceRef.current.innerHTML;
        const WinPrint = window.open("", "", "width=900, height=650");

        WinPrint.document.write(` 
                <html>
                    <head>
                        <title>Order Receipt</title>
                            <style>
                                body { fonst-family: Arial, sans-serif; padding: 20px; }
                                .receip-container { width: 300px; border: 1px solid #ddd; padding: 10px;}
        
                                h2 {text-align: center;}
                            </style>
                    </head>
                    <body>
                        ${printContent}
                    </body>
            </html>
            `);

        WinPrint.document.close();
        WinPrint.focus();
        setTimeout(() => {
            WinPrint.print();
            WinPrint.close();
        }, 1000);
    };


    // Total amount 
    const totalTurnover = customerInvoices.reduce((acc, invoice) => acc + invoice.bills.total, 0);
    const totalSaleTurnover = customerInvoices.filter(invoice => invoice.customer === customer).reduce((acc, invoice) => acc + invoice.bills.total, 0);


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}  >

            <div className='bg-[#1f1f1f] p-4 rounded-lg shadow-lg  w-[700px] md:mt-1 mt-1 h-[calc(100vh-3rem)]
                overflow-y-scroll scrollbar-hidden border-b-3 border-[#0ea5e9]'>
                {/* Receipt content for printing */}
                <div ref={invoiceRef} className='p-4'>

                    {/*Receipt Header*/}
                    <div className='flex justify-center nb-4'>
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1.0, opacity: 1 }}
                            transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
                            className='mt-0 w-12 h-12 border-8 border-[#0ea5e9] rounded-full flex items-center mb-2'
                        >
                            <motion.span
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.3 }}
                                className='text-2xl'
                            >

                            </motion.span>
                        </motion.div>

                    </div>
                    
                    <div className ='bg-[#383838] p-2'>
                        <h2 className='text-lg font-bold text-center mb-2 text-[#f5f5f5]'>Customers Statement</h2>
                        <div className ='flex items center justify-between'>
                            <div>
                                <p className={`text-center text-xs font-medium text-[#f5f5f5]`}>Sir :
                                    <span className='text-sm text-[#0ea5e9] font-semibold'> {customerData.customerName}</span>
                                </p>
                            </div>
                            <div>
                                <p className={`text-center text-xs font-medium text-[#f5f5f5]`}>Balance :
                                    <span className ={`${customerData.balance === 0 ? 'text-[#0ea5e9]' : 'text-[#be3e3f]'}
                                        text-sm font-medium` }> {customerData.balance.toFixed(2)}
                                        <span className ='text-[#f5f5f5] text-xs font-normal'> AED</span></span>
                                </p>
                            </div>

                        </div>
                       
                    </div>
                
                    <div className='mt-5' >

                        <div className='overflow-x-auto px-5'>
                            <table className='w-full text-left text-[#f5f5f5]'>
                                <thead className='bg-[#1f1f1f] text-xs font-normal text-[#f5f5f5] border-b-2 border-[#f6b100]'>
                                    <tr>
                                        <th className='p-2'></th>
                                        <th className='p-2'>invoiceType</th>
                                        <th className='p-2'>invoiceNumber</th>
                                        <th className='p-2'>Total</th>
                                        <th className='p-2'>Tax</th>
                                        <th className='p-2'>Grand Total</th>
                                        <th className='p-2'>Payed</th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {customerInvoices.length === 0
                                        ? (<p className='w-full mx-5 my-5 text-xs text-[#be3e3f] flex items-start justify-start'>
                                            This customer statement is empty!
                                        </p>)

                                        : customerInvoices.map((customer, index) => (
                                            <tr
                                                key={index}
                                                className='border-b border-[#383838] text-xs'
                                            >
                                                {/* <td className='p-2 text-xs font-normal'>{new Date(customer.date).toLocaleDateString('en-GB')}</td> */}
                                                <td className='p-2 font-semibold text-xs font-normal'>{new Date(customer.date).toLocaleDateString('en-GB')}</td>
                                                <td className='p-2 font-semibold text-xs font-normal'>{customer.invoiceType}</td>
                                                <td className='p-2 text-xs font-normal'>{customer.invoiceNumber}</td>
                                                <td className='p-2 text-xs font-normal'>{customer.bills.total.toFixed(2)}</td>
                                                <td className='p-2 text-xs font-normal'>{customer.bills.tax.toFixed(2)}</td>
                                                <td className='p-2 text-xs font-normal'>{customer.bills.totalWithTax.toFixed(2)}</td>
                                                <td className='p-2 text-[#0ea5e9] text-xs font-normal'>{customer.bills.payed.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                </tbody>

                                <tfoot>
                                    <tr className="bg-[#383838] text-[#0ea5e9] font-normal text-xs">
                                        <td className="p-2" colSpan={3}>Total</td>
                                        <td className="p-2">{customerInvoices.reduce((acc, invoice) => acc + invoice.bills.total, 0).toFixed(2)}</td>
                                        <td className="p-2">{customerInvoices.reduce((acc, invoice) => acc + invoice.bills.tax, 0).toFixed(2)}</td>
                                        <td className="p-2">{customerInvoices.reduce((acc, invoice) => acc + invoice.bills.totalWithTax, 0).toFixed(2)}</td>
                                        <td className="p-2">{customerInvoices.reduce((acc, invoice) => acc + invoice.bills.payed, 0).toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>

                        </div>

                    </div>

                </div>

                {/** Buttons */}
                <div className='flex justify-between mt-4 p-2 bg-[#383838]'>
                    <button
                        onClick={handlePrint}
                        className='text-[#0ea5e9] font-semibold hover underline text-xs px-4 py-2 rounded-lg cursor-pointer'
                    >
                        Print Statement
                    </button>
                    <button
                        onClick={() => setIsDetailsModal(false)}
                        className='text-[#be3e3f] font-semibold hover: underline text-xs px-4 py-2 rounded-lg cursor-pointer'
                    >
                        Close
                    </button>

                </div>
            </div>
        </div>
    );
}





export default DetailsModal;