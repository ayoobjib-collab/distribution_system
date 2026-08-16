import { FaTrashCan } from 'react-icons/fa6';
import { formatAmount } from "@/functions/helper";
import { useCallback, useState } from 'react';
import { MdEdit } from "react-icons/md";
import ModalEditItem from './ModalEditItem';
import { memo } from "react";

function ItemsTable({ readOnly = false, items, subtotal, updateItem, removeItem }) {

    const [editIsOpen, setEditOpen] = useState(false);
    const [itemForUpdate, setItemForUpdate] = useState({});

    function modalEditItem(item) {
        setEditOpen(true);
        setItemForUpdate(item);
    }

    function getItemTotal(item) {
        return (item.unit_price * (1 - (item.discount / 100)) * item.quantity);
    }

    return (
        <>
            <div className="flex flex-col gap2">
                <h4>اقلام فاکتور</h4>
            </div>

            <table className="responsive-table">
                <thead>
                    <tr>
                        <th>نام</th>
                        <th>قیمت فروش</th>
                        <th>تعداد</th>
                        <th>درصد تخفیف</th>
                        <th>جمع با تخفیف</th>

                        {!readOnly &&
                            <th>عملیات</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>

                            <td>{item.name || item.product.name}</td>

                            <td>{formatAmount((item.sale_price ?? item.unit_price))}</td>

                            <td>{item.quantity}</td>
                            <td>{item.discount}</td>

                            <td className='total'>
                                {
                                    formatAmount(getItemTotal(item))
                                }
                            </td>

                            {/* show action link if only is in edit mode */}
                            {!readOnly &&
                                <td className='flex gap-2 justify-center '>
                                    {
                                        removeItem !== undefined &&
                                        <span className='icon-wrap' onClick={() => removeItem(item.id)}>
                                            <FaTrashCan color="red" />
                                        </span>
                                    }
                                    <span className='icon-wrap' onClick={() => modalEditItem(item)}>
                                        <MdEdit color="green" size={20} />
                                    </span>
                                </td>
                            }

                        </tr>
                    ))}

                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <b>
                                جمع کل:
                            </b>
                            <b>
                                {formatAmount(subtotal)}
                            </b>
                        </td>

                        {!readOnly &&
                            <td></td>
                        }

                    </tr>
                </tbody>
            </table>

            <ModalEditItem
                isOpen={editIsOpen}
                setIsOpen={setEditOpen}
                item={itemForUpdate}
                updateItem={updateItem}
            />
        </>
    )
}

export default memo(ItemsTable);