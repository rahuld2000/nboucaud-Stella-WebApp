// src/components/UrlTabs.tsx

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab, removeUrl } from "./browser-state";

const UrlTabs: React.FC = () => {
    const { urls, activeTabIndex } = useSelector(
        (state: any) => state.urlManager
    );
    const dispatch = useDispatch();

    return (
        <div className="tabs-wrapper">
            {urls.map((url: any, index: any) => (
                <div
                    className="browser-tab"
                    key={index}
                    style={{
                        display: "flex",
                        paddingBottom: "5px",
                        paddingRight: "5px",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <button
                        className="button--tab"
                        onClick={() => dispatch(setActiveTab(index))}
                    >
                        {url}
                    </button>
                    <button
                        className="button--tab"
                        onClick={() => dispatch(removeUrl(url))}
                    >
                        X
                    </button>
                </div>
            ))}
            {/* {activeTabIndex !== null && (
                <p>Active Tab: {urls[activeTabIndex]}</p>
            )} */}
        </div>
    );
};

export default UrlTabs;
