// Action type constants
export const ADD_TAB = 'ADD_TAB';
export const REMOVE_TAB = 'REMOVE_TAB';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const SET_ACTIVE_APP = 'SET_ACTIVE_APP';
export const REORDER_TABS = 'REORDER_TABS'; // New action for reordering tabs

// Action creators
export const addTab = (id: string, title: string, uniqueId: string) => ({
    type: ADD_TAB,
    payload: { 
        id, 
        title, 
        uniqueId 
    },
});

export const removeTab = (uniqueId: string) => ({
    type: REMOVE_TAB,
    payload: uniqueId, // Expecting uniqueId for removal
});

export const setActiveTab = (uniqueId: string) => ({
    type: SET_ACTIVE_TAB,
    payload: uniqueId, // Expecting uniqueId for setting active tab
});

export const setActiveApp = (id: string) => ({
    type: SET_ACTIVE_APP, // Correct action type
    payload: id, // Payload is the app id
});

// New action creator for reordering tabs
export const reorderTabs = (sourceIndex: number, destinationIndex: number) => ({
    type: REORDER_TABS,
    payload: { sourceIndex, destinationIndex },
});
