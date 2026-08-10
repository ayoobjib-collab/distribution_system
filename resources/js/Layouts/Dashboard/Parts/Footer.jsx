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
                    <small>منو</small>
                </div>
                <div onClick={toggleSidebar}>
                    <TfiLayoutGrid2 />
                    <small>منو</small>
                </div>
                <div onClick={toggleSidebar}>
                    <TfiLayoutGrid2 />
                    <small>منو</small>
                </div>
            </nav>
        </>
    )
}

export default Footer;