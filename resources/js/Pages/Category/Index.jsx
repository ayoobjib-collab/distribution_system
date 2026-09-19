import DashboardLayout from "@/Layouts/Dashboard/Layout";
import Pagination from "@/BaseComponents/Pagination";
import { Link, usePage } from "@inertiajs/react";
import { AiOutlineEdit } from "react-icons/ai";
import Tooltip from "@/BaseComponents/Tooltip";

function Index({ categories }) {

    const { isAdmin } = usePage().props;

    return (
        <>
            <section className="table-container">

                <table className="responsive-table">

                    <thead>
                        <tr>
                            <th>آیدی</th>
                            <th>نام دسته‌بندی</th>
                            <th>نامک</th>
                            <th>تاریخ ایجاد</th>

                            {
                                isAdmin &&
                                <th>عملیات</th>
                            }
                        </tr>
                    </thead>


                    <tbody>

                        {categories.data.map((item) => (

                            <tr key={item.id}>

                                <td>
                                    {item.id}
                                </td>

                                <td>
                                    {item.name}
                                </td>

                                <td>
                                    {item.slug}
                                </td>

                                <td>
                                    {item.created_at}
                                </td>

                                <td className="flex gap-2 justify-center">

                                    <Tooltip
                                        text="ویرایش"
                                        className="ml-2"
                                    >
                                        <Link
                                            href={`/category/${item.id}/edit`}
                                        >
                                            <AiOutlineEdit size={24} />
                                        </Link>

                                    </Tooltip>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>


                <Pagination links={categories.links} />

            </section>
        </>
    );
}

Index.layout = page => (
    <DashboardLayout
        children={page}
        h1="لیست دسته‌بندی‌ها"
    />
);

export default Index;