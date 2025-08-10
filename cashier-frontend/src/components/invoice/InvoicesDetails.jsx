import React from 'react'
import { RxUpdate } from "react-icons/rx";
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useDispatch } from 'react-redux'
import { updateOrder, updateTable } from '../../https';
import { toast } from 'react-toastify';

const InvoicesDetails = ({ id, date, shift, table, length, customer, payment, total, tax, totalWithTax, payed, balance, status, items }) => {

    const dispatch = useDispatch();

    const handleStatusChange = ({ orderId, orderStatus }) => {                          // orderId ?
        orderUpdateMutation.mutate({ orderId, orderStatus });
    };




    const queryClient = useQueryClient();
    const orderUpdateMutation = useMutation({

        mutationFn: ({ reqData, orderId, orderStatus }) => updateOrder({ reqData, orderId, orderStatus }),
        onSuccess: (resData) => {
            const { data } = resData.data;

            //enqueueSnackbar('Order status updated successfully..', { variant: 'success' });
            toast.success('Invoice status updated successfully ...')
            queryClient.invalidateQueries(['invoices']);

          
            // update Table
            const tableData = { tableId: data.table, status: "Available" } 
            setTimeout(() => {
            tableUpdateMutation.mutate(tableData);
            }, 1500)

        },

        onError: () => {
            //enqueueSnackbar('Failed to update order status!', { variant: 'error' });
            toast.error(response.data.message);
        }

    });


    const tableUpdateMutation = useMutation({

        mutationFn: (reqData) => updateTable(reqData),
        onSuccess: (resData) => {
            const { data } = resData.data;

            toast.success('Table is available now .');
            console.log(data);

        },
        onError: (error) => {
            console.log(error)
        }
    });





    return (
        <>

            <tr className='border-b-3  border-[#383838]  bg-[#1a1a1a]'>
                <td className='p-2 text-xs font-normal  hidden'>{id}</td>

                {/* <td className ='hide-print text-xs'>{new Date(date).toLocaleDateString('en-GB')}</td> */}
                {/*new Date  converts you date string to date objects .toLocaleDateString('en-GB') to date format*/}
                <td className ='hide-print text-[#e6e6e6] text-sm'>{new Date(date).toLocaleDateString('en-GB')}</td>
                <td className={`${shift === 'Morning' ? "text-[#f6b100]" : "text-sky-400" } p-1 text-sm font-normal`}>{shift}</td>
                <td className='p-1 text-sm text-[#e6e6e6] font-normal '>{table}</td>
                <td className='p-1 text-sm text-green-600 underline font-normal ml-0 cursor-pointer text-[#e6e6e6]'><div>{length}</div></td>
                <td className='p-1 text-sm font-normal text-[#e6e6e6]'>{customer}</td>
        
                <td className='p-1 text-sm font-normal text-[#e6e6e6]'>{total.toFixed(2)}</td>
                <td className='p-1 text-sm font-normal text-[#e6e6e6]'>{tax.toFixed(2)}</td>
                <td className='p-1 text-sm font-normal text-sky-400 font-semibold'>{totalWithTax}</td>
                <td className='p-1 text-sm font-normal text-[#e6e6e6]'>{payed.toFixed(2)}</td>
                 <td className='p-1 text-sm font-normal text-[#e6e6e6] underline'>{payment}</td>
                <td className={`${balance === '0' ? 'text-[#e6e6e6]' : 'text-[#be3e3f]'} p-2 text-sm font-bold`}>{balance.toFixed(2)}</td>

                <td className='p-1 text-xs font-normal hide-print'>

                    <select
                        className={`hide-print cursor-pointer h-6 shadow-lg rounded-lg  text-[#1a1a1a]
                                ${status === 'Completed' ? "text-sky-400 bg-sky-100" : "text-[#f6b100] bg-orange-100"} font-semibold`}
                        value={status}
                        onChange={(e) => handleStatusChange({ orderId: id, orderStatus: e.target.value })}
                    >
                        <option className='text-[#1f1f1f] rounded-lg cursor-pointer' value='In Progress'>In Progress</option>
                        <option className='text-[#1f1f1f] rounded-lg cursor-pointer' value='Completed'>Completed</option>
                    </select>
                </td>

                <td className='p-4 text-center'>
                    <button className={`${status === 'Completed' ? "text-sky-400 " : "text-[#f6b100]"} cursor-pointer text-sm font-bold`}>
                        <RxUpdate size={22} />
                    </button>
                </td>


            </tr>
        </>
    );
};



export default InvoicesDetails;