import { IoAddOutline, IoArchiveOutline } from "react-icons/io5";
import { MdOutlineNotes } from "react-icons/md";
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className='hidden h-[calc(100vh-64px)] md:min-w-[280px] sticky left-0 top-[64px] bg-black md:flex flex-col items-center primary-text divide-y-2 divide-zinc-900 p-3 border-r-2 border-zinc-800'>
            <div className="sidebar-first-section w-full p-3 flex flex-col items-center gap-2">
                <div className=" w-full flex items-center p-3 rounded-md justify-center gap-3 bg-[#3b82f6] select-none cursor-pointer transition-all hover:bg-[#1b68e4]" 
                onClick={()=>navigate('/create-new-note')}>
                    <IoAddOutline/>
                    <span>Create new note</span>
                </div>
                <NavLink to={'/note'} className={({ isActive }) => `sidebar-items ${isActive ? ' bg-neutral-700' : ''}`}>
                    <MdOutlineNotes/>
                    <span>All notes</span>
                </NavLink>
                <NavLink to={'/archive-note'} className={({ isActive }) => `sidebar-items ${isActive ? ' bg-neutral-700' : ''}`}>
                    <IoArchiveOutline/>
                    <span>Archived notes</span>
                </NavLink>
            </div>
        </div>
    );
}

export default Sidebar;
