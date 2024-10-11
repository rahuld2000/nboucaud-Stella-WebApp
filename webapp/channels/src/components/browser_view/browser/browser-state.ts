// src/store/urlManager.ts
import { AnyAction } from 'redux'; 

// Action Types
export const ADD_URL = 'ADD_URL';
export const REMOVE_URL = 'REMOVE_URL';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const SET_BROWSER_TAB_ACTIVE = 'SET_BROWSER_TAB_ACTIVE';

// Action Interfaces
interface AddUrlAction {
    type: typeof ADD_URL;
    payload: string;
}

interface RemoveUrlAction {
    type: typeof REMOVE_URL;
    payload: string;
}

interface SetActiveTabAction {
    type: typeof SET_ACTIVE_TAB;
    payload: number; // index of the active tab
}

interface SetBrowserTabActiveAction {
    type: typeof SET_BROWSER_TAB_ACTIVE; // New interface
}

// Action Creators
export const addUrl = (url: string): AddUrlAction => ({
    type: ADD_URL,
    payload: url,
});

export const removeUrl = (url: string): RemoveUrlAction => ({
    type: REMOVE_URL,
    payload: url,
});

export const setActiveTab = (index: number): SetActiveTabAction => ({
    type: SET_ACTIVE_TAB,
    payload: index,
});

// This action will set the browser tab to active
export const setBrowserTabActive = (): SetBrowserTabActiveAction => ({
    type: SET_BROWSER_TAB_ACTIVE,
});

// State Interface
interface UrlManagerState {
    urls: string[];
    activeTabIndex: number | null;
    isBrowserTabActive: boolean; 
}

// Initial State
const initialState: UrlManagerState = {
    urls: [],
    activeTabIndex: null,
    isBrowserTabActive: true,
};

// Reducer
const urlManagerReducer = (
    state = initialState, 
    action: AnyAction
): UrlManagerState => {
    switch (action.type) {
        case ADD_URL:
            return { ...state, urls: [...state.urls, action.payload] };
        case REMOVE_URL:
            return { ...state, urls: state.urls.filter(url => url !== action.payload) };
        case SET_ACTIVE_TAB:
            return { ...state, activeTabIndex: action.payload, isBrowserTabActive: false }; // Set browser tab to false when a URL tab is activated
        case SET_BROWSER_TAB_ACTIVE:
            return { ...state, activeTabIndex: null, isBrowserTabActive: true }; // Handle the action to set the BrowserTab active
        default:
            return state;
    }
};

export default urlManagerReducer;
