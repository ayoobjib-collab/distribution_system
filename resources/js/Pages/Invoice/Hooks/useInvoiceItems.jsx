import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function useInvoiceItems(initialItems = []) {

    const [items, setItems] = useState(initialItems);
    const { csrf } = usePage().props;

    useEffect(() => {

        if (items.length > 0) return;//exit in edit mode

        const stored = JSON.parse(
            localStorage.getItem('invoice_products') || '[]'
        );

        if (!stored.length) {
            return;
        }

        fetch('/invoice/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrf,
            },
            body: JSON.stringify({
                products: stored
            }),
        })
            .then(response => response.json())
            .then(products => {

                const invoiceItems = products.map(product => {
                    return {
                        id: product.id,
                        product_id: product.id,
                        name: product.name,
                        unit_price: product.unit_price,
                        stock: product.stock,
                        unit: product.unit,
                        quantity: product.quantity, //check max quantity in php
                        discount: product.discount,
                    };
                });

                setItems(invoiceItems);
            });

    }, []);

    const removeItem = (itemId) => {
        setItems(prev =>
            prev.filter(item => item.id !== itemId)
        );
    };

    const updateItem = (id, key, value) => {
        setItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, [key]: value }
                    : item
            )
        );
    };

    const calcSubtotal = items.reduce((acc, item) => {

        const qty = Number(item.quantity) || 0;
        const price = Number(item.unit_price) || 0;
        const discount = Number(item.discount) || 0;

        const finalPrice = price * (1 - discount / 100);

        return acc + Math.round(qty * finalPrice);

    }, 0);

    return {
        items,
        setItems,
        removeItem,
        updateItem,
        calcSubtotal,
    };
}