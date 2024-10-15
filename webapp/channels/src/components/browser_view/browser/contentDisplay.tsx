// src/components/ContentDisplay.tsx
import React from "react";
import { useSelector } from "react-redux";

import UrlIframe from "./browser-iframe";
import BrowserBody from "../browser_body";

const ContentDisplay: React.FC = () => {
    const { tabs, activeTabIndex } = useSelector(
        (state: any) => state.urlManager
    );
    const activeTab = tabs[activeTabIndex];

    return (
        <div className="tab-content">
            {activeTab.url ? (
                <UrlIframe url={activeTab.url} />
            ) : (
                <BrowserBody />
            )}
        </div>
    );
};

export default ContentDisplay;
