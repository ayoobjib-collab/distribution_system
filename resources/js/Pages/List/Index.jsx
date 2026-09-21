import { useState } from "react";
import DashboardLayout from "@/Layouts/Dashboard/Layout";

import '@/../css/page/list-index.css';
import { IoAddCircleOutline } from "react-icons/io5";

import ProductCart from "./Components/ProductCart";
import ModalAddToInvoice from "./Components/ModalAddToInvoice";
import LinkToInvoice from "./Components/LinkToInvoice";

function ListIndex({ cats, products }) {

    const [selectedProduct, setSelectedProduct] = useState(null);

    function showMoalAdd(p) {
        setSelectedProduct(p);
    }

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
                {products.data.map((p) => (
                    <ProductCart
                        key={p.id}
                        product={p}
                        showMoalAdd={() => showMoalAdd(p)}
                    />
                ))}
            </div>

            {
                selectedProduct !== null ?

                    <ModalAddToInvoice
                        product={selectedProduct}
                        childClosed={() => setSelectedProduct(null)}
                        open={selectedProduct !== null}
                    />
                    :
                    <LinkToInvoice />
            }


            <div style={{ display: "none" }}>
                <IoAddCircleOutline size={40} color="red" id='addToInvoice' />
            </div>

        </section>
    )
}

ListIndex.layout = page => <DashboardLayout children={page} h1="لیست محصولات و تعداد موجودی" />

export default ListIndex;