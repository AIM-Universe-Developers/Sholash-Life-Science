const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['customer' , 'admin'],
        default: 'customer'
    },
    address: { street: String, city: String, state: String, zip: String},
    phone: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}, 
    orderHistory: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}]
}, { timestamps: true});

module.exports = mongoose.model('User', userSchema);