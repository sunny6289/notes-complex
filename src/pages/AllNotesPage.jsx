import React, { useEffect, useState } from 'react';
import NotesList from '../components/NotesList';
import NoteDetails from '../components/NoteDetails';
import SearchPanel from '../components/SearchPanel';
import { useSelector } from 'react-redux';

const AllNotesPage = () => {
    const [largeScreen, setLargeScreen] = useState(true);
    const [showNote, setShowNote] = useState(false);
    const allNoteList = useSelector((state)=> state.allNote.allNoteList);
    const unarchivedNotes = allNoteList.filter((note)=> note.isArchived === false)
    const [filteredNoteList, setFilteredNoteList] = useState(unarchivedNotes)
    const [noteToShow, setNoteToShow] = useState(filteredNoteList.length === 0 ? null : filteredNoteList[0]);
    const [searchText, setSearchText] = useState('');
    useEffect(()=>{
        if(searchText !== ''){
            setFilteredNoteList(unarchivedNotes.filter((note)=>note.noteTitle.toLowerCase().includes(searchText)))
        }else{
            setFilteredNoteList(unarchivedNotes);
        }
    },[searchText, allNoteList])
    useEffect(()=>{
        setNoteToShow(filteredNoteList.length === 0 ? null : filteredNoteList[0])
    },[filteredNoteList])

    useEffect(()=>{
        if(window.innerWidth <= 768){
            setLargeScreen(false);
        }
    },[])

    if(largeScreen){
        return (
            <>
                <SearchPanel titleContent='All Notes' setSearchText={setSearchText}/>
                <div className='w-full flex bg-[#101010]'>
                    {
                        noteToShow && <NotesList setNoteToShow={setNoteToShow} noteList={filteredNoteList}/>
                    }
                    <NoteDetails noteType={'all-note'} noteToShow={noteToShow}/>
                </div>
            </>
        );
    }else{
        return (
            <div className='h-full'>
                <SearchPanel titleContent='All Notes' searchText={searchText} showNote={showNote} setShowNote={setShowNote} noteToShow={noteToShow} setSearchText={setSearchText}/>
                <div className='bg-[#101010]'>
                    {
                        (!showNote) && <NotesList setShowNote={setShowNote} setNoteToShow={setNoteToShow} noteList={filteredNoteList}/>
                    }
                    {
                        showNote && 
                        <NoteDetails noteType={'all-note'} setShowNote={setShowNote} noteToShow={noteToShow}/>
                    }
                    
                </div>
            </div>
        );
    }

    
}

export default AllNotesPage;
