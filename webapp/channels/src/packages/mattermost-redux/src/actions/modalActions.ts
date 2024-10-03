import { OPEN_MODAL, CLOSE_MODAL, ModalActionTypes } from '../../../../types/appModal';

export const openModal = (): ModalActionTypes => ({ type: OPEN_MODAL });
export const closeModal = (): ModalActionTypes => ({ type: CLOSE_MODAL });