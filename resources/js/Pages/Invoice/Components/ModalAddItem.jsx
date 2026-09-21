import ModalBb from "@/BaseComponents/ModalBb";
import FormField from "@/BaseComponents/FormField";

import { useState } from "react";
import { LuCircleFadingPlus } from "react-icons/lu";
import { MdFileDownloadDone } from "react-icons/md";

import { memo } from "react";


/**
 * Packages
 */
import AsyncSelect from "react-select/async";


function ModalAddItem({ invoiceType, setItems }) {

    const [isOpen, setIsOpen] = useState(false);
    const baseInvoiceItem = {
        id: '',
        product_id: '',
        name: '',
        unit_price: '',
        stock: 0,
        unit: 'کارتن',
        quantity: 1,
        discount: 0
    };
    const [invoiceItem, setInvoiceItem] = useState(baseInvoiceItem);

    function createRandomId() {
        return crypto.randomUUID();
    }

    /**
     * 
     * @param {*} e 
     */
    function addFormData(e) {

        const { name, value } = e.target;

        let v = value;
        if (name === 'quantity') {
            v = Math.min(v, invoiceItem.stock)
        }

        setInvoiceItem(prev => {
            return {
                ...prev,
                [name]: v
            };
        });
    }

    /**
     * Fix inputs by selected product
     * @param {*} selectObject 
     */
    function createBaseObjectBySearchedData(selectObject) {

        let val = selectObject?.value;

        /**
         * Set base from searched data
         */
        setInvoiceItem(prev => {
            return {
                ...prev,
                id: createRandomId(), //create temp random id for each invoice row
                product_id: val,
                name: selectObject.label,
                unit_price: selectObject.unit_price,
                stock: selectObject.stock,
                quantity: Math.min(1, parseInt(selectObject.stock)),
                unit: selectObject.unit
            };
        });
    }

    /**
     * Add new item to inovoice
     */
    function addItemToInvoice() {

        if (
            !invoiceItem.product_id
            || !invoiceItem.quantity
            || !invoiceItem.unit_price
        ) {
            return;
        }

        setItems(prev => {
            let newItems = [...prev];

            newItems.push(invoiceItem);
            return newItems;
        });

        setInvoiceItem(baseInvoiceItem);

        setIsOpen(false);
    }

    const getPorducts = async (inputValue) => {

        if (!inputValue) return [];

        const res = await fetch(
            `/api/v1/products?search=${encodeURIComponent(inputValue)}`
        );

        const data = await res.json();

        //Product sale_price is base price in my invoice

        return data.map(item => ({
            value: item.id,
            label: item.name,
            unit_price: item.sale_price,
            stock: item.stock,
            unit: item.unit,
        }));
    };

    return (
        <div className="modal-add-item">

            <div className="add">
                <button className="secondary" onClick={() => setIsOpen(true)}>
                    <LuCircleFadingPlus />
                    افزودن ردیف
                </button>
            </div>

            <ModalBb
                id="errors"
                head="انتخاب محصول"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <div className="form-group">
                    <AsyncSelect
                        classNamePrefix="react-select"
                        cacheOptions
                        defaultOptions={false}
                        loadOptions={getPorducts}
                        onChange={createBaseObjectBySearchedData}
                        value={invoiceItem.product_id ? {
                            value: invoiceItem.product_id,
                            label: invoiceItem.name
                        } : null}
                        placeholder="نام یا کد محصول ..."
                        noOptionsMessage={() => "موردی یافت نشد"}
                        required
                    />
                </div>

                <FormField
                    name='unit_price'
                    isAmount={true}
                    label={`قیمت محصول برای هر ${invoiceItem.unit}`}
                    value={invoiceItem.unit_price}
                    onChange
                    type="tel"
                    readOnly={true}
                    errors
                />

                <FormField
                    name='quantity'
                    label={`تعداد (حداکثر ${invoiceItem.stock})`}
                    value={invoiceItem.quantity}
                    onChange={addFormData}
                    type="tel"
                    errors
                />

                <FormField
                    name='discount'
                    label='درصد تخفیف'
                    value={invoiceItem.discount}
                    onChange={addFormData}
                    type="tel"
                    errors
                />

                <div className="mob-fix">
                    <button onClick={addItemToInvoice}>
                        <MdFileDownloadDone />
                        <span>
                            تایید محصول
                        </span>
                    </button>
                </div>

            </ModalBb>
        </div>
    )
}

export default memo(ModalAddItem);