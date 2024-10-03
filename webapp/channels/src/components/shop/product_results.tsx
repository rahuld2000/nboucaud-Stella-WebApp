// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useEffect, useState} from 'react';

import './product_results.scss';
import FilterMenu from './components/filter_menu';
import ProductInfoCard from './components/product_info_card';
import SearchBar from './components/search_bar';
import type {
    HandleFilterChangeProps,
    InitialFilterProps,
    PriceRangeProps,
    ProductInfoCardProps,
    UpdateKeywordProps,
} from './components/types';

// note: dummy data to be replaced with actual data from the server
const DummyProducts = [
    {
        url: 'https://via.placeholder.com/250',
        description: 'Product 1',
        price: 100,
    },
    {
        url: 'https://via.placeholder.com/250',
        description: 'Product 2',
        price: 200,
    },
    {
        url: 'https://via.placeholder.com/250',
        description: 'Product 3',
        price: 300,
    },
    {
        url: 'https://via.placeholder.com/250',
        description: 'Product 4',
        price: 400,
    },
    {
        url: 'https://via.placeholder.com/250',
        description: 'Product 5',
        price: 500,
    },
    {
        url: 'https://via.placeholder.com/250',
        description: 'Product 6',
        price: 600,
    },
    {
        url: 'https://via.placeholder.com/250',
        description: 'Product 7',
        price: 700,
    },
    {
        url: 'https://via.placeholder.com/250',
        description: 'Product 8',
        price: 800,
    },
];

// note: placeholder categories to filter the products
const categories = [
    {
        label: 'Label 1',
        value: 'category_1',
        description: 'Description 1',
    },
    {
        label: 'Label 2',
        value: 'category_2',
        description: 'Description 2',
    },
    {
        label: 'Label 3',
        value: 'category_3',
        description: 'Description 3',
    },
];

// note: placeholder colors to filter the products
const colors = [
    {
        label: 'Red',
        value: 'red',
    },
    {
        label: 'Blue',
        value: 'blue',
    },
    {
        label: 'Green',
        value: 'green',
    },
];

// note: placeholder keywords to filter the products
const keywords = ['spring', 'smart', 'modern', 'casual', 'formal'];

// note: placeholder sizes to filter the products
const sizes = [
    {
        label: 'Small',
        value: 'small',
    },
    {
        label: 'Medium',
        value: 'medium',
    },
    {
        label: 'Large',
        value: 'large',
    },
];

// note: placeholder buttons to sort the products
const buttons = [
    {
        icon: 'icon1',
        label: 'New',
        value: 'new',
    },
    {
        icon: 'icon2',
        label: 'Price ascending',
        value: 'ascending',
    },
    {
        icon: 'icon3',
        label: 'Price descending',
        value: 'descending',
    },
    {
        icon: 'icon4',
        label: 'Rating',
        value: 'rating',
    },
];

// note: placeholder dummy price range
const DummyPriceRange = {
    min: 0,
    max: 100,
};

const ProductResults = () => {
    const [filters, setFilters] = useState<InitialFilterProps>({
        size: [],
        categories: [],
        color: [],
        keywords,
        searchTerm: '',
        sortBy: 'new',
        priceRange: {
            min: 0,
            max: 100,
        },
    });

    const [products, setProducts] = useState<ProductInfoCardProps[]>([]);

    const fetchProducts = async () => {
        try {
            const response = DummyProducts;
            setProducts(response);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error fetching products:', error);
        }
    };

    const handleFilterChange = (values: HandleFilterChangeProps) => {
        const {filterType, value, isChecked} = values;

        setFilters((prevFilters) => {
            const newFilters = {...prevFilters};

            if (Array.isArray(newFilters[filterType])) {
                if (isChecked) {
                    newFilters[filterType] = [...newFilters[filterType], value];
                }
                if (!isChecked) {
                    newFilters[filterType] = newFilters[filterType].filter(
                        (item) => item !== value,
                    );
                }
            }

            return newFilters;
        });
    };

    const handleKeywordAdd = (keyword: string) => {
        if (filters.keywords.includes(keyword)) {
            return;
        }
        setFilters((prevFilters) => ({
            ...prevFilters,
            keywords: [...prevFilters.keywords, keyword],
        }));
    };

    const handleKeywordRemove = (keyword: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            keywords: prevFilters.keywords.filter((k) => k !== keyword),
        }));
    };

    const handleKeywordUpdate = (value: UpdateKeywordProps) => {
        const {keyword, index} = value;

        setFilters((prevFilters) => {
            const newKeywords = [...prevFilters.keywords];
            newKeywords[index] = keyword;
            return {
                ...prevFilters,
                keywords: newKeywords,
            };
        });
    };

    const priceRangeHandler = (values: PriceRangeProps) => {
        const {min, max} = values;

        setFilters((prevFilters) => ({
            ...prevFilters,
            priceRange: {
                min,
                max,
            },
        }));
    };

    const handleSearchTermChange = (value: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            searchTerm: value,
        }));
    };

    const handleSortByChange = (value: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            sortBy: value,
        }));
    };

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    return (
        <div className='product_result_container'>
            <div>
                <FilterMenu
                    sizes={sizes}
                    categories={categories}
                    keywords={filters.keywords}
                    colors={colors}
                    priceRange={DummyPriceRange}
                    handleKeywordAdd={handleKeywordAdd}
                    handleKeywordRemove={handleKeywordRemove}
                    handleFilterChange={handleFilterChange}
                    priceRangeHandler={priceRangeHandler}
                    handleKeywordUpdate={handleKeywordUpdate}
                />
            </div>
            <div className='card_and_wrapper_container'>
                <SearchBar
                    buttons={buttons}
                    handleSearchTermChange={handleSearchTermChange}
                    handleSortByChange={handleSortByChange}
                />
                <div className='product_result_info_container'>
                    {products.map((product) => {
                        return (
                            <ProductInfoCard
                                key={product.description}
                                url={product.url}
                                description={product.description}
                                price={product.price}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProductResults;
