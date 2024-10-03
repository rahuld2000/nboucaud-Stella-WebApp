import { AnyAction } from "redux";

// Define action type constants
export const ADD_TAB = 'ADD_TAB';
export const REMOVE_TAB = 'REMOVE_TAB';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const SET_ACTIVE_APP = 'SET_ACTIVE_APP';

// Define action interfaces
interface AddTabAction {
    type: typeof ADD_TAB;
    payload: { id: string; title: string; uniqueId: string }; // Include uniqueId
}

interface RemoveTabAction {
    type: typeof REMOVE_TAB;
    payload: string; // Assuming this will be uniqueId for removal
}

interface SetActiveTabAction {
    type: typeof SET_ACTIVE_TAB;
    payload: string;
}

interface SetActiveAppAction {
    type: typeof SET_ACTIVE_APP;
    payload: string;
}

// Union action type
type TabActions = AddTabAction | RemoveTabAction | SetActiveTabAction | SetActiveAppAction;

// Define the TabState interface
interface TabState {
    tabs: { id: string; title: string; uniqueId: string }[]; // Updated structure to include uniqueId
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
    payload: { id, title, uniqueId: `${id}-${Date.now()}` }, // Generate a unique ID
});

export const removeTab = (uniqueId: string): RemoveTabAction => ({
    type: REMOVE_TAB,
    payload: uniqueId, // Pass uniqueId for removal
});

export const setActiveTab = (uniqueId: string): SetActiveTabAction => ({
    type: SET_ACTIVE_TAB,
    payload: uniqueId, // Ensure you are using uniqueId here
});

export const setActiveApp = (id: string): SetActiveAppAction => ({
    type: SET_ACTIVE_APP,
    payload: id, // Payload is the app id
});

// Reducer function with proper typing
const tabReducer = (state: TabState = initialState, action: TabActions | AnyAction): TabState => {
    switch (action.type) {
        case ADD_TAB:
            return {
                ...state,
                tabs: [...state.tabs, { id: action.payload.id, title: action.payload.title, uniqueId: action.payload.uniqueId }],
                activeTab: action.payload.uniqueId, // Set the active tab to the uniqueId
                activeApp: action.payload.id, // Set active app to the app id
            };
        case REMOVE_TAB:
            const newTabs = state.tabs.filter(tab => tab.uniqueId !== action.payload); // Filter by uniqueId
            const newActiveTab = state.activeTab === action.payload 
                ? (newTabs.length > 0 ? newTabs[0].uniqueId : null) // If removed, set the first tab as active, or null
                : state.activeTab;

            return {
                ...state,
                tabs: newTabs,
                activeTab: newActiveTab,
                activeApp: newActiveTab ? newTabs[0]?.id || null : null, // Set activeApp to null if no activeTab
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
        default:
            return state;
    }
};

export default tabReducer;
