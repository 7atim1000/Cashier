import React , {useState, useEffect} from 'react'
import BackButton from '../components/shared/BackButton';

import { Progress, Flex } from 'antd'

import { api } from '../https';
import InvoicesDetails from '../components/invoice/InvoicesDetails';

const Invoices = () => {
    
    // fetch Invoices
    const [allInvoices, setAllInvoices] = useState([]);

    // filter by date
    const [frequency, setFrequency] = useState('30')
    const [orderStatus, setOrderStatus] = useState('all')
    const [shift, setShift] = useState('all')


    useEffect(() => {

        const getOrders = async () => {
            try {

                const res = await api.post('/api/order/fetch',
                    {
                        frequency,
                        orderStatus,

                        shift
                    });

                setAllInvoices(res.data)
                console.log(res.data)


            } catch (error) {
                console.log(error)
                message.error('Fetch Issue with transaction')

            }
        };

        getOrders();

    }, [frequency, orderStatus, shift]);


    // fetch Items or services
    const [list, setList] = useState([])
    const fetchServices = async () => {
        try {
            const response = await api.post('/api/services/fetch', {
                sort: '-createdAt'
            })
               
            if (response.data.success) {
                setList(response.data.services)
                console.log(response.data.services)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchServices()
    }, []);



    const twoColors = {
        '0%': '#108ee9',
        '100%': '#87d068',
    };

    const conicColors = {
        '0%': '#87d068',
        '50%': '#ffe58f',
        '100%': '#ffccc7',
    };


    
    
    return (
        <section className ='flex h-[calc(100vh-5rem)] overflow-y-scroll scrollbar-hidden gap-3 bg-[#1a1a1a]'>

            <div className ='flex-[2] h-[calc(100vh-5rem)] overflow-y-scroll scrollbar-hidden bg-[#1f1f1f]'>
               
                <div className ='flex items-center justify-between p-2'>
                    
                    <div className ='flex items-center justify-between'>
                        <p className ='p-2 bg-[#1a1a1a] text-sky-400 border-b border-[#e6e6e6] rounded-lg'>
                            <span className ='text-xs font-normal text-[#e6e6e6]'>Total : </span>
                            {allInvoices.reduce((acc, invoice) => acc + invoice.bills.total, 0).toFixed(2)}
                            <span className ='text-xs font-normal text-[#e6e6e6]'> AED</span>
                        </p>
                    </div>
                    <div className ='flex items-center justify-between'>
                        <p className ='p-2 bg-[#1a1a1a] text-sky-400 border-b border-[#e6e6e6] rounded-lg'>
                            <span className ='text-xs font-normal text-[#e6e6e6]'>Tax : </span>
                            {allInvoices.reduce((acc, invoice) => acc + invoice.bills.tax, 0).toFixed(2)}
                            <span className ='text-xs font-normal text-[#e6e6e6]'> AED</span>
                        </p>
                    </div>

                    <div className='flex items-center justify-between'>
                        <p className='text-xs font-normal text-[#e6e6e6]'>Grand Total : </p>
                        <p className='p-2 bg-[#1a1a1a] text-sky-400 border-b border-[#e6e6e6] rounded-lg'>{allInvoices.reduce((acc, invoice) => acc + invoice.bills.totalWithTax, 0).toFixed(2)}
                            <span className='text-xs font-normal text-[#e6e6e6]'> AED</span>
                        </p>
                    </div>

                </div>

                <hr className ='border-t border-[#1f1f1f] m-5'/>


                <div className='h-[calc(100vh-10rem)] flex  flex-col items-start gap-4 justify-start p-2 px-2 bg-[#1a1a1a] overflow-y-scroll scrollbar-hidden' >

                    <p className='text-[#e6e6e6] underline text-sm font-semibold'>Sales Items :</p>
                    {list.map((serv) => {
                        //////////////  status="exception" showInfo={false}
                        const amount = allInvoices.filter((invoice) =>
                            //invoice.invoiceType === "Sale" && invoice.items.name === serv.serviceName)
                            invoice.items.some(item => item.name === serv.serviceName))
                            .reduce((acc, invoice) => acc + invoice.bills.total, 0);
                        /////////////////
                        return (

                            amount > 0 && (
                                <div className='shadow-lg/30 bg-[#383838] p-1 w-full rounded-lg' style={{ color: 'red' }}  >
                                    <h5 className='text-xs text-[#f6b100] font-medium'>{serv.serviceName}</h5>

                                    <Flex gap="small" vertical  style={{ width: '100%' }}>
                                        <Progress  type='line' style={{ color: 'red' }} trailColor="rgba(0, 0, 0, 0.6)" strokeColor={twoColors} percent={((amount/allInvoices.reduce((acc, invoice) => acc + invoice.bills.total, 0)
                                        ) * 100).toFixed(0)} />
                                    </Flex>
                                </div>

                            )
                        )

                    })}

                </div>
                 
            </div>

           
           
            <div className ='flex-[4] h-[calc(100vh-5rem)] overflow-y-scroll scrollbar-hidden bg-[#1f1f1f]'>
                
                <div className='flex items-center justify-between px-10 py-1'>

                    <div className='flex gap-4 justify-between items-center'>
                        <BackButton />
                        <h1 className='text-[#f5f5f5] text-l font-bold'>Invoices Management</h1>
                    </div>

                    <div className='flex gap-2 mt-1'>

                        <button className={`${frequency === '30' ? 'bg-[#383838] text-[#f6b100]' : 'bg-[#1a1a1a]'} p-4 rounded-lg  shadow-lg/30 text-xs text-[#e6e6e6] font-medium cursor-pointer`}
                            onClick={() => setFrequency('30')}
                        >One Month
                        </button>
                        <button className={`${frequency === '365' ? 'bg-[#383838] text-[#f6b100]' : 'bg-[#1a1a1a]'} p-3 rounded-lg  shadow-lg/30 text-xs text-[#e6e6e6] font-medium cursor-pointer`}
                            onClick={() => setFrequency('365')}
                        >One Year
                        </button>


                        <button className={`${orderStatus === 'In Progress' ? 'bg-[#383838] text-[#f6b100]' : 'bg-[#1a1a1a]'} p-3 rounded-lg  shadow-lg/30 text-xs text-[#e6e6e6] font-medium cursor-pointer`}
                            onClick={() => setOrderStatus('In Progress')}
                        >In Progress
                        </button>
                        <button className={`${orderStatus === 'Completed' ? 'bg-[#383838] text-[#f6b100]' : 'bg-[#1a1a1a]'} p-3 rounded-lg  shadow-lg/30 text-xs text-[#e6e6e6] font-medium cursor-pointer`}
                            onClick={() => setOrderStatus('Completed')}
                        >Completed
                        </button>


                        <button className={`${shift === 'Morning' ? 'bg-[#383838] text-[#f6b100]' : 'bg-[#1a1a1a]'} p-3 rounded-lg  shadow-lg/30 text-xs text-[#e6e6e6] font-medium cursor-pointer`}
                            onClick={() => setShift('Morning')}
                        >Morning
                        </button>

                        <button className={`${shift === 'Evening' ? 'bg-[#383838] text-[#f6b100]' : 'bg-[#1a1a1a]'} p-3 rounded-lg  shadow-lg/30 text-xs text-[#e6e6e6] font-medium cursor-pointer`}
                            onClick={() => setShift('Evening')}
                        >Evening
                        </button>

                    </div>

                </div>
                
                <div className='mt-10'>

                    <div className='overflow-x-auto px-5'>
                        <table className='w-full text-left'>
                            <thead className='bg-[#1a1a1a] text-xs font-semibold text-sky-400'>
                                <tr className ='border-b-3  border-sky-400'>
                                  
                                    <th className='p-1'></th>
                                    <th className='p-1 ml-0'></th>
                                    <th className='p-1'>Table</th>
                                    <th className='p-1'>Items</th>
                                    <th className='p-1'>Customer</th>
                                   
                                    <th className='p-1'>Total</th>
                                    <th className='p-1'>Tax</th>
                                    <th className='p-1'>Grand Total</th>
                                    <th className='p-1'>Payed</th>
                                    <th className='p-1'>Payment</th>
                                    <th className='p-1'>Balance</th>
                                    <th className='p-1'>Status</th>
                                    <th className='p-1'></th>
                               
                                </tr>
                            </thead>


                            <tbody>
                                {
                                    allInvoices.length === 0
                                        ? (<p className='p-1 w-50 text-lg text-[#be3e3f] flex justify-center'>Invoices menu is empty!</p>)
                                        : allInvoices.map((invoice) => {

                                            return (
                                                <InvoicesDetails id={invoice._id} date={invoice.date}  shift={invoice.shift} table ={invoice.table.tabNo} length={invoice.items.length} customer={invoice.customerDetails.name}
                                                    total={invoice.bills.total} tax={invoice.bills.tax}
                                                    totalWithTax={invoice.bills.totalWithTax} payed={invoice.bills.payed} payment={invoice.paymentMethod} balance={invoice.bills.balance} status={invoice.orderStatus} items={invoice.items}
                                                />
                                            )
                                        })
                                }
                            </tbody>


                        </table>

                    </div>

                </div>

                


            </div>




        </section>
    );
};


export default Invoices ;