import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { getTotalPrice } from '../../redux/slices/cartSlice';
import { removeAllItems } from '../../redux/slices/cartSlice';
import { removeCustomer } from '../../redux/slices/customerSlice';
import Invoice from '../invoice/Invoice'
import { useMutation } from '@tanstack/react-query'

import { enqueueSnackbar } from 'notistack';
import { toast } from 'react-toastify'
import { addOrder, addTransaction, updateCustomer, updateTable } from '../../https/index';

// update table in lessson 20

// function loadScript(src) {
//      return new Promise((resolve) => {
//           const script = document.createElement('script');
//           script.src = src;
//           script.onload = () => {
//                resolve(true);
//           };
//           script.onerror = () => {
//                resolve(false);
//           };
//           document.body.appendChild(script);
//      });
// }


const Bill = () => {

    const dispatch = useDispatch();

     const userData = useSelector((state) => state.user); 
     const customerData = useSelector((state) => state.customer);
     const cartData = useSelector((state) => state.cart);  

     const seatsData = useSelector((state) => state.table);  

    //  const seats = useSelector();
     const total = useSelector(getTotalPrice);
     const taxRate = 5.25;
     const tax = (total * taxRate) / 100;
     const totalPriceWithTax = total + tax;

     // Payed amount 
     const[payedAmount, setPayedAmount] = useState(0)
     
     const showPayed = () => {
          setPayedAmount(totalPriceWithTax)
     }
     const hidePayed = () => {
          setPayedAmount(0)
     }

     const balance = totalPriceWithTax - payedAmount ;


    // payment
     const [paymentMethod, setPaymentMethod] = useState();
     
     const cashPaymethod = () => {

          setPaymentMethod('Cash');
          showPayed();
     };
     const onlinePaymethod = () => {

          setPaymentMethod('Online');
          showPayed();
     };

     const [showInvoice, setShowInvoice] = useState(false);
     const [orderInfo, setOrderInfo] = useState();


    // placeOrder

     const handlePlaceOrder = async () => {
        
          if (!paymentMethod){
          enqueueSnackbar('please select a payment method', {variant: "warning"});
          return;
          }
        
          if (customerData.customerName === '') {
               enqueueSnackbar('please select customer', { variant: "warning" });
               return;
          }
          if (customerData.table === null) {
               enqueueSnackbar('please select table', { variant: "warning" });
               return;
          }

          if (cartData.length === 0) {
               enqueueSnackbar('please select service', { variant: "warning" });
               return;
          }
     
        if (paymentMethod === "Cash" || "Online") {

            const orderData = {
              
               customerDetails: {
                    name: customerData.customerName,
                    phone: customerData.contactNo,
                    guests: customerData.guests,
               },
               customer : customerData.customerId,

               orderStatus: "In Progress",
              
               bills: {
                   total: total,
                   tax: tax ,
                   totalWithTax: totalPriceWithTax,
                   payed : payedAmount,
                   balance : balance ,
               },

               items: cartData,

               table: customerData.table.tableId,
               paymentMethod: paymentMethod,
               user: userData._id,
            };

          // setTimeout(() => {
               orderMutation.mutate(orderData);
               //hidePayed();
          //   }, 1500);

        }

     

     }


     // order Mutation consist update table 
     const orderMutation = useMutation ({ 

          mutationFn: (reqData) => addOrder(reqData),
          //mutationFn: (reqData) => createOrderRazorpay(reqData),
          onSuccess: (resData) => {
               const { data } = resData.data;
               console.log(data);
               
               setOrderInfo(data)  // to show details in report 
               
               // enqueueSnackbar('Order Placed!', {
               //      variant: "success"
               // });
               toast.success('Sale Invoice Placed and Confirmed Successfully .') ;



               // update Table :
               const tableData = {
                    status: "Booked",
               
                    orderId: data._id,
                    tableId: data.table
               }
                setTimeout(() => {
                    tableUpdateMutation.mutate(tableData)
                }, 1500);


               const transactionData = {
                    transactionNumber: `${Date.now()}`,

                    amount: payedAmount,
                    type: 'Income',
                    category: 'Sale invoice',
                    refrence: customerData.customerName,
                    description: '-',
                    date: new Date().toISOString().slice(0, 10) 
               }
                setTimeout(() => {
                    transactionMutation.mutate(transactionData)
                }, 1500);

             

             
               // Update customer 
               const balanceData = {
                    // balance:  balance + customerData.balance,
                    balance: balance + customerData.balance,
                    customerId: data.customer    
               }

               setTimeout(() => {
                    customerUpdateMutation.mutate(balanceData)
               }, 1500)


               setShowInvoice(true); // to open report 

               dispatch(removeCustomer());
               dispatch(removeAllItems());

               // hidePayed();
               setPayedAmount(0)

          },
               
            
          onError: (error) => {
               console.log(error);
          }
     });




     const tableUpdateMutation = useMutation({

          mutationFn: (reqData) => updateTable(reqData),
          onSuccess: (resData) => {
               console.log(resData);
          }, 
          onError : (error) => {
               console.log(error)
          }
     });


         // add transaction 
     const transactionMutation = useMutation({
          mutationFn: (reqData) => addTransaction(reqData),

          onSuccess: (resData) => {
             
               const { data } = resData.data; // data comes from backend ... resData default on mutation     
               toast.success('The income was transfered to the finance department .');
          },
          onError: (error) => {
               console.log(error);
          }
     });

     // update Customer
     const customerUpdateMutation = useMutation({
        
        mutationFn: (reqData) => updateCustomer(reqData),
        onSuccess: (resData) => {
                    
        console.log(resData);
        
        }, 
            onError : (error) => {
            console.log(error)
        }
    });

        
     /*
     // PAYMENT---------------------METHOD 
        if (paymentMethod === "Cash") {

     ///////////////////////////////////////////////////////////////////////////////////////////////////
     //////////////////////////////////////////////////////////////////////////////////////////////////
     
     /* load the script
          const res = await loadScript(
               "https://checkout.razorpay.com/v1/checkout.js"
          );
      
          if(!res) {
               enqueueSnackbar("Razorpay SDK failed to load. Are you online ?", {
               variant: "warning"
          });
          return;
     }

     
     /*
     try {
          // create order
          const reqData = {
              amount: totalPriceWithTax.toFixed(2)
          }
          const { data } = await createOrderRazorpay(reqData)
     
          const options = {
               //key : `${import.meta.env.VITE_RAZORPAY_KEY_ID}`,
               amount : data.order.amount,
               currency : data.order.currency,
               //name : "RESTRO",
               //description : "Secure payment for your Meal",
               //order_id: data.order.id,
               name: customerData.name,

               handler: async function (response) {

                    console.log(response);
                    //const verification = await verifyPaymentRazorpay(response);
                    //console.log(verification);
                    //enqueueSnackbar(verification.daa.message, { variant: "success" });
               
               // verify payment
                   // const verification = await verifyPaymentRazorpay(response);
                    //console.log(verification);
                    //enqueueSnackbar(verification.data.message, { variant: "success" })
               },

          
               
          };

          //const rzp = new window.Razorpay(options);
          //rzp.open();

        } catch (error) {
          console.log(error);
          enqueueSnackbar('Payment Failed', {variant: "error",});
        }
    
     */
     
     
    



    return (
    <>

    <div className =' overflow-y-scroll scrollbar-hidden'> 
     {/* h-[180px] overflow-y-scroll scrollbar-hidden */}

    
          <div className ='flex items-center justify-between px-5 mt-2'>
            <p className ='text-xs text-[#ababab] font-medium mt-2'>Items ({cartData.length})</p>
            <h1 className ='text-[#e6e6e6] text-md font-bold'><span className ='text-xs font-normal text-[#ababab]'>AED </span>{total.toFixed(2)}</h1>
          </div>

          <div className ='flex items-center justify-between px-5 mt-2'>
            <p className ='text-xs text-[#ababab] font-medium mt-2'>Tax (5.25%)</p>
            <h1 className ='text-[#e6e6e6] text-md font-bold'><span className ='text-xs font-normal text-[#ababab]'>AED </span>{tax.toFixed(2)}</h1>
          </div>
          
          <div className ='flex items-center justify-between px-5 mt-2'>
            <p className ='text-xs text-[#ababab] font-medium mt-2'>Total With Tax</p>
            <h1 className ='text-sky-400 text-lg font-bold'><span className ='text-xs font-normal text-[#ababab]'>AED </span>{totalPriceWithTax.toFixed(2)}</h1>
          </div>

          
          
          <div className='flex bg-sky-400 items-center justify-between px-5 mt-5 shadow-lg/30 p-5 rounded-lg'>

               <div className='flex gap-1 items-center justify-between'>
                    <p className='text-xs text-[#1f1f1f] font-medium mt-2'>Payed :</p>
                    
                    <input className='w-17 text-[#e6e6e6] text-xl font-semibold' 
                         name='payedAmount' 
                         type='text' 
                         value={Number(payedAmount).toFixed(2)} 
                         onChange={(e) => Number(setPayedAmount(e.target.value))}
                    />
                    <span className='text-xs font-normal text-[#1f1f1f] mt-3'> AED</span>
               </div>

                   <p className='text-xs text-[#1f1f1f] font-medium mt-2'>Balance :</p>
                   <p className='ml-0  text-[#be3e3f]'><span className='text-2xl font-semibold'>{balance.toFixed(2)}</span><span className='text-xs font-normal text-[#1f1f1f]'> AED</span></p>

          </div>

          {/* <hr className='border-sky-400 b-t-2' /> */}


          <div className ='flex items-center gap-3 px-5 py-2 mt-6'>
            <button 
               // onClick={() => setPaymentMethod('Cash')} onClick ={cashPaymethod}
               onClick ={cashPaymethod} 
               className ={`bg-[#1f1f1f] px-4 py-2 w-full rounded-lg text-[#e6e6e6] font-semibold cursor-pointer
               ${paymentMethod === "Cash" ? "bg-[#383838]" : ""}`} >Cash</button>
          
            <button 

               onClick ={onlinePaymethod} 
               className ={`bg-[#1f1f1f] px-4 py-2 w-full rounded-lg text-[#e6e6e6] font-semibold cursor-pointer
               ${paymentMethod === "Online" ? "bg-[#383838]" : ""}`} >Online</button>
          </div>

          <div className ='flex items-center gap-3 px-5 mt-2'>
            <button className ='bg-sky-400 px-4 py-2 w-full rounded-lg text-[#1a1a1a] cursor-pointer font-semibold'>Print Receipt</button>
            <button 
               
               disabled={customerData.tableId === ''}
               onClick ={handlePlaceOrder}
               className ='bg-[#F6B100] px-4 py-2 w-full rounded-lg text-[#1a1a1a] cursor-pointer font-semibold'>
                    Place Order
               </button>
          </div>

     </div>


     {showInvoice && (
          <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
     )}


    
    </>
    
        
    );
};


export default Bill ;