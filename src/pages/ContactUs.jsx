import React, { useState } from 'react'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    review: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className=' pixelate pixelated-background bg-gradient-to-r from-purple-100 to-pink-100 relative  min-h-screen p-8'>
      <div className=' max-w-4xl mx-auto bg-white relative p-6 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-pixel mb-6 text-center'>Contact Us</h1>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Contact Form */}
          <div>
            <p className='mb-4 font-pixel'>Share your thoughts with our development team!</p>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block font-pixel mb-2'>First Name</label>
                  <input
                    type='text'
                    name='firstName'
                    className='w-full p-2 border border-gray-300 rounded'
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className='block font-pixel mb-2'>Last Name</label>
                  <input
                    type='text'
                    name='lastName'
                    className='w-full p-2 border border-gray-300 rounded'
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className='block font-pixel mb-2'>Email</label>
                <input
                  type='email'
                  name='email'
                  className='w-full p-2 border border-gray-300 rounded'
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className='block font-pixel mb-2'>Your Review</label>
                <textarea
                  name='review'
                  rows='5'
                  className='w-full p-2 border border-gray-300 rounded'
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button
                type='submit'
                className='bg-blue-500 text-white font-pixel py-2 px-4 rounded hover:bg-blue-600 transition-colors'
              >
                Submit
              </button>
            </form>
          </div>

          {/* Company Information */}
          <div className='bg-gray-50 p-6 rounded-lg'>
            <h2 className='text-xl font-pixel mb-4'>Visit Us</h2>
            <div className='space-y-4'>
              <div>
                <h3 className='font-pixel text-lg mb-2'>Office Address</h3>
                <p>
                  123 Pixel Street<br />
                  Digital District<br />
                  Tech City, TC 12345<br />
                  United States
                </p>
              </div>
              
              <div>
                <h3 className='font-pixel text-lg mb-2'>Contact Information</h3>
                <p>Phone: (555) 123-4567</p>
                <p>Toll-free: 1-800-PIXEL</p>
                <p>Email: support@pixelpurse.com</p>
              </div>

              <div>
                <h3 className='font-pixel text-lg mb-2'>Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs