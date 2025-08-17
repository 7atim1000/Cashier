import React , {useState, useEffect} from 'react'
import { motion } from 'framer-motion'
import { IoCloseCircle } from "react-icons/io5";
import { toast } from 'react-toastify';
import { api } from '../../https';
import {useSelector} from 'react-redux'

const AddTransaction = ({setIsAddTransactionModalOpen}) => {
    const userData = useSelector((state) => state.user); 
    const handleClose = ()=>{
        setIsAddTransactionModalOpen(false);
    }

    const [formData, setFormData] = useState({
        amount: "", type: "", category: "", refrence: "", description: "", transactionNumber: `${Date.now()}`, user: userData._id,
        //date: moment().format('iYYYY-iMM-iDD')
        date: new Date().toISOString().slice(0, 10)
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name] : value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/transactions/add-transaction', formData)

            if (response.data.success) {
                // toast.success(response.data.message);
   
                window.location.reload()
                setIsAddTransactionModalOpen(false);

            } else {
                toast.error(response.data.message || 'Failed to add transaction!');
            }
    
        } catch (error) {
            toast.error('Faild to add new transaction !')
        }

    };

    // fetch expense for selection
    const [list, setList] = useState([])

    const fetchList = async () => {

        try {

            const response = await api.get('/api/expenses/') // get Method not post Method
            if (response.data.success) {
                setList(response.data.expenses);
            }
            else {
                toast.error(response.data.message)
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
    }

    // selection
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        fetchList()
    }, [])



    return(
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}         >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ durayion: 0.3, ease: 'easeInOut' }}
                className='bg-[#1f1f1f] border-b-3 border-[#0ea5e9]  p-2 shadow-xl w-120 md:mt-1 mt-1 h-[calc(100vh-2rem)] overflow-y-scroll scrollbar-hidden'
            >


                {/*Modal Header */}
                <div className="flex justify-between items-center  bg-[#383838] p-2 rounded-md">
                    <h2 className='text-[#f5f5f5] text-sm font-semibold'>New Transaction</h2>
                    <button onClick={handleClose} className='rounded-full  text-white cursor-pointer hover:text-[#be3e3f]'>
                        <IoCloseCircle size={25} />
                    </button>
                </div>

                {/*Modal Body*/}
                <form className='mt-3 space-y-6' onSubmit={handleSubmit}>

                    <div className='flex items-center justify-between'>
                        <label className='w-[20%] text-[#0ea5e9] block mb-2 mt-3 text-sm font-semibold'>Type :</label>
                        <div className='w-[80%] flex items-center p-3 bg-[#282828] shadow-xl rounded-sm'>
                            <select required 
                                className='w-full h-5 rounded-lg bg-[#282828] text-xs text-white font-normal' value={formData.type} onChange={handleInputChange} name='type' >
                                <option ></option>
                                <option value="Income">Income</option>
                                <option value="Expense">Expense</option>
                            </select>
                        </div>
                    </div>


                    <div className='flex items-center justify-between'>
                        <label className='w-[20%] text-[#0ea5e9] block mb-2 mt-3 text-sm font-semibold'>Amount :</label>
                        <div className='w-[80%] flex items-center p-3 shadow-xl rounded-lg bg-[#1f1f1f]'>
                            <input
                                type='text'
                                name='amount'
                                value={formData.amount}
                                onChange={handleInputChange}

                                placeholder='Enter amount'
                                className='bg-transparent text-white flex-1 text-[#1a1a1a] focus:outline-none text-xs font-normal border-b border-[#0ea5e9]'
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <label className='w-[20%] text-[#0ea5e9] block mb-2 mt-3 text-sm font-semibold'>Category :</label>
                        <div className='w-[80%] flex items-center p-3 bg-[#282828] shadow-xl rounded-sm'>
                            <select required 
                                className='w-full h-5 rounded-lg bg-[#282828] text-xs text-white font-normal' value={selectedValue} onChange={handleInputChange} name='category' >
                                <option >{formData.category}</option>
                                {list.map((expense, index) => (
                                    <option key={index} value={expense.expenseName}>
                                        {expense.expenseName}
                                    </option>
                                ))};
                            </select>
                        </div>
                    </div>


                    <div className='flex items-center justify-between'>
                        <label className='w-[20%] text-[#0ea5e9] block mb-2 mt-3 text-sm font-semibold'>Refrence :</label>
                        <div className='w-[80%] flex items-center p-3 shadow-xl rounded-lg bg-[#1f1f1f]'>
                            <input
                                type='text'
                                name='refrence'
                                value={formData.refrence}
                                onChange={handleInputChange}

                                placeholder='Enter the refrence'
                                className='bg-transparent text-white flex-1 text-[#1a1a1a] focus:outline-none text-xs font-normal border-b border-[#0ea5e9]'
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <label className='w-[20%] text-[#0ea5e9] block mb-2 mt-3 text-sm font-semibold'>Description :</label>
                        <div className='w-[80%] flex items-center p-3  shadow-xl rounded-lg bg-[#1f1f1f]'>
                            <input
                                type='text'
                                name='description'
                                value={formData.description}
                                onChange={handleInputChange}

                                placeholder='Description'
                                className='bg-transparent text-white flex-1 text-[#1a1a1a] focus:outline-none text-xs font-normal border-b border-[#0ea5e9]'
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-between '>
                        <label className='w-[20%] text-[#0ea5e9] block mb-2 mt-3 text-sm font-semibold'>Date :</label>
                        <div className='w-[80%] flex items-center p-3 text-white shadow-xl bg-[#1f1f1f]'>
                            <input
                                type='date'
                                name='date'
                                value={formData.date}
                                onChange={handleInputChange}

                                placeholder='Enter date'
                                className='bg-transparent text-white flex-1  focus:outline-none text-xs font-normal border-b border-[#0ea5e9]'
                                required
                                autoComplete='none'
                            />
                        </div>
                    </div>


                    <button
                        type='submit'
                        className='p-3 rounded-lg mt-6 py-3 text-sm bg-[#0ea5e9] text-white font-semibold cursor-pointer'
                    >
                        Add Transaction
                    </button>


                </form>
            </motion.div>
        </div>



    );
};


export default AddTransaction