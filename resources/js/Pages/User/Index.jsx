import DashboardLayout from "@/Layouts/Dashboard/Layout"
import Pagination from "@/BaseComponents/Pagination"
import { Link } from "@inertiajs/react";
import { CiSquareCheck } from "react-icons/ci";
import { AiOutlineEdit } from "react-icons/ai";
import Tooltip from "@/BaseComponents/Tooltip";

function Index({ users }) {

    const currentPath = window.location.href;

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
                            <th>فعال</th>
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

                                <td>

                                    {item.is_active === 1 ?
                                        <Tooltip text="فعال است">
                                            <CiSquareCheck size={27} />
                                        </Tooltip>
                                        :
                                        'خیر'
                                    }

                                </td>

                                <td>

                                    <Tooltip text="ویرایش کاربر">
                                        <Link
                                            href={`/user/${item.id}/edit`}
                                            className="ml-2"
                                        >
                                            <AiOutlineEdit size={24} />
                                        </Link>
                                    </Tooltip>
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

Index.layout = page => <DashboardLayout children={page} />

export default Index;