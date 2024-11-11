import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import iconlayer from "./layers-app-icon.svg";
import {
    addTab,
    removeTab,
    setActiveTab,
    setActiveApp,
    reorderTabs,
} from "../../packages/mattermost-redux/src/actions/tabAction";
import "./app_tabs.scss";

import { Link, useRouteMatch } from "react-router-dom";

interface Tab {
    id: string;
    title: string;
    uniqueId: string;
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

    const onDragEnd = (result: any) => {
        const { source, destination } = result;
        if (!destination) return;

        // If reordered within the same group, update the order
        if (source.index !== destination.index) {
            dispatch(reorderTabs(source.index, destination.index));
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tabs-droppable" direction="vertical">
                {(provided) => (
                    <div
                        className="tabs-container"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tabs.map((tab: Tab, index) => (
                            <Draggable
                                key={tab.uniqueId}
                                draggableId={tab.uniqueId}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        onClick={() =>
                                            handleTabClick(tab.uniqueId, tab.id)
                                        }
                                        className={`app-tab-wrap ${
                                            activeTab === tab.uniqueId
                                                ? "active-tab"
                                                : ""
                                        }`}
                                    >
                                        <Link to={`${url}/browser-apps`}>
                                            <span className="app-heading-text">
                                                <img
                                                    src={iconlayer}
                                                    alt="icon"
                                                />
                                                {`${
                                                    tab.title
                                                } #${tab.uniqueId.slice(-2)}`}
                                            </span>
                                        </Link>
                                        <button
                                            className="app-close-tag"
                                            onClick={(e) =>
                                                handleCloseTab(tab.uniqueId, e)
                                            }
                                        >
                                            {"x"}
                                        </button>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default Tabs;
