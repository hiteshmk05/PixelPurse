import { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/common/Loading';
import PieChart from '../components/common/PieChart';
import { getStatsFront } from '../services/operations/statsAPI';
import CategoryForm from '../components/core/sidebar/forms/CategoryForm';
import ExpenseForm from '../components/core/sidebar/forms/ExpenseForm';
import { getAllCategories } from '../services/operations/categoriesAPI';

const Dashboard = () => {
    const location = useLocation();
    const onDashboard = location.pathname === "/dashboard";
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const {categories}=useSelector((state)=>state.category);
    const { categoryStats, totalPaidPercentage, totalUnpaidPercentage, loadingStats } = useSelector((state) => state.stats);

    useEffect(() => {
        // if (onDashboard && token) {
            dispatch(getAllCategories(token));
            dispatch(getStatsFront(token));
        // }
    }, []);

    const categoryLabels = categoryStats?.map((category) => category.categoryName) || [];
    const categoryData = categoryStats?.map((category) => category.totalCategoryExpense) || [];
    const paidUnpaidData = [totalPaidPercentage, totalUnpaidPercentage];

    return (
        <div className="min-h-screen flex flex-col relative pixelate pixelated-background">
            <div className="flex-1 p-6">

                {onDashboard && ( 
                    <div className='items-center flex flex-col'>
                        <h2>Welcome to your Dashboard</h2>
                        {loadingStats ? (
                            <Loading />
                        ) : (
                            <>
                                <div className="flex flex-row items-center gap-8 rounded-lg shadow-lg relative p-6 mb-2 bg-gray-900">
                                    <div className="gap-4 w-1/2 items-center">
                                        <PieChart
                                            labels={categoryLabels}
                                            data={categoryData}
                                            chartTitle="Category Distribution"
                                        />
                                    </div>
                                    <div className="gap-4 w-1/2">
                                        <PieChart
                                            labels={["Paid", "Unpaid"]}
                                            data={paidUnpaidData}
                                            chartTitle="Paid vs Unpaid Expenses"
                                        />
                                    </div>
                                </div>
                                <div className="p-4 flex gap-10 flex-row mt-7">
                                    <CategoryForm />
                                    <ExpenseForm />
                                </div>
                            </>
                        )}
                    </div>
                )}

                <Outlet /> 
            </div>
        </div>
    );
};

export default Dashboard;
