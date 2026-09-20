import DashboardLayout from "@/Layouts/Dashboard/Layout"
import ItemsTable from './Components/ItemsTable';

function ShowInvoice({ invoice }) {

    return (
        <>
            <section className="table-container">
                <div className="flex gap-2">
                    <span>
                        نام فروشگاه:
                    </span>
                    <b>
                        {invoice.account.name}
                    </b>
                </div>

                <div className="flex gap-2">
                    <span>
                        کاربر ثبت کننده:
                    </span>
                    <b>
                        {invoice.user.full_name}
                    </b>
                </div>
            </section>
            
            <section className='invoice-items table-container'>

                <ItemsTable
                    readOnly={true}
                    items={invoice.items}
                    subtotal={invoice.subtotal}
                    updateItem
                    removeItem
                />
            </section >
        </>
    )
}

ShowInvoice.layout = page => <DashboardLayout children={page} h1='مشاهده فاکتور' />

export default ShowInvoice;