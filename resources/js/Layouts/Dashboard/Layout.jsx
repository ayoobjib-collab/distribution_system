import Sidebar from "@/Layouts/Dashboard/Parts/Sidebar";
import DashboardHeader from '@/Layouts/Dashboard/Parts/DashboardHeader';
import Footer from '@/Layouts/Dashboard/Parts/Footer';

import { useState, useEffect, useCallback } from 'react';
import { Head, usePage, Link } from "@inertiajs/react";
import { toast, ToastContainer } from 'react-toastify';
import { MdKeyboardArrowLeft } from "react-icons/md";

function getBreadcrumbData(breadcrumbs) {
    const items = Array.isArray(breadcrumbs) ? breadcrumbs : [];

    return {
        h1: items.at(-1)?.label ?? 'Title',
        items: items.slice(0, -1),
    };
}

const DashboardLayout = ({ children }) => {

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    /**
     * Handle show msg when page load.
     */
    const { msg, breadcrumbs } = usePage().props;
    const { h1, items } = getBreadcrumbData(breadcrumbs);

    useEffect(() => {
        if (!msg) return;

        if (msg.status)
            toast.success(msg.text);
        else
            toast.error(msg.text);
    }, [msg]);

    const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), []);

    function closeSidebar(e) {
        if (e.target.closest('a'))
            setSidebarOpen(false)
    }

    return (
        <>
            <Head>
                <title>{`${h1} | پخش روناتیس`}</title>
            </Head>

            <div className="app-container">
                <Sidebar isOpen={isSidebarOpen} childClicked={closeSidebar} />

                <div className="app-content">

                    <DashboardHeader />

                    <div className="title">
                        <nav id="breadcrumbs" aria-label="breadcrumbs">
                            <ol className="flex gap-1 items-center">
                                {
                                    items?.length > 0 && items.map((breadcrumb, index) => (
                                        <li key={index}>
                                            <Link href={breadcrumb?.url} className='flex items-center'>
                                                <span className="text">{breadcrumb.label}</span>
                                                <MdKeyboardArrowLeft />
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ol>
                        </nav>
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