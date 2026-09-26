import DashboardLayout from "@/Layouts/Dashboard/Layout";
import Pagination from "@/BaseComponents/Pagination";
import { usePage } from "@inertiajs/react";
import {formatAmount} from "@/functions/helper.js"

function Index({ h1, transactions }) {

    const { isAdmin } = usePage().props;

    return (
        <>
            <section className="table-container">

                <table className="responsive-table">

                    <thead>
                        <tr>
                            <th>حساب</th>
                            <th>ثبت کننده</th>
                            <th>نوع</th>
                            <th>وضعیت</th>
                            <th>مبلغ</th>
                            <th>شماره مرجع</th>
                            <th>تاریخ سررسید</th>
                            <th>توضیحات</th>

                            {isAdmin && (
                                <th>تأیید توسط</th>
                            )}

                            {isAdmin && (
                                <th>عملیات</th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.data.map((item) => (
                            <tr
                                key={item.id}
                                data-id={item.id}
                            >

                                <td>
                                    {item.account?.name ?? '-'}
                                </td>

                                <td>
                                    {item.user?.full_name ?? '-'}
                                </td>

                                <td>
                                    {item.type}
                                </td>

                                <td>
                                    {item.status}
                                </td>

                                <td>
                                    {formatAmount(item.amount)}
                                </td>

                                <td>
                                    {item.reference_no ?? '-'}
                                </td>

                                <td>
                                    {item.due_date_fa ?? '-'}
                                </td>

                                <td>
                                    {item.description ?? '-'}
                                </td>

                                {isAdmin && (
                                    <td>
                                        {item.approved_by
                                            ? item.approvedBy?.name ?? '-'
                                            : '-'
                                        }
                                    </td>
                                )}

                                {isAdmin && (
                                    <td>
                                        {/* عملیات */}
                                    </td>
                                )}

                            </tr>
                        ))}
                    </tbody>

                </table>

                <Pagination links={transactions.links} />

            </section>
        </>
    );
}

Index.layout = page => (
    <DashboardLayout
        children={page}
        h1={page.props.h1}
    />
);

export default Index;