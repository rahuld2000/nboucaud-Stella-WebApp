// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { memo } from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";

import auditIcon from "../../images/audit.png";
import comboChartIcon from "../../images/combo-chart.png";
import robotImage from "../../images/internet_browser_robot.png";
import messageIcon from "../../images/message.png";
import notebookIcon from "../../images/notebook.png";
import screenshotIcon from "../../images/screenshot.png";
import layerIcon from "../browse_apps/layers-app-icon.svg";
import "./sidebar_left_right.scss";

import type { PropsFromRedux } from "./index";
import { useDispatch } from "react-redux";
import { addTab, setActiveApp } from "mattermost-redux/actions/tabAction";
import { openModal } from "mattermost-redux/actions/modalActions";
import html2canvas from "html2canvas";

export interface Props extends PropsFromRedux {}

const SideBarLeftRight = (props: Props) => {
    const { pathname } = useLocation();
    const urlParts = pathname.split("/");
    const teamName = urlParts.length > 1 ? `/${urlParts[1]}` : "";

    const location = useLocation();
    const url = location.pathname;
    const match = url.match(/^\/[^/]+/);
    const dynamicPath = match ? match[0] : "";
    console.log(dynamicPath);
    const dispatch = useDispatch();

    const handleOpenplayfairApp = () => {
        const uniqueId = `playfair-${Date.now()}`;
        dispatch(addTab("playfair", "Play Fair", uniqueId));
        dispatch(setActiveApp("playfair"));
    };
    const handleOpenflowApp = () => {
        const uniqueId = `flow-${Date.now()}`;
        dispatch(addTab("flow", "Flow", uniqueId));
        dispatch(setActiveApp("flow"));
    };
    const handleOpenplaybookApp = () => {
        const uniqueId = `playbook-${Date.now()}`;
        dispatch(addTab("playbook", "Playbook", uniqueId));
        dispatch(setActiveApp("playbook"));
    };

    const handleCaptureClick = async () => {
        const rootElement = document.getElementById("channel_view");
        console.log("click");

        if (rootElement) {
            try {
                const canvas = await html2canvas(rootElement);
                const dataUrl = canvas.toDataURL("image/png");

                // Automatically trigger download
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = "screenshot.png";
                link.click();
            } catch (error) {
                console.error("Screenshot capture failed:", error);
            }
        }
    };

    return (
        <div className="home-screen-wrapper__sidebar right">
            <div className="top">
                <div className="group">
                    <Link to={`${dynamicPath}/browser-apps`}>
                        <button onClick={handleOpenplayfairApp}>
                            <img src={comboChartIcon} />
                        </button>
                    </Link>
                    <Link to={`${dynamicPath}/browser-apps`}>
                        <button onClick={handleOpenflowApp}>
                            <img src={auditIcon} />
                        </button>
                    </Link>
                    <Link to={`${dynamicPath}/browser-apps`}>
                        <button onClick={handleOpenplaybookApp}>
                            <img src={notebookIcon} />
                        </button>
                    </Link>

                    <img
                        style={{ cursor: "pointer" }}
                        onClick={() => dispatch(openModal())}
                        src={layerIcon}
                    />
                    <img
                        style={{ cursor: "pointer" }}
                        onClick={handleCaptureClick}
                        src={screenshotIcon}
                    />
                </div>
            </div>
            <div className="bottom">
                <img src={robotImage} />
            </div>
        </div>
    );
};

export default memo(SideBarLeftRight);
