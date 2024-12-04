import React from 'react';
import { TbError404 } from "react-icons/tb";

const PageNotFound = () => {
    return (
        <div className='w-full min-h-screen primary-text flex flex-wrap items-center justify-center sm:gap-4 text-[60px] md:text-[96px] bg-gradient-dark'>
            <TbError404 color='#3b82f6' className='rounded-md text-[100px] md:text-[200px] border-4 border-[#3b82f6]'/>
            <h1 className='logo text-center'>Not Found</h1>
        </div>
    );
}

export default PageNotFound;
