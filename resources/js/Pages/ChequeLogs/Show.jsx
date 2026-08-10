import DashboardLayout from "@/Layouts/Dashboard/Layout"

function Show() {
    return (
        <>
            <section>
               تاریخچه چک
            </section>
        </>
    )
}

Show.layout = page => <DashboardLayout children={page} h1={page.props.h1} />

export default Show;