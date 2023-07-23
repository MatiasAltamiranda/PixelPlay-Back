const mongoose = require ("mongoose");

const orderSchema = new mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId,
        require: true,
        ref : "userModel"
    },
    items : [
        {
            name : {
                type : String, required:true
            },
            image : {type : String , required: true},
            price : {type : Number, required:true},
            product :{
                type:mongoose.Schema.Types.ObjectId,
                require: true,
                ref : "gameModel"
            }
        }
    ],
    totalPrice : {type: Number, required:true, default : 0.0},
    isPaid : {
        type: Boolean,
        required: true,
        default : false
    }
},{
    timestamps : true
})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order;