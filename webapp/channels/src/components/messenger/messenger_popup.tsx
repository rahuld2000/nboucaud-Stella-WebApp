import { useSpring, animated } from "@react-spring/web";
import React, { useState, useRef, useEffect } from "react";
import type { IntlShape } from "react-intl";
import Messenger from "./messenger";
import messengerIcon from "../../images/messenger.png";

type Props = {
    intl: IntlShape;
};

type MessengerType = {
    id: number;
    x: number;
    y: number;
    mergedIds: number[];
};

const MERGE_DISTANCE = 30; // Adjusted merge detection distance for better sensitivity

const MessengerPopup = ({ intl }: Props) => {
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [messengers, setMessengers] = useState<MessengerType[]>([]);
    const [draggingId, setDraggingId] = useState<number | null>(null);
    const dragStartRef = useRef({ x: 0, y: 0 });
    const messengerStartRef = useRef({ x: 0, y: 0 });
    const lastMergeTime = useRef(Date.now());

    const buttonAnimation = useSpring({
        opacity: isButtonVisible ? 1 : 0,
        transform: `translateY(${isButtonVisible ? 0 : 150}px)`,
        config: { tension: 180, friction: 12 },
    });

    const handlePopupToggle = () => {
        if (isButtonVisible) {
            setMessengers([{ id: 0, x: 0, y: 0, mergedIds: [] }]);
            setIsButtonVisible(false);
        }
    };

    const unmergeMessenger = (messenger: MessengerType) => {
        if (messenger.mergedIds.length === 0) return;

        setMessengers((prev) => {
            const unmergedMessengers = messenger.mergedIds.map((id, index) => ({
                id,
                x: messenger.x + 30 * (index + 1),
                y: messenger.y + 30 * (index + 1),
                mergedIds: [],
            }));

            return prev
                .filter((m) => m.id !== messenger.id)
                .concat([{ ...messenger, mergedIds: [] }], unmergedMessengers);
        });
    };

    const closePopup = (id: number) => {
        setMessengers((prev) => {
            const messengerToClose = prev.find((m) => m.id === id);
            if (!messengerToClose) return prev;

            if (messengerToClose.mergedIds.length > 0) {
                const unmergedMessengers = messengerToClose.mergedIds.map(
                    (mId, index) => ({
                        id: mId,
                        x: messengerToClose.x + 30 * (index + 1),
                        y: messengerToClose.y + 30 * (index + 1),
                        mergedIds: [],
                    })
                );
                return prev
                    .filter((m) => m.id !== id)
                    .concat(unmergedMessengers);
            }

            return prev
                .map((m) => ({
                    ...m,
                    mergedIds: m.mergedIds.filter((mId) => mId !== id),
                }))
                .filter((m) => m.id !== id);
        });

        setMessengers((prev) => {
            if (prev.length <= 1) {
                setTimeout(() => setIsButtonVisible(true), 300);
            }
            return prev;
        });
    };

    const cloneMessenger = () => {
        setMessengers((prev) => {
            const newId = Math.max(...prev.map((m) => m.id), -1) + 1;
            return [...prev, { id: newId, x: 30, y: 30, mergedIds: [] }];
        });
    };

    const startDragging = (e: React.MouseEvent, messenger: MessengerType) => {
        e.stopPropagation();
        dragStartRef.current = { x: e.clientX, y: e.clientY };
        messengerStartRef.current = { x: messenger.x, y: messenger.y };
        setDraggingId(messenger.id);
    };

    const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    const mergeMessengers = (sourceId: number, targetId: number) => {
        const now = Date.now();
        if (now - lastMergeTime.current < 200) return; // Debounce merging
        lastMergeTime.current = now;

        setMessengers((prev) => {
            const source = prev.find((m) => m.id === sourceId);
            const target = prev.find((m) => m.id === targetId);

            if (!source || !target) return prev;

            const allMergedIds = [
                ...target.mergedIds,
                ...source.mergedIds,
                sourceId,
            ];

            return prev
                .filter((m) => m.id !== sourceId)
                .map((m) =>
                    m.id === targetId
                        ? {
                              ...m,
                              mergedIds: [...new Set(allMergedIds)],
                          }
                        : m
                );
        });

        setDraggingId(null);
    };

    const onDrag = (e: MouseEvent) => {
        if (draggingId === null) return;

        const deltaX = e.clientX - dragStartRef.current.x;
        const deltaY = e.clientY - dragStartRef.current.y;

        setMessengers((prev) => {
            const draggedMessenger = prev.find((m) => m.id === draggingId);
            if (!draggedMessenger) return prev;

            const newX = messengerStartRef.current.x + deltaX;
            const newY = messengerStartRef.current.y + deltaY;

            prev.forEach((target) => {
                if (
                    target.id !== draggingId &&
                    !target.mergedIds.includes(draggingId)
                ) {
                    const distance = getDistance(
                        newX,
                        newY,
                        target.x,
                        target.y
                    );
                    if (distance < MERGE_DISTANCE) {
                        mergeMessengers(draggingId, target.id);
                    }
                }
            });

            return prev.map((m) =>
                m.id === draggingId ? { ...m, x: newX, y: newY } : m
            );
        });
    };

    const stopDragging = () => {
        setDraggingId(null);
    };

    useEffect(() => {
        if (draggingId !== null) {
            window.addEventListener("mousemove", onDrag);
            window.addEventListener("mouseup", stopDragging);

            return () => {
                window.removeEventListener("mousemove", onDrag);
                window.removeEventListener("mouseup", stopDragging);
            };
        }
    }, [draggingId]);

    return (
        <div
            id="messenger_popup"
            className="fixed bottom-4 right-4"
            style={{ zIndex: 1000 }}
        >
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

            <div>
                {messengers.map((messenger) => (
                    <animated.div
                        id={`messenger-${messenger.id}`}
                        key={messenger.id}
                        style={{
                            position: "absolute",
                            transform: `translate(${messenger.x}px, ${messenger.y}px)`,
                            cursor:
                                draggingId === messenger.id
                                    ? "grabbing"
                                    : "grab",
                            transition: "transform 0.3s ease-out", // Smooth animation
                        }}
                        onMouseDown={(e) => startDragging(e, messenger)}
                    >
                        <div style={{ position: "relative" }}>
                            <Messenger
                                intl={intl}
                                onClose={() => closePopup(messenger.id)}
                                onClone={cloneMessenger}
                            />
                            {messenger.mergedIds.length > 0 && (
                                <button
                                    onClick={() => unmergeMessenger(messenger)}
                                    className="popup-button"
                                >
                                    {messenger.mergedIds.length + 1}
                                </button>
                            )}
                        </div>
                    </animated.div>
                ))}
            </div>
        </div>
    );
};

export default MessengerPopup;
