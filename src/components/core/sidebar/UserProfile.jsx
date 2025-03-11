import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
	const {user}=useSelector((state)=>state.user);
	const { firstName, lastName, email, additionalDetails, image } = user;
    const { gender, dateOfBirth, contactNumber } = additionalDetails || {};
	// console.log(user);
	return (
    	<div>
			<div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center space-x-4">
                <img src={image} alt="User Avatar" className="w-20 h-20 rounded-full border border-gray-300" />
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{firstName} {lastName}</h2>
                    <p className="text-gray-600">{email}</p>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700">Additional Details</h3>
                <p><strong>Gender:</strong> {gender || 'Not provided'}</p>
                <p><strong>Date of Birth:</strong> {dateOfBirth || 'Not provided'}</p>
                <p><strong>Contact Number:</strong> {contactNumber || 'Not provided'}</p>
            </div>
        </div>
		</div>
  	);
};

export default UserProfile;