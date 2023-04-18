import React, { useEffect } from 'react';
import './searchResults.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { STATUS } from '../../utils/status';
import { fetchAsyncSearchProduct, getSearchProducts, setSearchTerm, getSearchProductsStatus, clearSearch } from '../../redux/searchSlice';
import ProductCard from '../../components/productCard/ProductCard';

export default function SearchResults() {

    const dispatch = useDispatch();
    const { searchTerm } = useParams();
    const searchProducts = useSelector(getSearchProducts);
    const searchProductsStatus = useSelector(getSearchProductsStatus);

    useEffect(() => {
        dispatch(clearSearch());
        dispatch(fetchAsyncSearchProduct(searchTerm));
    }, [searchTerm]);

    if (searchProducts.length === 0) {
        return (
            <div className='search-result-container'>
                <h3>No Products found.</h3>
                <Link to='/'>
                    <button>Go Home</button>
                </Link>
            </div>
        )
    }

    return (
        <div className='search__results'>

            {
                searchProductsStatus === STATUS.LOADING ? <Loader /> :

                    searchProducts.map((product, index) => (
                        <ProductCard product={product} key={index} />
                    ))
            }
        </div>
    )
}

