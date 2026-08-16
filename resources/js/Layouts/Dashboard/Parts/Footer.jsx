import { Link } from "@inertiajs/react";
import { TfiLayoutGrid2 } from "react-icons/tfi";

const Footer = ({ toggleSidebar }) => {
    return (
        <>

            <footer className="mob-hide">
                کلیه حقوق این برنامه متعلق به شرکت روناک همراه تجارت پویا می‌باشد
            </footer>

            <nav className="mobile-menu desk-hide">
                <div onClick={toggleSidebar}>
                    <TfiLayoutGrid2 />
                    <span>منو</span>
                </div>

                <div>
                    <Link href={'/product'}>
                        <TfiLayoutGrid2 />
                    </Link>
                    <span>موجودی</span>
                </div>

                <div>
                    <Link href={'/account/create'}>
                        <TfiLayoutGrid2 />
                    </Link>
                    <span>ایجاد حساب</span>
                </div>

                <div>
                    <Link href={'/invoice/create'}>
                        <TfiLayoutGrid2 />
                    </Link>
                    <span>ایجاد فاکتور</span>
                </div>

            </nav>
        </>
    )
}

export default Footer;