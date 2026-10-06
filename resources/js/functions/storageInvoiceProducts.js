/**
 * Static functions
 */
export function getInvoiceProducts(key = 'invoice_products') {

    let products = localStorage.getItem(key) ?? '[]';

    try {
        
        return JSON.parse(products)
    } catch (error) {

        console.log('error in get products');
        return [];
    }
}

export function saveInvoiceProducts(
    products,
    key = 'invoice_products'
) {
    localStorage.setItem(
        key,
        JSON.stringify(products)
    );
}

export function getInvoiceProduct(
    productId,
    key = 'invoice_products'
) {
    const products = getInvoiceProducts(key);

    return products.find(
        item => item.product_id === productId
    );
}