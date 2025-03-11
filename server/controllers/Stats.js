const Expense=require("../models/Expense");
const Category=require("../models/Category");

exports.getCategoryStats=async (req,res)=>{
    try {
        const email=req.user.email;

        if(!email){
            return res.status(400).json({
                success:false,
                message:"user does not exist",
            });
        }

        const categories=await Category.find({email:email});
        const totalExpensesCount=await Expense.countDocuments({email:email});
        
        const totalPaidCount=await Expense.countDocuments({email:email,status:"paid"});
        const totalUnpaidCount=await Expense.countDocuments({email:email,status:"unpaid"});

        const categoryStats=await Promise.all(
            categories.map(async (category)=>{
                const categoryID=category._id;
                const categoryExpenseCount=await Expense.countDocuments({email:email,category:categoryID});
                
                return{
                    categoryName:category.categoryName,
                    totalCategoryExpense:categoryExpenseCount,
                    percentage:totalExpensesCount>0 ? (categoryExpenseCount/totalExpensesCount)*100 : 0,
                }

            })
        );

        return res.status(200).json({
            success:true,
            message:"stats fetched",
            categoryStats,
            totalPaidPercentage: totalExpensesCount > 0 ? (totalPaidCount / totalExpensesCount) * 100 : 0,
            totalUnpaidPercentage: totalExpensesCount > 0 ? (totalUnpaidCount / totalExpensesCount) * 100 : 0
            
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error somting idk",
        });
    }
};

