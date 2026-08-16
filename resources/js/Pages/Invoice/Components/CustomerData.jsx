import { formatAmount } from "@/functions/helper";
import { Link } from "@inertiajs/react";
import { getUrl } from "@/functions/helper";
import { FiEye } from "react-icons/fi";

function CustomerData({ customer_id, customer_name, customer_number, customer_balance }) {

    return (
        <div className='flex ic-data-wrap'>
            <div className='flex flex-col'>
                <span>نام</span>
                <b>{customer_name}</b>
            </div>
            <div className='flex flex-col'>
                <span>شماره تماس</span>
                <b>{customer_number}</b>
            </div>

            <div className='flex flex-col'>
                <span>مانده:</span>
                {
                     customer_id &&
                    <Link href={getUrl(`/customer/${customer_id}/transactions`)}>
                        <FiEye />
                    </Link>
                }
            </div>
        </div>
    )
}

export default CustomerData;