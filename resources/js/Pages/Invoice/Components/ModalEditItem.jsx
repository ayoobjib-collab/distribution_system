import ModalBb from "@/BaseComponents/ModalBb";
import FormField from "@/BaseComponents/FormField";
import { MdFileDownloadDone } from "react-icons/md";
import { useState, useEffect } from "react";

// import { memo } from "react";

function ModalEditItem({ isOpen, setIsOpen, item, updateItem }) {

    // if (!isOpen) return '';

    const [copiedItem, setcopiedItem] = useState({
        quantity: '1',
        discount: '0'
    });


    let productName = item.name || item?.product?.name;
    let productStock = item.stock || item?.product?.stock;

    useEffect(() => {
        if (item) {
            setcopiedItem({ ...item });
        }
    }, [item]);


    function handleSave() {
        updateItem(item.id, 'discount', copiedItem.discount);
        updateItem(item.id, 'quantity', copiedItem.quantity);
        setIsOpen(false);
    }


    function addFormData(e) {
        const { name, value } = e.target;
        let v = value;
        if (name === 'quantity') {
            v = Math.min(v, (item.stock || item.product.stock))
        }
        setcopiedItem(prev => {
            return {
                ...prev,
                [name]: v
            };
        });
    }

    return (

        <ModalBb
            head={`ویرایش ${productName}`}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
        >

            <FormField
                name='quantity'
                label={`تعداد (حداکثر ${productStock} )`}
                onChange={addFormData}
                value={copiedItem.quantity ?? ''}
                isRequired={true}
                type="tel"
                errors
            />

            <FormField
                name='discount'
                label='درصد تخفیف'
                value={copiedItem.discount ?? ''}
                onChange={addFormData}
                type="tel"
                errors
            />

            <div className="mob-fix">
                <button onClick={handleSave}>
                    <MdFileDownloadDone />
                    <span>
                        تایید تغییرات
                    </span>
                </button>
            </div>

        </ModalBb>
    )
}

export default ModalEditItem;