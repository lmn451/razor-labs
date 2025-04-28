import React, { ComponentType } from "react";
import { useModal } from "@/hooks/useModalContext.ts";
import { MODAL_TYPES, ModalType } from "@/constants/modalTypes.ts";

import AddDiagnosticModal from "./AddDiagnosticModal";

// Define the common props that all modal components should accept
interface ModalComponentProps {
  onClose: () => void;
  [key: string]: any;
}

// Define the mapping of modal types to their respective components
const MODAL_COMPONENTS: Record<
  ModalType,
  ComponentType<ModalComponentProps>
> = {
  [MODAL_TYPES.ADD_DIAGNOSTIC]: AddDiagnosticModal,
};

const ModalRenderer: React.FC = () => {
  const { modalState, closeModal } = useModal();

  if (!modalState.modalType) {
    return null;
  }

  const SpecificModalComponent =
    MODAL_COMPONENTS[modalState.modalType as ModalType];

  if (!SpecificModalComponent) {
    console.error(`No component found for modal type: ${modalState.modalType}`);
    return null;
  }

  return (
    <SpecificModalComponent onClose={closeModal} {...modalState.modalProps} />
  );
};

export default ModalRenderer;
