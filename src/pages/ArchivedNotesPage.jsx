import React, { useEffect, useState } from 'react';
import SearchPanel from '../components/SearchPanel';
import NoteDetails from '../components/NoteDetails';
import NotesList from '../components/NotesList';
import { useSelector } from 'react-redux';

const ArchivedNotesPage = () => {
    const [largeScreen, setLargeScreen] = useState(true);
    const [showNote, setShowNote] = useState(false);
    const allNoteList = useSelector((state)=> state.allNote.allNoteList);
    const archivedNotes = allNoteList.filter((note)=> note.isArchived === true)
    const [filteredNoteList, setFilteredNoteList] = useState(archivedNotes)
    const [noteToShow, setNoteToShow] = useState(filteredNoteList.length === 0 ? null : filteredNoteList[0]);
    const [searchText, setSearchText] = useState('');
    useEffect(()=>{
        if(searchText !== ''){
            setFilteredNoteList(archivedNotes.filter((note)=>note.noteTitle.toLowerCase().includes(searchText)))
        }else{
            setFilteredNoteList(archivedNotes);
        }
    },[searchText, allNoteList])
    useEffect(()=>{
        setNoteToShow(filteredNoteList.length === 0 ? null : filteredNoteList[0])
    },[filteredNoteList])

    useEffect(()=>{
        if(window.innerWidth <= 640){
            setLargeScreen(false);
        }
    },[])

    if(largeScreen){
        return (
            <>
                <SearchPanel titleContent = 'Archived Notes' setSearchText={setSearchText}/>
                <div className='max-w-full min-h-[100vh-64px] flex bg-[#101010]'>
                    {
                        noteToShow && <NotesList setNoteToShow={setNoteToShow} noteList={filteredNoteList}/>
                    }
                    <NoteDetails noteType={'archive-note'} noteToShow={noteToShow}/>
                </div>
            </>
        );
    }else{
        return (
            <div className='h-full'>
                <SearchPanel titleContent='Archived Notes' searchText={searchText} showNote={showNote} setShowNote={setShowNote} noteToShow={noteToShow} setSearchText={setSearchText}/>
                <div className='max-w-full min-h-[100vh-64px] flex bg-[#101010]'>
                    {
                        (!showNote) && <NotesList setShowNote={setShowNote} setNoteToShow={setNoteToShow} noteList={filteredNoteList}/>
                    }
                    {
                        showNote && 
                        <NoteDetails noteType={'archive-note'} setShowNote={setShowNote} noteToShow={noteToShow}/>
                    }
                </div>
            </div>
        );
    }

    
}

export default ArchivedNotesPage;
