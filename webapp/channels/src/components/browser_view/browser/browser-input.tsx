// src/components/UrlInput.tsx

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUrl } from "./browser-state";

const UrlInput: React.FC = () => {
    const [url, setUrl] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (url) {
            dispatch(addUrl(url));
            setUrl("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
                required
            />
            <button type="submit">Add URL</button>
        </form>
    );
};

export default UrlInput;
