// modalReducer.ts
import { AppModalState, ModalActionTypes, OPEN_MODAL, CLOSE_MODAL } from "../../../../../types/appModal";

const initialState: AppModalState = {
  isOpen: false, // Modal is initially closed
};

const modalReducer = (state = initialState, action: ModalActionTypes): AppModalState => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, isOpen: true };
    case CLOSE_MODAL:
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

export default modalReducer;
