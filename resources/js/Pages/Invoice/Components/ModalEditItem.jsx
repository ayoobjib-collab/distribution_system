import { useState, memo, useCallback } from "react";
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
    const updateItemData = useCallback((name, value) => {
        setCopiedItem(prev => ({
            ...prev,
            [name]: value,
        }));
    }, []);

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

    const modalFooter = (
        <button onClick={handleSave}>
            <span>
                تایید تغییرات
            </span>
        </button>
    );

    const closeModal = useCallback(() => setIsOpen(false), []);

    return (

        <ModalBb
            head={`ویرایش ${productName}`}
            isOpen={isOpen}
            onClose={closeModal}
            footer={modalFooter}
        >
            <div className="flex flex-col gap-8">

                <Quantity
                    name='quantity'
                    label={`تعداد (حداکثر ${productStock} )`}
                    value={copiedItem.quantity ?? ''}
                    onChange={updateItemData}
                    max={productStock}
                />

                <Quantity
                    name='discount'
                    label='درصد تخفیف'
                    value={copiedItem.discount ?? ''}
                    onChange={updateItemData}
                    max={100}
                />

            </div>

        </ModalBb>
    )
}
); //end memo

export default ModalEditItem;