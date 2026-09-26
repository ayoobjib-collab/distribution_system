import { useState, useEffect } from 'react';
import { ConfigProvider, Button, Drawer } from 'antd';
import { formatAmount } from '@/functions/helper.js';
import Quantity from '@/BaseComponents/Quantity';


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
        existingProduct?.quantity ?? 1
    );

    const [placement, setPlacement] = useState('bottom');

    if (product == null) return null;

    const productImgs = product?.image_urls ?? [];

    const onChange = (e) => {
        setPlacement(e.target.value);
    };

    const onClose = () => {
        childClosed();
    };

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


    function removeProduct() {

        const products = getInvoiceProducts();

        const newProducts = products.filter(
            item => item.product_id !== product.id
        );

        saveInvoiceProducts(newProducts);
        childClosed();
    }


    return (

        <ConfigProvider

            theme={{
                token: {
                    fontFamily: 'inherit',
                },
            }}
        >

            <Drawer
                title="افزودن به فاکتور"
                placement={placement}
                size={500}
                onClose={onClose}
                open={open}
                className='modal-add-to-invoice'

                footer={
                    <button className="ant-btn ant-btn-primary" onClick={addToInvoice}>
                        {btnText}
                    </button>
                }
            >
                <div className="flex flex-col gap-8">

                    <div className="ma-img-wrap flex overflow-auto gap-1">
                        {
                            productImgs.map((img, index) => (
                                <img src={img.small} loading="lazy" key={index} />
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
                        label="درصد تخفیف"
                        value={discount}
                        onChange={setDiscount}
                    />

                    <Quantity
                        label="تعداد"
                        value={quantity}
                        onChange={setQuantity}
                        onRemove={removeProduct}
                        min={1}
                    />
                </div>
            </Drawer >

        </ConfigProvider>
    );
}

export default ModalAddToInvoice;
