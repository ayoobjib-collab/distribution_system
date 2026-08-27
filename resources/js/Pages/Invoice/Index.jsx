import DashboardLayout from "@/Layouts/Dashboard/Layout"
import Pagination from "@/BaseComponents/Pagination"

import { formatAmount } from '@/functions/helper.js';
import { Link, usePage } from "@inertiajs/react";

import FormField from "@/BaseComponents/FormField";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

import { LiaTrashAlt } from "react-icons/lia";
import { CiSquareCheck } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { GrCompliance } from "react-icons/gr";
import { LiaSmsSolid } from "react-icons/lia";

import { toast } from 'react-toastify';

function Index({ invoices }) {

    const { isAdmin, msg } = usePage().props;

    useEffect(() => {
        if (msg.status)
            toast.success(msg.text);
        else
            toast.error(msg.text);
    }, [msg]);

    const [hideExpire, setHideExpire] = useState(false);

    const currentPath = window.location.href;

    function addQuery(key, value) {
        router.get(
            currentPath,
            { [key]: value },
            { preserveState: true }
        );
    }

    function deleteItem($itemId) {
        if (confirm('آیا از حذف فاکتور اطمینان دارید؟'))
            router.delete('/invoice/' + $itemId);
    }

    function sendSms($itemId) {
        if (confirm('پیامکی حاوی لینک پیش فاکتور برای مشتری ارسال خواهد شد؟'))
            router.post(`/invoice/${$itemId}/send-invoice`);
    }

    function completeStatus($itemId) {
        if (confirm('فاکتور کامل شده؟'))
            router.patch(`/invoice/${$itemId}/status`, {
                status: 'complete',
            });
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
                            <th>وضعیت</th>
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

                                <td className={item.status}>
                                    {item.status_label}
                                </td>

                                <td className="flex gap-2 justify-center">

                                    <Link
                                        href={`/invoice/${item.id}/edit`}
                                        className="ml-2"
                                    >
                                        <AiOutlineEdit size={24} />
                                    </Link>

                                    {/* <Link
                                        href={`/invoice/${item.id}`}
                                        className="ml-2"
                                    >
                                        <FaRegEye size={24} />
                                    </Link> */}

                                    <span
                                        onClick={() => deleteItem(item.id)}
                                        className="ml-2"
                                    >
                                        <FaRegTrashAlt size={24} fill="inherit" />
                                    </span>

                                    <span
                                        onClick={() => sendSms(item.id)}
                                        className="ml-2"
                                    >
                                        <LiaSmsSolid size={24} fill="inherit" />
                                    </span>

                                    {
                                        isAdmin &&
                                        <span
                                            onClick={() => completeStatus(item.id)}
                                            className="ml-2"
                                        >
                                            <GrCompliance size={24} />
                                        </span>
                                    }

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