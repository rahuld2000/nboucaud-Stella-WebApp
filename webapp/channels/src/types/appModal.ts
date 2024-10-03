export interface AppModalState {
    isOpen: boolean;
  }
  
  export interface RootState {
    appModal: AppModalState; // Include appModal as part of your root state
    // other states can go here
}


  export const OPEN_MODAL = 'OPEN_MODAL';
  export const CLOSE_MODAL = 'CLOSE_MODAL';
  
  interface OpenModalAction {
    type: typeof OPEN_MODAL;
  }
  
  interface CloseModalAction {
    type: typeof CLOSE_MODAL;
  }
  
  export type ModalActionTypes = OpenModalAction | CloseModalAction;