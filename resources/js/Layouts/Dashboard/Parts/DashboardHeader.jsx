import { TfiWallet } from "react-icons/tfi";
import { FiPlusCircle } from "react-icons/fi";
import { usePage, Link } from "@inertiajs/react";
import NewDarkSwitch from "../Components/NewDarkSwitch";

import Logo from "../Components/Logo";


export default function DashboardHeader({ h1 }) {

    const { auth } = usePage().props;

    // let walletBalance = auth.user !== null ? auth.user.wallet_balance : 0;

    const now = new Date();
    const formatter = new Intl.DateTimeFormat('fa-IR', {
        calendar: 'persian',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    const shamsiDate = formatter.format(now);

    return (
        <header className="app-content-header">

            <Logo />

            <div className="user-bag flex gap-3">
                <span>
                امروز: 
                </span>
                <b>
                {shamsiDate}
                </b>                
            </div>

            <div className="vertical-hr"></div>

            <NewDarkSwitch />

        </header>
    )
}