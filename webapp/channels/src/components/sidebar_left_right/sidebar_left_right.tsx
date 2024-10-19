// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {memo} from 'react';
import {Link, useLocation} from 'react-router-dom';

import auditIcon from '../../images/audit.png';
import comboChartIcon from '../../images/combo-chart.png';
import robotImage from '../../images/internet_browser_robot.png';
import messageIcon from '../../images/message.png';
import notebookIcon from '../../images/notebook.png';
import screenshotIcon from '../../images/screenshot.png';
import stackIcon from '../../images/stack.png';

import './sidebar_left_right.scss';

import type {PropsFromRedux} from './index';

export interface Props extends PropsFromRedux {}

const SideBarLeftRight = (props: Props) => {
    const {pathname} = useLocation();
    const urlParts = pathname.split('/');
    const teamName = urlParts.length > 1 ? `/${urlParts[1]}` : '';

    return (
        <div className='home-screen-wrapper__sidebar right'>
            <div className='top'>
                <div className='group'>
                    <button>
                        <img src={comboChartIcon}/>
                    </button>
                    <button>
                        <img src={auditIcon}/>
                    </button>
                    <button>
                        <img src={notebookIcon}/>
                    </button>
                    <button>
                        <img src={messageIcon}/>
                    </button>
                    <img src={stackIcon}/>
                    <img src={screenshotIcon}/>
                </div>
            </div>
            <div className='bottom'>
                <img src={robotImage}/>
            </div>
        </div>
    );
};

export default memo(SideBarLeftRight);
