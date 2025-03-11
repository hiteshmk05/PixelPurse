// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllCategories } from '../../../services/operations/categoriesAPI';
// import CategoryCard from './cards/CategoryCard';
// import CategoryForm from './forms/CategoryForm';

// const UserCategories = () => {
//     const dispatch=useDispatch();
//     const {token}=useSelector((state)=>state.auth);
//     const {categories} = useSelector((state)=>state.category);
//         useEffect(()=>{
//             dispatch(getAllCategories(token))
//         },[])

//     return (

//         <div className="container mx-auto p-4 absolute ">

//         <div className="rounded-t-lg p-4 flex items-center font-semibold text-gray-700 bg-gray-100">
//             <span className="w-24">Progress</span>
//             <span className="flex-grow">Category Name</span>
//             <span className="w-48">Description</span> 
//         </div>

//         {categories.map((category, index) => (
//             <div key={category._id} className={`p-4 flex items-center border-b ${index === categories.length - 1 ? 'rounded-b-lg' : ''} ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
//                 <CategoryCard category={category} />
//             </div>
//         ))}
// </div>

//     );
// };

// export default UserCategories;


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllCategories } from '../../../services/operations/categoriesAPI';
// import CategoryCard from './cards/CategoryCard';

// const UserCategories = () => {
//     const dispatch = useDispatch();
//     const { token } = useSelector((state) => state.auth);
//     const { categories } = useSelector((state) => state.category);

//     useEffect(() => {
//         dispatch(getAllCategories(token));
//     }, []);

//     return (
//         <div className="mx-auto p-0.5 relative bg-[#1E1E1E] rounded-lg shadow-lg">
//             {/* Table Header */}
//             <div className="rounded-t-lg p-5 flex items-center font-semibold text-gray-900 bg-[#8C7AE6] shadow-md">
//                 <span className="flex-1 text-lg text-gray-100 text-center">Progress</span>
//                 <span className="flex-1 text-lg text-gray-100 text-center">Category Name</span>
//                 <span className="flex-1 text-lg text-gray-100 text-center">Description</span> 
//             </div>

//             {/* Category List */}
//             {categories.map((category, index) => (
//                 <div 
//                     key={category._id} 
//                     className={`p-5 flex items-center border-b ${index === categories.length - 1 ? 'rounded-b-lg' : ''} 
//                     ${index % 2 === 0 ? 'bg-[#D6CFFF]' : 'bg-[#D6CFFF]'} 
//                     `}
//                 >
//                     <CategoryCard className="flex-1" category={category} />
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default UserCategories;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../../services/operations/categoriesAPI';
import CategoryCard from './cards/CategoryCard';
import Loading from '../../common/Loading';
import ExpenseFilter from './filters/ExpenseFilter';

const UserCategories = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { categories,loadingCategory } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(getAllCategories(token));
    }, []);
    
    return (
        <div>
            {loadingCategory ? <Loading/> : (<>
                {/* <div className="mb-6 relative"> Added margin-bottom for spacing
                <ExpenseFilter onFilter={handleFilterChange} />
            </div> */}
            <div className="mx-auto p-6 relative bg-gray-800 rounded-lg shadow-lg 
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Category List */}
            {categories.map((category) => (
                <CategoryCard key={category._id} category={category} />
            ))}
        </div>
            </>)}
        </div>
        
    );
};

export default UserCategories;
