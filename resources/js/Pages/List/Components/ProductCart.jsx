import { MdOutlineImageNotSupported } from "react-icons/md";
import { formatAmount } from '@/functions/helper.js';

function ProductCart({ product, showMoalAdd }) {

    const src = product.image_urls?.[0]?.small ?? false;
    const price = formatAmount(product.sale_price ?? '-');

    return (
        <div className="product-cart flex flex-col" data-id={product.id}>

            <div className="pc-top">
                {
                    src ?
                        <img src={src} alt={product.name} loading="lazy"/>
                        :
                        <MdOutlineImageNotSupported size={80} className="no-bg" />
                }

                <span className="add-to-invoice" onClick={showMoalAdd}>
                    <svg>
                        <use xlinkHref="#addToInvoice"></use>
                    </svg>
                </span>
            </div>

            <div className="pc-bottom">

                <div className="product-content">
                    <h3 className="product-title">
                        Wireless Bluetooth Headphones
                    </h3>

                    <div className="product-price">
                        <span className="price"><b>{price}</b></span>
                        <span className="currency">ریال</span>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}


export default ProductCart;