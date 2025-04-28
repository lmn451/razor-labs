import React, { useState, useCallback, useMemo, ReactNode } from "react";
import ModalRenderer from "./ModalRenderer.tsx";
import { ModalContext, ModalState } from "@/hooks/useModalContext.ts";
import { MODAL_TYPES } from "@/constants/modalTypes.ts";

const initialModalState: ModalState = {
  modalType: null,
  modalProps: {},
};

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalState, setModalState] = useState<ModalState>(initialModalState);

  const openModal = useCallback(
    (modalType: keyof typeof MODAL_TYPES, modalProps = {}) => {
      setModalState({ modalType, modalProps });
    },
    []
  );

  const closeModal = useCallback(() => {
    setModalState(initialModalState);
  }, []);

  const contextValue = useMemo(
    () => ({
      modalState,
      openModal,
      closeModal,
    }),
    [modalState, openModal, closeModal]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <ModalRenderer />
    </ModalContext.Provider>
  );
}
