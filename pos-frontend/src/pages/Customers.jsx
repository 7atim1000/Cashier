import React ,{useState, useEffect} from 'react' ;
import { setCustomer } from '../redux/slices/customerSlice';
import { api } from '../https';
import {toast} from 'react-toastify'
import BackButton from '../components/shared/BackButton';
import { FaCcAmazonPay } from "react-icons/fa";

import { useDispatch } from 'react-redux'

import { IoIosAddCircle } from 'react-icons/io'; 
import { MdDeleteForever } from "react-icons/md";
import { LiaEditSolid } from "react-icons/lia";
import CustomerAddModal from '../components/customers/CustomerAddModal';
import BottomNav from '../components/shared/BottomNav';
import DetailsModal from '../components/customers/DetailsModal';
import CustomerPayment from '../components/customers/CustomerPayment';

import { PiListMagnifyingGlassFill } from "react-icons/pi"


const Customers = () => {

    const addBtn = [{label :'Add Customer', action :'customer' , icon: <IoIosAddCircle className ='text-sky-600 w-6 h-6'/>}];
    const [isAddCustomerModal, setIsAddCustomerModal] = useState(false);
    const handleAddCustomerModal = (action) => {
        if(action === 'customer') setIsAddCustomerModal(true);
    }

   
    // Fetch customers
    const [list, setList] = useState([]);

    const fetchCustomers = async () => {
        try {
            const response = await api.get('/api/customers/')

            if (response.data.success) {
                setList(response.data.customers)
            } else {
                toast.error(response.data.message || 'customer not found')
            }

        } catch (error) {
            // Show backend error message if present in error.response
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message)
            }
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCustomers()
    }, []);


    // remove 
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const removeCustomer = async (id) => {

        try {
            const response = await api.post('/api/customers/remove', { id },)

            if (response.data.success) {
                toast.success(response.data.message)

                //Update the LIST after Remove
                await fetchCustomers();

            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    };

    const dispatch = useDispatch();

    const detailsButton = [
        { label: '', icon: <PiListMagnifyingGlassFill className='text-green-600 w-6 h-6' />, action: 'details' }
    ]
    const [isDetailsModal, setIsDetailsModal] = useState(false);
    const handleDetailsModal = (customerId, customerName, balance, action) => {
        dispatch(setCustomer({ customerId, customerName, balance }));
        if (action === 'details') setIsDetailsModal(true);
    };


    const paymentButton = [
        { label: '', icon: <FaCcAmazonPay className='text-[#f6b100] w-5 h-5' />, action: 'payment' }
    ]
    const [isPaymentModal, setIsPaymentModal] = useState(false);
    const handlePaymentModal = (customerId, customerName, balance, action) => {
        dispatch(setCustomer({ customerId, customerName, balance }));
        if (action === 'payment') setIsPaymentModal(true);
    };



    return (
        <section className ='h-[calc(100vh)] overflow-y-scroll scrollbar-hidden bg-[#1a1a1a]'> 
           
            <div className ='flex items-center justify-between px-10 py-3 bg-[#383838]'>
                    
                <div className='flex items-center gap-4'>
                    <BackButton />
                    <h1 className='text-[#f5f5f5] text-lg font-bold tracking-wider'>Customers Management</h1>
                </div>

                <div className='flex items-center justify-around gap-4'>

                    <div className='flex gap-2 items-center justify-around gap-3 hover:bg-[#0ea5e9] shadow-lg/30'>
                        {
                            addBtn.map(({ label, icon, action }) => {
                                return (
                                    <button onClick={() => handleAddCustomerModal(action)}
                                        className ='bg-[#f6b100] px-4 py-2 text-[#1a1a1a] cursor-pointer
                                    font-semibold text-xs flex items-center gap-2 rounded-full'
                                    >
                                        {label} {icon}
                                    </button>
                                )
                            })
                        }

                        {isAddCustomerModal && <CustomerAddModal setIsAddCustomerModal={setIsAddCustomerModal} />}

                    </div>

                </div>  
        
            </div>

           
           {/** table  */}
            <div className='mt-5 bg-[#1f1f1f] py-1 px-10'>


                <div className='overflow-x-auto bg-[#1f1f1f]'>
                    <table className='text-left w-full'>
                        <thead className=''>
                            <tr className='border-b-2 border-[#f6b100] text-xs font-normal text-[#0ea5e9]'>
                                <th className='p-1'>Name</th>
                                <th className='p-1'>Contact No</th>
                                <th className='p-1'>Address</th>
                                <th className='p-1'>Balance</th>
                                <th className='p-1'></th>
                            </tr>
                        </thead>

                        <tbody>

                            {list.length === 0
                                ? (<p className='ml-5 mt-5 text-xs text-[#be3e3f] flex items-start justify-start'>Your customers list is empty . Start adding customers !</p>)
                                : list.map((customer, index) => (

                                    <tr
                                        // key ={index}
                                        className='border-b border-[#383838] text-xs font-normal text-[#e6e6e6] hover:bg-[#383838]'
                                    >
                                        <td className='p-1' hidden>{customer._id}</td>
                                        <td className='p-1'>{customer.customerName}</td>
                                        <td className='p-1'>{customer.contactNo}</td>
                                        <td className='p-1'>{customer.address}</td>
                                        <td className={`p-1 ${customer.balance === 0 ? 'text-[#e6e6e6]' : 'text-[#be3e3f]'} text-sm font-bold`}>  {(Number(customer.balance) || 0).toFixed(2)}</td>
                                       
                                        <td className='p-2 gap-2'>
                                      
                                            <button className={`text-[#0ea5e9] cursor-pointer text-sm font-semibold `}>
                                                <LiaEditSolid 
                                                className='w-6 h-6 text-[#0ea5e9] border-b border-[#0ea5e9]
                                                hover:bg-[#0ea5e9]/30 hover:rounded-full    
                                                 '
                                                   
                                                />
                                            </button>

                                            <button 
                                            className={`text-[#be3e3f] cursor-pointer text-sm font-semibold ml-1`}>
                                                <MdDeleteForever
                                                    onClick={() => { setSelectedCustomer(customer); setDeleteModalOpen(true); }} size={20}
                                                    className='w-6 h-6 text-[#be3e3f] border-b border-[#be3e3f]
                                                    hover:bg-[#be3e3f]/30 hover:rounded-full ml-2'
                                                />
                                            </button> 

                                            {detailsButton.map(({ label, icon, action }) => {
                                                return (
                                                    <button className='cursor-pointer 
                                                        text-green-600 border-b border-green-600
                                                        hover:bg-green-600/30 hover:rounded-full ml-2'
                                                        onClick={() => handleDetailsModal(customer._id, customer.customerName, customer.balance, action)}
                                                    >
                                                        {label} {icon}
                                                    </button>
                                                )
                                            })}
                                            
                                            {paymentButton.map(({ label, icon, action }) => {
                                                return (
                                                    <button className='cursor-pointer ml-2
                                                    hover:bg-[#f6b100]/30 hover:rounded-full'
                                                        onClick={() => handlePaymentModal(customer._id, customer.customerName, customer.balance, action)}
                                                    >
                                                        {label} {icon}
                                                    </button>
                                                )
                                            })}


                                       

                                        </td>

                                    </tr>

                                ))}


                        </tbody>
                        <tfoot>
                          
                            <tr className="bg-sky-400 font-bold text-xs">
                                <td className="p-2">{list.length}</td>
                                
                                <td className="p-2" colSpan={2}>Balances : </td>
                                <td className="p-2">{list.reduce((acc, customer) => acc + customer.balance, 0).toFixed(2)}</td>
                                <td className="p-2" colSpan={1}></td>
                            </tr>

                        </tfoot>
                    </table>

                </div>
            </div>

           
            {isDetailsModal && <DetailsModal setIsDetailsModal={setIsDetailsModal} />} 
            {isPaymentModal && <CustomerPayment setIsPaymentModal={setIsPaymentModal} />}   
           
            <ConfirmModal

                open={deleteModalOpen}
                customerName={selectedCustomer?.customerName}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => {
                    removeCustomer(selectedCustomer._id);
                    setDeleteModalOpen(false);
                }}
            />

        <BottomNav />
        </section>
    );
};



// You can put this at the bottom of your Services.jsx file or in a separate file
const ConfirmModal = ({ open, onClose, onConfirm, customerName }) => {
  if (!open) return null;
  return (
       <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(243, 216, 216, 0.4)' }}  //rgba(0,0,0,0.4)
    >
      
      <div className="bg-white rounded-lg p-6 shadow-lg min-w-[300px]">
        {/* <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2> */}
        <p className="mb-6">Are you sure you want to remove <span className="font-semibold text-red-600">{customerName}</span>?</p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>

    </div>
  );
};

export default Customers ;