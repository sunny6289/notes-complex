import Navigation from './components/Navigation'
import AllNotesPage from './pages/AllNotesPage'
import CreateNewNotePage from './pages/CreateNewNotePage'
import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import PageNotFound from './components/PageNotFound'
import EditNotePage from './pages/EditNotePage'
import ArchivedNotesPage from './pages/ArchivedNotesPage'
import { useDispatch, useSelector } from 'react-redux'
import HomePage from './pages/HomePage'
import { useEffect } from 'react'
import { seedAllNote } from './store/slices/all notes/allNotesSlice'
import { fetchNotes } from './utlis/firebase/firestore db/firestoreDB'
import { userIn } from './store/slices/authentication/authSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './utlis/firebase/firebase'

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state)=> state.auth.isAuth);
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
          // Redirect to dashboard or authenticated route
          dispatch(userIn({name: user.displayName, email: user.email}));
          const fetchAndDispatchNotes = async () => {
            if (isAuth) {
              try {
                const notes = await fetchNotes();
                dispatch(seedAllNote(notes));
              } catch (error) {
                console.error('Error fetching notes:', error);
              }
            }
          };
      
          fetchAndDispatchNotes();

      }
  });
  
  // Clean up the listener on component unmount
  return () => unsubscribe();
},[isAuth, dispatch])

  return (
    <>
    {
      !isAuth ? <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path="*" element={<PageNotFound />} />
        </Routes>
      : <>
        <Navigation/>
      <div className="main-content min-h-[calc(100vh-64px)] flex">
        <Routes>
        <Route path="/" element={<DashboardPage />}>
            {/* Redirect to `/note` by default */}
            <Route index element={<Navigate to="note" replace />} />
            {/* Define `/note` and other routes */}
            <Route path="note" element={<AllNotesPage />} />
            <Route path="archive-note" element={<ArchivedNotesPage />} />
          </Route>
          <Route path='/create-new-note' element={<CreateNewNotePage/>}/>
          <Route path='/edit-note/:noteType/:noteId' element={<EditNotePage/>}/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      </>
    }
    </>
  )
}

export default App
