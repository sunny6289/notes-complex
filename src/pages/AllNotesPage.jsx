import React, { useEffect, useState } from 'react';
import NotesList from '../components/NotesList';
import NoteDetails from '../components/NoteDetails';
import SearchPanel from '../components/SearchPanel';
import { useSelector } from 'react-redux';

const AllNotesPage = () => {
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

    return (
        <>
            <SearchPanel titleContent='All Notes' setSearchText={setSearchText}/>
            <div className='max-w-full min-h-[100vh-64px] flex bg-[#101010]'>
                {
                    noteToShow && <NotesList setNoteToShow={setNoteToShow} noteList={filteredNoteList}/>
                }
                <NoteDetails noteType={'all-note'} noteToShow={noteToShow}/>
            </div>
        </>
    );
}

export default AllNotesPage;
