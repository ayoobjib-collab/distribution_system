import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { formatAmount } from '@/functions/helper.js';
import Quantity from '@/BaseComponents/Quantity';
import ModalBb from "@/BaseComponents/ModalBb";
import ImgSlider from './ImgSlider';
import { getInvoiceProducts, saveInvoiceProducts, getInvoiceProduct } from '@/functions/storageInvoiceProducts.js';

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
                تایید
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

                {
                    (productImgs?.length > 0) &&
                    <ImgSlider imgs={productImgs} />
                }

                <div className="mp-content">
                    <h3>
                        {product?.name}
                    </h3>

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
                    max={product?.stock}
                />

            </div>

        </ModalBb>
    );
}

export default ModalAddToInvoice;
