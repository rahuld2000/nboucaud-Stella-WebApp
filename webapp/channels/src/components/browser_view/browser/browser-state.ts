import { AnyAction } from 'redux';

// Action Types
export const ADD_BROWSER_TAB = 'ADD_BROWSER_TAB';
export const REMOVE_BROWSER_TAB = 'REMOVE_BROWSER_TAB';
export const SET_ACTIVE_BROWSER_TAB = 'SET_ACTIVE_BROWSER_TAB';
export const SET_TAB_URL = 'SET_TAB_URL';
export const PREV_TAB_URL = 'PREV_TAB_URL';
export const NEXT_TAB_URL = 'NEXT_TAB_URL';
export const RELOAD_TAB_URL = 'RELOAD_TAB_URL';

// Action Interfaces
interface AddTabAction {
  type: typeof ADD_BROWSER_TAB;
}

interface RemoveTabAction {
  type: typeof REMOVE_BROWSER_TAB;
  payload: number; // index of the tab to remove
}

interface SetActiveTabAction {
  type: typeof SET_ACTIVE_BROWSER_TAB;
  payload: number; // index of the active tab
}

interface SetTabUrlAction {
  type: typeof SET_TAB_URL;
  payload: {
    index: number;
    url: string; // URL to set in the tab
  };
}

interface PrevTabUrlAction {
  type: typeof PREV_TAB_URL;
}

interface NextTabUrlAction {
  type: typeof NEXT_TAB_URL;
}

interface ReloadTabUrlAction {
  type: typeof RELOAD_TAB_URL;
}

// Action Creators
export const addbrowserTab = (id: number): AddTabAction & { payload: { id: number; title: string; uniqueId?: string } } => ({
  type: ADD_BROWSER_TAB,
  payload: { id: Date.now(), title: "New Tab", uniqueId: "" },
});

export const removebrowserTab = (index: number): RemoveTabAction => ({
  type: REMOVE_BROWSER_TAB,
  payload: index,
});

export const setActivebrowserTab = (index: number): SetActiveTabAction => ({
  type: SET_ACTIVE_BROWSER_TAB,
  payload: index,
});

export const setTabUrl = (index: number, url: string): SetTabUrlAction => ({
  type: SET_TAB_URL,
  payload: { index, url },
});

export const prevTabUrl = (): PrevTabUrlAction => ({
  type: PREV_TAB_URL,
});

export const nextTabUrl = (): NextTabUrlAction => ({
  type: NEXT_TAB_URL,
});

export const reloadTabUrl = (): ReloadTabUrlAction => ({
  type: RELOAD_TAB_URL,
});

// State Interface
interface Tab {
  id: number; // Unique identifier for the tab
  url: string | null; // URL or null to indicate BrowserBody
  history: string[]; // URL history for the tab
  historyIndex: number; // Current index in the URL history
}

interface UrlManagerState {
  tabs: Tab[]; // Array of tabs
  activeTabIndex: number; // Active tab index
}

// Initial State
const initialState: UrlManagerState = {
  tabs: [{ id: 0, url: null, history: [], historyIndex: -1 }],
  activeTabIndex: 0,
};

// Helper functions
const getPreviousUrl = (tab: Tab): string | null => {
  if (tab.historyIndex > 0) {
    return tab.history[tab.historyIndex - 1];
  }
  return null;
};

const getNextUrl = (tab: Tab): string | null => {
  if (tab.historyIndex < tab.history.length - 1) {
    return tab.history[tab.historyIndex + 1];
  }
  return null;
};

// Reducer
const urlManagerReducer = (state = initialState, action: AnyAction): UrlManagerState => {
  switch (action.type) {
    case ADD_BROWSER_TAB:
      const newTabId = state.tabs?.length ?? 0;
      return {
        ...state,
        tabs: [
          ...state.tabs,
          { id: newTabId, url: null, history: [], historyIndex: -1 },
        ],
        activeTabIndex: newTabId,
      };

    case REMOVE_BROWSER_TAB:
      if (state.tabs.length === 1) return state; // Prevent removing the last tab
      return {
        ...state,
        tabs: state.tabs.filter((_, idx) => idx !== action.payload),
        activeTabIndex: Math.max(0, state.activeTabIndex - 1), // Adjust active tab index if needed
      };

    case SET_ACTIVE_BROWSER_TAB:
      return {
        ...state,
        activeTabIndex: action.payload, // Update the active tab index
      };

    case SET_TAB_URL:
      return {
        ...state,
        tabs: state.tabs.map((tab, idx) =>
          idx === action.payload.index
            ? {
                ...tab,
                url: action.payload.url,
                history: [...tab.history.slice(0, tab.historyIndex + 1), action.payload.url],
                historyIndex: tab.historyIndex + 1,
              }
            : tab
        ),
      };

    case PREV_TAB_URL:
      return {
        ...state,
        tabs: state.tabs.map((tab, index) =>
          index === state.activeTabIndex
            ? {
                ...tab,
                url: getPreviousUrl(tab),
                historyIndex: tab.historyIndex > 0 ? tab.historyIndex - 1 : tab.historyIndex,
              }
            : tab
        ),
      };

    case NEXT_TAB_URL:
      return {
        ...state,
        tabs: state.tabs.map((tab, index) =>
          index === state.activeTabIndex
            ? {
                ...tab,
                url: getNextUrl(tab),
                historyIndex: tab.historyIndex < tab.history.length - 1 ? tab.historyIndex + 1 : tab.historyIndex,
              }
            : tab
        ),
      };

    case RELOAD_TAB_URL:
      return {
        ...state,
        tabs: state.tabs.map((tab, index) =>
          index === state.activeTabIndex
            ? { ...tab, url: tab.url }
            : tab
        ),
      };

    default:
      return state; // Return unchanged state for unknown action types
  }
};

export default urlManagerReducer;