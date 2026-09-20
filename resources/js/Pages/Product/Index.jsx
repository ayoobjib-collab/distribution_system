import DashboardLayout from "@/Layouts/Dashboard/Layout"
import Pagination from "@/BaseComponents/Pagination"

import { formatAmount } from '@/functions/helper.js';
import { Link, usePage } from "@inertiajs/react";

import { router } from "@inertiajs/react";

import { AiOutlineEdit } from "react-icons/ai";
import { CiSquareCheck } from "react-icons/ci";

import Tooltip from "@/BaseComponents/Tooltip"


function Index({ products }) {

    const { isAdmin } = usePage().props;

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
                            <th>تصویر</th>
                            <th>نام</th>
                            <th>موجودی</th>
                            <th>واحد</th>
                            <th>دسته</th>
                            <th>قیمت</th>
                            <th>توضیحات</th>
                            {
                                isAdmin &&
                                <th>عملیات</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {products.data.map((item) => {

                            const src = item.image_urls?.[0]?.small ?? '';
                            const cats = item.categories.map((c) => c.name).join(', ');

                            return (
                                <tr key={item.id} data-id={item.id}>

                                    <td className="img">
                                        {src && (
                                            <img
                                                src={src}
                                                alt={item.name}
                                            />
                                        )}
                                    </td>

                                    <td>{item.name}</td>
                                    <td>{item.stock}</td>
                                    <td>{item.unit}</td>
                                    <td>{cats}</td>
                                    <td>{formatAmount(item.sale_price)}</td>
                                    <td>{item.description}</td>

                                    {isAdmin && (

                                        <td className="flex gap-2 justify-center">

                                            <Tooltip text="ویرایش">
                                                <Link
                                                    href={`/product/${item.id}/edit`}
                                                    className="ml-2"
                                                >
                                                    <AiOutlineEdit size={24} />
                                                </Link>
                                            </Tooltip>


                                            {item.is_active === 1 && (
                                                <Tooltip text="فعال است">
                                                    <CiSquareCheck size={27} />
                                                </Tooltip>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <Pagination links={products.links} />
            </section >

        </>
    )
}

Index.layout = page => <DashboardLayout children={page} h1="لیست محصولات و تعداد موجودی" />

export default Index;