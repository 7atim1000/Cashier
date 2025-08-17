import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { FaUserCircle } from 'react-icons/fa';
import { FaBell } from 'react-icons/fa';
import { IoMdRestaurant } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { useMutation } from '@tanstack/react-query';
import { logout } from '../../https'
import { removeUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { MdDashboardCustomize } from "react-icons/md";

import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/images/restaurant-logo.jpg'

const Header = () => {  
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOutMutation = useMutation({
        mutationFn: () => logout(),
        onSuccess: (data) => {
            console.log(data);
            dispatch(removeUser());

            navigate('/auth')
        }, 
            onError: (error) => {
                console.log(error)
                //const { response } = error;
                //enqueueSnackbar(response.data.message, { variant: "error" });
            }
    });

  
    const handleLogout = () => {
        if (!logOutMutation.isLoading) {
            // Clear client-side cookie just in case
            document.cookie = 'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

            logOutMutation.mutate();
        }
    }

//     Verify Cookie Clearing:
//     Check in browser DevTools > Application > Cookies that the accessToken is actually being removed.

// Debugging Steps:

// Add console logs in your backend logout to verify it's being called

// Check network tab to see the logout request / response

// Verify the Set - Cookie header in the logout response

// This should resolve the automatic re - login issue by ensuring proper token / cookie invalidation on both client and server sides


    // userSlice (reducer)
    const userData = useSelector(state => state.user);

    return (
        <header className='flex justify-between items-center py-1 px-8 bg-linear-65 from-[#1a1a1a] to-[#e6e6e6]'>

             {/*LOGO */}
            <div className='flex items-center gap-2'>
                <img src={logo} className='h-10 w-10 rounded-full' alt="restro logo" />
                {/* <IoMdRestaurant className ='text-[#f6B100] text-3xl ' size ={50}/> */}
                <h1 className='cursor-pointer text-lg font-semibold text-[#f6b100] under-line hover:underline hover:text-green-400'
                onClick ={() => navigate('/')}>Restro</h1>
            </div>

            {/*SEARCH*/}
            <div className='flex items-center gap-4 bg-[#1f1f1] text-[#f5f5f5] rounded-[5px] px-5 py-1 w-[500px] shadow-lg/30'>
                <FaSearch className='text-[#0ea5e9]'/>
                <input
                   type='text'
                   placeholder="search"
                   className='bg-transparent outline-none text-[#f5f5f5]  border-b border-[#0ea5e9] w-full'
                />
            </div>
            
            {/* Dashboard & Bell - LOGED DEAILS */}
            <div className='flex items-center gap-4'>
            
            {/*Dashboard */}    
                
                { userData.role === "Admin" && (
            
                    <div onClick ={() => navigate('/dashboard')} className='rounded-lg p-3 cursor-pointer'>
                        <MdDashboardCustomize className='text-sky-600 text-2xl'/>
                    </div>

                )}
            
            
            {/*Bills */}
                <div className='rounded-lg p-3 cursor-pointer'>
                    <FaBell className='text-green-600 text-2xl'/>
                </div>
            

            {/*User */}
                <div className='flex flex-center gap-3 cursor-pointer mt-1'>
                    <FaUserCircle className='text-white' size={35}/>
                    <div className='flex flex-col'>
                       <h1 className='text-sm font-semibold text-[#1a1a1a]'>{userData.name || "User-name"}</h1>
                       <p className='text-xs text-sky-600 font-normal'>{userData.role || "User-role"}</p>
                    </div>

                    <AiOutlineLogout  className ='text-[#be3e3f] mt-2' size={25} onClick={handleLogout} />

                </div>
            </div>
            
        </header>
    )
}

export default Header