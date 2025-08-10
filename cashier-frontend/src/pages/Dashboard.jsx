import React, { useState, useEffect  } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdArrowRight } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";


import { BiSolidDish } from 'react-icons/bi';
import { VscListOrdered } from "react-icons/vsc";
import { FaUsersCog } from "react-icons/fa";
import { GiCash } from "react-icons/gi";
import { MdOutlineCategory } from "react-icons/md";
import { RxDropdownMenu } from "react-icons/rx";

import { MdTableBar } from "react-icons/md";
import { GiRoundTable } from "react-icons/gi";
import { FaProductHunt } from "react-icons/fa6";
import { MdOutlineScatterPlot } from "react-icons/md";
import { HiMiniUserGroup } from "react-icons/hi2";
import { CiCircleList } from "react-icons/ci";
import { TbPercentage66 } from "react-icons/tb";
import { TbSum } from "react-icons/tb";
import { RiNumbersLine } from "react-icons/ri";



import { getBgColor } from '../utils';
import { api } from '../https';
import BackButton from '../components/shared/BackButton';
// import { toast } from 'react-toastify'


const Dashboard = () => {
    const navigate = useNavigate();

    const leftButtons = [

        { label: "Tables", icon: <MdTableBar className='w-6 h-6 text-sky-400' />, action: "table" },
        { label: "Units", icon: <MdOutlineCategory className='w-6 h-6 text-sky-400' />, action: "units" },
        { label: "Categories", icon: <RxDropdownMenu className='w-6 h-6 text-sky-400' />, action: "category" },
        { label: "Dishes", icon: <BiSolidDish className='w-6 h-6 text-sky-400'/>, action: "dishes" },

    ]

    const rightButtons = [
        { label: "Orders", icon: <VscListOrdered className='w-6 h-6 text-sky-400' />, action: "orders" },
        { label: "Customrs", icon: <FaUsersCog className='w-6 h-6 text-sky-400' />, action: "customers" },
        { label: "Transactions", icon: <GiCash className='w-6 h-6 text-sky-400' />, action: "transactions" },
    ]


    // Modals
    const [isTableModalOpen, setIsTableModalOpen] = useState(false);
    const [isInvocieModal, setIsInvoiceModal] = useState(false);
    const [isCustomerModal, setIsCustomerModal] = useState(false);
    const [isTransactionModal, setIsTransactionModal] = useState(false);

    const handleOpenModal = (action) => {
        if(action === 'table') navigate('/tables');
        if(action === 'orders') navigate('/invoices');
        if(action === 'customers') navigate('/customers');

        if(action === 'category') navigate('/categories')
        if(action === 'dishes') navigate('/services')
        if(action === 'units') navigate('/units')
    
    };
 

    // fetch Orders 
    const [allInvoices, setAllInvoices] = useState([]);

    // filters
    const [frequency, setFrequency] = useState('366');

    const [orderStatus, setOrderStatus] = useState('all')
    const [shift, setShift] = useState('all')
    const [orderType, setOrderType] = useState('all')


    useEffect(() => {

        const getInvoices = async () => {
            try {

                const res = await api.post('/api/order/fetch',
                    {
                        frequency,
                        orderType,
                        orderStatus,

                        shift
                    });

                setAllInvoices(res.data)
                console.log(res.data)


            } catch (error) {
                console.log(error)
                //toast.error('Fetch Issue with transaction')
            }
        };

        getInvoices();
    }, [frequency, orderStatus, shift]);

    
    //dashBoard Categories 
        const [catList, setCatList] = useState([])
        const fetchCategories = async () => {
    
            try {
                const response = await api.get('/api/category/')
    
                if (response.data.success) {
                    setCatList(response.data.categories)
    
                } else {
                    toast.error(response.data.message)
                }
    
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        };

    //dashBoard Services
    const [proList, setProList] = useState([])
    const fetchProducts = async () => {

        try {
            const res = await api.get('/api/services/')

            if (res.data.success) {
                setProList(res.data.services)

            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    };

    //dashBoard Customers
    const [customerList, setCustomerList] = useState([])
    const fetchCustomers = async () => {

        try {
            const res = await api.get('/api/customers/')

            if (res.data.success) {
                setCustomerList(res.data.customers)

            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    };

  

    useEffect(() => {
        fetchCategories(),
        fetchProducts(),
        fetchCustomers()
    }, []);




    // Dashboard tables
    const [tables, setTables] = useState([])
    const [status, setStatus] = useState('all')

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


    
  


    return(
       
        <section className = 'bg-[#1a1a1a] h-[calc(100vh)] overflow-y-scroll scrollbar-hidden'>
            
            <div className ='container mb-0 flex items-center justify-start py-5  px-6 md:px-4'>
               
                <div className ='flex items-center gap-3'>
                    {
                        leftButtons.map(({label, icon, action}) => {
                           return (
                            <button onClick ={() =>handleOpenModal(action)}
                            className ='bg-[#1f1f1f] px-8 py-3 rounded-lg text-[#e6e6e6] cursor-pointer
                            font-semibold text-sm flex items-center gap-2 border-r border-[#e6e6e6]'>
                                {label} {icon}
                            </button>
                           )
                        })
                    }
                </div>
                
            {/*right side */}
                <div className='flex items-end justify-end gap-3'>
                    {
                        rightButtons.map(({ label, icon, action }) => {
                            return (
                                <button onClick={() => handleOpenModal(action)}
                                    className='bg-[#1f1f1f] px-8 py-3 rounded-lg text-[#e6e6e6] cursor-pointer
                            font-semibold text-sm flex items-center gap-2 border-r border-[#e6e6e6]'>
                                    {label} {icon}
                                </button>
                            )
                        })
                    }
                </div>

                
            </div>


            {/* <div className="flex gap-2 items-center bg-[#1f1f1f]  md:flex-row md:justify-between md:items-center px-5 py-2 gap-2 "> */}
            <div className ='p-2 flex gap-2 items-center bg-[#1f1f1f]'>
                <BackButton/>
                <h1 className='text-sky-400 p-2 text-lg font-semibold'>Dashboard <RxDashboard className='inline w-7 h-7 text-[#f6b100]' /></h1>
            </div>


            <div className='w-full px-5 py-4 flex flex-wrap justify-start gap-3 overflow-y-scroll scrollbar-hidden h-[calc(100vh-5rem-5rem)]'>
    
                
                {/*Categories */}
                <div  className='w-[310px]  h-[170px] bg-[#1a1a1a] hover:bg-[#1f1f1f] p-4 rounded-lg cursor-pointer shadow-lg/30 mb-3 mt-2 border-b border-[#f6b100]'>
                    
                    {catList.length === 0
                  
                    ? (<p className=''></p>)
                    : catList.map((category, index) => (
                        <></>
                    ))}

                       <div className='flex  gap-1 items-center justify-between px-1 '>    
                        
                            <span className='text-sm font-normal text-[#e6e6e6]'>Count of Items</span>
                            <MdOutlineScatterPlot className='inline ml-2 text-gray-500 w-8 h-8 border border-gray-700' />
                            <p className='px-2 py-1 text-lg font-semibold rounded-lg text-[#f6b100]'>{catList.length}
                            <span className ='text-[#e6e6e6] text-sm font-normal'> Items</span></p>

                        </div>

                
                     <div className='flex items-center justify-center mt-13 '>
                       <h1 className={`text-[#e6e6e6] rounded-lg  py-3 px-7 text-lg`} style={{ backgroundColor:  getBgColor() }}>{catList.length}</h1>
                     </div>

                </div>


                {/*Services */}
                <div className='w-[310px]  h-[170px] bg-[#1a1a1a] hover:bg-[#1f1f1f] p-4 rounded-lg cursor-pointer shadow-lg/30 mb-3 mt-2 border-b border-[#f6b100]'>

                    {proList.length === 0

                        ? (<p className=''></p>)
                        : proList.map((product, index) => (
                            <></>
                        ))}

                    <div className='flex  gap-1 items-center justify-between px-1 '>

                        <span className='text-sm font-normal text-[#e6e6e6]'>Count of Products</span>
                        <FaProductHunt className='inline ml-2 text-gray-500 w-8 h-8 border border-gray-700' /> 
                        <p className='px-2 py-1 text-lg font-semibold rounded-lg text-[#d6b100]'>{proList.length}
                            <span className='text-[#e6e6e6] text-sm font-normal'> Products</span></p>

                    </div>


                    <div className='flex items-center justify-center mt-13'>
                        <h1 className={`text-[#e6e6e6] rounded-lg py-3 px-7 text-lg`} style={{ backgroundColor: getBgColor() }}>{proList.length}</h1>
                    </div>

                </div>

               
               
                {/*Customers */}
                <div className='w-[310px]  h-[170px] bg-[#1a1a1a] hover:bg-[#1f1f1f] p-4 rounded-lg cursor-pointer shadow-lg/30 mb-3 mt-2 border-b border-[#f6b100]'>

                    {catList.length === 0

                        ? (<p className=''></p>)
                        : customerList.map((customer, index) => (
                            <></>
                        ))}

                    <div className='flex  gap-1 items-center justify-between px-1 '>

                        <span className='text-sm font-normal text-[#e6e6e6]'>Count of Customers</span>
                        <HiMiniUserGroup className='inline ml-2 text-gray-500 w-8 h-8 border border-gray-700' />
                        <p className='px-2 py-1 text-lg font-semibold rounded-lg text-[#d6b100]'>{customerList.length}
                            <span className='text-[#e6e6e6] text-sm font-normal'> Customers</span></p>
                    </div>


                    <div className='flex items-center justify-center mt-13'>
                        <h1 className={`text-[#e6e6e6] rounded-lg py-3 px-7 text-lg`} style={{ backgroundColor: getBgColor() }}>{catList.length}</h1>
                    </div>

                </div>

                {/*Tables */}
                <div className='w-[310px]  h-[170px] bg-[#1a1a1a] hover:bg-[#1f1f1f] p-4 rounded-lg cursor-pointer shadow-lg/30 mb-3 mt-2 border-b border-[#f6b100]'>

                    {tables.length === 0

                        ? (<p className=''></p>)
                        : tables.map((table, index) => (
                            <></>
                        ))}

                    <div className='flex  gap-1 items-center justify-between px-1 '>

                        <span className='text-sm font-normal text-[#e6e6e6]'>Count of Tables</span>
                        <GiRoundTable className='inline ml-2 text-gray-500 w-8 h-8 border border-gray-700' />
                        <p className='px-2 py-1 text-lg font-semibold rounded-lg text-[#d6b100]'>{tables.length}
                            <span className='text-[#e6e6e6] text-sm font-normal'> Tables</span></p>

                    </div>


                    <div className='flex items-center justify-between mt-5'>

                        <h1 className={`text-[#e6e6e6] rounded-lg py-3 px-7 text-lg`} style={{ backgroundColor: getBgColor() }}>{tables.length}</h1>
                      
                        <div className ='flex flex-col gap-1 justify-between items-center'>
                           
                           <button onClick={() => setStatus('all')}
                                className={`bg-transperant text-[#f5f5f5] text-xs cursor-pointer rounded-lg px-5 py-1 font-normal ${status === 'all' && 'bg-gray-500 '} }`}
                            >
                                All
                            </button>
                            <button onClick={() => setStatus('Available')}
                                className={`bg-transperant text-[#f5f5f5] text-sm cursor-pointer rounded-lg px-5 py-1 font-normal ${status === 'Available' && 'bg-gray-500'} }`}
                            >
                                Available
                            </button>
                            <button onClick={() => setStatus('Booked')}
                                className={`bg-transperant text-[#f5f5f5] text-sm cursor-pointer rounded-lg px-5 py-1 font-normal ${status === 'Booked' && 'bg-gray-400 '} }`}
                            >
                                Booked
                            </button>

                        </div>
                    </div>

                </div>


                
                {/*Sales Count */}
                <div className='w-[310px]  h-[170px] bg-[#1a1a1a]  hover:bg-[#1f1f1f] p-4 rounded-lg cursor-pointer shadow-lg/30 mb-3 mt-2 border-b border-[#f6b100]'>

                    {allInvoices.length === 0

                        ? (<p className=''></p>)
                        : allInvoices.map((invoice, index) => (
                            <></>
                        ))}

                    <div className='flex  gap-1 items-center justify-between px-1 '>

                        <span className='text-sm font-normal text-[#e6e6e6]'>Invoices Count  </span>
                        <CiCircleList className='inline ml-2 text-gray-500 w-8 h-8 border border-gray-700' />
                        <p className='px-2 py-1 text-lg font-semibold rounded-lg text-[#d6b100]'>{allInvoices.length}
                            <span className='text-[#e6e6e6] text-sm font-normal'> Invoices</span></p>

                    </div>


                    <div className='flex items-center justify-between mt-5 '>

                        <h1 className={`text-[#e6e6e6] rounded-lg py-3 px-7 text-lg`} style={{ backgroundColor: getBgColor() }}>{allInvoices.length}</h1>

                        <div className='flex flex-col gap-1 justify-between items-center'>

                            <button className={`bg-transperant text-[#e6e6e6] text-xs cursor-pointer rounded-lg px-5 py-1 font-normal ${frequency === '1' && 'bg-gray-500' } `}
                                onClick={() => setFrequency('1')}
                            >Today
                            </button>

                            <button className={`bg-transperant text-[#e6e6e6] text-xs cursor-pointer rounded-lg px-5 py-1 font-normal ${frequency === '30' && 'bg-gray-500'} `}
                                onClick={() => setFrequency('30')}
                            >Month
                            </button>

                            <button className={`bg-transperant text-[#e6e6e6] text-xs cursor-pointer rounded-lg px-5 py-1 font-normal ${frequency === '366' && 'bg-gray-500'}`}
                                onClick={() => setFrequency('366')}
                            >Year
                            </button>

                        </div>
                    </div>

                </div>


                {/*Sales Total */}
                <div className='w-[310px]  h-[170px] bg-[#1a1a1a] hover:bg-[#1f1f1f] p-4 rounded-lg cursor-pointer shadow-lg/30 mb-3 mt-2 border-b border-[#f6b100]'>

                    {allInvoices.length === 0

                        ? (<p className=''></p>)
                        : allInvoices.map((invoice, index) => (
                            <></>
                        ))}

                    <div className='flex  gap-1 items-center justify-between px-1 '>

                        <span className='text-sm font-normal text-[#e6e6e6]'>Total Sales </span>
                        <RiNumbersLine className='inline ml-2 text-gray-500 w-8 h-8 border border-gray-700' />  
                        <p className='px-2 py-1 text-lg font-semibold rounded-lg text-[#d6b100]'>{allInvoices.reduce((acc, invoice) => acc + invoice.bills.total, 0).toFixed(2)}
                            <span className='text-[#e6e6e6] text-sm font-normal'> AED</span></p>

                    </div>


                    <div className='flex items-center justify-between mt-5'>

                        <h1 className={`text-[#e6e6e6] rounded-lg py-3 px-7 text-lg`} style={{ backgroundColor: getBgColor() }}>{allInvoices.reduce((acc, invoice) => acc + invoice.bills.total, 0).toFixed(2)}</h1>
                      
                        <div className ='flex flex-col gap-1 justify-between items-center'>
                           
                            <button className={`bg-transperant text-[#e6e6e6] text-xs cursor-pointer rounded-lg px-5 py-1 font-normal ${frequency === '1' && 'bg-gray-500'} `}
                                onClick={() => setFrequency('1')}
                            >Today
                            </button>

                            <button className={`bg-transperant text-[#e6e6e6] text-xs cursor-pointer rounded-lg px-5 py-1 font-normal ${frequency === '30' && 'bg-gray-500'} `}
                                onClick={() => setFrequency('30')}
                            >Month
                            </button>

                            <button className={`bg-transperant text-[#e6e6e6] text-xs cursor-pointer rounded-lg px-5 py-1 font-normal ${frequency === '366' && 'bg-gray-500'}`}
                                onClick={() => setFrequency('366')}
                            >Year
                            </button>

                        </div>
                    </div>

                </div>


                {/*Sales VAT */}
                <div className='w-[310px]  h-[170px] bg-[#1a1a1a] hover:bg-[#1f1f1f] p-4 rounded-lg cursor-pointer shadow-lg/30 mb-3 mt-2 border-b border-[#f6b100]'>

                    {allInvoices.length === 0

                        ? (<p className=''></p>)
                        : allInvoices.map((invoice, index) => (
                            <></>
                        ))}

                    <div className='flex  gap-1 items-center justify-between px-1 '>

                        <span className='text-sm font-normal text-[#e6e6e6]'>Total Tax </span>
                        <TbPercentage66 className='inline ml-2 text-gray-500 w-8 h-8 border border-gray-700 ' />
                        <p className='px-2 py-1 text-lg font-semibold rounded-lg text-[#d6b100]'>{allInvoices.reduce((acc, invoice) => acc + invoice.bills.tax, 0).toFixed(2)}
                            <span className='text-[#e6e6e6] text-sm font-normal'> AED</span></p>

                    </div>


                    <div className='flex items-center justify-between mt-5'>

                        <h1 className={`text-[#e6e6e6] rounded-lg py-3 px-7 text-lg`} style={{ backgroundColor: getBgColor() }}>{allInvoices.reduce((acc, invoice) => acc + invoice.bills.tax, 0).toFixed(2)}</h1>
                      
                        <div className ='flex flex-col gap-1 justify-between items-center'>
                           
                            <button className={`bg-transperant text-[#e6e6e6] text-xs cursor-pointer rounded-lg px-5 py-1 font-normal ${frequency === '1' && 'bg-gray-500'} `}
                                onClick={() => setFrequency('1')}
                            >Today
                            </button>

                            <button className={`bg-transperant text-[#e6e6e6] text-xs cursor-pointer rounded-lg px-5 py-1 font-normal ${frequency === '30' && 'bg-gray-500'} `}
                                onClick={() => setFrequency('30')}
                            >Month
                            </button>

                            <button className={`bg-transperant text-[#e6e6e6] text-xs cursor-pointer rounded-lg px-5 py-1 font-normal ${frequency === '366' && 'bg-gray-500'}`}
                                onClick={() => setFrequency('366')}
                            >Year
                            </button>

                        </div>
                    </div>

                </div>
     

                {/*Sales TOTAL WITH VAT */}
                <div className='w-[310px]  h-[170px] bg-[#1a1a1a] hover:bg-[#1f1f1f] p-4 rounded-lg cursor-pointer shadow-lg/30 mb-3 mt-2 border-b border-[#f6b100]'>

                    {allInvoices.length === 0

                        ? (<p className=''></p>)
                        : allInvoices.map((invoice, index) => (
                            <></>
                        ))}

                    <div className='flex  gap-1 items-center justify-between px-1 '>

                        <span className='text-sm font-normal text-[#e6e6e6]'>Total With Tax </span>
                        <TbSum className='inline ml-2 text-gray-500 w-8 h-8 border border-gray-700 ' />
                        <p className='px-2 py-1 text-lg font-semibold rounded-lg text-[#d6b100]'>{allInvoices.reduce((acc, invoice) => acc + invoice.bills.totalWithTax, 0).toFixed(2)}
                            <span className='text-[#e6e6e6] text-xs font-normal'> AED</span></p>

                    </div>


                    <div className='flex items-center justify-between mt-5'>

                        <h1 className={`text-[#e6e6e6] rounded-lg py-3 px-7 text-lg`} style={{ backgroundColor: getBgColor() }}>{allInvoices.reduce((acc, invoice) => acc + invoice.bills.totalWithTax, 0).toFixed(2)}</h1>

                        <div className='flex flex-col gap-1 justify-between items-center'>

                            <button className={`bg-transperant text-[#e6e6e6] text-xs cursor-pointer rounded-lg px-5 py-1 font-normal ${frequency === '1' && 'bg-gray-500'} `}
                                onClick={() => setFrequency('1')}
                            >Today
                            </button>

                            <button className={`bg-transperant text-[#e6e6e6] text-xs cursor-pointer rounded-lg px-5 py-1 font-normal ${frequency === '30' && 'bg-gray-500'} `}
                                onClick={() => setFrequency('30')}
                            >Month
                            </button>

                            <button className={`bg-transperant text-[#e6e6e6] text-xs cursor-pointer rounded-lg px-5 py-1 font-normal ${frequency === '366' && 'bg-gray-500'}`}
                                onClick={() => setFrequency('366')}
                            >Year
                            </button>

                        </div>
                    </div>

                </div>



            </div>
            
          
        </section>
    )
}


export default Dashboard;