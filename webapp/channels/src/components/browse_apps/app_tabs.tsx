// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from "react";
import { useSelector, useDispatch } from "react-redux";

import iconlayer from "./layers-app-icon.svg";

import {
    addTab,
    removeTab,
    setActiveTab,
    setActiveApp,
} from "../../packages/mattermost-redux/src/actions/tabAction";
import "./app_tabs.scss";
import {
    IDENTIFIER_PATH_PATTERN,
    ID_PATH_PATTERN,
    TEAM_NAME_PATH_PATTERN,
} from "utils/path";
import { Link, useRouteMatch } from "react-router-dom";
interface Tab {
    id: string;
    title: string;
    uniqueId: string; // Ensure you have uniqueId in the Tab interface
}

interface AppState {
    tabs: {
        tabs: Tab[];
        activeTab: string | null;
        activeApp: string | null;
    };
}

const Tabs: React.FC = () => {
    const dispatch = useDispatch();

    const { tabs, activeTab, activeApp } = useSelector(
        (state: AppState) => state.tabs
    );
    const { url } = useRouteMatch();

    const handleTabClick = (uniqueId: string, id: string) => {
        dispatch(setActiveTab(uniqueId));
        dispatch(setActiveApp(id));
    };

    const handleCloseTab = (uniqueId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(removeTab(uniqueId));
    };

    return (
        <div className="tabs-container">
            {tabs.map((tab: Tab) => (
                <div
                    onClick={() => handleTabClick(tab.uniqueId, tab.id)}
                    key={tab.uniqueId}
                    className={`app-tab-wrap ${
                        activeTab === tab.uniqueId ? "active-tab" : ""
                    }`}
                >
                    <Link to={`${url}/browser-apps`}>
                        <span className="app-heading-text">
                            <img src={iconlayer} alt="icon" />
                            {`${tab.title} #${tab.uniqueId.slice(-2)}`}
                        </span>
                    </Link>
                    <button
                        className="app-close-tag"
                        onClick={(e) => handleCloseTab(tab.uniqueId, e)}
                    >
                        {"x"}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Tabs;
