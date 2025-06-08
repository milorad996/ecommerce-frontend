import { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import './../css/cartOverlay.css';
import { placeOrder } from '../services/orderService';

function CartOverlay() {
    const { cartItems, closeOverlay, setCartItems } = useContext(CartContext);
    const { clearCart } = useContext(CartContext);
    const [loading, setLoading] = useState(false);

    const increase = (index) => {
        const updated = [...cartItems];
        updated[index].quantity++;
        setCartItems(updated);
    };

    const decrease = (index) => {
        const updated = [...cartItems];
        if (updated[index].quantity === 1) {
            updated.splice(index, 1);
        } else {
            updated[index].quantity--;
        }
        setCartItems(updated);
    };



    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            const itemsToSend = cartItems.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
                attributes: item.attributes.map(attr => {
                    const selectedValue = item.selected_attributes[attr.name];
                    const selectedItem = attr.items.find(i => i.value === selectedValue);
                    return {
                        attribute_id: attr.id,
                        attribute_item_id: selectedItem ? selectedItem.id : null,
                    };
                }).filter(a => a.attribute_item_id !== null),
            }));
            const success = await placeOrder(itemsToSend);
            if (success) {
                clearCart();
                closeOverlay();
                alert('Order placed successfully!');
            } else {
                alert('Order failed.');
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong while placing the order.');
        } finally {
            setLoading(false);
        }
    };

    const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            <div className="cart-overlay-background" onClick={closeOverlay}></div>
            <div className="cart-overlay">
                <h2 className='my-bag-title'>My Bag, <span>{totalItems} items</span></h2>
                <div className="cart-items">
                    {cartItems.map((item, i) => (
                        <div className="cart-item" key={i}>
                            <div className='cart-item-details'>
                                <p>{item?.name}</p>
                                {item?.attributes?.map(attr => {
                                    const kebab = attr.name.toLowerCase().replace(/\s+/g, '-');
                                    return (
                                        <div
                                            key={attr?.name}
                                            className="attribute-group"
                                            data-testid={`cart-item-attribute-${kebab}`}
                                        >
                                            <p>{attr?.name}:</p>
                                            <div className="attribute-options">
                                                {attr?.items?.map(opt => {
                                                    const selected = item?.selected_attributes[attr.name] === opt.value;
                                                    const dataTestId = `cart-item-attribute-${kebab}-${kebab}${selected ? '-selected' : ''}`;
                                                    return (
                                                        <button
                                                            key={opt?.value}
                                                            className={`attribute-button ${selected ? 'selected' : ''}`}
                                                            style={attr.name === 'Color' ? { backgroundColor: opt.value } : {}}
                                                            data-testid={dataTestId}
                                                        >
                                                            {attr.name === 'Color' ? '' : opt?.value}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="quantity-controls">
                                <button
                                    className='quantity-increase'
                                    onClick={() => increase(i)}
                                    data-testid="cart-item-amount-increase"
                                >
                                    +
                                </button>
                                <span data-testid="cart-item-amount">{item.quantity}</span>
                                <button
                                    className='quantity-decrease'
                                    onClick={() => decrease(i)}
                                    data-testid="cart-item-amount-decrease"
                                >
                                    &mdash;
                                </button>
                            </div>

                            <div className='item-image'>
                                <img src={item.image} alt={item.name} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-total" data-testid="cart-total">
                    <p><strong>Total</strong></p>
                    <p><strong>${total.toFixed(2)}</strong></p>
                </div>

                <button
                    className="place-order-btn"
                    disabled={cartItems.length === 0 || loading}
                    onClick={handlePlaceOrder}
                >
                    {loading ? 'Placing...' : 'Place Order'}
                </button>
            </div>
        </>
    );
}

export default CartOverlay;
