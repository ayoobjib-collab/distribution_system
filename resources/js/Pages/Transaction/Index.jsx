import DashboardLayout from "@/Layouts/Dashboard/Layout"
import Pagination from "@/BaseComponents/Pagination"
import { Link } from "@inertiajs/react"
import { formatAmount } from '@/functions/helper.js';
import ModalEditTransaction from "./Components/ModalEditTransaction";
import { LiaTrashAlt } from "react-icons/lia";
import { useEffect } from "react";
import { toast } from 'react-toastify';

function Index({ h1, transactions, clientId, msg, financialSummary }) {

    useEffect(() => {
        if (msg)
            toast.success(msg);
    });

    const outbound = financialSummary.outbound;

    const inbound = financialSummary.inbound;

    const balance = financialSummary.balance;

    return (
        <>
            <section className="table-container">

                <table className="responsive-table">
                    <thead>
                        <tr>
                            <th>پرداخت کننده</th>
                            <th>دریافت کننده</th>
                            <th>چک</th>
                            <th>نوع</th>
                            <th>تاریخ ثبت</th>
                            <th>مبلغ (ریال)</th>
                            <th>توضیحات</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.data.map((item) => (
                            <tr key={item.id}>

                                <td>
                                    {item.payer.name}
                                </td>
                                <td>
                                    {item.receiver.name}
                                </td>
                                <td>
                                    <Link href={`/cheque?id=${item.cheque_id}`}>
                                        {item.cheque_id}
                                    </Link>
                                </td>
                                <td>
                                    {item.type_label}
                                </td>
                                <td>
                                    {item.created_at}
                                </td>
                                <td>
                                    {formatAmount(item.price)}
                                </td>
                                <td>
                                    {item.comment}
                                </td>
                                <td>
                                    <ModalEditTransaction
                                        id={item.id}
                                        price={item.price}
                                        type={item.type}
                                        type_label={item.type_label}
                                        comment={item.comment}
                                    />
                                    <Link
                                        href={`/transaction/${item.id}`}
                                        method="delete"
                                        className="not-btn ml-2"
                                    >
                                        <LiaTrashAlt size={20} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination links={transactions.links} />

            </section>

            {clientId &&
                <section>
                    <div className="transaction-summary">
                        <div>
                            <strong>جمع پرداختی:</strong> {formatAmount(outbound)}
                        </div>

                        <div>
                            <strong>جمع دریافتی:</strong> {formatAmount(inbound)}
                        </div>

                        <div>
                            <strong>مانده:</strong> {formatAmount(balance)}
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

Index.layout = page => <DashboardLayout children={page} h1={page.props.h1} />

export default Index;