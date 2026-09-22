import { formatAmount } from "@/functions/helper";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";

function MobItemsTable({ items, readOnly, removeItem, modalEditItem, getItemTotal, subtotal }) {

    return (

        <div className="mobile-items-list">

            {items.map((item, index) => (
                <div className="mobile-item" key={item.id}>

                    <div className="mobile-item-header">
                        <div className="mobile-item-name">
                            {index + 1 + '- ' + (item.name ?? item.product.name  ?? '') }
                        </div>

                        {!readOnly && (
                            <div className="mobile-item-actions">

                                <span
                                    className="icon-wrap ml-2"
                                    onClick={() => modalEditItem(item)}
                                >
                                    <AiOutlineEdit size={20} />
                                </span>

                                {removeItem !== undefined && (
                                    <span
                                        className="icon-wrap ml-2"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <FaRegTrashAlt size={20} fill="inherit" />
                                    </span>
                                )}

                            </div>
                        )}
                    </div>


                    <div className="mobile-item-details">

                        <div className="mobile-detail">
                            <span>قیمت فروش</span>
                            <strong>
                                {formatAmount(item.unit_price)} ریال
                            </strong>
                        </div>

                        <div className="mobile-detail">
                            <span>تعداد</span>
                            <strong>
                                {item.quantity} عدد
                            </strong>
                        </div>

                        <div className="mobile-detail">
                            <span>تخفیف</span>
                            <strong>
                                {item.discount}٪
                            </strong>
                        </div>

                        <div className="mobile-detail mobile-total">
                            <span>جمع با تخفیف</span>
                            <strong>
                                {formatAmount(getItemTotal(item))} ریال
                            </strong>
                        </div>

                    </div>

                </div>
            ))}

            <div className="subtotal flex gap-8">
                جمع کل فاکتور:
                <b>
                    {formatAmount(subtotal)}
                </b>
            </div>

        </div>
    )
}


export default MobItemsTable;