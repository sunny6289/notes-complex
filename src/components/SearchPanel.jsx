import React, { useEffect, useState } from 'react';
import Input from './Input';
import { IoSearch } from "react-icons/io5";
import { MdOutlineKeyboardDoubleArrowRight, MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { useLocation } from 'react-router-dom';

const SearchPanel = ({titleContent,searchText, setSearchText,showNote, setShowNote, noteToShow}) => {
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [largeScreen, setLargeScreen] = useState(true);
    const location = useLocation();

    useEffect(()=>{
        if(window.innerWidth<=768){
            setLargeScreen(false);
        }
    },[])
    
    if(largeScreen){
        return (
            <div className='sticky top-[64px] z-50 max-w-full px-3 md:px-5 bg-black h-14 border-b-2 border-zinc-800 flex justify-between items-center'>
                {
                    !showMobileSearch &&
                    <><span className='primary-text text-2xl font-medium md:hidden'>{titleContent}</span>
                    <IoSearch className='primary-text text-2xl md:hidden' onClick={()=>setShowMobileSearch(true)}/>
                    </>
                }
                <span className='hidden md:block primary-text text-2xl font-medium'>{titleContent}</span>
                
                <Input addedStyle={'hidden md:block md:w-[400px] border-none text-md'} onChange={(e)=>setSearchText(e.target.value)} placeholder={'Search by title'}/>
    
                {/* Search input for notes */}
                {
                    showMobileSearch &&
                    <div className='w-full h-full flex items-center gap-1'>
                        <Input addedStyle={'w-full border-none text-md md:hidden'} onChange={(e)=>setSearchText(e.target.value)} placeholder={'Search by title'}/>
                        <MdOutlineKeyboardDoubleArrowRight className='text-2xl primary-text' onClick={()=>setShowMobileSearch(false)}/>
                    </div>
                }
            </div>
        );
    }else{
        return (
            <div className='sticky top-[64px] z-50 w-full px-3 md:px-5 bg-black h-14 border-b-2 border-zinc-800 flex justify-between items-center'>
                {
                    (showNote && noteToShow) ? 
                    <><div className='primary-text flex items-center gap-1' onClick={()=>setShowNote(false)}><MdOutlineKeyboardDoubleArrowLeft/><span>{location.pathname.slice(1)==='note' ? 'All notes':'Archived notes'}</span></div></> :
                    !showMobileSearch &&
                    <><span className='primary-text text-2xl font-medium md:hidden'>{titleContent}</span>
                    <IoSearch className='primary-text text-2xl md:hidden' onClick={()=>setShowMobileSearch(true)}/>
                    </>
                }
                <span className='hidden md:block primary-text text-2xl font-medium'>{titleContent}</span>
                
                <Input addedStyle={'hidden md:block md:w-[400px] border-none text-md'} onChange={(e)=>setSearchText(e.target.value)} placeholder={'Search by title'}/>
    
                {/* Search input for notes */}
                {
                    (showMobileSearch && !showNote) &&
                    <div className='w-full h-full flex items-center gap-1'>
                        <Input addedStyle={'w-full border-none outline-white text-md md:hidden'} value={searchText} onChange={(e)=>setSearchText(e.target.value)} placeholder={'Search by title'}/>
                        <MdOutlineKeyboardDoubleArrowRight className='text-2xl primary-text' onClick={()=>{
                            setSearchText('')
                            setShowMobileSearch(false)
                            }}/>
                    </div>
                }
            </div>
        );
    }

    
}

export default SearchPanel;
