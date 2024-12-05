import './App.css'
import Navigation from './components/Navigation'
import AllNotesPage from './pages/AllNotesPage'
import CreateNewNotePage from './pages/CreateNewNotePage'
import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import PageNotFound from './components/PageNotFound'
import EditNotePage from './pages/EditNotePage'
import ArchivedNotesPage from './pages/ArchivedNotesPage'
import { useSelector } from 'react-redux'
import HomePage from './pages/HomePage'

const App = () => {
  
  const isAuth = useSelector((state)=> state.auth.isAuth);
  

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
