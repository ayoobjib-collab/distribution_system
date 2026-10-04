import { Link } from "@inertiajs/react";
import { FiAlignRight } from "react-icons/fi";
import { MdChecklistRtl } from "react-icons/md";
import { BsPersonPlus } from "react-icons/bs";
import { BsCloudPlus } from "react-icons/bs";

const Footer = ({ toggleSidebar }) => {

    console.log('footer');

    return (
        <>

            <footer className="mob-hide">
                کلیه حقوق این برنامه متعلق به شرکت روناک همراه تجارت پویا می‌باشد
            </footer>

            <nav className="mobile-menu desk-hide">
                <div onClick={toggleSidebar}>
                    <FiAlignRight />
                    <span>منو</span>
                </div>

                <div>
                    <Link href={'/list'}>
                        <MdChecklistRtl />
                    </Link>
                    <span>محصولات</span>
                </div>

                <div>
                    <Link href={'/account/create'}>
                        <BsPersonPlus />
                    </Link>
                    <span>ایجاد حساب</span>
                </div>

                <div className="badge-wrap">
                    <Link href={'/invoice/create'}>
                        <BsCloudPlus />
                    </Link>
                    <span>ایجاد فاکتور</span>
                </div>

            </nav>
        </>
    )
}

export default Footer;