import Sidebar from "@/Layouts/Dashboard/Parts/Sidebar";
import DashboardHeader from '@/Layouts/Dashboard/Parts/DashboardHeader';
import Footer from '@/Layouts/Dashboard/Parts/Footer';

import { useState, useEffect } from 'react';
import { Head, usePage } from "@inertiajs/react";
import { toast, ToastContainer } from 'react-toastify';
import { MdKeyboardArrowLeft } from "react-icons/md";

const DashboardLayout = ({ children, h1 }) => {

    /**
     * Handle show msg when page load.
     */
    const p = usePage().props;
    const { msg, url } = usePage().props;

    console.log(p);

    useEffect(() => {
        if (msg.status)
            toast.success(msg.text);
        else
            toast.error(msg.text);
    }, [msg]);

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

                        <nav id="breadcrumbs" aria-label="breadcrumbs">
                            <ol className="flex gap-1 items-center">
                                <li><span className="text">داشبورد</span></li>
                                <li>
                                    <MdKeyboardArrowLeft />
                                </li>
                                <li>
                                    <h1>
                                        {h1}
                                    </h1>
                                </li>
                            </ol>
                        </nav>

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