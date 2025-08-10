import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'
import { MdOutlineReorder, MdTableBar } from 'react-icons/md'
import { CiCircleMore } from 'react-icons/ci'
import { BiSolidDish } from 'react-icons/bi'
import Modal from './Modal';
import { useDispatch } from 'react-redux';
import { setCustomer } from '../../redux/slices/customerSlice'


const BottomNav = () => { // #1a1a1a blc-1 #1f1f1f blc-2  #f5f5f5 wht-1 #ababab wht-2
    const navigate = useNavigate(); 
    // after redux
    const location = useLocation();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    // send data to store depent on :-
    const dispatch = useDispatch();
    


    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [guestCount, setGuestCount] = useState(0);
    //const increment = () => setGuestCount((prev) => prev + 1);
    const increment = () => {
        if (guestCount >= 20) return;
        setGuestCount((prev) => prev + 1)
    }
    //const decrement = () => setGuestCount((prev) => prev - 1);
    const decrement = () => {
       if (guestCount <= 0 ) return ;
       setGuestCount((prev) => prev - 1)
    }

    // after redux and Location
    const isActive = (path) => location.pathname === path ;

    const handleCreateOrder = () => {
        //send data t store 

        dispatch(setCustomer({guests: guestCount}))
        navigate('/tables')
    }

    return (
        <div className='fixed bottom-0 left-0 right-0 bg-linear-65 from-[#1a1a1a] to-[#e6e6e6] p-2 h-15 flex justify-around'>
            
            <button 
            onClick={() => navigate('/')}
           
            className ={`flex items-center justify-center font-bold
            ${ isActive('/') ? "text-[#F6B100] bg-[#262626]" : "text-[#e6e6e6]" }
            w-[200px] rounded-[20px] cursor-pointer`
            }
            ><FaHome className='inline mr-2' size={30} /><p>Home</p>
            </button>

            <button
            onClick={() => navigate('/orders')}
            
            className ={`flex items-center justify-center font-bold
            ${ isActive('/orders') ? "text-[#F6B100] bg-[#262626]" : "text-[#e6e6e6]" }
            w-[200px] rounded-[20px] cursor-pointer`
            }
            >
            <MdOutlineReorder className='inline mr-2' size={30} /><p>Orders</p>
            </button>
            
            {/*Tables*/}
            <button 
            onClick={() => navigate('/tables')} 
            className ={`flex items-center justify-center font-bold
            ${ isActive('/tables') ? "text-[#F6B100] bg-[#262626]" : "text-[#e6e6e6]" }
            w-[200px] rounded-[20px] cursor-pointer`
            }
            >
            <MdTableBar className='inline mr-2' size={30} /><p>Tables</p>
            </button>


            <button className='text-[#f5f5f5]  w-[200px] rounded-[20px] flex items-center justify-center cursor-pointer'><CiCircleMore className='inline mr-2' size={30} />More</button>
       
           <button 
           // disabled ={isActive('/tables' || isActive('/menu'))}

            //    onClick={openModal} 
            onClick = {() => navigate('/tables')}
           className='absolute bottom-1 bg-[#F6B100] text-[#f5f5f5] rounded-full p-3 items-center cursor-pointer'
           >
           <BiSolidDish size={30}/>
           </button>




           <Modal isOpen={isModalOpen} onClose={closeModal} title='Create Order'>

                {/* <div>
                    <label className='block text-[#ababab] mb-2 text-sm  text-sm'>Customer Name</label>
                    <div className ='flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]'>
                        <input value={name} onChange={(e) => setName(e.target.value)} type='text' name='' id='' placeholder='Enter customer name'
                        className ='bg-transparent flex-1 text-white focus:outline-none'
                        />
                    </div>
                </div>
                <div>
                    <label className='block text-[#ababab] mb-2 mt-2 text-sm  text-sm'>Customer Phone</label>
                    <div className ='flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]'>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} type='number' name='' id='' placeholder='+971 9999999'
                         className ='bg-transparent flex-1 text-white focus:outline-none'
                        />
                    </div>
                </div> */}

                <div>

                    <label className ='block mb-2 mt-3 text-md font-medium text-[#ababab]'>Guest : </label>
                    
                    <div className ='flex items-center justify-between bg-[#e6e6e6] px-4 py-10 rounded-lg mt-5 shadow-lg/30'>
                        <button onClick={decrement} className ='text-orange-600 text-2xl cursor-pointer'>&minus;</button>
                        <span className ='text-[#1a1a1a] text-xl font-semibold'>{guestCount} <span className ='text-xs font-medium text-green-600'>Person</span></span>
                        <button onClick={increment} className ='text-sky-600 text-2xl cursor-pointer'>&#43;</button>
                    </div>

                </div>
                
                <button className ='cursor-pointer w-full bg-green-600 text-[#e6e6e6] rounded-lg py-3 mt-8 hover:bg-[#F6B100] hover:text-sky-600'
                //onClick={() => navigate('/tables')}
                onClick={handleCreateOrder}
                >Create Order</button>

           </Modal> 
        </div>
    )
}


export default BottomNav;