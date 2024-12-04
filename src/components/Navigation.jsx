import React, { useState } from 'react';
import { GiOakLeaf } from "react-icons/gi";
import Button from './Button';
import { screen } from '../utlis/testRequiredData';
import { CiSettings } from 'react-icons/ci';
import { MdAccountCircle } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from '../store/slices/authentication/authSlice';

const Navigation = () => {
    const dispatch = useDispatch();
    const [openAccount, setOpenAccount] = useState(false);
    const navigate = useNavigate();
    return (
        <nav className='w-full h-16 flex items-center justify-between py-0 px-10 bg-[#000] border-b-2 border-zinc-900 sticky top-0 z-50'>
            <div className="flex items-center gap-3 select-none" onClick={()=>navigate('/')}>
                <GiOakLeaf className='text-blue-500 text-4xl'/>
                <h1 className='primary-text text-3xl logo'>Notes</h1>
            </div>
            {
                screen === 2 ? (
                <Button style={'primary-btn'} onClick={()=>alert('clicked')} content='Sign in'/>)
                : (<MdAccountCircle onClick={()=>setOpenAccount(!openAccount)} className='primary-text text-3xl cursor-pointer'/>)
            }
            {
                openAccount && (
                <div className='absolute right-12 -bottom-[100px] bg-[#1c1c1c] rounded-md py-3 flex flex-col items-center select-none'>
                    <div className='secondary-text text-md flex items-center gap-3 py-3 px-5 cursor-pointer transition-all hover:bg-[#363636]'><CiSettings/><span>Settings</span></div>
                    <div className='text-red-500 text-md flex items-center gap-3 py-3 px-5 cursor-pointer transition-all hover:bg-[#363636]'
                    onClick={()=>{
                        dispatch(signOut())
                        navigate('/');
                    }}
                    ><FaPowerOff/><span>Sign out</span></div>
                </div>)
            }
            
        </nav>
    );
}

export default Navigation;
