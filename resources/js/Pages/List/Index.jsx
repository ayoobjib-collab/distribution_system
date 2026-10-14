import React, { useState, useCallback, useEffect } from "react";
import { InfiniteScroll, router, Link } from "@inertiajs/react";

import { IoAddCircleOutline } from "react-icons/io5";

import DashboardLayout from "@/Layouts/Dashboard/Layout";
import ProductCart from "./Components/ProductCart";
import ModalAddToInvoice from "./Components/ModalAddToInvoice";
import LinkToInvoice from "./Components/LinkToInvoice";

import { getInvoiceProducts } from '@/functions/storageInvoiceProducts.js';
import '@/../css/page/list-index.css';

const isActive = () => {
    const headings = document.querySelectorAll('.category-devider');

    let activeId = null;

    headings.forEach((heading) => {
        if (heading.getBoundingClientRect().top <= 40) {
            activeId = heading.id.replace('cat', '');
        }
    });

    document.querySelectorAll('[cat-id]').forEach((item) => {
        item.classList.toggle(
            'active',
            item.getAttribute('cat-id') === activeId
        );
    });
};

function ListIndex({ cats, products }) {

    /**
     * Add active class when scroll
     */
    useEffect(() => {
        window.addEventListener('scroll', isActive);

        isActive();

        return () => {
            window.removeEventListener('scroll', isActive);
        };
    }, []);

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

    const scrollToCat = (e) => {
        let id = e.target.getAttribute('cat-id');
        const target = document.getElementById(`cat${id}`);

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
            return;
        }

        router.get(
            '/list',
            { category_id: id },
            {
                preserveState: true,
                preserveScroll: false,
                onFinish: (visit) => {
                    document.querySelector('.cats').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                },
            },
        );
    }

    let currentCategory = null;

    return (
        <section>
            <div className="cats flex gap-1 overflow-auto ">
                <div className="all">
                    <Link href="/list">
                        همه
                    </Link>
                </div>
                {
                    cats.map((c) => (
                        <div cat-id={c.id} key={c.id} onClick={scrollToCat} className="">
                            {c.name}
                        </div>
                    ))
                }
            </div>

            <div className="products-wrapper">
                <InfiniteScroll data="products" className="product-grid" buffer={200}>
                    {

                        products.data.map((p, index) => {

                            /**
                             * Create unique key
                             */
                            const currentPage = Number(products.current_page - 1);
                            const key = index + (currentPage * 15);

                            const categoryChanged = p.category_id !== currentCategory;
                            currentCategory = p.category_id;

                            return (
                                <React.Fragment key={key}>

                                    {categoryChanged &&
                                        <div className="category-devider" id={`cat${currentCategory}`}>
                                            دسته {currentCategory}
                                        </div>
                                    }

                                    <ProductCart
                                        product={p}
                                        showMoalAdd={showMoalAdd}
                                        added={addedProducts.includes(p.id)}
                                    />

                                </React.Fragment>

                            )
                        })
                    }
                </InfiniteScroll>
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