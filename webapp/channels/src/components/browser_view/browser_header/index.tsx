import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuPlus } from "react-icons/lu";
import { LiaCompass } from "react-icons/lia";
import {
    setBrowserTabActive,
    setActiveTab,
    addUrl,
} from "../browser/browser-state";
import UrlTabs from "../browser/browser-tab";
import "./browser-header.scss";

const BrowserHeader = () => {
    const dispatch = useDispatch();
    const { urls, activeTabIndex, isBrowserTabActive } = useSelector(
        (state: any) => state.urlManager
    );

    return (
        <div className="browser-header">
            {/* Default BrowserTab (Infogito) */}
            <div
                className={`browser-tab`}
                onClick={() => dispatch(setBrowserTabActive())}
            >
                <LiaCompass className="icon" /> <span>Infogito</span>
            </div>

            {/* Dynamic URL Tabs */}
            <UrlTabs />

            {/* Add New Tab Button */}
            <LuPlus
                className="icon"
                onClick={() => dispatch(addUrl("https://www.example.com"))}
            />
        </div>
    );
};

export default BrowserHeader;
