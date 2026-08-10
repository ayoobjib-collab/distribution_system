import { Link } from "@inertiajs/react";
import UserInfo from "../Components/UserInfo";
import { usePage } from "@inertiajs/react";
import { CiCircleChevLeft } from "react-icons/ci";
import { HiOutlineArrowSmLeft } from "react-icons/hi";


const Sidebar = ({ isOpen, childClicked }) => {

    const { url, auth } = usePage().props

    const dashboard = '/';

    const links = [
        {
            href: '/client',
            label:'اشخاص'
        },
        {
            href: '/client/create',
            label:'ایجاد شخص'
        },
        {
            href: '/cheque',
            label:'چکها'
        },
        {
            href: '/cheque/create',
            label:'افزودن چک'
        },
        {
            href: '/transaction/create',
            label:'افزودن مستقیم تراکنش'
        }      
    ];

    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`} >
            <div className="sidebar-header">
                <UserInfo userUrl={dashboard} />
            </div>

            <div className="sidebar-links">

                <ul className="sidebar-list" onClick={childClicked}>
                    {links.map((link) => (
                        <li className="sidebar-list-item" key={link.href}>
                            <Link href={link.href} className={link.href === url ? 'active' : ''}>
                                <CiCircleChevLeft size={21} />
                                <span>{link.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="logout">
                    {auth.user !== null ?
                        (<Link rel="stylesheet" href={dashboard} method='post' id='logout'>
                            خروج
                            <HiOutlineArrowSmLeft />
                        </Link>)
                        :
                        (<Link rel="stylesheet" href={dashboard} id='logout' as="button">
                            ورود
                            <HiOutlineArrowSmLeft />
                        </Link>)
                    }
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;