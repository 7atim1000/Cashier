import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { register } from '../../https/index'
import { enqueueSnackbar } from 'notistack'


const Register = ({setIsRegister}) => {

    const [formData, setFormData] = useState({
       name: "", email: "", phone: "", password: "", role: ""
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        registerMutation.mutate(formData);
    }

    const handleRoleSelection = (selectedRole) => {
        setFormData({...formData, role: selectedRole})
    }


    const registerMutation = useMutation({
        
        mutationFn : (reqData) => register(reqData),
          
            onSuccess: (res) => {
            const { data } = res;
            // console.log(data)
            enqueueSnackbar(data.message, { variant: "success" });
            
            setFormData({  
              name: "", phone: "", email: "", password: "", role: "",
            })

            setTimeout(() => {
                setIsRegister(false);
            }, 1500);
        },
        onError: (error) => {
            //console.log(error)
            const { response } = error;
            enqueueSnackbar(response.data.message, { variant: "error" });
    
        }
    
        })

   return(
        <div className =''>

            <form onSubmit={handleSubmit}>
                
                <div className =''>
                    <label htmlFor='' className ='block text-white mb-2 text-xs font-medium'>Name</label>
                        <div className = 'flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
                            <input 
                                type='text'
                                name ='name'
                                value={formData.name}
                                onChange={handleChange}
                                placeholder ='Enter employee name'
                                className ='bg-transparent flex-1 text-white focus:outline-none border-b border-[#f6b100]'
                                autoComplete='off'
                                required
                            />
                        </div>
                </div>
                
                <div className =''>
                    <label htmlFor='' className ='block text-white mb-2 text-xs font-medium mt-5'>Phone</label>
                        <div className = 'flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
                            <input 
                                type='number'
                                name ='phone'
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder ='Enter employee phone'
                                className ='bg-transparent flex-1 text-white focus:outline-none border-b border-[#f6b100]'
                                autoComplete='off'
                                required
                            />
                        </div>
                </div>

                <div className =''>
                    <label htmlFor='' className ='block text-white mb-2 text-xs font-medium mt-5'>Email</label>
                        <div className = 'flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
                            <input 
                                type='email'
                                name ='email'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder ='Enter employee email'
                                className ='bg-transparent flex-1 text-white focus:outline-none border-b border-[#f6b100]'
                                autoComplete='off'
                                required
                            />
                        </div>
                </div>
                
                <div className =''>
                    <label htmlFor='' className ='block text-white mb-2 text-xs font-medium mt-5'>Password</label>
                        <div className = 'flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
                            <input 
                                type='password'
                                name ='password'
                                value={formData.password}
                                onChange={handleChange}
                                placeholder ='Enter password'
                                className ='bg-transparent flex-1 text-white focus:outline-none border-b border-[#f6b100]'
                                autoComplete='off'
                                required
                            />
                        </div>
                </div>

                <div>
                    <label className ='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>Choose your role</label>
                <div className ='flex items-center gap-3 mt-4'>
                    {['Waiter', 'Cashier', 'Admin'].map((role) => {
                        
                        return (
                            <button 
                            key={role}
                            type='button'
                            onClick={() => handleRoleSelection(role)}
                            className = {`bg-[#1f1f1f] px-3 py-3 px-4 w-full cursor-pointer  rounded-full text-[#f6b100]
                                ${formData.role === role ? "bg-[#f6b100] text-white" : ""}  
                                `}  // here used ternary operator
                            >{role}
                            </button>
                        )

                    })}
                </div>
                </div>

                <button type ='submit' className ='w-full mt-6 py-3 text-lg bg-[#f6b100] text-gray-900 font-bold rounded-lg cursor-pointer '>Sign up</button>
                
            </form>  
        </div>
   )
    
}


export default Register;