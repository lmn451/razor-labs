import { createContext, useContext } from "react";

// Define the initial state for the modal context
// Note: It's often good practice to define the shape of the context value
// even if the default implementation does nothing.
const initialModalState = {
  modalType: null,
  modalProps: {},
};

export const ModalContext = createContext({
  modalState: initialModalState,
  openModal: () => {
    console.warn("openModal called outside of ModalProvider");
  },
  closeModal: () => {
    console.warn("closeModal called outside of ModalProvider");
  },
});

// Custom hook to consume the ModalContext
export const useModal = () => useContext(ModalContext);
