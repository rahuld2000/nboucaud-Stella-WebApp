import { useSpring, animated } from "@react-spring/web";
import React, { useState } from "react";
import type { IntlShape } from "react-intl";

import Messenger from "./messenger";
import messengerIcon from "../../images/messenger.png";

const MESSENGER_WIDTH = 320; // Match the MINIMUM_WIDTH from Messenger component

type Props = {
    intl: IntlShape;
};

const MessengerPopup = ({ intl }: Props) => {
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [messengers, setMessengers] = useState<Array<{ id: number }>>([]);

    // Button animation
    const buttonAnimation = useSpring({
        opacity: isButtonVisible ? 1 : 0,
        transform: `translateY(${isButtonVisible ? 0 : 150}px)`,
        config: {
            tension: 180,
            friction: 12,
        },
    });

    // Handle button click
    const handlePopupToggle = () => {
        if (isButtonVisible) {
            setMessengers([{ id: 0 }]);
            setIsButtonVisible(false);
        }
    };

    // Handle popup close
    const closePopup = (id: number) => {
        setMessengers((prev) =>
            prev.filter((messenger) => messenger.id !== id)
        );

        // If closing the last messenger, show the button again
        if (messengers.length === 1) {
            setTimeout(() => {
                setIsButtonVisible(true);
            }, 300);
        }
    };

    // Clone messenger
    const cloneMessenger = () => {
        const newId =
            messengers.length > 0
                ? Math.max(...messengers.map((m) => m.id)) + 1
                : 0;
        setMessengers((prev) => [...prev, { id: newId }]);
    };

    return (
        <div
            id="messenger_popup"
            className="fixed bottom-4 right-4"
            style={{ zIndex: 1000 }}
        >
            {/* Button */}
            <animated.div style={buttonAnimation}>
                {isButtonVisible && (
                    <button
                        id="messenger_popup_button"
                        onClick={handlePopupToggle}
                    >
                        <img src={messengerIcon} alt="Messenger" />
                    </button>
                )}
            </animated.div>

            {/* Messengers Container */}
            <div className="absolute bottom-0 right-0 flex gap-4">
                {messengers.map((messenger) => (
                    <Messenger
                        key={messenger.id}
                        intl={intl}
                        onClose={() => closePopup(messenger.id)}
                        onClone={cloneMessenger}
                    />
                ))}
            </div>
        </div>
    );
};

export default MessengerPopup;
