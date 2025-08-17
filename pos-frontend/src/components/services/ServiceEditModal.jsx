import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { api } from '../../https';
import { toast } from 'react-toastify'
import { IoCloseCircle } from 'react-icons/io5';

const ServiceEditModal = ({ service, setIsEditServiceModal, fetchServices }) => {

    // form
    const [category, setCategory] = useState(
        service.category?._id || service.category // handles both object and string
    );
    const [serviceName, setServiceName] = useState(service.serviceName);
    const [price, setPrice] = useState(service.price);


    const [unit, setUnit] = useState(
        service.unit?._id || service.unit || ""
    );


    const [newImage, setNewImage] = useState(null);

    // fetch categories and units
    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);

    const handleClose = () => {
        setIsEditServiceModal(false)
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();

            if (newImage) {
                formData.append('image', newImage);
            }

            formData.append('category', category);
            formData.append('serviceName', serviceName);
            formData.append('price', price);
            formData.append('unit', unit);

            const { data } = await api.put(`/api/services/${service._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (data.success) {
                toast.success(data.message);
                fetchServices();
                handleClose();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };


    // Fetch categories and units
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch categories
                const categoriesResponse = await api.get('/api/category/');
                if (categoriesResponse.data.success) {
                    setCategories(categoriesResponse.data.categories);
                }

                // Fetch units
                const unitsResponse = await api.get('/api/units/');
                if (unitsResponse.data.success) {
                    setUnits(unitsResponse.data.units);
                }
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchData();
    }, []);

    // Check if the original unit exists in the units array
    const originalUnitNotInList = service.unit && !units.some(u => u._id === (service.unit._id || service.unit));



    return (

         <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center shadow-lg/10 z-50' style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
         
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className='bg-[#1f1f1f] p-2 rounded-lg shadow-lg/30 w-120 md:mt-5 mt-1 h-[calc(100vh-2rem)] border-b-3 border-[#0ea5e9]'
            >
                {/* Modal Header */}
                <div className ='flex justify-between items-center  bg-[#383838] p-2 rounded-md'>
                <h2 className ='text-[#f5f5f5] text-sm font-semibold'>Edit Item</h2>
                    <button onClick={handleClose} className='rounded-full  text-white hover:text-[#be3e3f] cursor-pointer'>
                        <IoCloseCircle size={25} />
                    </button>
                </div>

                {/* Modal Body */}
                <form className='mt-3 space-y-6' onSubmit={onSubmitHandler}>
                    {/* Image Upload */}
                    <div className='flex items-center gap-4 mb-2'>
                        <label htmlFor='edit-service-img'>
                            <img
                                className='w-16 h-16 rounded-full cursor-pointer  p-1 border-b-3 border-sky-500 shadow-lg/30 object-cover'
                                src={newImage ? URL.createObjectURL(newImage) : service.image}
                                alt="Service"
                            />
                        </label>
                        <input
                            onChange={(e) => setNewImage(e.target.files[0])}
                            type='file'
                            id='edit-service-img'
                            hidden
                        />
                        <p className='text-xs font-semibold text-white underline'>Change image</p>
                    </div>

                    {/* Category Dropdown */}
                    <div className='mt-5 flex items-center justify-between'>
                        <label className='w-[25%] text-[#0ea5e9] block mb-2 mt-3 text-xs font-normal'>Category :</label>
                        <div className='flex w-[75%] items-center p-3 bg-[#262626] shadow-xl'>
                            <select className='w-full bg-[#262626] text-[#e6e6e6] h-5 rounded-lg'

                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                {categories.map((cat) => (

                                    <option key={cat._id} value={cat.categoryName}>
                                        {cat.categoryName}
                                    </option>
                                ))}
                            </select>

                        </div>
                    </div>

                    {/* Service Name */}
                    <div className='flex items-center justify-between'>
                        <label className='w-[25%] text-[#0ea5e9] block mb-2 mt-3 text-xs font-medium'>Item Name :</label>
                        <div className='flex w-[75%] items-center p-3 bg-[#1f1f1f] shadow-xl'>
                            <input
                                type='text'
                                value={serviceName}
                                onChange={(e) => setServiceName(e.target.value)}
                                className='bg-transparent flex-1 text-white border-b border-[#0ea5e9] focus:outline-none font-normal text-xs '
                                required
                            />
                        </div>
                    </div>

                    {/* Price and Unit */}
                    <div className='flex items-center justify-between gap-5'>

                        <label className='w-[25%] text-[#0ea5e9] block mb-2 mt-3 text-xs font-medium'>Price</label>
                        <div className='flex w-[75%] items-center p-3 bg-[#1f1f1f] shadow-xl'>
                            <input
                                type='text'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className='bg-transparent flex-1 text-white border-b border-[#0ea5e9] focus:outline-none font-normal text-xs'
                                required
                            />
                        </div>

                        <div className='flex items-center justify-between'>
                            <select
                                className='w-full bg-[#262626] text-[#e6e6e6] h-10 rounded-lg'
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                required
                            >
                                {units.map((unit) => (

                                    <option key={unit._id} value={unit.unitName}>
                                        {unit.unitName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        type='submit'
                        className='w-full p-2 rounded-lg mt-6 py-3 text-sm bg-[#0ea5e9] text-[#1a1a1a] font-semibold cursor-pointer'
                    >
                        Update Item
                    </button>
                </form>
            </motion.div>
        </div>
    );
};


export default ServiceEditModal