import { useState, useCallback } from "react";
import DashboardLayout from "@/Layouts/Dashboard/Layout";

import '@/../css/page/list-index.css';
import { IoAddCircleOutline } from "react-icons/io5";

import ProductCart from "./Components/ProductCart";
import ModalAddToInvoice from "./Components/ModalAddToInvoice";
import LinkToInvoice from "./Components/LinkToInvoice";

import { getInvoiceProducts } from '@/functions/storageInvoiceProducts.js';

function ListIndex({ cats, products }) {

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [addedProducts, setAddedProducts] = useState(() =>
        getInvoiceProducts().map(item => item.product_id)
    );

    function showMoalAdd(p) {
        setSelectedProduct(p);
    }

    const childClosed = useCallback(() => {
        setSelectedProduct(null);

        /**
         * Update active products list
         */
        const products = getInvoiceProducts();
        setAddedProducts(
            products.map(item => item.product_id)
        );

    }, []);

    return (
        <section>
            <div className="cats flex gap-1 overflow-auto ">
                {
                    cats.map((c) => (
                        <div cat-id={c.id} key={c.id}>
                            {c.name}
                        </div>
                    ))
                }
            </div>
            <div className="product-grid">

                {products.data.map((p) => {
                    return (
                        <ProductCart
                            key={p.id}
                            product={p}
                            showMoalAdd={showMoalAdd}
                            added={addedProducts.includes(p.id)}
                        />
                    )
                })}
            </div>

            {
                selectedProduct !== null ?
                    <ModalAddToInvoice
                        product={selectedProduct}
                        childClosed={childClosed}
                        open={selectedProduct !== null}
                    />
                    :
                    <LinkToInvoice />
            }


            <div style={{ display: "none" }}>
                <IoAddCircleOutline size={30} id='addToInvoice' />
            </div>

        </section>
    )
}

ListIndex.layout = page => <DashboardLayout children={page} />

export default ListIndex;