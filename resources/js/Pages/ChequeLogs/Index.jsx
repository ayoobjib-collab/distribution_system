import DashboardLayout from "@/Layouts/Dashboard/Layout"
import Pagination from "@/BaseComponents/Pagination"
import { Link } from "@inertiajs/react"

function Index() {
    return (
        <>
            <section className="table-container">
                لاگ چکها
            </section>
        </>
    )
}

Index.layout = page => <DashboardLayout children={page} h1='لیست کاربران' />

export default Index;