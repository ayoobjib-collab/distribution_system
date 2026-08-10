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


function Index({ products }) {

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
                            <th>موجودی</th>
                            <th>واحد</th>
                            <th>قیمت</th>
                            <th>توضیحات</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.data.map((item) => (

                            <tr key={item.id} >
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.stock}</td>
                                <td>{item.unit}</td>
                                <td>{formatAmount(item.sale_price)}</td>
                                <td>{item.description}</td>

                                <td className="flex gap-2 justify-center">

                                    <Link
                                        href={`/product/${item.id}/edit`}
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

                <Pagination links={products.links} />
            </section>

        </>
    )
}

Index.layout = page => <DashboardLayout children={page} h1={page.props.h1} />

export default Index;