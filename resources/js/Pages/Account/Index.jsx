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


function Index({ accounts }) {

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
                            <th>نام فروشگاه</th>
                            <th>کاربر ثبت کننده</th>
                            <th>موبایل</th>
                            <th>تلفن</th>
                            <th>سقف اعتبار</th>
                            <th>وضعیت</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>

                    <tbody>
                        {accounts.data.length > 0 ? (
                            accounts.data.map((item) => (
                                <tr key={item.id}>
                                    <td data-label="آیدی">{item.id}</td>

                                    <td data-label="نام فروشگاه">
                                        {item.name}
                                    </td>

                                    <td data-label="نام فروشگاه">
                                        {item.user.full_name}
                                    </td>

                                    <td data-label="موبایل">
                                        {item.mobile || '-'}
                                    </td>

                                    <td data-label="تلفن">
                                        {item.phone || '-'}
                                    </td>

                                    <td data-label="سقف اعتبار">
                                        {formatAmount(item.credit_limit)}
                                    </td>

                                    <td data-label="وضعیت">
                                        <span
                                            className={
                                                item.is_active
                                                    ? 'status status-success'
                                                    : 'status status-danger'
                                            }
                                        >
                                            {item.is_active ? 'فعال' : 'غیرفعال'}
                                        </span>
                                    </td>

                                    <td data-label="عملیات">
                                        <div className="flex items-center gap-2">

                                            <Link
                                                href={`/account/${item.id}/edit`}
                                                className="ml-2"
                                            >
                                                <FiEdit size={24} />
                                            </Link>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">
                                    هیچ حسابی ثبت نشده است.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <Pagination links={accounts.links} />
            </section>

        </>
    )
}

Index.layout = page => <DashboardLayout children={page} h1={page.props.h1} />

export default Index;