import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import { HiOutlineTag } from 'react-icons/hi';
import { RxCounterClockwiseClock } from "react-icons/rx";
import { CiMenuKebab } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { archiveNote, deleteNote, unarchiveNote } from '../store/slices/all notes/allNotesSlice';
import { useNavigate } from 'react-router-dom';
import { BiArchiveIn, BiArchiveOut } from 'react-icons/bi';
import { deleteNoteDB, updateNoteDB } from '../utlis/firebase/firestore db/firestoreDB';

const NoteDetails = ({ noteToShow, setShowNote }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [largeScreen, setLargeScreen] = useState(true);
    const [showNoteButtonMobile, setShowNoteButtonMobile] = useState(false);

    const archiveCurrentNote = async () => {
        try {
            await updateNoteDB(noteToShow.id, { ...noteToShow, isArchived: true });
            dispatch(archiveNote(noteToShow));
            returnToNotesMobile();
        } catch (error) {
            console.error('Error: ', error)
        }

    }
    const unarchiveCurrentNote = async () => {
        try {
            await updateNoteDB(noteToShow.id, { ...noteToShow, isArchived: false });
            dispatch(unarchiveNote(noteToShow));
            returnToNotesMobile();
        } catch (error) {
            console.error("Error unarchiving note:", error.message);
        }
    }
    const removeNote = async () => {
        try {
            await deleteNoteDB(noteToShow.id);
            dispatch(deleteNote(noteToShow.id));
            returnToNotesMobile();
        } catch (error) {
            console.error("Error deleting note:", error.message);
        }
    }
    const editNote = () => {
        navigate(`/edit-note/${noteToShow.isArchived ? 'archive-note' : 'all-note'}/${noteToShow.id}`);
    }
    const returnToNotesMobile = () => {
        setShowNote(false)
    }


    useEffect(() => {
        if (window.innerWidth <= 768) {
            setLargeScreen(false)
        }
    }, [])

    if (largeScreen) {
        return (
            <div className='w-full overflow-x-auto min-h-[calc(100vh-176px)] md:min-h-[calc(100vh-120px)] custom-scrollbar p-4 divide-y-2 divide-zinc-800 primary-text'>
                {
                    noteToShow ?
                        <>
                            <div className='first-section flex flex-col gap-2 pb-4'>
                                <div className='max-w-full flex items-center justify-between'>
                                    <h1 className='font-bold max-w-[50%] overflow-hidden break-words text-ellipsis text-2xl'>{noteToShow?.noteTitle}</h1>
                                    <div className='flex items-center gap-2'>
                                        <div className='flex items-center gap-1 p-1 text-xs bg-gray-700 font-semibold rounded select-none cursor-pointer active:scale-95' onClick={!noteToShow.isArchived ? archiveCurrentNote : unarchiveCurrentNote}>{!noteToShow.isArchived ? <BiArchiveIn /> : <BiArchiveOut />}<span>{!noteToShow.isArchived ? 'Archive' : 'Unarchive'}</span></div>
                                        <div className='flex items-center gap-1 p-1 text-xs bg-yellow-700 font-semibold rounded select-none cursor-pointer active:scale-95' onClick={editNote}><FiEdit /><span>Edit</span></div>
                                        <div className='flex items-center gap-1 p-1 text-xs bg-red-700 font-semibold rounded select-none cursor-pointer active:scale-95' onClick={removeNote}><FiTrash2 /><span>Delete</span></div>
                                    </div>
                                </div>
                                <div className='tag-update flex flex-col gap-2'>
                                    <div className='w-1/2 flex-auto flex items-center justify-between'>
                                        <span className='flex items-center gap-2 font-semibold'>
                                            <HiOutlineTag /><span>Tags</span></span>
                                        <span className='flex gap-2'>
                                            {
                                                noteToShow?.noteTags?.slice(0, 2).map((tag, idx) => <span key={idx} className='p-1 rounded bg-[#1c1c1c] text-md'>{tag.label}</span>)
                                            }
                                            {
                                                noteToShow?.noteTags?.slice(2).length > 0 &&
                                                <span className='p-1 rounded bg-[#1c1c1c] text-md select-none'>{`+${noteToShow?.noteTags?.slice(2).length}`}</span>
                                            }
                                        </span>
                                    </div>
                                    <div className='w-1/2 flex items-center justify-between'>
                                        <span className='flex items-center gap-2 font-semibold'>
                                            <RxCounterClockwiseClock />
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
                            <div className="markdown-style pt-4 overflow-x-auto max-w-screen">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {noteToShow?.noteContent}
                                </ReactMarkdown>
                            </div>
                        </> :
                        <div className='w-full h-full flex items-center justify-center'>
                            <h1 className='text-center font-medium text-4xl md:text-6xl'>There are no notes</h1>
                        </div>
                }

            </div>
        );
    } else {
        return (
            <div className='relative overflow-y-hidden w-full min-h-[calc(100vh-176px)] md:min-h-[calc(100vh-120px)] custom-scrollbar p-4 divide-y-2 divide-zinc-800 primary-text'>
                {
                    noteToShow ?
                        <>
                            <div className='first-section flex flex-col gap-2 pb-4'>
                                <div className='max-w-screen flex items-center justify-between'>
                                    <h1 className='font-bold text-2xl overflow-hidden break-words text-ellipsis line-clamp-2 max-w-[85%]'>{noteToShow?.noteTitle}</h1>
                                    <CiMenuKebab className={`primary-text text-2xl`} onClick={() => setShowNoteButtonMobile(!showNoteButtonMobile)} />

                                    <div className={`absolute max-w-fit transition-all top-[70px] right-2 ${showNoteButtonMobile ? 'block' : 'hidden'} bg-[#1c1c1c] rounded-md flex flex-col items-center z-[40] select-none`}>
                                        <div className='secondary-text text-lg flex items-center bg-gray-700 w-full gap-3 py-3 font-medium px-5 active:bg-gray-800' onClick={!noteToShow.isArchived ? archiveCurrentNote : unarchiveCurrentNote}>{noteToShow.isArchived ? <BiArchiveOut /> : <BiArchiveIn />}<span>{noteToShow.isArchived ? 'Unarchive' : 'Archive'}</span></div>
                                        <div className='bg-yellow-700 w-full text-lg flex items-center gap-3 py-3 font-medium px-5 active:bg-yellow-900'
                                            onClick={editNote} ><FiEdit /><span>Edit</span></div>
                                        <div className='bg-red-700 w-full text-lg font-medium flex items-center gap-3 py-3 px-5 active:bg-red-900' onClick={removeNote}>
                                            <FiTrash2 />
                                            <span>Delete</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='max-w-screen mt-2 tag-update flex flex-col gap-2'>
                                    <div className='w-full flex items-center justify-between'>
                                        <span className='flex items-center gap-2 font-semibold'>
                                            <HiOutlineTag /><span>Tags</span></span>
                                        <span className='flex gap-2'>
                                            {
                                                noteToShow?.noteTags?.slice(0, 2).map((tag, idx) => <span key={idx} className='p-1 max-w-20 overflow-hidden text-ellipsis rounded bg-[#1c1c1c] text-md'>{tag.label}</span>)
                                            }
                                            {
                                                noteToShow?.noteTags?.slice(2).length > 0 &&
                                                <span className='p-1 rounded bg-[#1c1c1c] text-md select-none'>{`+${noteToShow?.noteTags?.slice(2).length}`}</span>
                                            }
                                        </span>
                                    </div>
                                    <div className='w-full flex items-center justify-between'>
                                        <span className='flex items-center gap-2 font-semibold'>
                                            <RxCounterClockwiseClock />
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
                            <div className="markdown-style pt-4 overflow-x-auto">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {noteToShow?.noteContent}
                                </ReactMarkdown>
                            </div>
                        </> :
                        <div className='w-full h-full flex items-center justify-center'>
                            <h1 className='text-center font-medium text-4xl md:text-6xl'>There are no notes</h1>
                        </div>
                }

            </div>
        );
    }


}

export default NoteDetails;
