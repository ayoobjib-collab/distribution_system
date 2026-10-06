import { Link } from "@inertiajs/react";
import { PiInvoiceBold } from "react-icons/pi";
import { HiMiniChevronLeft } from "react-icons/hi2";
import { getInvoiceProducts } from '@/functions/storageInvoiceProducts.js';

function LinkToInvoice() {

    const products = getInvoiceProducts();

    const count = products.reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0
    );

    return (
        <>
            <div className="link-to-invoice_mob badge-wrap desk-hide">
                <span className="badge">
                    {count}
                </span>
            </div>
            <div className="link-to-invoice flex mob-hide">
                <div className="lt-right flex gap-1 items-center">
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
        </>

    );
}


export default LinkToInvoice;