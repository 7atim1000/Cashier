import React from 'react'

import { FaCheckDouble } from 'react-icons/fa'
import { FaCircle } from 'react-icons/fa'
import { getAvatarName } from '../../utils'

const OrderList = ({key, order}) => {
    
    return (
        
        <div className='flex items-center gap-5 mb-3 bg-[#1f1f1f] border-b p-2 border-sky-400 rounded-lg'>

            <button className='bg-[#f6b100] p-2 w-10 h-10 text-xs font-semibold rounded-full'>{getAvatarName(order.customerDetails.name)}</button>

            <div className='flex justify-between w-[100%]'>

                <div className='flex flex-col items-start gap-2'>
                    <p className ='text-xs font-semibold text-sky-500'>{new Date(order.orderDate).toLocaleDateString('en-GB')}</p>
                    <h1 className='text-[#f5f5f5] text-xs tracking-wide'>{order.customerDetails.name}</h1>
                    <p className='text-[#ababab] text-sm'>{order.items.length}<span className ='text-xs font-normal'> Items</span></p>
                    
                    <div className ='mt-2'>
                        <p className ='text-sm font-normal text-[#e6e6e6]'>By : <span className ='text-xs font-semibold text-sky-400'>{order.user.name}</span></p>
                    </div>
                </div>

                <div>
                    <h1 className='text-[#f6b100] text-sm font-semibold border border-[#f6b100] rounded-lg p-1 px-4'>{order.table.tabNo}</h1>
                </div>


                <div className='flex flex-col items-center gap-2'>
                    {
                        order.orderStatus === "Completed" ? (
                            <>
                                <p className='text-green-600 bg-[#2e4a40] px-2 rounded-lg'><FaCheckDouble className='inline mr-2' />{order.orderStatus}</p>
                                <p className='text-[#ababab] text-sm'><FaCircle className='inline mr-1 text-green-600' />Ready to serve</p>
                            </>

                        ) : (
                            <>
                                <p className='text-yellow-600 bg-[#4a452e] py-2 px-2 rounded-lg text-sm font-semibold'><FaCheckDouble className='inline mr-2' />{order.orderStatus}</p>
                                <p className='text-[#ababab] text-xs font-normal'><FaCircle className='inline mr-1 text-yellow-600' />Preparing</p>
                            </>

                        )
                    }

                    <div className ='mt-1'>
                        <p className ='text-xs text-[#d6d6d6]'>TOTAL : <span className ='text-lg font-medium text-sky-400'>{order.bills.totalWithTax.toFixed(2)}</span>
                        <span className ='text-xs font-normal text-[#e6e6e6]'> AED</span>
                        </p>
                    </div>
                </div>

            

            </div>

        </div>
    )
}

export default OrderList 