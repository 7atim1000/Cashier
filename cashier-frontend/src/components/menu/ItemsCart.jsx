import React ,{ useState } from 'react' ;

import { useDispatch } from 'react-redux';
import { addItems } from '../../redux/slices/cartSlice';
// import { updateService } from '../../redux/slices/customerSlice';
import { BsFillCartCheckFill } from "react-icons/bs";

import { toast } from 'react-toastify'

const ItemsCart = ({id, name, image, price, qty, unit, cat}) => {

    const [qntCount, setQntCount] = useState(0);
    const [itemId, setItemId] = useState();

    const increment = (id) => {
        setItemId(id);
        setQntCount((prev) => prev + 1)
    };
    
    const decrement = (id) => {
        setItemId(id);
        // if (qntCount <= 0) return;
        setQntCount((prev) => prev - 1);
    };



    const dispatch = useDispatch();

    const handleAddToCard = (item) => {

        // if (qntCount === 0) return;
        // if (qntCount > qty) toast.warn('Sorry item does not have balance');

        // if (qntCount > 0 && qntCount <= qty) {

        if (qntCount === 0) {

            toast.warning('Please specify number of item first.');
            return;
        };
        

            const { name, price } = item;
            // slice item  for sale send ID versioal ID
            // const items = { itemId: id }
            // editing service or ItemId from this method to itemId = id means id from {id, name, price, qty, unit, cat}

            // const newObj = { id: new Date(), name, pricePerQuantity :price, quantity :qntCount, price :price * qntCount };
            const newObj = { id: id, name, pricePerQuantity: price, quantity: qntCount, price: price * qntCount };

            // send data to saleInfo
            // store data in sale Slice
            dispatch(addItems(newObj));

            setQntCount(0);
        };
   



    return (
        <div className='flex flex-col  flex-wrap justify-around gap-1 px-3 rounded-lg h-[250px] cursor-pointer bg-[#262626]  hover:bg-[#383838] shadow-lg/30 mt-0' >

            <div className='flex justify-around items-center'>
                <h1 className='text-sm font-semibold text-sky-400'>{name}</h1>

                <button  onClick={() => handleAddToCard({ id, name, price, qty, unit, cat })}
                    className='cursor-pointer mt-0'>
                    <BsFillCartCheckFill className='text-green-400 rounded-lg' size={35} />
                </button>
            </div>

               <div className ='flex items-center justify-center'>
                <img className ='rounded-full border-b-3 border-[#f6b100] w-15 h-15' src ={image}/>
            </div>

         

            <div className='flex items-center justify-between px-0 w-full'>

               <div className ='flex flex-col gap-2'>
                    <div className='flex gap-1'>
                        <p className='text-lg font-semibold text-sky-400'>{price.toFixed(2)}
                        <span className='text-xs text-[#F6B100] font-normal'> AED</span></p>
                    </div>

                    <p className='text-xs underline text-gray-400 mt-2'>{cat}</p>
                    <p><span className='text-xs font-normal text-gray-400'>Unit : </span><span className='text-sm font-semibold text-[#e6e6e6]'>{unit}</span></p>

               </div>
                

              
                <div className='flex gap-3 items-center  justify-between bg-[#1f1f1f] shadow-lg/50 px-4 py-3 rounded-lg mr-0'>
                   
                    <button
                        onClick={() => decrement(id)}
                        className='text-[#F6B100] text-lg  cursor-pointer'
                    >
                        &minus;
                    </button>

                    <span className={`${qntCount > 9 ? "text-lg" : "text-5xl"} text-sky-400 flex flex-wrap gap-2  font-semibold`}>{id === itemId ? qntCount : "0"}</span>

                    <button
                        // disabled={qty === 0}
                        onClick={() => increment(id)}
                        className='text-sky-400 text-lg cursor-pointer'
                    >
                        &#43;
                    </button>
                </div>

            </div>

        </div>
  
        
    )
};


export default ItemsCart ;