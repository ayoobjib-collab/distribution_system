import DashboardLayout from "@/Layouts/Dashboard/Layout"

function Show() {
    return (
        <>
            <section>
                دریافت اطلاعات یک کاربر
                لیست چکهای یک کاربر
            </section>
        </>
    )
}

Show.layout = page => <DashboardLayout children={page} h1={page.props.h1} />

export default Show;