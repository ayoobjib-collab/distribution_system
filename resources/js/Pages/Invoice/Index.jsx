import DashboardLayout from "@/Layouts/Dashboard/Layout"
import Pagination from "@/BaseComponents/Pagination"

import { formatAmount } from '@/functions/helper.js';
import { Link, usePage } from "@inertiajs/react";

import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { GrCompliance } from "react-icons/gr";
import { LiaSmsSolid } from "react-icons/lia";

import { toast } from 'react-toastify';
import Tooltip from "@/BaseComponents/Tooltip";

const currentPath = window.location.href;

function Index({ invoices }) {

    const { isAdmin } = usePage().props;
    const [hideExpire, setHideExpire] = useState(false);

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
                            <th>تراکنش‌ها</th>
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

                                <td d={item.transactions.length}>
                                    {
                                        item.transactions?.length > 0 &&

                                        <Tooltip text="تراکنش‌های فاکتور">
                                            <Link
                                                href={`/transaction/?invoiceId=${item.id}`}
                                                className="ml-2"
                                            >
                                                <AiOutlineEdit size={22} />
                                            </Link>
                                        </Tooltip>
                                    }

                                </td>

                                <td className="flex gap-2 justify-center">

                                    <Tooltip text="ویرایش">
                                        <Link
                                            href={`/invoice/${item.id}/edit`}
                                            className="ml-2"
                                        >
                                            <AiOutlineEdit size={22} />
                                        </Link>
                                    </Tooltip>

                                    <Tooltip text="حذف">
                                        <span
                                            onClick={() => deleteItem(item.id)}
                                            className="ml-2"
                                        >
                                            <FaRegTrashAlt size={19} fill="inherit" />
                                        </span>
                                    </Tooltip>

                                    <Tooltip text="ارسال پیامک">
                                        <span
                                            onClick={() => sendSms(item.id)}
                                            className="ml-2"
                                        >
                                            <LiaSmsSolid size={22} fill="inherit" />
                                        </span>
                                    </Tooltip>

                                    {
                                        isAdmin &&
                                        <Tooltip text="کامل کردن فاکتور">
                                            <span
                                                onClick={() => completeStatus(item.id)}
                                                className="ml-2"
                                            >
                                                <GrCompliance size={19} />
                                            </span>
                                        </Tooltip>
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