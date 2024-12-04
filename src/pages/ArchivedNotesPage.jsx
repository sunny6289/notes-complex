import React, { useEffect, useState } from 'react';
import SearchPanel from '../components/SearchPanel';
import NoteDetails from '../components/NoteDetails';
import NotesList from '../components/NotesList';
import { useSelector } from 'react-redux';

const ArchivedNotesPage = () => {
    const archiveNoteList = useSelector((state)=> state.archivedNote.archivedNoteList);
    const [filteredNoteList, setFilteredNoteList] = useState(archiveNoteList)
    const [noteToShow, setNoteToShow] = useState(filteredNoteList.length === 0 ? null : filteredNoteList[0]);
    const [searchText, setSearchText] = useState('');
    useEffect(()=>{
        if(searchText !== ''){
            setFilteredNoteList(archiveNoteList.filter((note)=>note.noteTitle.toLowerCase().includes(searchText)))
        }else{
            setFilteredNoteList(archiveNoteList);
        }
    },[searchText, archiveNoteList])
    useEffect(()=>{
        setNoteToShow(filteredNoteList.length === 0 ? null : filteredNoteList[0])
    },[filteredNoteList])

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
}

export default ArchivedNotesPage;
