// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {useSpring, animated} from '@react-spring/web';
import React, {useState} from 'react';

import Messenger from './messenger';

import messengerIcon from '../../images/messenger.png';

const MessengerPopup = () => {
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupBtnAnimStyles] = useSpring(() => {
        if (popupOpen) {
            return {
                from: {translateY: 0},
                to: {translateY: 150},
                config: {
                    bounce: 0.8,
                },
            };
        }

        return {
            from: {translateY: 150},
            to: {translateY: 0},
            config: {
                bounce: 0.8,
            },
        };
    }, [popupOpen]);

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    return (
        <div id='messenger_popup'>
            {/* @ts-expect-error we can ignore "Type instantiation is excessively deep and possibly infinite" */}
            <animated.div style={popupBtnAnimStyles}>
                <button
                    id='messenger_popup_button'
                    onClick={() => openPopup()}
                >
                    <img src={messengerIcon}/>
                </button>
            </animated.div>
            {popupOpen && <Messenger onClose={closePopup}/>}
        </div>
    );
};

export default MessengerPopup;
