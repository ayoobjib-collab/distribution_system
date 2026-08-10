import Sidebar from "@/Layouts/Dashboard/Parts/Sidebar";
import DashboardHeader from '@/Layouts/Dashboard/Parts/DashboardHeader';
import Footer from '@/Layouts/Dashboard/Parts/Footer';

import { useState } from 'react';
import { Head } from "@inertiajs/react";

import { ToastContainer } from 'react-toastify';

const DashboardLayout = ({ children, h1 }) => {

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(prev => !prev);

    function closeSidebar(e) {
        if (e.target.closest('a'))
            setSidebarOpen(false)
    }

    return (
        <>
            <Head>
                <title>{h1}</title>
            </Head>

            <div className="app-container">
                <Sidebar isOpen={isSidebarOpen} childClicked={closeSidebar} />

                <div className="app-content">

                    <DashboardHeader />

                    <div className="title">
                        <h1>
                            {h1}
                        </h1>
                    </div>
                    <main className="area-wrapper">
                        {children}
                    </main>

                    <Footer toggleSidebar={toggleSidebar} />

                </div>

            </div>

            {isSidebarOpen && (
                <div className='sidebar-overlay' onClick={toggleSidebar}></div>
            )}

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true} // Set to true if your app is RTL/Persian
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>

    )
}

export default DashboardLayout;