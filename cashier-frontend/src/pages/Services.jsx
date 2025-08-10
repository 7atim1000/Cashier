import React ,{useState, useEffect} from 'react'
import BackButton from '../components/shared/BackButton';


import { IoIosAddCircle } from 'react-icons/io'; 
import { MdDeleteForever } from "react-icons/md";
import { LiaEditSolid } from "react-icons/lia";
import { api } from '../https';
import { toast } from 'react-toastify'
import ServiceAddModal from '../components/services/ServiceAddModal';
import ServiceEditModal from '../components/services/ServiceEditModal';

const Services = () => {

    const addBtn = [{ label :'Add Service' , action :'service' , icon: <IoIosAddCircle className ='text-sky-600 w-6 h-6'/>}];

    const [isAddServiceModal, setIsAddServiceModal] = useState(false);
    const handleAddServiceModal = (action) =>{
        if(action === 'service')  setIsAddServiceModal(true)
    };

    // Fetch services
    const [services, setServices] = useState([]);
    const [isEditServiceModal, setIsEditServiceModal] = useState(false);
    const [currentService, setCurrentService] = useState(null);

    const fetchServices = async () => {
        try {
            const { data } = await api.post('/api/services/fetch', 
                
                {
                    sort: '-createdAt' // Add this parameter
                });

            if (data.success) {
                setServices(data.services);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);


    // Handle edit
    const handleEdit = (service) => {
        setCurrentService(service);
        setIsEditServiceModal(true);
    };



    // remove 
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const removeService = async (id) => {

        try {
            const response = await api.post('/api/services/remove', { id },)

            if (response.data.success) {
                toast.success(response.data.message)

                //Update the LIST after Remove
                await fetchServices();

            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    };

   
    return (
        <section className ='h-[calc(100vh-5rem)] overflow-y-scroll scrollbar-hidden bg-[#1a1a1a]'>
            <div className='flex items-center justify-between px-10 py-3'>

                <div className='flex items-center gap-4'>
                    <BackButton />
                    <h1 className='text-[#f5f5f5] text-lg font-bold tracking-wider'>Sercices Management</h1>
                </div>

                <div className='flex items-center justify-around gap-4'>

                    <div className='flex items-center gap-3'>
                        {
                            addBtn.map(({ label, icon, action }) => {
                                return (
                                    <button onClick={() => handleAddServiceModal(action)}
                                        className='bg-[#f6b100] px-4 py-2 rounded-lg text-[#1a1a1a] cursor-pointer
                                        font-semibold text-sm flex items-center gap-2'>
                                        {label} {icon}
                                    </button>
                                )
                            })
                        }

                    {isAddServiceModal && <ServiceAddModal setIsAddServiceModal={setIsAddServiceModal} />}

                    </div>

                </div>

            </div>

            {/** table  */}
            <div className='mt-5 bg-[#1f1f1f] py-1 px-10'>


                <div className='overflow-x-auto bg-[#1f1f1f]'>
                    <table className='text-left w-full'>
                        <thead className=''>
                            <tr className='border-b-3 border-sky-400 text-xs font-normal text-sky-400'>
                                <th className='p-2'>Category</th>
                                <th></th>
                                <th className='p-2'>Service Name</th>
                                <th className='p-2'>Price</th>
                              
                                <th className='p-2'></th>
                            </tr>
                        </thead>

                        <tbody>

                            {services.length === 0
                                ? (<p className='ml-5 mt-5 text-xs text-[#be3e3f] flex items-start justify-start'>Your services list is empty . Start adding customers !</p>)
                                : services.map((service) => (

                                    <tr
                                        key={service._id}
                                        className='border-b border-[#383838] text-xs font-normal text-[#e6e6e6] cursor-pointer hover:bg-sky-600/10'
                                    >
                                        <td className='p-1' hidden>{service._id}</td>
                                        <td className='p-1 text-[#f6b100] font-semibold'>{service.category}</td>
                                        <td className ='p-1'><img className ='rounded-full border-b-2 border-sky-400 w-9 h-9' src ={service.image}/></td>
                                        <td className='p-1 font-semibold text-md'>{service.serviceName}</td>
                                        <td className='p-1'>
                                            <span className ='text-lg font-medium text-sky-500'>{service.price}</span>
                                            
                                            <span className ='text-white font-normal'> AED </span>
                                            <span className ='text-[#1f1f1f]'>---</span>
                                            <span className ='text-sky-500 font-normal'> FOR </span>
                                            <span className ='text-white font-semibold'> {service.unit}</span>
                                        </td>
                                        
                                        <td className='p-1'>

                                            <button className={`text-sky-400 cursor-pointer text-sm font-semibold hover:bg-sky-600/10 ml-2`}>
                                                <LiaEditSolid size={20} className='w-6 h-6 text-sky-600 border-b border-sky-600'
                                                    onClick={() => handleEdit(service)}
                                                
                                                />
                                            </button>

                                            <button className={`text-[#be3e3f] cursor-pointer text-sm font-semibold hover:bg-[#be3e3f]/30 ml-2`}>
                                                <MdDeleteForever
                                                    onClick={() => { setSelectedService(service); setDeleteModalOpen(true); }} size={20}
                                                    className='w-6 h-6 text-[#be3e3f]  border-b border-[#b33e3f]'
                                                />
                                            </button>

                                        </td>

                                    </tr>

                                ))}


                        </tbody>
                        <tfoot>
                            <tr className="bg-sky-400 font-bold text-xs">
                                <td className="p-2" colSpan={2}>Count : </td>
                                <td className="p-2">{services.length}</td>
                                <td></td><td></td>
                            </tr>
                        </tfoot>
                    </table>

                </div>
            </div>




                    {/* Edit Service Modal */}
            {isEditServiceModal && currentService && (
                <ServiceEditModal
                    service ={currentService}
                    setIsEditServiceModal ={setIsEditServiceModal}
                    fetchServices ={fetchServices}
                />
            )}


            <ConfirmModal

                open={deleteModalOpen}
                serviceName={selectedService?.serviceName}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => {
                    removeService(selectedService._id);
                    setDeleteModalOpen(false);
                }}
            />

        </section>
    );
};




// You can put this at the bottom of your Services.jsx file or in a separate file
const ConfirmModal = ({ open, onClose, onConfirm, serviceName }) => {
  if (!open) return null;
  return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(243, 216, 216, 0.4)' }}  //rgba(0,0,0,0.4)
        >
      
        <div className="bg-white rounded-lg p-6 shadow-lg min-w-[300px]">
            {/* <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2> */}
            <p className="mb-6">Are you sure you want to remove <span className="font-semibold text-red-600">{serviceName}</span>?</p>
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


export default Services ;