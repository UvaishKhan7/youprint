import React, { useState, useEffect } from 'react';
import './landingPage.css';
import GiftCardSlider from '../../components/giftCardSlider/GiftCardSlider';
import Carousel from '../../components/heroSection/heroCardCarousel/Carousel';
import ProductCard from '../../components/productCard/ProductCard';
import { Pagination } from 'antd';

const LandingPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;

    useEffect(() => {
        // Fetch all products initially
        fetchAllProducts();
    }, []);

    const fetchAllProducts = () => {
        // Fetch API to get all products
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => setProducts(data.products))
            .catch(error => console.error(error));
    };

    const fetchProductsByCategory = (category) => {
        // Fetch API to get products by category
        fetch(`https://dummyjson.com/products?category=${category}`)
            .then(response => response.json())
            .then(data => setProducts(data.products))
            .catch(error => console.error(error));
    };

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
        if (category === null) {
            fetchAllProducts();
        } else {
            fetchProductsByCategory(category);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='landing__container'>

            {/* Carousel */}
            <div className="carousel_swiper">
                <Carousel />
            </div>

            {/* Products Section */}
            <div className="products__section">
                <div className="products__section__title">Popular Products</div>
                {/* Categories */}
                <div className="products__categories">
                    <button className={selectedCategory === null ? 'selected' : 'btn-ctg'} onClick={() => handleCategoryFilter(null)}>All Categories</button>
                    <button className={selectedCategory === 'smartphones' ? 'selected' : 'btn-ctg'} onClick={() => handleCategoryFilter("smartphones")}>Smartphones</button>
                    <button className={selectedCategory === 'laptops' ? 'selected' : 'btn-ctg'} onClick={() => handleCategoryFilter("laptops")}>Laptops</button>
                    <button className={selectedCategory === 'fragrances' ? 'selected' : 'btn-ctg'} onClick={() => handleCategoryFilter("fragrances")}>Fragrances</button>
                    <button className={selectedCategory === 'skincare' ? 'selected' : 'btn-ctg'} onClick={() => handleCategoryFilter("skincare")}>Skincare</button>
                    <button className={selectedCategory === 'groceries' ? 'selected' : 'btn-ctg'} onClick={() => handleCategoryFilter("groceries")}>Groceries</button>
                    <button className={selectedCategory === 'home-decoration' ? 'selected' : 'btn-ctg'} onClick={() => handleCategoryFilter("home-decoration")}>Home Decoration</button>
                    <button className={selectedCategory === 'furniture' ? 'selected' : 'btn-ctg'} onClick={() => handleCategoryFilter("furniture")}>Furniture</button>
                    <button className={selectedCategory === 'top' ? 'selected' : 'btn-ctg'} onClick={() => handleCategoryFilter("top")}>Top</button>
                    <button className={selectedCategory === 'women-dresses' ? 'selected' : 'btn-ctg'} onClick={() => handleCategoryFilter("women-dresses")}>Women Dresses</button>
                    <button className={selectedCategory === 'women-shoes' ? 'selected' : 'btn-ctg'} onClick={() => handleCategoryFilter("women-shoes")}>Women Shoes</button>
                    <button className={selectedCategory === 'mens-shirts' ? 'selected' : 'btn-ctg'} onClick={() => handleCategoryFilter("mens-shirts")}>Mens Shirts</button>
                </div>
                {/* Product Cards */}
                <div className="products__card__container">
                    {
                        products
                            .filter(product => !selectedCategory || product.category === selectedCategory)
                            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                            .map((product, index) => (
                                <ProductCard product={product} key={index} />
                            ))
                    }
                </div>
                {/* Pagination */}
                <Pagination
                    defaultCurrent={1}
                    current={currentPage}
                    total={products.filter(product => !selectedCategory || product.category === selectedCategory).length}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                />
            </div>
            {/* Gifts Section */}
            <div className="gifts__section">
                <div className="gifts__section__header">
                    <h2>Gifts By Occasion</h2>
                </div>
                <div className="gift__cards__section">
                    <GiftCardSlider />
                </div>
            </div>
        </div>
    );
}

export default LandingPage;