import React ,{useState, useEffect} from 'react'
import { FaSearch } from 'react-icons/fa'
import OrderList from './OrderList'
import { api } from '../../https';


const RecentOrders = () => {

// fetch 
    const [allInvoices, setAllInvoices] = useState([]);

    // filter 
    const [frequency, setFrequency] = useState('1')
    const [orderStatus, setOrderStatus] = useState('all')
    const [shift, setShift] = useState('all')


    useEffect(() => {

        const getOrders = async () => {
            try {

                const res = await api.post('/api/order/fetch',
                    {
                        frequency,
                        orderStatus,

                        shift
                    });

                setAllInvoices(res.data)
                console.log(res.data)


            } catch (error) {
                console.log(error)
                message.error('Fetch Issue with transaction')

            }
        };

        getOrders();

    }, [frequency, orderStatus, shift]);

    
    return (

        <div className='px-8 mt-6'>

            <div className='bg-[#1a1a1a] w-full h-[calc(100vh-5rem)] rounded-lg shadow-lg/30 border-t border-sky-400'>



                <div className='flex justify-between items-center px-6 py-4'>
                    <h1 className='text-[#f5f5f5] text-lg tracking-wide'>Recent Orders</h1>
                    <a href='' className='text-sky-400 text-sm'>View all</a>
                </div>

                {/* <div className='flex items-center gap-4 bg-[#383838] rounded-[20px] px-6 py-1 mx-6'>
                    <FaSearch className='text-white' />
                    <input
                        type='text'
                        placeholder='Search recent orders'
                        className='bg-transparent outline-none text-white text-sm'
                    />
                </div> */}


                <div className='mt-4 px-6 h-[calc(100vh-15rem)] overflow-y-scroll scrollbar-hidden'>
                    {
                        allInvoices.length > 0 ? (
                            allInvoices.map((order, index) => (
                                <OrderList key={order._id} order={order} />
                            ))
                        ) : <p className='text-sm font-medium text-[#f6b100]'>No invocies available now!</p>
                    }

                </div>



            </div>
        </div>
    )
}


export default RecentOrders