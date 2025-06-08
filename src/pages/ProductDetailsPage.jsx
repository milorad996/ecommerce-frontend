import { useContext, useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { useParams } from "react-router-dom";
import './../css/productDetails.css';
import { CartContext } from "../contexts/CartContext";

function ProductDetailsPage() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState({});
    const { addToCart } = useContext(CartContext);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleThumbnailClick = (index) => setCurrentImageIndex(index);

    const products_details = products.filter(product => product?.id === id);
    const product = products_details[0];

    const handleNext = () => {
        if (product?.gallery && currentImageIndex < product.gallery.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const handlePrev = () => {
        if (product?.gallery && currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    const handleAttributeSelect = (name, value) => {
        setSelectedAttributes(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const allAttributesSelected = product?.attributes?.every(attr => selectedAttributes[attr.name]);
    const isDisabled = !allAttributesSelected || !product?.in_stock;

    const stripHtmlTags = (html) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    };


    return (
        <div className="product-details-container">
            <div className="product-images">
                <div className="image-thumbnails">
                    {product?.gallery?.map((image, index) => (
                        <img
                            key={image?.id}
                            src={image?.image_url}
                            alt={`thumbnail-${index}`}
                            className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                            onClick={() => handleThumbnailClick(index)}
                        />
                    ))}
                </div>
                <div className="image-slider" data-testid="product-gallery">
                    {product?.gallery && product.gallery.length >= 1 && (
                        <>
                            <button className="prev" onClick={handlePrev}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <div className="main-image">
                                <img
                                    src={product?.gallery[currentImageIndex]?.image_url}
                                    alt="Product"
                                    className="main-image-img"
                                />
                            </div>
                            <button className="next" onClick={handleNext}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="product-details-attribute">
                <h3 className="product-details-name">{product?.name}</h3>

                {product?.attributes?.map(attr => (
                    <div
                        key={attr.name}
                        className="product-details-attribute-group"
                        data-testid={`product-attribute-${attr.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                        <p>{attr.name}:</p>
                        <div className="product-details-attribute-options">
                            {attr.items.map(item => (
                                <button
                                    key={item.value}
                                    onClick={() => handleAttributeSelect(attr.name, item.value)}
                                    className={`product-details-attribute-button ${selectedAttributes[attr.name] === item.value ? 'selected' : ''}`}
                                    style={attr.name === 'Color' ? { backgroundColor: item.value } : {}}
                                >
                                    {attr.name === 'Color' ? '' : item.value}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="price-container">
                    <p>Price:</p>
                    <p className="product-details-price">
                        {product?.prices[0]?.currency?.symbol} {Number(product?.prices[0]?.amount).toFixed(2)}
                    </p>
                </div>

                <button
                    className={`add-to-cart-btn ${allAttributesSelected ? 'active' : 'disabled'}`}
                    data-testid="add-to-cart"
                    disabled={isDisabled}
                    onClick={() => {
                        const cartItem = {
                            product_id: product.id,
                            name: product.name,
                            image: product.gallery[0]?.image_url,
                            price: product.prices[0]?.amount,
                            selected_attributes: selectedAttributes,
                            attributes: product.attributes,
                            quantity: 1
                        };
                        addToCart(cartItem);
                    }}
                >
                    Add to Cart
                </button>

                <div
                    className="product-details-description"
                    data-testid="product-description"
                >
                    {stripHtmlTags(product?.description)}
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsPage;

