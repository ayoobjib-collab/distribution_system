import { Link } from "@inertiajs/react";
import { FiAlignRight } from "react-icons/fi";
import { MdChecklistRtl } from "react-icons/md";
import { BsPersonPlus } from "react-icons/bs";
import { BsCloudPlus } from "react-icons/bs";
import Ripple from "@/BaseComponents/Ripple";

const Footer = ({ toggleSidebar }) => {

    const currentPath = window.location.pathname;
    const isActive = (path) => currentPath.startsWith(path);

    console.log('footer render');

    return (
        <>
            <footer className="mob-hide">
                کلیه حقوق این برنامه متعلق به شرکت روناک همراه تجارت پویا می‌باشد
            </footer>

            <nav className="mobile-menu desk-hide">

                <div className="ripple" onClick={toggleSidebar}>
                    <FiAlignRight />
                    <small>منو</small>
                </div>

                <div className={(isActive('/list') ? 'active ' : '') + 'ripple'} >
                    <Link href={'/list'}>
                        <MdChecklistRtl />
                        <small>محصولات</small>
                    </Link>
                </div>

                <div className={(isActive('/account/create') ? 'active ' : '') + 'ripple'}>
                    <Link href={'/account/create'}>
                        <BsPersonPlus />
                        <small>ایجاد حساب</small>
                    </Link>
                </div>

                <div className={(isActive('/invoice/create') ? 'active ' : '') + 'ripple'}>
                    <Link href={'/invoice/create'}>
                        <BsCloudPlus />
                        <small>ایجاد فاکتور</small>
                    </Link>
                </div>

            </nav>
        </>
    )
}

export default Footer;