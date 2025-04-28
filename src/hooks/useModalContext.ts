import { createContext, useContext } from "react";
import { MODAL_TYPES } from "@/constants/modalTypes";

// Define types for our modal state
export interface ModalState {
  modalType: keyof typeof MODAL_TYPES | null;
  modalProps: Record<string, any>;
}

// Define the context type
export interface ModalContextType {
  modalState: ModalState;
  openModal: (
    modalType: keyof typeof MODAL_TYPES,
    modalProps?: Record<string, any>
  ) => void;
  closeModal: () => void;
}

// Define the initial state for the modal context
const initialModalState: ModalState = {
  modalType: null,
  modalProps: {},
};

// Create the context with a default implementation
export const ModalContext = createContext<ModalContextType>({
  modalState: initialModalState,
  openModal: () => {
    console.warn("openModal called outside of ModalProvider");
  },
  closeModal: () => {
    console.warn("closeModal called outside of ModalProvider");
  },
});

// Custom hook to consume the ModalContext
export const useModal = (): ModalContextType => useContext(ModalContext);
