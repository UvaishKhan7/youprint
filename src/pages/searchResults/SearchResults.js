import React from 'react';
import './searchResults.css';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/productCard/ProductCard';

export default function SearchResults() {

    const searchResults = useSelector((state) => state.searchResults.results);

    if (!searchResults || searchResults.length === 0) {
        return <div>No search results found</div>;
    } else {
        return (
            <div className='search__results'>
                {
                    searchResults.map((product, index) => (
                        <ProductCard product={product} key={index} />
                    ))
                }
            </div>
        )
    }
}
