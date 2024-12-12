import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../utlis/firebase/firebase';
import { userOut } from '../store/slices/authentication/authSlice';
import { GiOakLeaf } from "react-icons/gi";
import { CiSettings } from 'react-icons/ci';
import { MdAccountCircle } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa6";


const Navigation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openAccount, setOpenAccount] = useState(false);
    const signOutUser = async()=>{
        try {
            await signOut(auth);
            dispatch(userOut());
            navigate('/');
        } catch (error) {
            console.error('Error : ',error)
        }
    }
    return (
        <nav className='w-full h-16 flex items-center justify-between py-0 px-3 md:px-10 bg-[#000] border-b-2 border-zinc-900 sticky top-0 z-[60]'>
            <div className="flex items-center gap-1 md:gap-3 select-none" onClick={()=>navigate('/')}>
                <GiOakLeaf className='text-blue-500 text-3xl md:text-4xl'/>
                <h1 className='primary-text text-2xl md:text-3xl logo'>Notes</h1>
            </div>
            <MdAccountCircle onClick={()=>setOpenAccount(!openAccount)} className='primary-text text-3xl cursor-pointer'/>
            {
                openAccount && (
                <div className='absolute right-2 md:right-12 -bottom-[58px] bg-[#1c1c1c] rounded-md py-3 flex flex-col items-center select-none z-[60]'>
                    {/* <div className='secondary-text text-md flex items-center gap-3 py-3 px-5 cursor-pointer transition-all hover:bg-[#363636]'><CiSettings/><span>Settings</span></div> */}
                    <div className='text-red-500 text-md flex items-center gap-3 py-3 px-5 cursor-pointer transition-all hover:bg-[#363636]'
                    onClick={signOutUser}
                    ><FaPowerOff/><span>Sign out</span></div>
                </div>)
            }
            
        </nav>
    );
}

export default Navigation;
