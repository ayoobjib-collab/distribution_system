import { useState, useEffect, useCallback } from 'react';
import { formatAmount } from '@/functions/helper.js';
import Quantity from '@/BaseComponents/Quantity';
import ModalBb from "@/BaseComponents/ModalBb";


/**
 * Static functions
 */
function getInvoiceProducts(key = 'invoice_products') {
    return JSON.parse(
        localStorage.getItem(key) || '[]'
    );
}

function saveInvoiceProducts(
    products,
    key = 'invoice_products'
) {
    localStorage.setItem(
        key,
        JSON.stringify(products)
    );
}

function getInvoiceProduct(
    productId,
    key = 'invoice_products'
) {
    const products = getInvoiceProducts(key);

    return products.find(
        item => item.product_id === productId
    );
}

/**
 * Component modalAddToInvoice
 */
function ModalAddToInvoice({
    product,
    open,
    childClosed
}) {

    const existingProduct = getInvoiceProduct(product?.id);
    const btnText = existingProduct !== undefined ? 'ویرایش محصول' : 'افزودن به فاکتور';

    const [discount, setDiscount] = useState(
        existingProduct?.discount ?? 0
    );

    const [quantity, setQuantity] = useState(
        existingProduct?.quantity ?? product.stock ?? 1
    );

    if (product == null) return null;

    const productImgs = product?.image_urls ?? [];

    function addToInvoice() {

        const products = getInvoiceProducts();

        const newProduct = {
            product_id: product.id,
            quantity: quantity,
            discount: discount
        };

        const index = products.findIndex(
            item => item.product_id === product.id
        );

        if (index !== -1) {
            // update
            products[index] = {
                ...products[index],
                quantity: quantity,
                discount: discount
            };
        } else {
            // add
            products.push(newProduct);
        }

        saveInvoiceProducts(products);

        childClosed();
    }

    const removeProduct = useCallback(() => {
        const products = getInvoiceProducts();
        const newProducts = products.filter(
            item => item.product_id !== product.id
        );
        saveInvoiceProducts(newProducts);
        childClosed();
    }, [product, childClosed]);

    const handleChange = useCallback((name, value) => {
        if (name === 'discount')
            setDiscount(value);


        if (name === 'quantity')
            setQuantity(value);

    }, []);

    const modalFooter = (
        <button onClick={addToInvoice}>
            <span>
                تایید محصول
            </span>
        </button>
    );

    return (

        <ModalBb
            id="errors"
            head={btnText}
            isOpen={open}
            onClose={childClosed}
            footer={modalFooter}
        >
            <div className="flex flex-col gap-8">

                <div className="ma-img-wrap flex overflow-auto gap-1">
                    {
                        productImgs.map((img, index) => (
                            <img src={img.medium} loading="lazy" key={index} />
                        ))
                    }
                </div>

                <div className="mp-content">
                    <b>
                        {product?.name}
                    </b>

                    <div className="mp-price">
                        {formatAmount(product?.sale_price)}
                    </div>
                </div>

                <Quantity
                    name='discount'
                    label="درصد تخفیف"
                    value={discount}
                    onChange={handleChange}
                />

                <Quantity
                    name="quantity"
                    label={`تعداد (حداکثر ${product.stock})`}
                    value={quantity}
                    onChange={handleChange}
                    onRemove={removeProduct}
                    min={1}
                    max={product?.stock}
                />

            </div>

        </ModalBb>
    );
}

export default ModalAddToInvoice;
