import React from 'react';

const Note = ({ setNoteToShow, note, setShowNote }) => {
    const handleNoteClick = ()=>{
        setNoteToShow(note)
        setShowNote(true);
    }
    return (
        <>
            <div onClick={handleNoteClick} className='flex flex-col gap-1 bg-black p-2 rounded-md primary-text shadow-md shadow-[#1e1e1e] cursor-pointer select-none hover:text-white'>
                <h3 className='font-bold text-lg text-ellipsis line-clamp-2 w-11/12' title={note?.noteTitle}>{note?.noteTitle}</h3>
                <div className="related-tags flex items-center gap-2">
                    {
                        note?.noteTags?.slice(0, 2).map((tag, idx) => <span key={idx} className='p-1 rounded bg-[#1c1c1c] max-w-32 overflow-hidden text-ellipsis text-md'>{tag.label}</span>)
                    }
                    {
                        note?.noteTags?.slice(2).length > 0 &&
                        <span className='text-md text-gray-500'>{`+${note?.noteTags?.slice(2).length}`}</span>
                    }
                </div>
                <p className='text-sm text-gray-500'>{note?.date}</p>
            </div>
        </>
    );
}

export default Note;
