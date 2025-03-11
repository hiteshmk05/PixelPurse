const User=require("../models/User");
const Category=require("../models/Category");
const Expense=require("../models/Expense");

exports.addExpense= async (req,res)=>{
    try {
        const {expenseName,price,categoryName,status}=req.body;
        
        if(!expenseName || !price || !categoryName || !status){
            return res.status(401).json({
                success:false,
                message:"incomplete fields provied"
            });
        }

        if(price<=0){
            return res.status(401).json({
                success:false,
                message:"invalid price it should be greater than 0"
            });
        }

        const email=req.user.email;

        if(!email){
            return res.status(401).json({
                success:false,
                message:"user email not found in the request body"
            });
        }

        const existingCategory=await Category.findOne({
            categoryName:categoryName,
            email:email
        });

        if(!existingCategory){
            return res.status(400).json({
                success:false,
                message:"category name is invalid/ doesnt exist"
            });
        }

        const addedExpense= await Expense.create({
            email:email,
            expenseName:expenseName,
            price:price,
            category:existingCategory._id,
            status:status,
        });

        existingCategory.expenses.push(addedExpense._id);

        await existingCategory.save();

        return res.status(200).json({
            success:true,
            message:"category added successfully",
            expense:addedExpense
        });       

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"code fatt gaya lol"
        });
    }
};

exports.getAllExpenses = async (req,res)=>{
    try {

        const email=req.user.email;
        if(!email){
            return res.status(401).json({
                success:false,
                message:"user does not exists",
            });
        }
        const expenses=await Expense.find({email:email}).populate({
            path:"category",
            select:"categoryName",
        });
        return res.status(200).json({
            success:true,
            message:"expenses fetched correctly",
            expenses,
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"internal server error",
        });
    }
};

exports.updateExpenseStatus = async (req,res)=>{
    try {
        const {_id}=req.body;
        const  {status}=req.body;
        const email=req.user.email;

        if(!email){
            return res.status(400).json({
                success:false,
                message:"user not exitst"
            })
        }

        if(!status){
            return res.stauts(400).json({
                success:false,
                message:"status not provided",
            });
        }

        if(!["paid","unpaid"].includes(status.toLowerCase())){
            return res.status(400).json({
                success:false,
                message:"invalid provied",
            });
        }

        const updatedExpense = await Expense.findOneAndUpdate(
            {_id:_id,email:email},
            { status: status.toLowerCase() },
            { new: true }
        );
        return res.status(200).json({
            success:true,
            message:"status updated",
            updatedExpense,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            emssage:"server error idky why"
        });
    }
};

exports.getFilteredExpenses=async (req,res)=> {
    try {
        let {status,startDate,endDate}=req.query;
        const email=req.user.email;

        let filter={};

        if(!email){
            return res.status(400).json({
                success:false,
                message:"user is not valid"
            });
        }
        if(status && status!=="all"){
            filter.status=status;
        }

        if(startDate && endDate){
            filter.date={$gte:new Date(startDate),$lte:new Date(endDate)};
        }else if(startDate){
            filter.date = { $gte: new Date(startDate) };
        }else if(endDate){
            filter.date = { $lte: new Date(endDate) };
        }

        const expenses=await Expense.find({...filter,email:email}).sort({date:-1}).populate({
            path:"category",
            select:"categoryName",
        });;

        res.status(200).json({
            stauts:true,
            message:"filtered expenses fetched",
            expenses,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error in server or idk"
        });
    }
};

exports.editExpense=async (req,res)=>{
    try {
        const {_id,newName,newPrice}=req.body;
        const email=req.user.email;

        if(!newName || !newPrice){
            return res.status(400).json({
                success:false,
                message:"please fill out the missing fields",
            });
        }

        if(!email){
            return res.status(400).json({
                success:false,
                message:"user doesnt exist",
            });
        }

        if(newPrice<0){
            return res.status(400).json({
                success:false,
                message:"price should be greater than 0",
            });
        }

        const updatedExpense = await Expense.findOneAndUpdate(
            {_id:_id,email:email},
            { expenseName: newName, price: newPrice },
            { new: true }
        );
        return res.status(200).json({
            success:true,
            message:"status updated",
            updatedExpense,
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            emssage:"server error idky why"
        });
    }
};