import React from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import {markdownExample} from '../utlis/testRequiredData'
import { HiOutlineTag } from 'react-icons/hi';
import { RxCounterClockwiseClock } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { addNote, deleteNote } from '../store/slices/all notes/allNotesSlice';
import { useNavigate } from 'react-router-dom';
import { BiArchiveIn, BiArchiveOut } from 'react-icons/bi';
import { archiveNote, removeArchivedNote } from '../store/slices/archived notes/archivedNotesSlice';

const NoteDetails = ({noteType, noteToShow}) => {
    // console.log(noteToShow);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const archiveCurrentNote = ()=>{
        dispatch(archiveNote(noteToShow));
        removeNote();
    }
    const unarchveCurrentNote = ()=>{
        dispatch(removeArchivedNote(noteToShow.id));
        dispatch(addNote(noteToShow));
    }
    const removeNote = ()=>{
        if(noteType === 'all-note'){
            dispatch(deleteNote(noteToShow.id))
        }else{
            dispatch(removeArchivedNote(noteToShow.id))
        }
    }
    const editNote = ()=>{
        navigate(`/edit-note/${noteType}/${noteToShow.id}`);
    }
    return (
        <div className='w-full h-[calc(100vh-120px)] p-4 divide-y-2 divide-zinc-800 primary-text'>
            {
                noteToShow ? 
                <>
                    <div className='first-section flex flex-col gap-2 pb-4'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-bold text-2xl'>{noteToShow?.noteTitle}</h1>
                            <div className='flex items-center gap-2'>
                                <div className='flex items-center gap-1 p-1 text-xs bg-gray-700 font-semibold rounded select-none cursor-pointer active:scale-95' onClick={noteType==='all-note'? archiveCurrentNote : unarchveCurrentNote}>{noteType === 'all-note'? <BiArchiveIn/> : <BiArchiveOut/>}<span>{noteType === 'all-note' ? 'Archive' : 'Unarchive'}</span></div>
                                <div className='flex items-center gap-1 p-1 text-xs bg-yellow-700 font-semibold rounded select-none cursor-pointer active:scale-95' onClick={editNote}><FiEdit/><span>Edit</span></div>
                                <div className='flex items-center gap-1 p-1 text-xs bg-red-700 font-semibold rounded select-none cursor-pointer active:scale-95' onClick={removeNote}><FiTrash2/><span>Delete</span></div>
                            </div>
                        </div>
                    <div className='tag-update flex flex-col gap-2'>
                        <div className='w-1/2 flex-auto flex items-center justify-between'>
                            <span className='flex items-center gap-2 font-semibold'>
                                <HiOutlineTag/><span>Tags</span></span>
                            <span className='flex gap-2'>
                                {
                                    noteToShow?.noteTags?.slice(0,2).map((tag, idx)=> <span key={idx} className='p-1 rounded bg-[#1c1c1c] text-md'>{tag.label}</span>)
                                }
                                {
                                    noteToShow?.noteTags?.slice(2).length > 0 &&
                                    <span className='p-1 rounded bg-[#1c1c1c] text-md select-none'>{`+${noteToShow?.noteTags?.slice(2).length}`}</span>
                                }
                            </span>
                        </div>
                        <div className='w-1/2 flex items-center justify-between'>
                            <span className='flex items-center gap-2 font-semibold'>
                                <RxCounterClockwiseClock/>
                                <span>Last Updated</span>
                            </span>
                            <div>
                                <span className='text-left'>{noteToShow?.date}</span>
                                {
                                noteToShow?.edited && <span className='pl-2 text-sm'>{`(edited)`}</span>
                                }
                            </div>
                            
                        </div>
                    </div>
            </div>
            <div className="markdown-style pt-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {noteToShow?.noteContent}
                </ReactMarkdown>
            </div>
                </> :
                <div className='w-full h-full flex items-center justify-center'>
                    <h1 className='text-center font-bold text-6xl'>There are no notes</h1>
                </div>
            }
            
        </div>
    );
}

export default NoteDetails;
