import React from 'react';
import Note from './Note';

const NotesList = ({setNoteToShow, noteList}) => {
    return (
        <div className='sticky top-[120px] left-[280px] h-[calc(100vh-120px)] p-2 max-w-[280px] min-w-[280px] flex flex-col gap-2 border-r-2 border-zinc-800 custom-scrollbar overflow-hidden hover:overflow-y-auto'>
            {
                noteList?.map((note)=><Note key={note.id} setNoteToShow={setNoteToShow} note={note}/>)
            }
        </div>
    );
}

export default NotesList;
