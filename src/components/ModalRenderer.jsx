import React from "react";
import { useModal } from "@/hooks/useModalContext";
import { MODAL_TYPES } from "@/constants/modalTypes";

import AddDiagnosticModal from "./AddDiagnosticModal";

const MODAL_COMPONENTS = {
  [MODAL_TYPES.ADD_DIAGNOSTIC]: AddDiagnosticModal,
};

const ModalRenderer = () => {
  const { modalState, closeModal } = useModal();

  if (!modalState.modalType) {
    return null;
  }

  const SpecificModalComponent = MODAL_COMPONENTS[modalState.modalType];

  if (!SpecificModalComponent) {
    console.error(`No component found for modal type: ${modalState.modalType}`);
    return null;
  }

  return (
    <SpecificModalComponent onClose={closeModal} {...modalState.modalProps} />
  );
};

export default ModalRenderer;
