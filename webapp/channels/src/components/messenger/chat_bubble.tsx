// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useState, type CSSProperties} from 'react';
import {Modal} from 'react-bootstrap';

type Props = {
    userImage: string;
    text: string;
    images?: string[];
    bubbleColor?: string;
    position?: 'left' | 'right';
}

const ChatBubble = ({userImage, text, images, position = 'left', bubbleColor = '#14B8A6'}: Props) => {
    const [currentImage, setCurrentImage] = useState<string>();
    const [modalOpened, setModalOpened] = useState(false);

    const popupImage = (src: string) => {
        setCurrentImage(src);
        setModalOpened(true);
    };

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
                        className='bubble'
                        style={{marginLeft: position === 'left' ? 0 : 'auto'}}
                    >
                        {text}
                    </div>
                    {images && images.length > 0 && (
                        <div className='images'>
                            {images.map((image) => (
                                <img
                                    src={image}
                                    key={image}
                                    loading='lazy'
                                    onClick={() => popupImage(image)}
                                />),
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Modal
                show={modalOpened}
                onHide={() => setModalOpened(false)}
                id='imagePopupModal'
            >
                <img
                    src={currentImage}
                    className='modal-image'
                />
            </Modal>
        </div>
    );
};

export default ChatBubble;
