import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import Input from '../components/Input';
import Button from '../components/Button';
import CreatableSelect from 'react-select/creatable';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDate } from '../utlis/getCreationDate';
import { editNote } from '../store/slices/all notes/allNotesSlice';
import { checkInequalTags } from '../utlis/checkInequalTags';
import { editArchivedNote } from '../store/slices/archived notes/archivedNotesSlice';


const customStyles = {
    control: (provided) => ({
      ...provided,
      padding: '5px 0px',
      borderRadius: '0.375rem', // Tailwind equivalent of rounded-md
      borderWidth: '2px',
      borderColor: '#27272a', // Tailwind colors for focus and normal
      backgroundColor: '#000000', // Tailwind bg-gray-800
      color: '#ffffff', // Tailwind text-white
      fontSize: '1.2rem',
      transition: '',
      '&:hover': {
        borderColor: '#27272a', // Tailwind hover focus
      },
      maxHeight: '100px',
      overflowY: 'auto',
            // Applying custom scrollbar styles
            '::-webkit-scrollbar': {
                width: '6px',
            },
            '::-webkit-scrollbar-track': {
                background: '#2b2b2b',
            },
            '::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: '4px',
            },
            '::-webkit-scrollbar-thumb:hover': {
                background: '#555',
            },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#1f2937', // Tailwind bg-gray-800
      color: '#fff',
      borderRadius: '0.375rem', // Tailwind rounded-md
      zIndex: 50,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#1e293b' 
        : state.isFocused
        ? '#374151' // Tailwind bg-gray-700
        : '#1f2937', // Tailwind bg-gray-800
      color: '#fff',
      cursor: 'pointer',
      padding: '10px',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#374151', // Tailwind bg-gray-700
      color: '#fff',
      borderRadius: '0.375rem', // Tailwind rounded-md
      padding: '2px 2px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#fff', // Tailwind text-gray-400
      '&:hover': {
        backgroundColor: '#f87171', // Tailwind bg-red-500
        color: '#fff',
      },
    }),
  };



const EditNotePage = () => {
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {noteId} = useParams();
    const {noteType} = useParams();
    let noteToEdit = null;

    if(noteType === 'all-note'){
      const allNoteList = useSelector((state)=>state.allNote.allNoteList);
      const [note] = allNoteList.filter((note)=> note.id === noteId);
      noteToEdit = note;
    }else{
      const archivedNoteList = useSelector((state)=>state.archivedNote.archivedNoteList);
      const [note] = archivedNoteList.filter((note)=> note.id === noteId);
      noteToEdit = note
    }
    
    const [editNoteDetails, setEditNoteDetails] = useState({})
    
    const handleChange = (newValue) => {
        setEditNoteDetails({...editNoteDetails, noteTags: newValue})
      };
      useEffect(()=>{
        setEditNoteDetails({id: noteId,
          noteTitle: noteToEdit.noteTitle,
          noteTags: [...noteToEdit.noteTags],
          noteContent: noteToEdit.noteContent,
          date: getDate()})
      },[])
      const options = [
        { value: 'cooking', label: 'Cooking' },
        { value: 'health', label: 'Health' },
        { value: 'recipes', label: 'Recipes' },
        { value: 'dev', label: 'Dev' },
        { value: 'react-js', label: 'React JS' },
        { value: 'node-js', label: 'Node JS' },
        { value: 'javascript', label: 'Javascript' }
      ];
      
      const handleEditNote = ()=>{
        // Put it in DB
        if(noteToEdit.noteContent !== editNoteDetails.noteContent || checkInequalTags(noteToEdit.noteTags, editNoteDetails.noteTags) || noteToEdit.noteTitle !== editNoteDetails.noteTitle){
          if(editNoteDetails.noteContent === '' || editNoteDetails.noteTitle === ''){
            alert("Note title and Note content cannot be empty");
          }else{
            if(noteType === 'all-note'){
              dispatch(editNote(editNoteDetails));
            }else{
              dispatch(editArchivedNote(editNoteDetails));
            }
            navigate(-1);
          } 
        }else{
          navigate(-1);
        }
      }

    return (
        <>
            <div className="note-editor  h-[calc(100vh-64px)] sticky top-[64px] left-0 w-1/2 bg-[#1c1c1c] flex flex-col items-end gap-3 p-3">
            <Input placeholder={'Add a title'} onChange={(e)=>setEditNoteDetails({...editNoteDetails, noteTitle: e.target.value})} value={editNoteDetails.noteTitle} addedStyle={'p-3 text-[#9CA3AF] w-full text-lg outline-none focus:border-2 focus:border-[#3b83f6d0]'} />
                <CreatableSelect
                    className="w-full transition-all"
                    classNamePrefix="custom-scrollbar"
                    styles={customStyles}
                    isMulti
                    isClearable
                    value={editNoteDetails.noteTags}
                    onChange={handleChange}
                    options={options}
                    placeholder="Add tags"
                />
                <textarea rows={18} value={editNoteDetails.noteContent} onChange={(e) => setEditNoteDetails({...editNoteDetails, noteContent: e.target.value})} className='w-full bg-black border-2 border-zinc-800 rounded-md text-white p-2 text-lg outline-none custom-scrollbar focus:border-[#3b83f6d0]' />
                <div className='flex items-center gap-3'>
                    <Button style={'max-w-fit px-4 py-2 bg-gray-500 rounded text-white transition-all hover:bg-gray-600'} onClick={()=>navigate(-1)} content={'Cancel'} />
                    <Button style={'secondary-btn max-w-fit px-5 py-2 '} content={'Edit'} onClick={handleEditNote}/>
                </div>
            </div>
            <div className="note-preview markdown-style primary-text p-3 w-1/2 bg-[#000] overflow-y-auto">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{editNoteDetails.noteContent}</ReactMarkdown>
            </div>
        </>
    );
}

export default EditNotePage;