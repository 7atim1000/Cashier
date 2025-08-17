import React , {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { formatDate, formatTime, getAvatarName } from '../../utils'

 const CustomerInfo = () => {
// format date and time 
const [dateTime, setDateTime] = useState(new Date());

useEffect(() => {
        const timer = setInterval(() => setDateTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
// redux recever
// const customerData = useSelector(state => state.customer) 
const customerData = useSelector((state) => state.customer);  //// customer gets from redux>store.js  reducer:{ customer }

return (
    <div className ='flex items-center justify-between px-4 py-3 h-[65px]'>

        <div className ='flex flex-col items-start'>
            <h1 className ='text-sm text-sky-400 font-semibold tracking-wide'>{customerData.customerName || 'Customer Name :'}</h1>
            <p className ='text-xs text-[#ababab] font-medium mt-1'>{customerData.orderId || 'N/A'} / Dine in</p>
            <p className ='text-xs text-[#ababab] font-medium nt-2'>{formatDate(dateTime)} - {formatTime(dateTime)}</p>
        </div>

        <button className ='bg-[#f6b100] p-3 text-lg font-bold rounded-full'>
            {getAvatarName(customerData.customerName || 'CN')}
        </button>
    </div>

    

    
);

};


export default CustomerInfo ;
