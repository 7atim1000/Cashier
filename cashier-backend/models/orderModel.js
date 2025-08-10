const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema ({
    
    customerDetails : {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        guests: { type: Number, required: true },
    },
    
    customer :{type: mongoose.Schema.Types.ObjectId , ref:'Customers'},
    
    type :{ type: String },
    shift : { type: String, enum :['Morning', 'Evening'], required :true},
    invoiceNumber :{ type: String },
    invoiceType :{ type: String },
    orderStatus: { type: String, required: true },
    orderDate: { type: Date, default: Date.now()},
    
    bills: {
        total: { type: Number, required: true },
        tax: { type: Number, required: true },
        totalWithTax: { type: Number, required: true },

        payed : { type: Number, required : true },
        balance : { type :Number, required :true },
    },

    items : [],
    table : { type: mongoose.Schema.Types.ObjectId, ref: "Tab" },
    
    paymentMethod: {type: String},
    
    date :{type :Date, default: Date.now()},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

}, { timestamps: true })


module.exports = mongoose.model('Order', orderSchema);
