import { Link, useLocation } from 'react-router-dom';
import './../css/navbar.css';
import { CartContext } from '../contexts/CartContext';
import { useContext, useEffect, useState } from 'react';

function NavbarComponent() {
    const location = useLocation();
    const { toggleOverlay, cartItems } = useContext(CartContext);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    useEffect(() => {
        if (window.innerWidth < 768 && window.location.hostname.includes('github.io')) {
            setMobileMenuOpen(true);
        }
    }, []);

    const links = [
        { name: 'All', path: '/all' },
        { name: 'Clothes', path: '/clothes' },
        { name: 'Tech', path: '/tech' }
    ];

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleLinkClick = () => {
        if (mobileMenuOpen) {
            setMobileMenuOpen(false);
        }
    };

    return (
        <header className='header-container'>
            <nav className='header-nav'>

                <button
                    className='mobile-menu-btn'
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle navigation menu"
                >
                    <i className="fas fa-bars"></i>
                </button>

                <ul className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}>
                    {links.map(link => {
                        const isActive = location.pathname === link.path;
                        return (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={isActive ? 'active' : ''}
                                    data-testid={isActive ? 'active-category-link' : 'category-link'}
                                    onClick={handleLinkClick}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className='shopping-bag center-bag'>
                    <i className="fas fa-bag-shopping bag"></i>
                </div>

                <button className='nav-button' data-testid="cart-btn" onClick={toggleOverlay}>
                    <i className="fi fi-bs-shopping-cart cart"></i>
                    {totalItems > 0 && (
                        <span className="cart-count-bubble">{totalItems}</span>
                    )}
                </button>

            </nav>
        </header>
    );
}

export default NavbarComponent;
