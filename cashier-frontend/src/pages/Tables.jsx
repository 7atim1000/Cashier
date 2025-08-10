import React, {useState, useEffect} from 'react'
import BottomNav from '../components/shared/BottomNav';
import BackButton from '../components/shared/BackButton';
import TableCard from '../components/tables/TableCard';

import { IoIosAddCircle } from "react-icons/io";


import { api } from '../https';
import Modal from '../components/tables/Modal';


const Tables = () => {

   
    const [tables, setTables] = useState([]);
    const [status, setStatus] = useState('all');
    
    // fetch tables
    useEffect(() => {

        const getTables = async () => {
            try {

                const res = await api.post('/api/table/fetch',
                    {
                       status
                    });

                setTables(res.data)
                console.log(res.data)


            } catch (error) {
                console.log(error)
            }
        };

        getTables();
    }, [status]);


    const addBtn = [{ label: "New Table", icon: <IoIosAddCircle className ='text-sky-600 w-6 h-6'/>, action: "table" }]
    
    const[isAddTableModal, setIsAddTableModal] = useState(false);
    
    const handleaddTableModalOpen = (action) =>{
        if(action === 'table') setIsAddTableModal(true);
    }
   

    return (

      <section className ='bg-[#1a1a1a] h-[calc(100vh-5rem)] overflow-y-scroll scrollbar-hidden'>
        
        <div className ='flex items-center justify-between px-10 py-3'>
            
            <div className ='flex items-center gap-4'>
            <BackButton />
            <h1 className ='text-[#f5f5f5] text-lg font-bold tracking-wider'>Tables Management</h1>
            </div>

            <div className ='flex items-center justify-around gap-4'>
                <button onClick={() => setStatus('all')}
                   className ={`shadow-lg/30  bg-[#1f1f1f] text-[#f5f5f5] text-sm cursor-pointer ${ status === 'all' && 'bg-sky-400 text-black rounded-lg px-5 py-2'} rounded-lg px-5 py-2 font-semibold}`}    
                >
                All
                </button>
                  <button onClick={() => setStatus('Available')}
                className ={`shadow-lg/30  bg-[#1f1f1f] text-[#f5f5f5] text-sm cursor-pointer ${ status === 'Available' && 'bg-sky-400 text-black rounded-lg px-5 py-2'} rounded-lg px-5 py-2 font-semibold }`}
                >
                Available
                </button>
                <button onClick={() => setStatus('Booked')}
                className ={`shadow-lg/30  bg-[#1f1f1f] text-[#f5f5f5] text-sm cursor-pointer ${ status === 'Booked' && 'bg-sky-400 text-black rounded-lg px-5 py-2'} rounded-lg px-5 py-2 font-semibold }`}
                >
                Booked
                </button>

                <div className='flex items-center gap-3'>
                    {
                        addBtn.map(({ label, icon, action }) => {
                            return (
                                <button onClick={() => handleaddTableModalOpen(action)}
                                    className='bg-[#f6b100] px-4 py-2 rounded-lg text-[#1a1a1a] cursor-pointer
                                    font-semibold text-sm flex items-center gap-2'>
                                    {label} {icon}
                                </button>
                                )
                            })
                        }


                {isAddTableModal && <Modal setIsAddTableModal = {setIsAddTableModal} />}
          
      
                </div>




            </div>  

        </div>
        
        <div className ='px-10 py-4 flex flex-wrap gap-6 overflow-y-scroll scrollbar-hidden h-[calc(100vh-5rem-5rem)]'>
       
            {/* { resData?.data.data.map((table) =>{   */}
                {/* return (   */}
                
                {tables.length === 0
                    ? (<p className='ml-5 mt-2 text-xs text-[#e6e6e6] flex items-start justify-start'>Your tables list is empty !</p>)
                    : tables.map((table, index) => (
                    <TableCard  id={table._id} name={table.tabNo} status={table.status} initials={table?.currentOrder?.customerDetails.name} seats={table.seats}/>                   
                ))}

              
        </div>

        
      
        <BottomNav />
      </section>

    )
}

export default Tables;