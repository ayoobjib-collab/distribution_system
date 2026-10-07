import { MdOutlineImageNotSupported } from "react-icons/md";
import { formatAmount } from '@/functions/helper.js';

function ProductCart({ product, showMoalAdd, added }) {

    const src = product.image_urls?.[0]?.medium ?? false;

    const price = formatAmount(product.sale_price ?? '-');

    const classes = (added ? 'added ' : '') + 'product-cart flex flex-col';

    function sendProductToModal() {
        showMoalAdd(product);
    }

    return (
        <div className={classes} data-id={product.id}>

            <div className="pc-top" onClick={sendProductToModal}>
                {
                    src ?
                        <img src={src} alt={product.name} loading="lazy" />
                        :
                        <MdOutlineImageNotSupported size={80} className="no-bg" />
                }

                <div className="add-to-invoice" >
                    <svg>
                        <use xlinkHref="#addToInvoice"></use>
                    </svg>
                    <small>
                        {`موجودی ${product.stock}`}
                    </small>
                </div>

            </div>

            <div className="pc-bottom">

                <div className="product-content">
                    <h3 className="product-title">
                        {product.name}
                    </h3>
                    <div className="product-price flex gap-1">
                        <span className="price"><b>{price}</b></span>
                        <span className="currency">ریال</span>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default ProductCart;