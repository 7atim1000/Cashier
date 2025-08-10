import React , {useState, useEffect}  from 'react'
import { popularDishes } from '../../constants'
import { api } from '../../https';

const  PopularDishes = () => {
    
    const [services, setServices] = useState([]);
    const fetchServices = async () => {
        try {
            const { data } = await api.post('/api/services/fetch',

                {
                    sort: '-createdAt' // Add this parameter
                });

            if (data.success) {
                setServices(data.services);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);


    return (
       <div className='' >
            <div className='bg-[#1a1a1a] w-full rounded-lg items-center h-[calc(120vh)] overflow-y-scroll scrollbar-hidden'>
                
                <div className='flex justify-between items-center px-6 py-5 w-[100%]'>
                    <h1 className='text-sky-500 text-lg font-semibold tracking-wide'>Popular Dishes</h1>
                    {/* <a className='text-[#025cca] text-sm font-semibold'>View all</a> */}
                </div>
                
                <div className= ''>
                    {
                        services.map((dish) => {
                            return (
                                <div key={dish.id} className= 'flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-6 py-4 mx-6 mt-2'>
                                    {/* <h1 className='text-[#02ca3a] font-bold text-sm mr-4' >{dish._id < 10 ? `0${dish._id}` : dish._id}</h1> */}
                                    <img src={dish.image} alt={dish.name} className='w-[50px] h-[50px] rounded-full' />
                                    <div>
                                        <h1 className='text-[#f5f5f5] font-semibold mt-1 tracking-wide'>{dish.serviceName}</h1>
                                        <p className='text-[#F6B100] text-lg font-semibold mt-1'>
                                            <span className='text-sky-500 text-sm'>Offer : </span>
                                            {dish.price}
                                            <span className ='text-xs font-normal text-sky-500'> AED</span>
                                            
                                            </p>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
                

            </div>
       </div>
    )
}

export default PopularDishes ;