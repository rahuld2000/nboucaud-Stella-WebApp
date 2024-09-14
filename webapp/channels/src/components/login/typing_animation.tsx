import React, { useState, useEffect } from 'react';
import './login.scss';

interface TypingAnimationProps {
    words: string[];
    typingSpeed?: number;
    pauseDuration?: number;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ words, typingSpeed = 150, pauseDuration = 1000 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const handleTyping = () => {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                if (charIndex > 0) {
                    setDisplayedText(currentWord.substring(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                } else {
                    setIsDeleting(false);
                    setWordIndex((wordIndex + 1) % words.length);
                }
            } else {
                if (charIndex < currentWord.length) {
                    setDisplayedText(currentWord.substring(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                } else {
                    setTimeout(() => setIsDeleting(true), pauseDuration);
                }
            }
        };

        const typingTimeout = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(typingTimeout);
    }, [charIndex, isDeleting, wordIndex, words, typingSpeed, pauseDuration]);

    return <span>{displayedText}<span className="cursor">|</span></span>;
};

export default TypingAnimation;
