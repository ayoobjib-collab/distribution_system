import { Link } from "@inertiajs/react";
import { FiAlignRight } from "react-icons/fi";
import { MdChecklistRtl } from "react-icons/md";
import { BsPersonPlus } from "react-icons/bs";
import { BsCloudPlus } from "react-icons/bs";
import { useCallback, useEffect, useState } from "react";


const Footer = ({ toggleSidebar }) => {

    const currentPath = window.location.pathname;

    const isActive = (path) => {
        return currentPath.startsWith(path);
    };

    const load = useCallback(() => {
        document
            .querySelectorAll('.mobile-menu .active')
            .forEach(el => el.classList.remove('active'));
    }, []);

    const menuList = [
        {
            label: 'منو',
            url: false,
            icon: <FiAlignRight />,
            onClick: toggleSidebar,
        },
        {
            label: 'محصولات',
            url: '/list',
            icon: <MdChecklistRtl />,
            onClick: load,
        },
        {
            label: 'ایجاد حساب',
            url: '/account/create',
            icon: <BsPersonPlus />,
            onClick: load,
        },
        {
            label: 'ایجاد فاکتور',
            url: '/invoice/create',
            icon: <BsCloudPlus />,
            onClick: load,
        },
    ]

    return (
        <>
            <footer className="mob-hide">
                کلیه حقوق این برنامه متعلق به شرکت روناک همراه تجارت پویا می‌باشد
            </footer>

            <nav className="mobile-menu desk-hide">
                {
                    menuList.map((list, index) => {

                        const menuText = (
                            <>
                                <span className='svg-wrap'>
                                    {list.icon}
                                </span>
                                <small>
                                    {list.label}
                                </small>
                            </>
                        );

                        return (
                            <div key={index} className={(isActive(list.url) ? 'active ' : '')} onClick={list.onClick}>
                                {list.url ? <Link href={list.url} viewTransition>{menuText}</Link> : menuText}
                            </div>
                        )
                    })
                }
            </nav >
        </>
    )
}

export default Footer;