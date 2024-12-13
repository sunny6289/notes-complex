import React, { useEffect, useState } from 'react';
import Note from './Note';

const NotesList = ({ setNoteToShow, noteList, setShowNote}) => {
    const [largeScreen, setLargeScreen] = useState(true);
    useEffect(()=>{
        if(window.innerWidth<=768){
            setLargeScreen(false);
        }
    },[])

    return (
        <div className='sticky top-[120px] left-[280px] min-h-[calc(100vh-176px)] md:h-[calc(100vh-120px)] w-full p-2 md:max-w-[280px] md:min-w-[280px] flex flex-col gap-2 border-r-2 border-zinc-800 custom-scrollbar overflow-hidden hover:overflow-y-auto'>
            {
                noteList?.map((note)=><Note key={note.id} setShowNote={setShowNote} setNoteToShow={setNoteToShow} note={note}/>)
            }
            {
                (!largeScreen && !noteList?.length) &&
                <div className='w-full h-[calc(100vh-176px)] flex items-center justify-center primary-text'>
                        <h1 className='text-center font-medium text-4xl md:text-6xl'>There are no notes</h1>
                </div>
            }
        </div>
    );
}

export default NotesList;
