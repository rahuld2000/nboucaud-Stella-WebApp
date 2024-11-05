// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import { useSpring, animated } from "@react-spring/web";
import React, { useState } from "react";

import Messenger from "./messenger"; // Ensure your Messenger component is correctly imported

import messengerIcon from "../../images/messenger.png";

const MESSENGER_WIDTH = 300; // Set the width of each Messenger popup

const MessengerPopup = () => {
    const [popupOpen, setPopupOpen] = useState(false);
    const [messengers, setMessengers] = useState([{ id: 0 }]); // Initial Messenger state

    const [popupBtnAnimStyles] = useSpring(() => {
        if (popupOpen) {
            return {
                from: { translateY: 0 },
                to: { translateY: 150 },
                config: {
                    bounce: 0.8,
                },
            };
        }

        return {
            from: { translateY: 150 },
            to: { translateY: 0 },
            config: {
                bounce: 0.8,
            },
        };
    }, [popupOpen]);

    // Function to toggle the popup visibility
    const handlePopupToggle = () => {
        setPopupOpen(true); // Open the popup when clicking the button
    };

    const closePopup = (id: any) => {
        setMessengers((prev) =>
            prev.filter((messenger) => messenger.id !== id)
        );
        // Close the popup if no messengers are left
        if (messengers.length === 1) {
            setPopupOpen(false);
        }
    };

    const cloneMessenger = (id: any) => {
        const newId = messengers.length; // Generate a new ID
        setMessengers((prev) => [...prev, { id: newId }]); // Add new Messenger with the new ID
    };

    return (
        <div id="messenger_popup" style={{ position: "relative" }}>
            <animated.div
                style={{ ...popupBtnAnimStyles, position: "relative" }}
            >
                <button id="messenger_popup_button" onClick={handlePopupToggle}>
                    <img src={messengerIcon} alt="Messenger" />
                </button>
            </animated.div>

            {popupOpen &&
                messengers.map((messenger, index) => (
                    <animated.div
                        key={messenger.id}
                        style={{
                            position: "absolute",
                            left: `${index * MESSENGER_WIDTH}px`, // Position each messenger based on its index
                            top: 0, // Adjust vertical position if needed
                        }}
                    >
                        <Messenger
                            onClose={() => closePopup(messenger.id)}
                            onClone={() => cloneMessenger(messenger.id)} // Pass the onClone function
                        />
                    </animated.div>
                ))}
        </div>
    );
};

export default MessengerPopup;
