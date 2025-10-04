import mongoose  from "mongoose";

const expenseSchema=new mongoose.Schema({

    amount:{
        type:Number,
        required:true
    },

    date:{
        type:Date,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    note:{
        type:String,
        required:true
    },

},{timestamps:true})

const Expense=mongoose.model("Expense",expenseSchema)
export default Expense