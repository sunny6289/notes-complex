import { useState } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import Sidebar from './components/Sidebar'
import SearchPanel from './components/SearchPanel'
import AllNotesPage from './pages/AllNotesPage'
import CreateNewNotePage from './pages/CreateNewNotePage'
import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import NotesPage from './pages/AllNotesPage'
import PageNotFound from './components/PageNotFound'
import EditNotePage from './pages/EditNotePage'
import ArchivedNotesPage from './pages/ArchivedNotesPage'
import { useSelector } from 'react-redux'
import HomePage from './pages/HomePage'

function App() {
  
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
          {/* <Route index element={<HomePage/>}/> */}
          <Route path='/create-new-note' element={<CreateNewNotePage/>}/>
          <Route path='/edit-note/:noteType/:noteId' element={<EditNotePage/>}/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        
        {/* <CreateNewNotePage/> */}
        {/* <HomePage/> */}
        {/* <EditNote/> */}
      </div>
      </>
    }
      
    </>
  )
}

export default App
