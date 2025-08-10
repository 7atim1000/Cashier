import React, { useState } from 'react'

import { GrRadialSelected } from 'react-icons/gr'
import { getBgColor } from '../../utils';


import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { enqueueSnackbar } from 'notistack'
import { getCategories, getServices } from '../../https';

import ItemsCart from './ItemsCart';


const MenuContainer = () => {
    
    // fetch categories from DB :-
    const { data: responseData, IsError } = useQuery({
        queryKey: ['categories'],
    
        queryFn: async () => {
        return await getCategories();
        },
                    
        placeholderData: keepPreviousData,
    });
    
    if (IsError) {
        enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
    console.log(responseData); 



    // fetch Sevices
    const { data: resData, isError} = useQuery({
    queryKey :['services'],
    
    queryFn : async () => {
        return await getServices();
    },
        placeholderData: keepPreviousData,
    });
    if(isError) {
        enqueueSnackbar('Something went wrong!', { variant: 'error' })
    }
    
    console.log(resData); 





    // select items from categories

    const [selectedCategory, setSelectedCategory] = useState(`Main course`) ;
           
    // const handleAddToCart = (item) => {
    //     if (itemCount === 0) return ;
    //     // else
    //     const { name, price } = item ;
    //     const newObj = { id: new Date(), name, pricePerQuantity: price, quantity: itemCount, price: price * itemCount };
        
    //     dispatch(addItems(newObj));
    //     setItemCount(0);
    // }

    return (
        <>
            {/*Categories */}
            <div className ='grid grid-cols-4 gap-4 px-10 py-4 w-[100%]'>
            {/* {menus.map((menu) => { */}
                 
                { responseData?.data.data.map(category => (

                    <div key={category.categoryName} className='flex flex-col items-center justify-between p-4 rounded-lg h-[70px] cursor-pointer shadow-lg/30'
                        style={{ backgroundColor: getBgColor() }}

                        // selected Item
                        onClick={ () => setSelectedCategory(category.categoryName)   }
                    >

                        <div className='flex items-center justify-between w-full shadow-lg/30'>
                            
                            <h1 className='text-md font-semibold text-white'>{category.categoryName}</h1>
                            { selectedCategory === category.categoryName  && <GrRadialSelected className='text-[#e6e6e6]' size={20} /> } 
                            
                          
                        </div>

                    </div>
                 
                ))}
                
           </div>


           <hr className='border-sky-400 border-t-2 mt-0'/>

            <div className ='grid grid-cols-4 gap-4 px-10 py-4 w-[100%]  rounded-lg overflow-y-scroll scrollbar-hidden  h-[calc(100vh-15rem)]'>
               
                { resData?.data.data.filter(i => i.category === selectedCategory).map((service) => {
                    
                    return (
                        
                        <ItemsCart id={service._id} image ={service.image} name={service.serviceName} price={service.price} qty={service.qty} unit={service.unit} cat={service.category}  />
                    )
                  })
                }

            </div>
        </>
    );
   
}


export default MenuContainer; 