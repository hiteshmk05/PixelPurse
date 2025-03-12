const express = require("express");
const app = express();
const database = require("./config/database");
const userRoutes = require("./routes/UserRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const expenseRoutes=require("./routes/ExpenseRoutes");
const statsRoutes=require("./routes/StatsRoutes");
const reviewRoutes=require("./routes/ReviewRoutes");
const dotenv=require("dotenv");
const cors=require("cors");

dotenv.config();
const PORT = 5000;

database.connect();

app.use(express.json());

app.use(cors({
    origin: '*',  // Allows requests from any origin (⚠️ Not recommended for production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/stats",statsRoutes);
app.use("/api/v1/review",reviewRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//testing user
// {   
//     "firstName":"test",
//     "lastName":"insane",
//     "email":"testtesting1290@gmail.com",
//     "password":"test@@",
//     "confirmPassword":"test@@",
//     "otp":"625904"

// }
