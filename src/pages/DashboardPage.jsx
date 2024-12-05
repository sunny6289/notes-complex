import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardPage = () => {
    return (
        <>
            <Sidebar/>
            <div className="content-section w-full">
                <Outlet/>
        </div>
        </>
    );
}

export default DashboardPage;
