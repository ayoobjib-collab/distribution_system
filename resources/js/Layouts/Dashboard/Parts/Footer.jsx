import { Link } from "@inertiajs/react";
import { FiAlignRight } from "react-icons/fi";
import { MdChecklistRtl } from "react-icons/md";
import { BsPersonPlus } from "react-icons/bs";
import { BsCloudPlus } from "react-icons/bs";


const Footer = ({ toggleSidebar }) => {

    const currentPath = window.location.pathname;
    const isActive = (path) => currentPath.startsWith(path);

    return (
        <>
            <footer className="mob-hide">
                کلیه حقوق این برنامه متعلق به شرکت روناک همراه تجارت پویا می‌باشد
            </footer>

            <nav className="mobile-menu desk-hide">

                <div className="ripple3" onClick={toggleSidebar}>
                    <span className='svg-wrap'>
                        <FiAlignRight />
                    </span>
                    <small>منو</small>
                </div>

                <div className={(isActive('/list') ? 'active ' : '')} >
                    <Link href={'/list'}>
                        <span className='svg-wrap'>
                            <MdChecklistRtl />
                        </span>
                        <small>محصولات</small>
                    </Link>
                </div>

                <div className={(isActive('/account/create') ? 'active ' : '')}>
                    <Link href={'/account/create'}>
                        <span className='svg-wrap'>
                            <BsPersonPlus />
                        </span>
                        <small>ایجاد حساب</small>
                    </Link>
                </div>

                <div className={(isActive('/invoice/create') ? 'active ' : '') + ''}>
                    <Link href={'/invoice/create'}>
                        <span className='svg-wrap'>
                            <BsCloudPlus />
                        </span>
                        <small>ایجاد فاکتور</small>
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default Footer;