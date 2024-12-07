import { addDoc, doc, updateDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";


/* 
    Database manipulation functions
*/

// to add note in Database
export const addNoteDB = async(note)=>{

    const user = auth.currentUser;
    if(!user){
        console.error('Error : No authenticated user');
        return;
    }
    const notesCollectionRef = collection(db, "user", user.uid, "allNotes");
    try {
        const docRef = await addDoc(notesCollectionRef,note)
        return docRef.id;
    } catch (error) {
        console.error('Error : ',error.message)
    }
}
// to edit note in Database
export const updateNoteDB = async(noteId, updatedNote)=>{
    const user = auth.currentUser;
    if(!user){
        console.error('Error : No authenticated user');
        return;
    }
    const noteRef = doc(db, "user", user.uid, "allNotes", noteId);
    try {
        await updateDoc(noteRef,{
            ...updatedNote,
            timestamp: Date.now()
        })
    } catch (error) {
        console.error('Error : ', error.message)
    }
}

// to delete note in Database
export const deleteNoteDB = async (noteId) => {
    const user = auth.currentUser;
    if (!user) {
      console.error("No authenticated user");
      return;
    }
  
    const noteRef = doc(
      db,
      "user",
      user.uid, 
      "allNotes",
      noteId
    );
  
    try {
      await deleteDoc(noteRef);
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

/* 
    Database fetch functions
*/
export const fetchNotes = async()=>{
    const user = auth.currentUser;
    if(!user){
        console.error('No authenticated user');
        return [];
    }

    const notesCollectionRef = collection(db, "user", user.uid, "allNotes");
    try {
        const querySnapShot = await getDocs(notesCollectionRef);
        const notes = querySnapShot.docs.map((doc)=> ({id: doc.id, ...doc.data()}));
        return notes;
    } catch (error) {
        console.error('Error fetching notes : ',error);
    }
}
