import { useState, useEffect, memo } from "react";
import Quantity from '@/BaseComponents/Quantity';
import ModalBb from '@/BaseComponents/ModalBb';

const ModalEditItem = memo(({ isOpen, setIsOpen, item, updateItem }) => {

    const [copiedItem, setCopiedItem] = useState({
        quantity: item.quantity ?? '1',
        discount: item.discount ?? '0',
    });

    // Product information
    const productName = item?.name ?? item?.product?.name ?? '';
    const productStock = item?.stock ?? item?.product?.stock ?? 0;

    // Update local form
    function addFormData(name, value) {
        setCopiedItem(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    // Save changes
    function handleSave() {

        if (!item) return;

        updateItem(
            item.id,
            'quantity',
            copiedItem.quantity
        );

        updateItem(
            item.id,
            'discount',
            copiedItem.discount
        );

        setIsOpen(false);
    }

    // Don't render without an item
    if (!item) return null;

    return (

        <ModalBb
            head={`ویرایش ${productName}`}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
        >

            <Quantity
                label={`تعداد (حداکثر ${productStock} )`}
                value={copiedItem.quantity ?? ''}
                onChange={(value) => addFormData('quantity', value)}
                max={productStock}
            />

            <Quantity
                label='درصد تخفیف'
                value={copiedItem.discount ?? ''}
                onChange={(value) => addFormData('discount', value)}
                max={100}
            />

            <div className="mob-fix">
                <button onClick={handleSave}>
                    <span>
                        تایید تغییرات
                    </span>
                </button>
            </div>

        </ModalBb>
    )
}
); //end memo

export default ModalEditItem;