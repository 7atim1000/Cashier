import React ,{useState, useEffect}from 'react' ;
import fileUpload from '../../assets/images/file-upload.jpg'

import { motion } from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import {  api } from '../../https';
import { enqueueSnackbar } from 'notistack';
import { IoCloseCircle } from 'react-icons/io5';

import { toast } from 'react-toastify'



const ServiceAddModal = ({setIsAddServiceModal}) => {

    const handleClose = () => {
        setIsAddServiceModal(false)
    };


    const [serImg, setSerImg] = useState(false)
    const [category, setCategory] = useState('Main course')
    const [serviceName, setServiceName] = useState('')
    const [price, setPrice] = useState('')
    const [unit, setUnit] = useState('Dish')


    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!serImg) {
                return toast.error('Please selected image')
            }

            const formData = new FormData()

            formData.append('image', serImg)
            formData.append('category', category)
            formData.append('serviceName', serviceName)
            formData.append('price', price)
            formData.append('unit', unit)

            //console log formData
            formData.forEach((value, key) => {
                console.log(`${key} : ${value}`);
            });

            const { data } = await api.post('/api/services', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                // 'Content-Type': 'multipart/form-data' ensures Axios sends the file correctly.

            })

            if (data.success) {
                //toast.success(data.message)
                window.location.reload();
                setIsAddServiceModal(false);

                setSerImg(false)
                setCategory('Cleaning')
                setServiceName('')
                setUnit('')
                setPrice('')

            } else {
                toast.error(data.message)
            }

        } catch (error) {

        }
    };


    
  

    // Categories fetch
    const [list, setList] = useState([])
    const fetchList = async () => {
        try {

            const response = await api.get('/api/category/') // get Method not post Method
            if (response.data.success) {
                setList(response.data.categories);
            }
            else {
                toast.error(response.data.message)
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
    }

    


    // Unit fetch
    const [unitlist, setUnitList] = useState([])
    const fetchUnit = async () => {

        try {

            const response = await api.get('/api/units/')
            if (response.data.success) {
                setUnitList(response.data.units);
            }
            else {
                toast.error(response.data.message)
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
    };


    useEffect(()=>{
        fetchList() , fetchUnit()
    },[]);



    return (

        <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center shadow-lg/10 z-50' style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ durayion: 0.3, ease: 'easeInOut' }}
                className='bg-[#1f1f1f] p-2 rounded-lg shadow-lg/30 w-120 md:mt-1 mt-1 h-[calc(100vh-2rem)] border-b-3 border-[#0ea5e9] border-b-3 border-[#0ea5e9]'
            >


                {/*Modal Header */}
                <div className ='flex justify-between items-center  bg-[#383838] p-2 rounded-md'>
                <h2 className ='text-[#f5f5f5] text-sm font-semibold'>New Item</h2>

                    <button onClick={handleClose} className='rounded-full  text-white hover:text-[#be3e3f] cursor-pointer'>
                        <IoCloseCircle size={25} />
                    </button>
                </div>

                {/*Modal Body*/}
                <form className='mt-3 space-y-6' onSubmit={onSubmitHandler}>


                    <div className='flex items-center gap-4 mb-2'>
                        <label htmlFor='ser-img'>
                            <img className='w-15 h-15 bg-white cursor-pointer rounded-full  p-1 border-b-3 border-[#0ea5e9] shadow-lg/30'
                                src={serImg ? URL.createObjectURL(serImg) : fileUpload}
                            />
                        </label>
                        <input onChange={(e) => setSerImg(e.target.files[0])} type='file' id='ser-img' hidden />
                        <p className='text-xs font-semibold text-white'>Upload image</p>
                    </div>

                    <div className='mt-5 flex items-center justify-between'>
                        <label className='w-[25%] text-[#0ea5e9] block mb-2 mt-3 text-xs font-normal'>Category :</label>
                        <div className='flex w-[75%] items-center p-3 bg-[#262626] shadow-xl'>
                            <select className='w-full bg-[#262626] text-[#e6e6e6] h-5 rounded-lg' 
                            
                            onChange ={(e) => setCategory(e.target.value)}
                            value ={category} 
                            >
                               
                                <option className ='text-sky-500 text-xs font-normal'></option>
                               
                                
                                {list.map((category, index) => (
                                    <option key={index} value={category.categoryName} className='text-xs font-normal'>
                                        {category.categoryName}
                                
                                </option>

                                ))};
                            </select>
                        </div>
                    </div>

                    <div className ='flex items-center justify-between'>
                        <label className='w-[25%] text-[#0ea5e9] block mb-2 mt-3 text-xs font-medium'>Item Name :</label>
                        <div className='flex w-[75%] items-center p-3 bg-[#1f1f1f] shadow-xl'>
                            <input
                                type='text'
                                name='serviceName'
                               
                                onChange ={(e)=> setServiceName(e.target.value)} 
                                value ={serviceName}

                                placeholder='Enter Item name'
                                className='bg-transparent flex-1 text-white border-b border-[#0ea5e9] focus:outline-none font-normal text-xs '
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>


                    

                    <div className='flex items-center justify-between gap-5'>
                      
                        <label className='w-[25%] text-[#0ea5e9] block mb-2 mt-3 text-xs font-medium'>Price</label>
                        <div className='flex w-[75%] items-center p-3 bg-[#1f1f1f] shadow-xl'>
                            <input
                                type='text'
                                name='price'
                                
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}

                                placeholder='Enter price of unit'
                                className='bg-transparent flex-1 text-white border-b border-[#0ea5e9] focus:outline-none font-normal text-xs '
                                required
                                autoComplete='none'
                            />
                        </div>

                        <div className='flex items-center justify-between'>
                            <select className='w-full bg-[#262626] text-[#e6e6e6] h-10 rounded-lg' 
                                onChange ={(e) => setUnit(e.target.value)}
                                value ={unit}
                            >

                                <option className='text-sky-500 text-xs font-normal'></option>
                                {unitlist.map((unit, index) => (
                                    
                                    <option key={index} value={unit.unitName} className='text-xs font-normal'>
                                        {unit.unitName}
                                    </option>

                                ))};
                            </select>
                        </div>
                    </div>




                    <button
                        type='submit'
                        className='w-full p-2 rounded-lg mt-6 py-3 text-sm bg-[#0ea5e9] text-[#1a1a1a] font-semibold cursor-pointer'
                    >
                        Add Item
                    </button>


                </form>

            </motion.div>
        </div> 

    );
};


export default ServiceAddModal ;