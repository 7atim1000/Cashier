import React, { useState } from 'react'
import restaurant from '../assets/images/restaurant-auth.jpg'
import { MdRestaurantMenu } from "react-icons/md";
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';

const  Auth = () => {

    const [isRegister, setIsRegister] = useState(false);
    return (
        
        <div className ='flex min-h-screen w-full'>
           
            {/*left section */}
            <div className ='w-1/2 relative flex items-center justify-center bg-cover'>
                <img src={restaurant} alt='Restourant Image' className ='h-full w-full object-cover'/>           
            
            <div className ='absolute inset-0 bg-block bg-opacity-80'></div>
 
            {/*Quote at bottom */}
            <blockquote className= 'absolute bottom-10 px-8 mb-10 text-sky-600 text-lg italic'>
                "Serve customers the best food with prompt and frienly service in a 
                welcoming atmosphere, and they'll keep coming back."
                <br />
                <span className ='block mt-4 text-yellow-400'>- Founder of Restro</span>

            </blockquote>
            </div>
     
            {/*Right end */}
            <div className ='w-1/2 min-h-screen bg-[#1a1a1a] p-10'>
                <div className ='flex flex-col items-center gap-2'>
                    <MdRestaurantMenu className ='h-14 w-14 rounded-full text-white border-2'/>
                    <h1 className ='text-lg font-semibold text-[#f5f5f5] tranking-wide'>Restro</h1>
                </div>

                <h2 className ='text-2xl text-center mt-5 font-semibold text-[#f6b100] mb-10'>
                    {isRegister ? "Employee Registration" : "Employee Login"}
                </h2>

                {/*Form registration */}
                
                {isRegister ? <Register setIsRegister={setIsRegister} /> : <Login />}
            
                
                <div className ='flex justify-center mt-6'>
                    <p className ='text-sm text-[#ababab]'> {isRegister ? "Already have an account ?" : "Dont have an account ?"}
                        <a className ='text-[#f6b100] font-semibold hover: underline' href='#'
                           onClick={() => setIsRegister(!isRegister)}
                           >
                            {isRegister ? " Sign in": " Sign up"}
                        </a>
                    </p>
                </div>

            </div>



            
        </div>

    );
};

export default Auth;