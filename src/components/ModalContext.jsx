import { useState, useCallback, useMemo } from "react";
import ModalRenderer from "./ModalRenderer";
import { ModalContext } from "@/hooks/useModalContext";

const initialModalState = {
  modalType: null,
  modalProps: {},
};

export function ModalProvider({ children }) {
  const [modalState, setModalState] = useState(initialModalState);

  const openModal = useCallback((modalType, modalProps = {}) => {
    setModalState({ modalType, modalProps });
  }, []);

  const closeModal = useCallback(() => {
    setModalState(initialModalState);
  }, []);

  const contextValue = useMemo(
    () => ({
      modalState,
      openModal,
      closeModal,
    }),
    [modalState, openModal, closeModal],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <ModalRenderer />
    </ModalContext.Provider>
  );
}
