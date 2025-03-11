const User=require("../models/User");
const Category=require("../models/Category");

exports.addCategory=async (req,res) => {
    try {
        const {categoryName, description } = req.body;

        if (!categoryName) {
            return res.status(400).json({
                success: false,
                message: "categoryName not found"
            });
        }

        const email=req.user.email;

        if(!email){
            return res.status(400).json({
                success:false,
                message:"email not found in the request",
            });
        }

        const existingCategory = await Category.findOne({ email, categoryName });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Category already exists"
            });
        }

        const newCategory = new Category({
            email,
            categoryName,
            description
        });

        await newCategory.save();

        return res.status(200).json({
            success: true,
            message: "Category added successfully",
            category: newCategory
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
        
    }
};

exports.getAllCategories= async (req,res)=>{
    try {
        const email= req.user.email;
        if(!email){
            return res.status(401).json({
                success:false,
                message:"user does not exist",
            });
        }
        //ye categories rreturn kar raha h and unpaid and paid expenses ka count return kar raha hai
        const categories = await Category.aggregate([
            { $match: { email } },
            {
                $lookup: {
                    from: "expenses",
                    let: { categoryId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$category", "$$categoryId"] },
                                    ]
                                }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                paid: { $sum: { $cond: [{ $eq: ["$status", "paid"] }, 1, 0] } },
                                unpaid: { $sum: { $cond: [{ $eq: ["$status", "unpaid"] }, 1, 0] } }
                            }
                        }
                    ],
                    as: "expenses"
                }
            },
            {
                $project: {
                    _id: 1,
                    categoryName: 1,
                    description: 1,
                    date:1,
                    expenses: {
                        $cond: { // Conditional projection
                            if: { $eq: [{ $size: "$expenses" }, 0] }, // Check if expenses array is empty
                            then: { paid: 0, unpaid: 0 }, // Return 0 for paid and unpaid
                            else: { $arrayElemAt: ["$expenses", 0] } // Otherwise, get the counts
                        }
                    }
                }
            }
        ]);
        return res.status(200).json({
            success:true,
            message:"categories fetched successfully",
            categories,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success:false,
            message:"internal server error while fetching categories"
        });
    }
};

