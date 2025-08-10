const createHttpError = require('http-errors');
const { mongoose } = require('mongoose');

const Order = require('../models/orderModel');

const moment = require('moment');

const addOrder = async (req, res, next) => {
   
    function getCurrentShift() {
        const hour = new Date().getHours();
        // Example: morning = 6:00-17:59, evening = 18:00-5:59
        return (hour >= 6 && hour < 18) ? 'Morning' : 'Evening';
    }


    try {

        const order = new Order(
            {
            ...req.body,
            shift : getCurrentShift(),
            }
        );

        await order.save();
        res.status(201).json({ success: true, message: 'Order Created!', data: order });

    } catch (error) {   
        next(error);
   }

};


const getOrders = async (req, res, next ) => {
    
    try {
        
        const { frequency ,orderStatus ,shift } = req.body ;

        const orders = await Order.find(
            
            { 
                // type :'bills',

            // by duration
                date :{
                    $gt : moment().subtract(Number(frequency), "d").toDate(),
                },
                    
            
            // Filter
                // ...(orderType !== 'all' && {orderType} ),
                
                ...(orderStatus !== 'all' && {orderStatus}),
                ...(shift && shift !== 'all' && { shift }),
            }

        )
        
        // .populate({
        //     path: "table",
        //     select: "tabNo"
        // });

            .populate([
                {
                    path: "table",
                    select: "tabNo",
                },
                {
                    path: "user",
                    select: "name",
                },
            ]);

        // res.status(200).json({ data: orders })
        res.status(200).json(orders);

    } catch (error) {
        next(error)
    }
};


const getOrderById = async (req, res, next) => {
    
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404, 'Invalid ID !');
            return next(error);
        }
    
        const order = await Order.findById(id);

        if (!order){
           const error = createHttpError(404, 'Order not found');
           return next(error);
        }

        res.status(200).json({ success: true, data: order})
    } catch (error) {
        next(error)
    }
}



const updateOrder = async (req, res, next) => {
    
    try {
        const { orderStatus, bills } = req.body;
        const {id} = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404, 'Invalid ID !');
            return next(error);
        }

        const order = await Order.findByIdAndUpdate(
           // req.params.id,
           id,  
           {orderStatus, bills},
            {new: true}
        );
        
        if(! order){
            const error = createHttpError(404, 'Order not found to update!');
            return next(error);
        }
        res.status(200).json({ success: true, message: 'Order updated', data: order })

    } catch (error) {
        next(error)
    }
};


module.exports = { addOrder, getOrderById, getOrders, updateOrder }