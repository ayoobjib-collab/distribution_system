import { Link } from "@inertiajs/react";
import { PiInvoiceBold } from "react-icons/pi";
import { HiMiniChevronLeft } from "react-icons/hi2";

function LinkToInvoice() {
    const products = JSON.parse(
        localStorage.getItem('invoice_products') || '[]'
    );

    const count = products.reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0
    );

    return (
        <div className="link-to-invoice flex">
            <div className="lt-right flex gap-1 align-center">
                <PiInvoiceBold />
                <span>
                    {`کالا در فاکتور ${count} عدد`}
                </span>
            </div>
            <div className="lt-left">
                <Link href="/invoice/create">
                    صدور فاکتور
                    <HiMiniChevronLeft />
                </Link>
            </div>
        </div>
    );
}


export default LinkToInvoice;