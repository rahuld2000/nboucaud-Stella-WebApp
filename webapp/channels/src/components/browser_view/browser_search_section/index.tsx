import React, { useState } from "react";
import "./browser-search-section.scss";
import { LiaAngleLeftSolid } from "react-icons/lia";
import { LiaAngleRightSolid } from "react-icons/lia";
import { IoRefresh } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiLock } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
    nextTabUrl,
    prevTabUrl,
    reloadTabUrl,
    setTabUrl,
} from "../browser/browser-state";

const Browser_Search_Section = () => {
    const style = {
        color: "#F1F3F4",
        width: "20px",
        height: "20px",
        "&:hover": { cursor: "pointer" },
    };
    const [url, setUrl] = useState("");
    const dispatch = useDispatch();
    const { activeTabIndex } = useSelector((state: any) => state.urlManager);

    const handlePrevClick = () => {
        dispatch(prevTabUrl());
    };

    const handleNextClick = () => {
        dispatch(nextTabUrl());
    };

    const handleReloadClick = () => {
        dispatch(reloadTabUrl());
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (url) {
            dispatch(setTabUrl(activeTabIndex, url));
            setUrl("");
        }
    };

    // const [searchValue, setSearchValue] = useState("");
    return (
        <div className="browser-search-section">
            <LiaAngleLeftSolid className="icon" onClick={handlePrevClick} />
            <LiaAngleRightSolid className="icon" onClick={handleNextClick} />
            <IoRefresh className="refresh-icon" onClick={handleReloadClick} />
            <div className="search-bar">
                <CiLock className="lock-icon" />
                <form onSubmit={handleSubmit}>
                    <input
                        className="input-field"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Type a URL"
                    />
                </form>
            </div>

            <RxHamburgerMenu className="hamburg-icon" />
        </div>
    );
};

export default Browser_Search_Section;
