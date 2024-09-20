import React, { useState } from "react";
import "./browser-search-section.scss";
import { LiaAngleLeftSolid } from "react-icons/lia";
import { LiaAngleRightSolid } from "react-icons/lia";
import { IoRefresh } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiLock } from "react-icons/ci";

const Browser_Search_Section = () => {
    const style = {
        color: "#F1F3F4",
        width: "20px",
        height: "20px",
        "&:hover": { cursor: "pointer" },
    };
    const defaultUrl = "www.infogito.com";

    // const [searchValue, setSearchValue] = useState("");
    return (
        <div className="browser-search-section">
            <LiaAngleLeftSolid className="icon" />
            <LiaAngleRightSolid className="icon" />
            <IoRefresh className="refresh-icon" />
            <div className="search-bar">
                <CiLock className="lock-icon" />
                <input
                    className="input-field"
                    type="text"
                    defaultValue={defaultUrl}
                />
            </div>

            <RxHamburgerMenu className="hamburg-icon" />
        </div>
    );
};

export default Browser_Search_Section;
