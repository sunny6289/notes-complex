import React from 'react';
import { TbError404 } from "react-icons/tb";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <div className='relative w-full min-h-screen primary-text flex flex-wrap items-center justify-center sm:gap-4 text-[60px] md:text-[96px] bg-gradient-dark'>
            <span className='absolute top-3 left-3 font-bold flex items-center gap-1 primary-text text-lg cursor-pointer md:text-xl md:gap-3 bg-[#3B82F6] px-3 py-1 rounded' onClick={()=>navigate(-1)}>
                <FaAngleDoubleLeft/><span >back</span></span>
            <TbError404 color='#3b82f6' className='rounded-md text-[100px] md:text-[200px] border-4 border-[#3b82f6]'/>
            <h1 className='logo text-center'>Not Found</h1>
        </div>
    );
}

export default PageNotFound;
