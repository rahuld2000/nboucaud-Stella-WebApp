// src/components/UrlTabs.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setActivebrowserTab,
    addbrowserTab,
    removebrowserTab,
} from "./browser-state";
import "./browsertabs.scss";
import { LuPlus } from "react-icons/lu";

const UrlTabs: React.FC = () => {
    const { tabs, activeTabIndex } = useSelector(
        (state: any) => state.urlManager
    );
    const dispatch = useDispatch();
    const state = useSelector((state: any) => state);
    const idnumber = state.tabs.length;
    return (
        <div className="tabs-wrapper">
            {tabs.map((tab: any, index: any) => (
                <div
                    key={tab.id}
                    className={
                        activeTabIndex === index
                            ? "active-browser custom-tabs"
                            : "custom-tabs"
                    }
                >
                    <button
                        onClick={() => dispatch(setActivebrowserTab(index))}
                    >
                        Tab {index + 1}
                    </button>
                    <button onClick={() => dispatch(removebrowserTab(index))}>
                        x
                    </button>
                </div>
            ))}
            <LuPlus
                onClick={() => dispatch(addbrowserTab(idnumber))}
                className="icon"
            />
        </div>
    );
};

export default UrlTabs;
