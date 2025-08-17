import React, { useEffect, useRef } from 'react';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { FaNotesMedical } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeItem } from '../../redux/slices/cartSlice';

const CartInfo = () => {
    const cartData = useSelector((state) => state.cart);    // cart from cartSlice  name : 'cart' , 
    const scrollRef = useRef();
    
    useEffect(() => {
        if (scrollRef.current){
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight, 
                behavior: 'smooth'
            })
        }
    }, [cartData]);

    const dispatch = useDispatch();
    const handleRemove = (itemId) => {
        dispatch(removeItem(itemId))
    };
    
    return (
        
        <div className = 'px-4 py-2'>

            <h1 className ='text-lg text-sky-400 font-semibold tracking-wide'>Order Details : </h1>
            {/*h-[380px] */}
            <div className ='mt-4 overflow-y-scroll scrollbar-hidden h-[170px]' ref={scrollRef}>
                {cartData.length === 0 ? (<p className ='text-xs font-bold text-[#b73e3e] flex items-center justify-center rounded-lg bg-[#ababab] mt-15'>Cart is empty ... Start adding items .</p>)
                : cartData.map((item) => {
                    
                    return (
        
                    <div className ='bg-[#383838] rounded-lg px-2  py-2 mb-2 mt-0'>
                    
                        <div className ='flex items-center justify-between'>
                        <h1  className ='text-[#ababab] font-bold tracking-wide text-xs'>{item.name}</h1>
                        <p   className ='text-[#ababab] text-sm font-semibold'><span className ='text-xs font-normal'>x </span>{item.quantity}</p>
                    
                    </div>

                    <div className ='flex items-center justify-between mt-3'>
                   
                        <div className ='flex items-center gap-3'>
                            <RiDeleteBin2Fill  
                            onClick ={() => handleRemove(item.id)}
                            className ='text-[#be3e3f] text-xs cursor-pointer' size={20} />
                        </div>
                    
                        <p className ='text-[#e6e6e6] text-lg font-semibold'><span className ='text-xs text-sky-400 font-normal'>AED </span>{item.price}</p>

                    </div>
                    
                    </div>

                    );
                })}
                
            </div>
        </div>
    );
}


export default CartInfo;