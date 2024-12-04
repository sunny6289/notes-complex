import React from 'react';
import Sidebar from '../components/Sidebar';
import SearchPanel from '../components/SearchPanel';
import AllNotesPage from './AllNotesPage';
import { Outlet } from 'react-router-dom';

const DashboardPage = () => {
    return (
        <>
            <Sidebar/>
            <div className="content-section w-full">
                {/* <AllNotesPage/> */}
                <Outlet/>
        </div>
        </>
    );
}

export default DashboardPage;
