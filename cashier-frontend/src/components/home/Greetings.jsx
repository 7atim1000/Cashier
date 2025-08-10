import React, { useState, useEffect  } from 'react'
import { useSelector } from 'react-redux'
import { GiSunflower } from "react-icons/gi";
import { MdOutlineNightlightRound } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";



const Greetings = () => {

    // Add this function inside your component (before return)
    function getCurrentShift() {
        const hour = new Date().getHours();
        // Example: Morning = 6:00-17:59, Evening = 18:00-5:59
        return (hour >= 6 && hour < 18) ? 'Morning' : 'Evening';
    }



    const usrData = useSelector(state => state.user)

    const [dateTime, setDateTime] = useState(new Date());
    
    useEffect(() => {
        const timer = setInterval(() => setDateTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        const months = [
            'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, 
        ${date.getFullYear()}` ;
    };

    const formatTime = (date) =>
        `${String(date.getHours()).padStart(2, '0')}:${String(
            date.getMinutes()
        ).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}` ;


    return (
        <div className='flex justify-between items-center px-8 mt-5'>
            
            <div>
                <h1 className='text-[#f5f5f5] text-lg font-semibold tracking-wide mt-0 mb-1'>Good Morning - {usrData.name || "user-name"}</h1>
                <p className='text-[#ababab] text-xs'>Give your best services for customers</p>
            </div>

            <div className='flex items-center gap-2 justify-center'>

                {getCurrentShift() === 'Morning' ? (
                    <GiSunflower className='text-[#F6B100]' size={30} />
                ) : (
                    <BsFillMoonStarsFill className='text-sky-100' size={30} />
                )}
                <h1 className='text-sm text-sky-400 font-semibold'>
                    {getCurrentShift()} shift
                </h1>

            </div>
                       

            <div>
                <h1 className='text-[#f5f5f5] text-2xl font-bold tracking-wide w-[130px]'>{formatTime(dateTime)}</h1>
                <p className='text-[#F6B100] text-sm'>{formatDate(dateTime)}</p>
            </div>
               
        </div>
        
    )
}

export default Greetings;