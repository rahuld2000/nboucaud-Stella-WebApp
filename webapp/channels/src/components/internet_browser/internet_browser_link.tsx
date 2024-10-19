// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {Link, useRouteMatch} from 'react-router-dom';

import InternetIcon from './internet_icon';

import './internet_browser_link.scss';

const GlobalThreadsLink = () => {
    const {url} = useRouteMatch();

    return (
        <div
            style={{
                height: '18px',
                width: '18px',
                cursor: 'pointer',
            }}
        >
            <Link
                to={`${url}/browser`}
                draggable='false'
            >
                <InternetIcon/>
            </Link>
        </div>

    );
};

export default GlobalThreadsLink;
