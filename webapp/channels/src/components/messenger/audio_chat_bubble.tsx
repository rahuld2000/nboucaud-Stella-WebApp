// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useEffect, useRef, useState, type CSSProperties} from 'react';
import {AudioVisualizer} from 'react-audio-visualize';

type Props = {
    userImage: string;
    audioSrc: string;
    duration: string;
    bubbleColor?: string;
    position?: 'left' | 'right';
}

const AudioChatBubble = ({userImage, audioSrc, duration, position = 'left', bubbleColor = '#EFFEDD'}: Props) => {
    const visualizerRef = useRef<HTMLCanvasElement>(null);
    const [blob, setBlob] = useState<Blob>();
    const [url, setUrl] = useState<string>('');
    const [audio, setAudio] = useState<HTMLAudioElement>();
    const [, setBlobState] = useState<'loading' | 'loaded' | 'error'>('loading');

    const toggleAudio = () => {
        if (audio) {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    };

    const loadAudio = (blob: Blob) => {
        setBlob(blob);
        setBlobState('loaded');

        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.load();

        setUrl(url);
        setAudio(audio);
    };

    useEffect(() => {
        const abortController = new AbortController();

        setBlobState('loading');

        fetch(audioSrc, {signal: abortController.signal}).
            then((res) => res.blob()).
            then(loadAudio).
            catch(() => {
                setBlobState('error');
            });

        return () => {
            abortController.abort();

            if (url !== '') {
                URL.revokeObjectURL(url);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audioSrc]);

    return (
        <div
            className='chat-message-container'
            style={{flexDirection: position === 'left' ? 'row' : 'row-reverse', '--bubble-color': bubbleColor} as CSSProperties}
        >
            <div
                className='chat-bubble'
                style={{flexDirection: position === 'left' ? 'row' : 'row-reverse'}}
            >
                <img
                    src={userImage}
                    className='user'
                    loading='lazy'
                />
                <div className='message'>
                    <div
                        className='bubble audio'
                        style={{marginLeft: position === 'left' ? 0 : 'auto'}}
                    >
                        <div className='audio-container'>
                            <button
                                className='play-pause-btn'
                                onClick={() => toggleAudio()}
                            >
                                <svg
                                    width='24'
                                    height='26'
                                    viewBox='0 0 24 26'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M5.22461 5.21739C5.22461 3.72265 6.80711 3.39253 7.67029 3.99044L18.1723 11.3719C18.7478 11.7944 19.3232 12.8407 18.1723 13.7776L7.67029 21.0308C6.80711 21.6287 5.22461 21.3609 5.22461 19.8313V12.5853V5.21739Z'
                                        fill='white'
                                    />
                                </svg>
                            </button>
                            <div>
                                {blob && (
                                    <AudioVisualizer
                                        ref={visualizerRef}
                                        blob={blob}
                                        width={150}
                                        height={50}
                                        barWidth={4}
                                        gap={0}
                                        barColor={'#62AC55'}
                                    />
                                )}
                                <div className='audio-footer'>
                                    <div>{duration}</div>
                                </div>
                            </div>
                        </div>
                        <button id='transcribe-btn'>
                            {'Transcribe'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioChatBubble;
