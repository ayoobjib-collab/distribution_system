import { Link } from "@inertiajs/react";
import UserInfo from "../Components/UserInfo";
import { usePage } from "@inertiajs/react";
import { CiCircleChevLeft } from "react-icons/ci";
import { HiOutlineArrowSmLeft } from "react-icons/hi";


const Sidebar = ({ isOpen, childClicked }) => {

    const { auth, isAdmin } = usePage().props

    const dashboard = '/';

    const url = window.location.pathname;

    var links = [
        {
            href: '/invoice',
            label: 'فاکتورها'
        },
        {
            href: '/product',
            label: 'محصولات'
        },
        {
            href: '/invoice/create',
            label: 'ایجاد فاکتور'
        },
        {
            href: '/account',
            label: 'حساب‌ها'
        },
        {
            href: '/account/create',
            label: 'افزودن حساب'
        }
    ];

    if (isAdmin) {
        links.push(
            {
                href: '/product/create',
                label: 'ایجاد محصول'
            },
            {
                href: '/user/create',
                label: 'ایجاد ویزیتور'
            }
        );
    }

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