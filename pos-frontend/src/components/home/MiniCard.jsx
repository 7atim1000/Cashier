import React from 'react'

const MiniCard = ({title, icon , number, footerNum}) => {
    
    return (
        <div className= 'bg-[#1f1f1f] py-3 px-5 rounded-lg w-[50%] shadow-lg/30 border-b border-sky-400'>
            <div className='flex items-start justify-between'>
                <h1 className='text-sky-500 font-semibold text-sm tracking-wide mt-2'>{title}</h1>
                <button className={` ${title === 'Completed' ? 'bg-[#02ca3a] text-xs' : 'bg-[#F6B100] text-sm'} p-3 rounded-lg text-[#e6e6e6] text-lg mt-2 shadow-lg/30`}>{icon}</button>
            </div>
           
            <div>
                <h1 className='text-[#f5f5f5] text-3xl font-bold mt-2'><span className ='text-xs font-normal text-[#F6B100]'>AED </span>{number}</h1>
                
                {/* from Home page :- <MiniCard title='Total Earning' icon={<BsCashCoin />} number={allInvoices.reduce((acc, invoice) => acc + invoice.bills.total, 0).toFixed(2)} footerNum={1.6}/>
                <h1 className='text-[#f5f5f5] text-l mt-2'><span className='text-[#02ca3a] text-sm'>{footerNum}%</span> than yesterday</h1> */}
            </div>
        </div>
    )
};

export default MiniCard;