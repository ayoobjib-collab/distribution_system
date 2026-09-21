import { useState } from 'react';
import { ConfigProvider, Button, Drawer } from 'antd';
import { formatAmount } from '@/functions/helper.js';
import Quantity from './Quantity';

function ModalAddToInvoice({ product, open, childClosed }) {

    if (product == null) return "";

    const [discount, setDiscount] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [placement, setPlacement] = useState('bottom');

    const productImgs = product?.image_urls ?? [];

    const onChange = (e) => {
        setPlacement(e.target.value);
    };

    const onClose = () => {
        childClosed();
    };

    function addToInvoice() {

        const key = 'invoice_products';

        const products = JSON.parse(
            localStorage.getItem(key) || '[]'
        );

        const newProduct = {
            product_id: product.id,
            quantity: quantity,
            discount: discount
        };

        const index = products.findIndex(
            item => item.product_id === product.id
        );

        if (index !== -1) {
            products[index].discount = discount;
        } else {
            products.push(newProduct);
        }

        localStorage.setItem(
            key,
            JSON.stringify(products)
        );

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
                        افزودن به فاکتور
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
                        min={1}
                    />
                </div>
            </Drawer >

        </ConfigProvider>
    );
}

export default ModalAddToInvoice;
