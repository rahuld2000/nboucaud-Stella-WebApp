import { AnyAction } from "redux";

// Define action type constants
export const ADD_TAB = 'ADD_TAB';
export const REMOVE_TAB = 'REMOVE_TAB';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const SET_ACTIVE_APP = 'SET_ACTIVE_APP';
export const REORDER_TABS = 'REORDER_TABS';

// Define action interfaces
interface AddTabAction {
    type: typeof ADD_TAB;
    payload: { id: string; title: string; uniqueId: string };
}

interface RemoveTabAction {
    type: typeof REMOVE_TAB;
    payload: string;
}

interface SetActiveTabAction {
    type: typeof SET_ACTIVE_TAB;
    payload: string;
}

interface SetActiveAppAction {
    type: typeof SET_ACTIVE_APP;
    payload: string;
}

interface ReorderTabsAction {
    type: typeof REORDER_TABS;
    payload: { sourceIndex: number; destinationIndex: number };
}

// Union action type
type TabActions = AddTabAction | RemoveTabAction | SetActiveTabAction | SetActiveAppAction | ReorderTabsAction;

// Define the TabState interface
interface TabState {
    tabs: { id: string; title: string; uniqueId: string }[];
    activeTab: string | null;
    activeApp: string | null;
}

// Initial state for the reducer
const initialState: TabState = {
    tabs: [],
    activeTab: null,
    activeApp: null,
};

// Action creators
export const addTab = (id: string, title: string): AddTabAction => ({
    type: ADD_TAB,
    payload: { id, title, uniqueId: `${id}-${Date.now()}` },
});

export const removeTab = (uniqueId: string): RemoveTabAction => ({
    type: REMOVE_TAB,
    payload: uniqueId,
});

export const setActiveTab = (uniqueId: string): SetActiveTabAction => ({
    type: SET_ACTIVE_TAB,
    payload: uniqueId,
});

export const setActiveApp = (id: string): SetActiveAppAction => ({
    type: SET_ACTIVE_APP,
    payload: id,
});

export const reorderTabs = (sourceIndex: number, destinationIndex: number): ReorderTabsAction => ({
    type: REORDER_TABS,
    payload: { sourceIndex, destinationIndex },
});

// Reducer function with proper typing
const tabReducer = (state: TabState = initialState, action: TabActions | AnyAction): TabState => {
    switch (action.type) {
        case ADD_TAB:
            return {
                ...state,
                tabs: [...state.tabs, { id: action.payload.id, title: action.payload.title, uniqueId: action.payload.uniqueId }],
                activeTab: action.payload.uniqueId,
                activeApp: action.payload.id,
            };
        case REMOVE_TAB:
            const newTabs = state.tabs.filter(tab => tab.uniqueId !== action.payload);
            const newActiveTab = state.activeTab === action.payload 
                ? (newTabs.length > 0 ? newTabs[0].uniqueId : null)
                : state.activeTab;

            return {
                ...state,
                tabs: newTabs,
                activeTab: newActiveTab,
                activeApp: newActiveTab ? newTabs[0]?.id || null : null,
            };
        case SET_ACTIVE_TAB:
            return {
                ...state,
                activeTab: action.payload,
            };
        case SET_ACTIVE_APP:
            return {
                ...state,
                activeApp: action.payload,
            };
        case REORDER_TABS: {
            const { sourceIndex, destinationIndex } = action.payload;
            const reorderedTabs = Array.from(state.tabs);
            const [movedTab] = reorderedTabs.splice(sourceIndex, 1);
            reorderedTabs.splice(destinationIndex, 0, movedTab);

            return {
                ...state,
                tabs: reorderedTabs,
            };
        }
        default:
            return state;
    }
};

export default tabReducer;
