import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import './../css/productCard.css';

function ProductCard({ product }) {
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    const kebabName = product.name.toLowerCase().replace(/\s+/g, '-');

    const getDefaultAttributes = (attributes) => {
        const defaults = {};
        attributes.forEach(attr => {
            if (attr.items.length > 0) {
                defaults[attr.name] = attr.items[0].value;
            }
        });
        return defaults;
    };



    const handleQuickShop = (e) => {
        e.stopPropagation();

        const cartItem = {
            product_id: product.id,
            name: product.name,
            image: product.gallery[0]?.image_url,
            price: product.prices[0]?.amount,
            selected_attributes: getDefaultAttributes(product.attributes),
            attributes: product.attributes,
            quantity: 1
        };
        addToCart(cartItem);
    };

    return (
        <div className="product-card" data-testid={`product-${kebabName}`} onClick={() => navigate(`/product-details/${product.id}`)}>
            <div className='product-card-image'>
                <img src={product?.gallery[0]?.image_url} alt={product?.name} />
                {product?.in_stock && (
                    <button className='product-card-button' onClick={handleQuickShop}>
                        <i className="fi fi-bs-shopping-cart product-cart"></i>
                    </button>
                )}
                <div className={`${!product?.in_stock ? 'out-of-stock' : ''}`}></div>
                <div className={`${!product?.in_stock ? 'out-of-stock-label' : ''}`}>
                    {!product?.in_stock && 'Out of Stock'}
                </div>
            </div>
            <h3 className="product-card-name">{product?.name}</h3>
            <p className="product-card-price">{product?.prices[0]?.currency?.symbol} {product?.prices[0]?.amount}</p>
        </div>
    )
}

export default ProductCard;
