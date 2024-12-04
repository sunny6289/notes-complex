import React from 'react';
import Input from './Input';

const SearchPanel = ({titleContent, setSearchText}) => {
    return (
        <div className='sticky top-[64px] w-full px-5 bg-black h-14 border-b-2 border-zinc-800 flex justify-between items-center'>
            <span className='primary-text text-2xl font-bold'>{titleContent}</span>
            <Input addedStyle={'w-[400px] border-none text-md'} onChange={(e)=>setSearchText(e.target.value)} placeholder={'Search by title'}/>
        </div>
    );
}

export default SearchPanel;
