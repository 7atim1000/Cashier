import React , {useState, useEffect} from 'react' 
import { MdDeleteForever, MdOutlineAddToDrive } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";

import { api } from '../https';
import { toast } from 'react-toastify';
import BackButton from '../components/shared/BackButton';
import { getBgColor } from '../utils';
import UnitAddModal from '../components/units/UnitAddModal';

const Units = () => {

    const addBtn = [{ label : 'Add Unit', action :'unit' , icon : <MdOutlineAddToDrive className ='text-sky-600' size={20} />}]


    const [isAddUnitModal, setIsAddUnitModal] = useState(false);

    const handleAddUnitModalOpen = (action) => {
        if (action === 'unit') setIsAddUnitModal(true)
    };


//fetch units
const [list, setList] = useState([])
const fetchUnits = async () => {
    
    try {
        const response = await api.get('/api/units/')

        if (response.data.success) {
            setList(response.data.units)

        } else {
            toast.error(response.data.message)
        }

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
}


useEffect(() => {
    fetchUnits()
}, []) ;


// remove 
const [deleteModalOpen, setDeleteModalOpen] = useState(false);
const [selectedUnit, setSelectedUnit] = useState(null);


const removeUnit = async (id) => {

    try {
        const response = await api.post('/api/units/remove', { id },)

        if (response.data.success) {
            toast.success(response.data.message)

            //Update the LIST after Remove
            await fetchUnits();

        } else {
            toast.error(response.data.message)
        }

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
};


return(

    <section className ='h-[calc(100vh-5rem)] overflow-y-scroll scrollbar-hidden bg-[#1a1a1a]'>
        
        <div className='flex justify-between items-center px-5 py-2'>
            <div className='flex items-center gap-2'>
                <BackButton />
                <h1 className='text-lg font-semibold text-sky-400'>Units Management</h1>
            </div>

            <div className='flex items-center gap-3 justify-around'>
                {addBtn.map(({ label, icon, action }) => {
                    return (
                        <button className='shadow-lg cursor-pointer bg-[#f6b100] text-[#1a1a1a]
                                px-5 py-2 rounded-lg font-semibold text-sm flex items-center gap-2'
                            onClick={() => handleAddUnitModalOpen(action)}
                        >
                            {label} {icon}
                        </button>
                    )
                })}

            </div>

            {isAddUnitModal && <UnitAddModal setIsAddUnitModal={setIsAddUnitModal} />}


        </div>


        <div className='grid grid-cols-5 gap-4 px-10 py-4 mt-0 w-[100%] rounded-lg'>

            {list.length === 0
                ? (<p className='ml-5 mt-5 text-sm font-semibold text-[#be3e3f] flex items-start justify-start'>Your units list is empty! Start adding new one</p>)
                : list.map((unit, index) => (

                    <div key={unit.unitName} className='flex items-center justify-between px-3 rounded-lg h-[70px]  cursor-pointer'
                        style={{ backgroundColor: getBgColor() }}
                    >

                        <div className='flex justify-between w-full shadow-lg/30'>
                            <div className='items-start px-3'>
                                <h1 className='text-md font-semibold text-white'>{unit.unitName}</h1>
                            </div>
                            <div className='items-end flex gap-1 px-3'>
                                <FiEdit3 size={20} className='w-6 h-6 text-sky-400 rounded-full text-sky-400' />
                             
                                <button className={`cursor-pointer text-sm font-semibold`}>
                                    <MdDeleteForever
                                        onClick={() => { setSelectedUnit(unit); setDeleteModalOpen(true); }} size={20}
                                        className='w-6 h-6 text-[#e6e6e6] rounded-full'
                                    />
                                </button>
                            </div>

                        </div>
                    </div>

                ))}


        </div>

        
            <ConfirmModal

                open={deleteModalOpen}
                unitName={selectedUnit?.unitName}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => {
                    removeUnit(selectedUnit._id);
                    setDeleteModalOpen(false);
                }}
            />
   
   </section>
);

};



// You can put this at the bottom of your Services.jsx file or in a separate file
const ConfirmModal = ({ open, onClose, onConfirm, unitName }) => {
  if (!open) return null;
  return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(243, 216, 216, 0.4)' }}  //rgba(0,0,0,0.4)
        >
      
        <div className="bg-white rounded-lg p-6 shadow-lg min-w-[300px]">
            {/* <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2> */}
            <p className="mb-6">Are you sure you want to remove <span className="font-semibold text-red-600">{unitName}</span>?</p>
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




export default Units
