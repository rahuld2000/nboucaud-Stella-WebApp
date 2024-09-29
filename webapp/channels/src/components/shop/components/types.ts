// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

export interface IconLabelProps {
    label: string;
    value: string;
    description?: string;
    onSelectedChange: (value: string, isChecked: boolean) => void;
}

export interface SelectedKeywordsProps {
    value: string;
    showUpdateKeyword: string;
    setShowUpdateKeyword: React.Dispatch<React.SetStateAction<string>>;
    handleKeywordRemove: (keyword: string) => void;
    updateKeyword: (keyword: string) => void;
}

export interface IFilterKey {
    label: string;
    value: string;
}

export interface IFilterKeyWithDescription extends IFilterKey {
    description: string;
}

export interface FilterMenuProps {
    keywords: string[];
    categories: IFilterKeyWithDescription[];
    colors: IFilterKey[];
    sizes: IFilterKey[];
    priceRange: PriceRangeProps;
    handleKeywordAdd: (keyword: string) => void;
    handleKeywordRemove: (keyword: string) => void;
    handleFilterChange: (props: HandleFilterChangeProps) => void;
    priceRangeHandler: (props: PriceRangeProps) => void;
    handleKeywordUpdate: (props: UpdateKeywordProps) => void;
}

export interface PriceRangeProps {
    min: number;
    max: number;
}

export interface ProductInfoCardProps {
    url: string;
    description: string;
    price: number;
}

export interface SearchSortButton {
    icon: string;
    label: string;
    value: string;
}

export interface IconButtonProps {
    label: string;
    value: string;
    selected: string;
    onClickHandler: (value: string) => void;
}

export interface SearchBarProps {
    buttons: SearchSortButton[];
    handleSearchTermChange: (value: string) => void;
    handleSortByChange: (value: string) => void;
}

export interface HandleFilterChangeProps {
    filterType: 'size' | 'categories' | 'color' | 'keywords'; //keyof InitialFilterProps;
    value: string;
    isChecked: boolean;
}

export interface InitialFilterProps {
    size: string[];
    categories: string[];
    color: string[];
    keywords: string[];
    searchTerm: string;
    sortBy: string;
    priceRange: PriceRangeProps;
}

export interface UpdateKeywordProps {
    keyword: string;
    index: number;
}
