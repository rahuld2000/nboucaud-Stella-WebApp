// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useState} from 'react';

import './search_bar.scss';
import {CheckIcon} from '@mattermost/compass-icons/components';

import SearchIcon from 'components/widgets/icons/search_icon';

import type {IconButtonProps, SearchBarProps} from './types';

const IconButton = (props: IconButtonProps) => {
    const {label, selected, onClickHandler, value} = props;

    return (
        <div
            className='icon_button_wrapper'
            style={{
                backgroundColor: selected === value ? '#2C2C2C' : '#F5F5F5',
            }}
            onClick={() => onClickHandler(value || 'new')}
        >
            {selected === value && (
                <CheckIcon
                    size={18}
                    color='white'
                />
            )}
            <span
                className='icon_button_label'
                style={{
                    color: selected === value ? '#FFFFFF' : '#757575',
                }}
            >
                {label}
            </span>
        </div>
    );
};

const SearchBar = (props: SearchBarProps) => {
    const {buttons, handleSearchTermChange, handleSortByChange} = props;
    const [selected, setSelected] = useState(buttons[0].value);

    const onClickHandler = (value: string) => {
        setSelected(value);
        handleSortByChange(value);
    };

    return (
        <div className='search_bar_container'>
            <div className='search_input_container'>
                <input
                    className='search_input_style'
                    type='search'
                    placeholder='Search'
                    onChange={(event) =>
                        handleSearchTermChange(event.target.value)
                    }
                />

                <SearchIcon/>

            </div>

            <div className='sort_by_container'>
                {buttons.map((button) => {
                    return (
                        <IconButton
                            key={button.icon}
                            label={button.label}
                            selected={selected}
                            value={button.value}
                            onClickHandler={onClickHandler}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default SearchBar;
