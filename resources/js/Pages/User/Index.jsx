import DashboardLayout from "@/Layouts/Dashboard/Layout"
import Pagination from "@/BaseComponents/Pagination"

import { formatAmount } from '@/functions/helper.js';
import { FiEdit } from "react-icons/fi";
import ModalMoveCheque from "./Components/ModalMoveCheque";
import { LiaTrashAlt } from "react-icons/lia";
import { Link } from "@inertiajs/react";

import FormField from "@/BaseComponents/FormField";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

import { CiSquareCheck } from "react-icons/ci";


function Index({ users }) {

    const [hideExpire, setHideExpire] = useState(false);

    const currentPath = window.location.href;

    function addQuery(key, value) {
        router.get(
            currentPath,
            { [key]: value },
            { preserveState: true }
        );
    }

    return (
        <>

            <section className="table-container">

                <table className="responsive-table">
                    <thead>
                        <tr>
                            <th>آیدی</th>
                            <th>نام</th>
                            <th>شماره موبایل</th>
                            <th>نقش</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map((item) => (

                            <tr key={item.id} >
                                <td>{item.id}</td>
                                <td>{item.mobile}</td>
                                <td>{item.full_name}</td>
                                <td>
                                    {item.roles.map((role, index) => (
                                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                            {role}
                                        </span>
                                    ))}
                                </td>

                                <td className="flex gap-2 justify-center">

                                    <Link
                                        href={`/user/${item.id}/edit`}
                                        className="ml-2"
                                    >
                                        <FiEdit size={24} />
                                    </Link>

                                    {item.is_active === 1 && <CiSquareCheck size={27} />}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination links={users.links} />
            </section>

        </>
    )
}

Index.layout = page => <DashboardLayout children={page} h1={page.props.h1} />

export default Index;