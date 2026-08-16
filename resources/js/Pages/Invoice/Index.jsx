import DashboardLayout from "@/Layouts/Dashboard/Layout"
import Pagination from "@/BaseComponents/Pagination"

import { formatAmount } from '@/functions/helper.js';
import { FiEdit } from "react-icons/fi";
import { LiaTrashAlt } from "react-icons/lia";
import { Link } from "@inertiajs/react";

import FormField from "@/BaseComponents/FormField";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

import { CiSquareCheck } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";


function Index({ invoices }) {

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
                            <th>کاربر ثبت کننده</th>
                            <th>طرف حساب</th>
                            <th>مبلغ کل</th>
                            <th>توضیحات</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.data.map((item) => (

                            <tr key={item.id} >
                                <td>{item.id}</td>
                                <td>{item.user.full_name}</td>
                                <td>{item.account.name}</td>
                                <td>{formatAmount(item.subtotal)}</td>
                                <td>{item.description}</td>

                                <td className="flex gap-2 justify-center">

                                    <Link
                                        href={`/invoice/${item.id}/edit`}
                                        className="ml-2"
                                    >
                                        <FiEdit size={24} />
                                    </Link>

                                    <Link
                                        href={`/invoice/${item.id}`}
                                        className="ml-2"
                                    >
                                        <FaRegEye size={24} />
                                    </Link>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination links={invoices.links} />
            </section>

        </>
    )
}

Index.layout = page => <DashboardLayout children={page} h1={page.props.h1} />

export default Index;