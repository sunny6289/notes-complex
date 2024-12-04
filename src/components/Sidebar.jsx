import React from 'react';
import { IoAddOutline, IoArchiveOutline } from "react-icons/io5";
import { MdOutlineNotes } from "react-icons/md";
import { sidebarTagsLinks } from '../utlis/sidebarLinks';
import { HiOutlineTag } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <div className='h-[calc(100vh-64px)] min-w-[280px] sticky left-0 top-[64px] bg-black flex flex-col items-center primary-text divide-y-2 divide-zinc-900 p-3 border-r-2 border-zinc-800'>
            <div className="sidebar-first-section w-full p-3 flex flex-col items-center gap-2">
                <div className=" w-full flex items-center p-3 rounded-md justify-center gap-3 bg-[#3b82f6] select-none cursor-pointer transition-all hover:bg-[#1b68e4]" 
                onClick={()=>navigate('/create-new-note')}>
                    <IoAddOutline/>
                    <span>Create new note</span>
                </div>
                <Link to={'/note'} className="sidebar-items">
                    <MdOutlineNotes/>
                    <span>All notes</span>
                </Link>
                <Link to={'/archive-note'} className="sidebar-items">
                    <IoArchiveOutline/>
                    <span>Archived notes</span>
                </Link>
            </div>
            <div className="sidebar-second-section w-full p-3 flex flex-col items-center gap-2 overflow-hidden transition-all custom-scrollbar hover:overflow-y-auto">
                {
                    sidebarTagsLinks.map((tags, idx)=>(
                    <div key={idx} className='sidebar-items'>
                        <HiOutlineTag/>
                        <span>{tags.name}</span>
                    </div>))
                }
            </div>
        </div>
    );
}

export default Sidebar;
