import React from 'react';
import Sidebar from '../components/Sidebar';
import { IoAddOutline, IoArchiveOutline } from "react-icons/io5";
import { MdOutlineNotes } from "react-icons/md";
import { NavLink, Outlet } from 'react-router-dom';

const DashboardPage = () => {
    return (
        <div className='w-full h-full flex flex-col sm:flex-row'>
            <Sidebar/>
            <div className="content-section h-full w-full">
                <Outlet/>
            </div>
            <div className="mobile-nav sticky bg-black h-14 bottom-0 z-50 text-2xl primary-text flex items-center justify-around sm:hidden">
                <NavLink to={'/note'} className={({isActive})=>isActive && "text-[#3b82f6]"}>
                    <MdOutlineNotes/>
                </NavLink>
                <NavLink to={'/create-new-note'} className={({isActive})=>isActive && "text-[#3b82f6]"}>
                    <IoAddOutline/>
                </NavLink>
                <NavLink to={'/archive-note'} className={({isActive})=>isActive && "text-[#3b82f6]"}>
                    <IoArchiveOutline/>
                </NavLink>
            </div>
        </div>
    );
}

export default DashboardPage;
