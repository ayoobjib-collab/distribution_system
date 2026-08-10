import DashboardLayout from "@/Layouts/Dashboard/Layout"
import Pagination from "@/BaseComponents/Pagination"
import { Link } from "@inertiajs/react"

function Index({ clients, clientCheques }) {
    return (
        <>
            <section className="table-container">
                <table className="responsive-table">
                    <thead>
                        <tr>
                            <th>آیدی</th>
                            <th>نام کاربر </th>
                            <th>شماره کاربر</th>
                            <th>تاریخ ایجاد</th>
                            <th>چکها</th>
                            <th>تراکنشها</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>{item.created_at}</td>
                                <td>
                                    <Link href={`/cheque?client=${item.id}`}>
                                        {item.cheques.length}
                                    </Link>
                                </td>
                                <td>
                                    <Link href={`/transaction?client=${item.id}`}>
                                        مشاهده
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination links={clients.links} />

            </section>
        </>
    )
}

Index.layout = page => <DashboardLayout children={page} h1='لیست کاربران' />

export default Index;