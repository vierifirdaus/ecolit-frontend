import React from 'react';
import profile from './Profile';


const Navbar: React.FC = () => {    
    return (
        <div className='flex w-full px-10 h-[75px] justify-between items-center rounded-md shadow-md bg-white'>
            <div className='title font-medium text-[24px] text-[#262626]'>
                Sisampah
            </div>
            <div className='profile'>
                {profile()}
            </div>
        </div>
    );
}

export default Navbar
