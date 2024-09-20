// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {useSpring, animated} from '@react-spring/web';
import React, {useEffect, useRef} from 'react';
import {injectIntl, type IntlShape} from 'react-intl';

import AudioChatBubble from './audio_chat_bubble';
import ChatBubble from './chat_bubble';

import userImage from '../../images/messenger.png';

type Props = {
    intl: IntlShape;
    onClose: () => void;
}

const MINIMUM_WIDTH = 320;
const MINIMUM_HEIGHT = 350;
const DIMENSION_KEY = 'messenger_dimension';

const getWindowSize = () => {
    const value = localStorage.getItem(DIMENSION_KEY);
    if (value === null) {
        return [MINIMUM_WIDTH, MINIMUM_HEIGHT];
    }
    try {
        return JSON.parse(value);
    } catch (err) {
        return [MINIMUM_WIDTH, MINIMUM_HEIGHT];
    }
};

const Messenger = ({intl, onClose}: Props) => {
    const [initialWidth, initialHeight] = getWindowSize();

    const animStyle = useSpring({
        from: {scaleY: 0, opacity: 0},
        to: {scaleY: 1, opacity: 1},
        config: {
            duration: 100,
        },
    });
    const ref = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        const element = ref.current;

        let mouseX = 0;
        let mouseY = 0;
        const BORDER_SIZE = 10;

        const handleResizeWidth = (ev: MouseEvent) => {
            ev.stopPropagation();
            ev.preventDefault();
            const dx = ev.x - mouseX;
            mouseX = ev.x;
            let width = (parseInt(getComputedStyle(element, '').width, 10) + dx);
            if (width < MINIMUM_WIDTH) {
                width = MINIMUM_WIDTH;
            }
            element.style.width = `${width}px`;
        };

        const handleResizeHeight = (ev: MouseEvent) => {
            ev.stopPropagation();
            ev.preventDefault();
            const dy = mouseY - ev.y;
            mouseY = ev.y;
            let height = (parseInt(getComputedStyle(element, '').height, 10) + dy);
            if (height < MINIMUM_HEIGHT) {
                height = MINIMUM_HEIGHT;
            }
            element.style.height = `${height}px`;
        };

        const handleMousedown = (ev: MouseEvent) => {
            if (ev.offsetX >= element.clientWidth - BORDER_SIZE) {
                element.classList.add('no-select');
                mouseX = ev.x;
                window.addEventListener('mousemove', handleResizeWidth, {
                    capture: true,
                });
            } else if (ev.offsetY <= BORDER_SIZE) {
                element.classList.add('no-select');
                mouseY = ev.y;
                window.addEventListener('mousemove', handleResizeHeight, {
                    capture: true,
                });
            }
        };

        const handleMouseup = () => {
            window.removeEventListener('mousemove', handleResizeWidth, {capture: true});
            window.removeEventListener('mousemove', handleResizeHeight, {capture: true});

            const style = getComputedStyle(element, '');
            const width = parseInt(style.width, 10);
            const height = parseInt(style.height, 10);

            localStorage.setItem(DIMENSION_KEY, JSON.stringify([width, height]));
            element.classList.remove('no-select');
        };

        element.addEventListener('mousedown', handleMousedown);
        window.addEventListener('mouseup', handleMouseup);

        // eslint-disable-next-line consistent-return
        return () => {
            element.removeEventListener('mousedown', handleMousedown);
            window.removeEventListener('mouseup', handleMouseup);
            window.removeEventListener('mousemove', handleResizeWidth);
            window.removeEventListener('mousemove', handleResizeHeight);
        };
    }, []);

    useEffect(() => {
        if (!headerRef.current || !ref.current) {
            return;
        }

        const container = ref.current;
        const element = headerRef.current;
        let mouseX = 0;
        let mouseY = 0;

        const handlePosition = (ev: MouseEvent) => {
            const dx = ev.x - mouseX;
            const dy = mouseY - ev.y;
            mouseX = ev.x;
            mouseY = ev.y;

            const style = getComputedStyle(container, '');

            const previousBottom = parseInt(style.bottom, 10);
            const previousLeft = parseInt(style.left, 10);
            const newBottom = previousBottom + dy;
            const newLeft = previousLeft + dx;

            container.style.left = `${newLeft}px`;
            container.style.bottom = `${newBottom}px`;
        };

        const handleMousedown = (ev: MouseEvent) => {
            ev.stopPropagation();
            ev.preventDefault();
            container.classList.add('no-select');
            mouseX = ev.x;
            mouseY = ev.y;
            window.addEventListener('mousemove', handlePosition, {
                capture: true,
            });
        };

        const handleMouseup = () => {
            window.removeEventListener('mousemove', handlePosition, {capture: true});
            container.classList.remove('no-select');
        };

        element.addEventListener('mousedown', handleMousedown);
        window.addEventListener('mouseup', handleMouseup);

        // eslint-disable-next-line consistent-return
        return () => {
            element.removeEventListener('mousedown', handleMousedown);
            window.removeEventListener('mouseup', handleMouseup);
            window.removeEventListener('mousemove', handlePosition, {capture: true});
        };
    }, []);

    return (
        <>
            {/* @ts-expect-error ignore the typing error */}
            <animated.div
                id='messenger'
                ref={ref}
                style={{width: `${initialWidth}px`, height: `${initialHeight}px`, ...animStyle}}
            >
                <div className='header'>
                    <div
                        className='heading'
                        ref={headerRef}
                    >
                        {'Stella'}
                    </div>
                    <button
                        id='closeButton'
                        onClick={() => onClose()}
                    >
                        <i className='fa fa-close'/>
                    </button>
                </div>
                <div className='chat'>
                    <ChatBubble
                        text='Hi I’m Stella.'
                        userImage={userImage}
                        images={['https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg']}
                    />
                    <AudioChatBubble
                        userImage={userImage}
                        audioSrc='https://cdn.freesound.org/previews/754/754124_14464791-lq.mp3'
                        duration='00:42'
                    />
                </div>
                <div className='input'>
                    <div className='left'>
                        <button>
                            <svg
                                width='32'
                                height='32'
                                viewBox='0 0 32 32'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M16.0003 6.66699V25.3337M6.66699 16.0003H25.3337'
                                    stroke='#DCDCDC'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </svg>
                        </button>
                    </div>
                    <div className='middle'>
                        <button>
                            <svg
                                width='18'
                                height='18'
                                viewBox='0 0 18 18'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M8.7435 12.2049C7.37184 12.2049 5.91568 12.0098 4.58952 11.6718C4.3425 11.2948 4.16048 10.8917 4.07597 10.4822C5.47363 10.8787 7.09881 11.1517 8.75 11.1517C10.4012 11.1517 12.0264 10.8787 13.4305 10.4822C13.333 10.8917 13.1575 11.2948 12.917 11.6718C11.5908 12.0033 10.1347 12.2049 8.75 12.2049H8.7435ZM8.7435 14.8507C11.6818 14.8507 14.0416 12.6924 14.3666 10.1311C14.4382 9.61757 14.1001 9.38354 13.6451 9.51356C11.9939 10.0011 10.4467 10.2741 8.7435 10.2741C7.0403 10.2741 5.50613 10.0011 3.84844 9.51356C3.39339 9.38354 3.06185 9.61757 3.12686 10.1311C3.44539 12.6924 5.79866 14.8507 8.7435 14.8507ZM11.2788 8.23291C11.8184 8.23291 12.2994 7.74536 12.2994 7.05628C12.2994 6.3672 11.8184 5.87314 11.2788 5.87314C10.7392 5.87314 10.2647 6.3672 10.2647 7.05628C10.2647 7.74536 10.7392 8.23291 11.2788 8.23291ZM6.19521 8.23291C6.74127 8.23291 7.22233 7.74536 7.22233 7.05628C7.22233 6.3672 6.74127 5.87314 6.19521 5.87314C5.64915 5.87314 5.19409 6.3672 5.19409 7.05628C5.19409 7.74536 5.65565 8.23291 6.19521 8.23291ZM8.75 16.2613C4.71954 16.2613 1.48867 13.0305 1.48867 8.9935C1.48867 4.95654 4.71304 1.73217 8.7435 1.73217C12.774 1.73217 16.0178 4.96304 16.0178 9C16.0178 13.037 12.787 16.2678 8.75 16.2678V16.2613ZM8.75 17.7435C13.5345 17.7435 17.5 13.778 17.5 8.9935C17.5 4.20895 13.5345 0.25 8.7435 0.25C3.95245 0.25 0 4.21545 0 9C0 13.7845 3.96545 17.75 8.75 17.75V17.7435Z'
                                    fill='#F2F2F2'
                                />
                            </svg>
                        </button>
                        <input placeholder={intl.formatMessage({id: 'messenger.type_message_placeholder', defaultMessage: 'Type message'})}/>
                        <button>
                            <svg
                                width='20'
                                height='20'
                                viewBox='0 0 20 20'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M10 13.75C10.9942 13.749 11.9475 13.3535 12.6505 12.6505C13.3535 11.9475 13.749 10.9942 13.75 10V5C13.75 4.00544 13.3549 3.05161 12.6517 2.34835C11.9484 1.64509 10.9946 1.25 10 1.25C9.00544 1.25 8.05161 1.64509 7.34835 2.34835C6.64509 3.05161 6.25 4.00544 6.25 5V10C6.25103 10.9942 6.64645 11.9475 7.34949 12.6505C8.05253 13.3535 9.00576 13.749 10 13.75ZM7.5 5C7.5 4.33696 7.76339 3.70107 8.23223 3.23223C8.70107 2.76339 9.33696 2.5 10 2.5C10.663 2.5 11.2989 2.76339 11.7678 3.23223C12.2366 3.70107 12.5 4.33696 12.5 5V10C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 10 12.5C9.33696 12.5 8.70107 12.2366 8.23223 11.7678C7.76339 11.2989 7.5 10.663 7.5 10V5ZM10.625 16.2188V18.125C10.625 18.2908 10.5592 18.4497 10.4419 18.5669C10.3247 18.6842 10.1658 18.75 10 18.75C9.83424 18.75 9.67527 18.6842 9.55806 18.5669C9.44085 18.4497 9.375 18.2908 9.375 18.125V16.2188C7.8341 16.062 6.40607 15.3393 5.36707 14.1907C4.32806 13.042 3.7519 11.5489 3.75 10C3.75 9.83424 3.81585 9.67527 3.93306 9.55806C4.05027 9.44085 4.20924 9.375 4.375 9.375C4.54076 9.375 4.69973 9.44085 4.81694 9.55806C4.93415 9.67527 5 9.83424 5 10C5 11.3261 5.52678 12.5979 6.46447 13.5355C7.40215 14.4732 8.67392 15 10 15C11.3261 15 12.5979 14.4732 13.5355 13.5355C14.4732 12.5979 15 11.3261 15 10C15 9.83424 15.0658 9.67527 15.1831 9.55806C15.3003 9.44085 15.4592 9.375 15.625 9.375C15.7908 9.375 15.9497 9.44085 16.0669 9.55806C16.1842 9.67527 16.25 9.83424 16.25 10C16.2481 11.5489 15.6719 13.042 14.6329 14.1907C13.5939 15.3393 12.1659 16.062 10.625 16.2188Z'
                                    fill='#F2F2F2'
                                />
                            </svg>
                        </button>
                    </div>
                    <div className='right'>
                        <button id='sendButton'>
                            <svg
                                width='16'
                                height='14'
                                viewBox='0 0 16 14'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M0.125 13.75L15.875 7L0.125 0.25V5.5L11.375 7L0.125 8.5V13.75Z'
                                    fill='white'
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </animated.div>
        </>
    );
};

export default injectIntl(Messenger);
