// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useState} from 'react';

import {CloseIcon, PlusBoxIcon} from '@mattermost/compass-icons/components';

import DualRangeSlider from './dual_range_slider';
import './filter_menu.scss';
import type {
    FilterMenuProps,
    IconLabelProps,
    SelectedKeywordsProps,
} from './types';

const IconLabel = (props: IconLabelProps) => {
    const {label, description, onSelectedChange, value} = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSelectedChange(value, e.target.checked);
    };

    return (
        <div className='icon_label_container'>
            <label className='checkbox style-c'>
                <input
                    type='checkbox'
                    onChange={onChangeHandler}
                />
                <div className='checkbox__checkmark'/>
                <div>
                    <div className='checkbox__body'>{label}</div>
                    <div className='checkbox_description'>{description}</div>
                </div>
            </label>
        </div>
    );
};

const SelectedKeywords = (props: SelectedKeywordsProps) => {
    const {
        value,
        handleKeywordRemove,
        updateKeyword,
        showUpdateKeyword,
        setShowUpdateKeyword,
    } = props;

    const [inputValue, setInputValue] = useState(value);

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setShowUpdateKeyword('');
            updateKeyword(inputValue);
        }
    };

    return (
        <>
            {showUpdateKeyword === value ? (
                <input
                    className='add_keyword_input'
                    placeholder='update keyword'
                    value={inputValue}
                    onFocus={() => {
                        setShowUpdateKeyword(value);
                    }}
                    onBlur={() => {
                        setShowUpdateKeyword('');
                        updateKeyword(inputValue);
                    }}
                    onKeyPress={onKeyPress}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}
                />
            ) : (
                <div className='keyword_pill_container'>
                    <div
                        onClick={() => setShowUpdateKeyword(value)}
                        className='keyword_pill_label'
                    >
                        {value}
                    </div>

                    <div className='keyword_pill_close'>
                        <span
                            className='keyword_pill_close_icon'
                            onClick={() => {
                                handleKeywordRemove(value);
                            }}
                        >
                            <CloseIcon size={16}/>
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};

const FilterMenu = (props: FilterMenuProps) => {
    const {
        categories,
        colors,
        keywords,
        sizes,
        handleFilterChange,
        priceRangeHandler,
        handleKeywordRemove,
        handleKeywordAdd,
        handleKeywordUpdate,
        priceRange,
    } = props;

    const [showAddKeyword, setShowAddKeyword] = React.useState(false);
    const [showUpdateKeyword, setShowUpdateKeyword] = React.useState('');

    const addKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const keyword = e.currentTarget.value;
            handleKeywordAdd(keyword);
            e.currentTarget.value = '';
        }
    };

    return (
        <div className='filter_menu_container'>
            <div className='label_check_container'>
                <div className='filter_label'>{'Keywords'} </div>
                <div className='filter_keyword_wrapper'>
                    {keywords.map((keyword, index) => {
                        return (
                            <SelectedKeywords
                                key={keyword}
                                value={keyword}
                                showUpdateKeyword={showUpdateKeyword}
                                setShowUpdateKeyword={setShowUpdateKeyword}
                                handleKeywordRemove={handleKeywordRemove}
                                updateKeyword={(keyword) => {
                                    handleKeywordUpdate({keyword, index});
                                }}
                            />
                        );
                    })}

                    {showAddKeyword ? (
                        <input
                            className='add_keyword_input'
                            placeholder='add keyword'
                            onKeyPress={addKeyword}
                            onFocus={() => {
                                setShowAddKeyword(true);
                            }}
                            onBlur={() => {
                                setShowAddKeyword(false);
                            }}
                        />
                    ) : (
                        <div
                            className='add_keyword_icon'
                            onClick={() => {
                                setShowAddKeyword(true);
                            }}
                        >
                            <PlusBoxIcon
                                title='add keyword'
                                size={24}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className='label_check_container'>
                <div className='label_check_container'>
                    {categories.map((category) => {
                        return (
                            <div key={category.label}>
                                <IconLabel
                                    value={category.value}
                                    label={category.label}
                                    description={category.description}
                                    onSelectedChange={(value, isChecked) => {
                                        handleFilterChange({
                                            filterType: 'categories',
                                            value,
                                            isChecked,
                                        });
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            <DualRangeSlider
                min={priceRange.min}
                max={priceRange.max}
                priceRangeHandler={priceRangeHandler}
            />

            <div className='label_check_container'>
                <div className='filter_label'>{'Color'}</div>
                <div className='label_check_container'>
                    {colors.map((color) => {
                        return (
                            <IconLabel
                                key={color.label}
                                value={color.value}
                                label={color.label}
                                onSelectedChange={(value, isChecked) => {
                                    handleFilterChange({
                                        filterType: 'color',
                                        value,
                                        isChecked,
                                    });
                                }}
                            />
                        );
                    })}
                </div>
            </div>
            <div className='label_check_container'>
                <div className='filter_label'>{'Size'}</div>
                <div className='label_check_container'>
                    {sizes.map((size) => (
                        <IconLabel
                            key={size.label}
                            value={size.value}
                            label={size.label}
                            onSelectedChange={(value, isChecked) => {
                                handleFilterChange({
                                    filterType: 'size',
                                    value,
                                    isChecked,
                                });
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterMenu;
