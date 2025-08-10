//https://www.youtube.com/watch?v=LrfYIOzbu0E&list=PLDn5_2K0bUmdaW1Caa2EiemOdimqzXQce&index=1   complete system typeScript
import React ,{useState, useEffect} from 'react'

import Greetings from '../components/home/Greetings';
import MiniCard from '../components/home/MiniCard'
import RecentOrders from '../components/home/RecentOrders'
import PopularDishes from '../components/home/PopularDishes';
import BottomNav from '../components/shared/BottomNav';

import { GrInProgress } from 'react-icons/gr'
import { BsCashCoin } from 'react-icons/bs'
import { api } from '../https';

// #1a1a1a blc-1 #1f1f1f blc-2  #383838 blk-3  #f5f5f5 wht-1 #ababab wht-2
// flex-col => flex-wrap gap-6

const Home = () => {

    // fetch Orders 
    const [allInvoices, setAllInvoices] = useState([]);
    const [inProgressInvoices, setInProgressInvoices] = useState([]);

    // filters
    const [frequency, setFrequency] = useState('1');

    const [orderStatus, setOrderStatus] = useState('all');
    const [inProgressStatus, setInProgressStatus] = useState('In Progress');

    const [shift, setShift] = useState('all');
    // const [orderType, setOrderType] = useState('all');

    useEffect(() => {

        const getInvoices = async () => {
            try {

                const res = await api.post('/api/order/fetch',
                    {
                        frequency,
                    
                        orderStatus :"Completed",
                        shift
                    });

                setAllInvoices(res.data)
                console.log(res.data)

            } catch (error) {
                console.log(error)
            }
        };

        getInvoices();
    }, [frequency, orderStatus, shift]);


    
    


    const getInProgress = async () => {

        try {

            const res = await api.post('/api/order/fetch',
                {
                    frequency,
                
                    orderStatus :inProgressStatus,

                    shift
                });

            setInProgressInvoices(res.data)
            console.log(res.data)

        } catch (error) {
            console.log(error)
        }
    };
    

    useEffect(()=>{
        getInProgress() ;
    },[frequency, inProgressStatus, shift])

   

    return (

        <section className='bg-[#1a1a1a] h-[calc(120vh)] overflow-y-scrollbar scrollbar-hidden flex gap-3 shadow-xl '>
            
            {/* Left Div */}
            <div className='flex-[3] bg-[#1f1f1f]'>
           
                <Greetings /> 

                <hr className ='border-t border-[#0ea5e9] mt-1  '/>
            
            {/*MiniCard --- Earning & inProgress */}
            <div className= 'flex items-center w-full gap-3 px-8 mt-8'>
                {allInvoices.length === 0
                    ? (<p className='ml-5 mt-2 text-xs text-orange-700 flex items-start justify-start'></p>)
                    : allInvoices.map((invoice, index) => (
                    <></>
                ))}

                {inProgressInvoices.length === 0
                    ? (<p className='ml-5 mt-2 text-xs text-orange-700 flex items-start justify-start'></p>)
                    : inProgressInvoices.map((invo, index) => (
                    <></>
                ))}

                <MiniCard title='Completed' icon={<BsCashCoin />} number ={allInvoices.reduce((acc, invoice) => acc + invoice.bills.totalWithTax, 0).toFixed(2)}/>
                <MiniCard title='In Progress' icon={<GrInProgress />} number ={inProgressInvoices.reduce((acc, invo) => acc + invo.bills.totalWithTax, 0).toFixed(2)}/>
            </div>

            {/* Recent Orders */}
                <RecentOrders />
            </div> 




            {/* Right Div */}
            <div className='flex-[2] bg-[#1f1f1f] px-5'>
                <PopularDishes />
            </div>
            
            <BottomNav />

        </section>
    )
    
}

export default Home;