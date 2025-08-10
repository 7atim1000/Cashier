const transactionModel = require("../models/transactionModel");
const moment = require('moment');

const addTransaction = async(req, res) => {

    function getCurrentShift() {
        const hour = new Date().getHours();
        // Example: morning = 6:00-17:59, evening = 18:00-5:59
        return (hour >= 6 && hour < 18) ? 'Morning' : 'Evening';
    };
    

    try {
        
        //const newTransaction = new transactionModel(req.body)
        const newTransaction = new transactionModel({
            ...req.body,
            shift: getCurrentShift(),
        });

        await newTransaction.save();
        //res.status(202).send('Transactoion created successfully')
          res.status(201).json({ success: true, message: 'Transaction created successfuly!', data: newTransaction });
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
};


const getTransactions = async(req, res) => {

    try {

        const { frequency, type , shift} = req.body ;

        // after convert date field from date to string
        const endDate = moment().format('YYYY-MM-DD');
        const startDate = moment().subtract(Number(frequency), "d").format('YYYY-MM-DD');


        const transactions = await transactionModel.find({ 
        
        // by duration query

        // date :{
        //         $gt : moment().subtract(Number(frequency), "d").toDate(),
        //     },

            
        // by Type query and date or duration
        date: { $gte: startDate, $lte: endDate },
        ...(type !== 'all' && {type} ),

        ...(shift && shift !== 'all' && { shift }),

        });

        res.status(200).json(transactions);
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)

    }

} 



const removeTransaction = async(req, res, next) => {
    try {
        await transactionModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message : 'Transaction removed Successfully' })
        
    } catch (error) {
        next(error)
    }
};



module.exports = { getTransactions, addTransaction, removeTransaction }