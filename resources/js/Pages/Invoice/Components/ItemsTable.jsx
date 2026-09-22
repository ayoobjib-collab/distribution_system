import { memo, useState } from "react";

import { formatAmount } from "@/functions/helper";
import ModalEditItem from './ModalEditItem';
import MobItemsTable from './MobItemsTable';
import useIsMobile from '../Hooks/useIsMobile';
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import Tooltip from '@/BaseComponents/Tooltip';

function ItemsTable({ readOnly = false, items, subtotal, updateItem, removeItem }) {

    const [editIsOpen, setEditOpen] = useState(false);
    const [itemForUpdate, setItemForUpdate] = useState(null);

    const isMobile = useIsMobile();

    function modalEditItem(item) {
        setEditOpen(true);
        setItemForUpdate(item);
    }

    function closeEditModal() {
        setEditOpen(false);
        setItemForUpdate(null);
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
            {
                isMobile ?
                    <MobItemsTable
                        items={items}
                        readOnly={readOnly}
                        removeItem={removeItem}
                        modalEditItem={modalEditItem}
                        getItemTotal={getItemTotal}
                        subtotal={subtotal}
                    />
                    :
                    <table className="responsive-table desk">
                        <thead>
                            <tr>
                                <th>ر</th>
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
                                items.map((item, index) => (

                                    <tr key={item.id} >
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td data-label="نام">
                                            {item.name ?? item.product.name ?? ''}
                                        </td>

                                        <td data-label="قیمت فروش">
                                            {formatAmount(item.unit_price ?? '')}
                                        </td>

                                        <td data-label="تعداد">
                                            {item.quantity}
                                        </td>

                                        <td data-label="درصد تخفیف">
                                            {item.discount}
                                        </td>

                                        <td data-label="جمع با تخفیف" className="total">
                                            {formatAmount(getItemTotal(item))}
                                        </td>

                                        {!readOnly && (
                                            <td data-label="عملیات" className="flex gap-2 justify-center">

                                                <Tooltip text="ویرایش">
                                                    <span
                                                        className="icon-wrap ml-2"
                                                        onClick={() => modalEditItem(item)}
                                                    >
                                                        <AiOutlineEdit size={23} />
                                                    </span>
                                                </Tooltip>


                                                {removeItem !== undefined && (
                                                    <Tooltip text="حذف">
                                                        <span
                                                            className="icon-wrap ml-2"
                                                            onClick={() => removeItem(item.id)}
                                                        >
                                                            <FaRegTrashAlt size={20} fill="inherit" />
                                                        </span>
                                                    </Tooltip>
                                                )}

                                            </td>
                                        )}

                                    </tr>
                                ))}

                            <tr>
                                <td></td>
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
            }

            {itemForUpdate && (
                <ModalEditItem
                    isOpen={editIsOpen}
                    setIsOpen={closeEditModal}
                    item={itemForUpdate}
                    updateItem={updateItem}
                />
            )}
        </>
    )
}

export default memo(ItemsTable);