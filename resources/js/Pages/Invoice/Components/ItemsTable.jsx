import { formatAmount } from "@/functions/helper";
import { useCallback, useState } from 'react';
import ModalEditItem from './ModalEditItem';
import { memo } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";

function ItemsTable({ readOnly = false, items, subtotal, updateItem, removeItem }) {

    const [editIsOpen, setEditOpen] = useState(false);
    const [itemForUpdate, setItemForUpdate] = useState({});

    function modalEditItem(item) {
        setEditOpen(true);
        setItemForUpdate(item);
    }

    function getItemTotal(item) {
        return Math.round(
            item.unit_price *
            (1 - item.discount / 100) *
            item.quantity
        );
    }

    return (
        <>

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
                    {items &&
                        items.map((item) => (

                            <tr key={item.id} >

                                <td>{item.name || item.product.name}</td>

                                <td>{formatAmount((item.unit_price ?? ''))}</td>

                                <td>{item.quantity}</td>
                                <td>{item.discount}</td>

                                <td className='total'>
                                    {
                                        formatAmount(getItemTotal(item))
                                    }
                                </td>

                                {/* show action link if only is in edit mode */}
                                {!readOnly &&
                                    <td className="flex gap-2 justify-center">

                                        <span className='icon-wrap ml-2' onClick={() => modalEditItem(item)}>
                                            <AiOutlineEdit size={24} />
                                        </span>

                                        {
                                            removeItem !== undefined &&
                                            <span className='icon-wrap ml-2' onClick={() => removeItem(item.id)}>
                                                <FaRegTrashAlt size={24} fill="inherit" />
                                            </span>
                                        }

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
            </table >

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