import React, { useState, useEffect } from 'react';
import './landingPage.css';
import GiftCardSlider from '../../components/giftCardSlider/GiftCardSlider';
import Carousel from '../../components/heroSection/heroCardCarousel/Carousel';
import ProductCard from '../../components/productCard/ProductCard';
import { connect } from 'react-redux';
import {
    setCurrentPage,
    updateProductList,
    enablePrevButton,
    enableNextButton,
    disablePrevButton,
    disableNextButton,
} from '../../redux/actions/paginationActions';

const LandingPage = (props) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);

    const {
        currentPage,
        prevButtonDisabled,
        nextButtonDisabled,
        setCurrentPage,
        updateProductList,
        enablePrevButton,
        enableNextButton,
        disablePrevButton,
        disableNextButton,
    } = props;

    useEffect(() => {
        // Fetch all products initially
        fetchAllProducts(1, 10);
    }, []);

    useEffect(() => {
        // Update pagination logic whenever products state changes
        const startIndex = (currentPage - 1) * 10;
        const endIndex = startIndex + 10;
        const paginatedProducts = products.slice(startIndex, endIndex);
        updateProductList(paginatedProducts);

        // Enable/Disable Prev/Next buttons based on current page
        if (currentPage === 1) {
            disablePrevButton();
        } else {
            enablePrevButton();
        }
        if (endIndex >= products.length) {
            disableNextButton();
        } else {
            enableNextButton();
        }
    }, [currentPage, disableNextButton, disablePrevButton, enableNextButton, enablePrevButton, products, updateProductList])

    const fetchAllProducts = (currentPage, limit) => {
        // Fetch API to get all products
        fetch(`https://dummyjson.com/products?limit=${limit}&skip=${(currentPage - 1) * limit}`)
            .then(response => response.json())
            .then(data => setProducts(data.products))
            .catch(error => console.error(error));
    };


    const fetchProductsByCategory = (category, currentPage, limit) => {
        // Fetch API to get products by category
        fetch(`https://dummyjson.com/products?category=${category}&limit=${limit}&skip=${(currentPage - 1) * limit}`)
            .then(response => response.json())
            .then(data => setProducts(data.products))
            .catch(error => console.error(error));
    };

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        setCurrentPage(currentPage);
        if (category === null) {
            // Fetch all products if category is null (All Categories button is clicked)
            fetchAllProducts(currentPage, 10);
        } else {
            // Fetch products by category
            fetchProductsByCategory(category, currentPage, 10);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
        if (currentPage === 1) {
            disablePrevButton()
        }
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
                            .map((product, index) => (
                                <ProductCard product={product} key={index} />
                            ))
                    }
                </div>

                {/* Pagination */}
                <div className="carousel__controls">
                    <button
                        className="carousel__prev"
                        onClick={handlePrevPage}
                        disabled={prevButtonDisabled}
                    >
                        Prev
                    </button>
                    <button
                        className="carousel__next"
                        onClick={handleNextPage}
                        disabled={nextButtonDisabled}
                    >
                        Next
                    </button>
                </div>
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

// Redux state mapping
const mapStateToProps = (state) => ({
    currentPage: state.pagination.currentPage,
    prevButtonDisabled: state.pagination.prevButtonDisabled,
    nextButtonDisabled: state.pagination.nextButtonDisabled,
});

// Redux action mapping
const mapDispatchToProps = (dispatch) => ({
    setCurrentPage: (page) => dispatch(setCurrentPage(page)),
    updateProductList: (products) => dispatch(updateProductList(products)),
    enablePrevButton: () => dispatch(enablePrevButton()),
    enableNextButton: () => dispatch(enableNextButton()),
    disablePrevButton: () => dispatch(disablePrevButton()),
    disableNextButton: () => dispatch(disableNextButton()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);