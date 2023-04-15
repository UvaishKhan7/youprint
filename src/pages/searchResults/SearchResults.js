import React from 'react';
import './searchResults.css';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/productCard/ProductCard';

export default function SearchResults() {

    const searchResults = useSelector((state) => state.searchResults.results);

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
