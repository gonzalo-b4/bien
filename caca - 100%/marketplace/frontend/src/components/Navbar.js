import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ onUserClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);
    const [subMenuOpen, setSubMenuOpen] = useState({
        men: false,
        women: false,
        shoes: false,
        bags: false
    });

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setIsProductsOpen(false);
    };

    const toggleProducts = () => {
        setIsProductsOpen(!isProductsOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleMouseEnter = (category) => {
        setSubMenuOpen((prevState) => ({
            ...prevState,
            [category]: true
        }));
    };

    const handleMouseLeave = (category) => {
        setSubMenuOpen((prevState) => ({
            ...prevState,
            [category]: false
        }));
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 425);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-hamburger" onClick={toggleMenu}>
                    <i className="fi fi-br-menu-burger"></i>
                </div>
                <div className="navbar-logo">
                    <img src={`${process.env.PUBLIC_URL}/logo_e.png`} alt="Logo" />
                </div>
                <div className="navbar-carrito">
                    <i className="fi fi-ss-shopping-cart"></i>
                </div>
                <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
                    <div
                        className="navbar-item-productos"
                        onMouseEnter={() => !isMobile && setIsProductsOpen(true)}
                        onMouseLeave={() => !isMobile && setIsProductsOpen(false)}
                        onClick={isMobile ? toggleProducts : undefined}
                    >
                        Productos
                        {isProductsOpen && (
                            <div className="dropdown">
                                <div
                                    className="dropdown-item"
                                    onMouseEnter={() => handleMouseEnter('men')}
                                    onMouseLeave={() => handleMouseLeave('men')}
                                >
                                    Hombre <i className="fi fi-rs-angle-double-small-down"></i>
                                    {subMenuOpen.men && (
                                        <div className="sub-dropdown">
                                            <a href="/products/men/shirts">Remeras</a>
                                            <a href="/products/men/jackets">Camperas</a>
                                            <a href="/products/men/suits">Trajes</a>
                                        </div>
                                    )}
                                </div>
                                <div
                                    className="dropdown-item"
                                    onMouseEnter={() => handleMouseEnter('women')}
                                    onMouseLeave={() => handleMouseLeave('women')}
                                >
                                    Mujer <i className="fi fi-rs-angle-double-small-down"></i>
                                    {subMenuOpen.women && (
                                        <div className="sub-dropdown">
                                            <a href="/products/women/shirts">Remeras</a>
                                            <a href="/products/women/pants">Pantalones</a>
                                            <a href="/products/women/dresses">Vestidos</a>
                                        </div>
                                    )}
                                </div>
                                <a href="/products/kids">Niño/a</a>
                                <div
                                    className="dropdown-item"
                                    onMouseEnter={() => handleMouseEnter('shoes')}
                                    onMouseLeave={() => handleMouseLeave('shoes')}
                                >
                                    Zapatillas <i className="fi fi-rs-angle-double-small-down"></i>
                                    {subMenuOpen.shoes && (
                                        <div className="sub-dropdown">
                                            <a href="/products/shoes/sneakers">Zapatillas</a>
                                            <a href="/products/shoes/boots">Botines</a>
                                            <a href="/products/shoes/shoes">Zapatos</a>
                                            <a href="/products/shoes/heels">Tacos</a>
                                            <a href="/products/shoes/boots">Botas</a>
                                        </div>
                                    )}
                                </div>
                                <div
                                    className="dropdown-item"
                                    onMouseEnter={() => handleMouseEnter('bags')}
                                    onMouseLeave={() => handleMouseLeave('bags')}
                                >
                                    Bolsos <i className="fi fi-rs-angle-double-small-down"></i>
                                    {subMenuOpen.bags && (
                                        <div className="sub-dropdown">
                                            <a href="/products/bags/handbags">Carteras</a>
                                            <a href="/products/bags/waistbags">Riñoneras</a>
                                            <a href="/products/bags/backpacks">Mochilas</a>
                                            <a href="/products/bags/suitcases">Valijas</a>
                                        </div>
                                    )}
                                </div>
                                <a href="/products/hats">Gorros</a>
                            </div>
                        )}
                    </div>
                    {!isMobile && (
                        <div className="navbar-search">
                            <input type="text" placeholder="¿Qué estás buscando?" />
                        </div>
                    )}
                    <div className="navbar-user">
                        <i className="fi fi-ss-user" onClick={onUserClick}></i>
                    </div>
                </div>
            </nav>
            {isMobile && (
                <div className={`search-bubble ${isSearchOpen ? 'open' : ''}`} onClick={toggleSearch}>
                    <i className="fi fi-br-search"></i>
                    {isSearchOpen && (
                        <input type="text" placeholder="¿Qué estás buscando?" className="search-input" />
                    )}
                </div>
            )}
            {isMobile && isMenuOpen && (
                <div className="mobile-menu">
                    <div className="mobile-menu-close" onClick={closeMenu}>
                        <i className="fi fi-rs-cross"></i>
                    </div>
                    <div className="mobile-menu-content">
                        <div className="navbar-item-productos" onClick={toggleProducts}>
                            Productos
                            {isProductsOpen && (
                                <div className="dropdown">
                                    <div className="dropdown-item">
                                        Hombre <i className="fi fi-rs-angle-double-small-down"></i>
                                        {subMenuOpen.men && (
                                            <div className="sub-dropdown">
                                                <a href="/products/men/shirts">Remeras</a>
                                                <a href="/products/men/jackets">Camperas</a>
                                                <a href="/products/men/suits">Trajes</a>
                                            </div>
                                        )}
                                    </div>
                                    <div className="dropdown-item">
                                        Mujer <i className="fi fi-rs-angle-double-small-down"></i>
                                        {subMenuOpen.women && (
                                            <div className="sub-dropdown">
                                                <a href="/products/women/shirts">Remeras</a>
                                                <a href="/products/women/pants">Pantalones</a>
                                                <a href="/products/women/dresses">Vestidos</a>
                                            </div>
                                        )}
                                    </div>
                                    <a href="/products/kids">Niño/a</a>
                                    <div className="dropdown-item">
                                        Zapatillas <i className="fi fi-rs-angle-double-small-down"></i>
                                        {subMenuOpen.shoes && (
                                            <div className="sub-dropdown">
                                                <a href="/products/shoes/sneakers">Zapatillas</a>
                                                <a href="/products/shoes/boots">Botines</a>
                                                <a href="/products/shoes/shoes">Zapatos</a>
                                                <a href="/products/shoes/heels">Tacos</a>
                                                <a href="/products/shoes/boots">Botas</a>
                                            </div>
                                        )}
                                    </div>
                                    <div className="dropdown-item">
                                        Bolsos <i className="fi fi-rs-angle-double-small-down"></i>
                                        {subMenuOpen.bags && (
                                            <div className="sub-dropdown">
                                                <a href="/products/bags/handbags">Carteras</a>
                                                <a href="/products/bags/waistbags">Riñoneras</a>
                                                <a href="/products/bags/backpacks">Mochilas</a>
                                                <a href="/products/bags/suitcases">Valijas</a>
                                            </div>
                                        )}
                                    </div>
                                    <a href="/products/hats">Gorros</a>
                                </div>
                            )}
                        </div>
                        <div className="navbar-user" onClick={onUserClick}>
                            <i className="fi fi-ss-user"></i>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
