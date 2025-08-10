import React, { useState } from 'react'
import BackButton from '../components/shared/BackButton';

import { IoMdArrowDropright } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import MenuContainer from '../components/menu/MenuContainer';

import { useSelector } from 'react-redux';
import CustomerInfo from '../components/menu/CustomerInfo';
import CartInfo from '../components/menu/CartInfo';
import Bill from '../components/menu/Bill';
import SelectCustomer from '../components/menu/SelectCustomer';

const Menu = () => {

    // redux usage
    const customerData = useSelector(state => state.customer)   // customer gets from redux>store.js  reducer:{ customer }
    const tableData = useSelector(state => state.table)         // to featch seats 

    const cstButton = [{label: 'Select Customer', action :'customer'}]
    
    const [isSelectCustomer, setIsSelectCustomer] = useState();
    const handleSelectCustomer = (action) => {
        if(action === 'customer') setIsSelectCustomer(true)
    };
    
    
    
    return (
        <section className ='bg-[#1a1a1a] h-[calc(100vh)] overflow-hidden flex gap-3'>
            {/* left side */}
           <div className ='flex-[3] bg-[#1f1f1f]'>

            <div className ='flex items-center justify-between px-4 py-4'>
                
                <div className='flex gap-4 justify-between'>
                    <BackButton />
                    <h1 className ='text-[#f5f5f5] text-l font-bold tracking-wider mt-2'>Cashair</h1>    
                </div>

                <div className='flex items-center justify-content shadow-xl/30 px-1 h-12 bg-[#1f1f1f] rounded-lg border-b-2 border-sky-400'>
                    <div className='flex items-center gap-5 cursor-pointer '>

                        <div className='p-4  mb-4 rounded-md flex justify-center cursor-pointer'>
                            {cstButton.map(({ label, action }) => {

                                return (
                                    <button onClick={() => handleSelectCustomer(action)} className='flex gap-1 items-center cursor-pointer'>
                                        <p className='text-xs mt-3 underline text-[#e6e6e6] font-semibold'>{label}</p>
                                        <IoMdArrowDropright className='inline mt-4 text-[#e6e6e6]' size={20} />
                                    </button>
                                );
                            })}
                        </div>

                        <FaCircleUser className='h-6 w-6 text-[#f6b100]' />
                        <div className='flex flex-col items-start'>
                            <p className='text-sm font-semibold text-[#e6e6e6]'>
                                Customer :
                            </p>
                            <p className='text-xs font-medium text-sky-400'>
                                {customerData.customerName || 'Customer name'}
                            </p>

                        </div>

                        <div className='flex flex-col items-start'>
                            <p className='text-sm font-semibold text-[#e6e6e6]'>
                                Balance :
                            </p>

                            <p className={`${customerData.balance === 0 ? 'text-green-600' : 'text-[#be3e3f]'} text-xs font-medium`}>
                                {(Number(customerData.balance) || 0).toFixed(2)}
                                <span className='text-xs font-normal text-[#e6e6e6] font-normal'> AED</span>
                            </p>
                        </div>

                        <p className='text-xs text-[#e6e6e6]'>Table <IoMdArrowDropright className='inline text-[#e6e6e6]' size={20} />
                            <span className ='text-xs text-sky-400 underline'>{customerData.table?.tableNo || 'Table No'}</span> <IoMdArrowDropright className='inline text-[#e6e6e6]' size={20} />
                            <span className ='text-xs text-[#e6e6e6]'>Guests No</span><IoMdArrowDropright className='inline text-[#e6e6e6]' size={20} />
                            <span className ='text-xs text-[#f6b100] underline'>{customerData.guests || 'seats'}</span>
                        </p>
                        
                    </div>

                </div>

            </div>

            <hr className ='border border-sky-400 mt-2'/>

                
          

            <MenuContainer />

           </div>
           {/* right side */}
            <div className ='flex-[1] bg-[#1f1f1f]'>
                <CustomerInfo />
                <hr className ='border border-sky-400 mt-2 '/>
                <CartInfo />
                <hr className ='border border-sky-400 '/>
                <Bill />
           </div>

           
        

                      
            {/* <BottomNav /> */}
            {isSelectCustomer && <SelectCustomer setIsSelectCustomer={setIsSelectCustomer}/>}

        </section>
    )
    
}


export default Menu; 