import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const ProfilePage = () => {
  return (
    <div className='min-h-screen bg-white flex justify-center items-center '>
      <div className='max-w-4xl size-full '>
        <div className='bg-orange-500 h-28 rounded-t-xl border-t-8 border-orange-500'></div>
        <div className='bg-gray-400 p-6 rounded-b-xl border-b-8 border-gray-400 relative '>
          <div className='absolute -top-16 left-8'>
            <div className='relative'>
              <img
                src=""
                alt="Profile"
                className='w-28 h-28 rounded-full border-4 border-white'
              />
            </div>
          </div>
          
          <div className='mt-4'>
            <h1 className='text-2xl font-bold'>Susan Chisi</h1>
            <div>
            <p className='text-gray-500 space-y-0'>@susan2024</p>
            </div>
            <div className='mt-2 space-x-4 space-y-10'>
              <button className='px-4 py-2 bg-gray-200 rounded-md'>Message</button>
              <button className='px-4 py-2 bg-gray-800 text-white rounded-md'>Share Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;