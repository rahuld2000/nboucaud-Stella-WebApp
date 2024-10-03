// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import './product_info_card.scss';
import type {ProductInfoCardProps} from './types';

const ProductInfoCard = (props: ProductInfoCardProps) => {
    const {url, description, price} = props;
    return (
        <div className='product_info_card_container'>
            <div className='shop_card_image_container'>
                <img
                    src={url}
                    alt='shop_card_image'
                />
            </div>
            <div className='post_card_price_description'>{description}</div>
            <div className='post_card_price_label'>{`$${price}`}</div>
        </div>
    );
};

export default ProductInfoCard;
