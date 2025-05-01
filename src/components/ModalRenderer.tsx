import React, { ComponentType } from "react";
import { useModal } from "@/hooks/useModalContext";
import { MODAL_TYPES, ModalType } from "@/constants/modalTypes";

import AddDiagnosticModal from "./AddDiagnosticModal";
import { Diagnostic } from "./DiagnosticContext";

// Define the common props that all modal components should accept
interface ModalComponentProps {
  onClose: () => void;
  [key: string]: any; // Allow additional props
}

// Define AddDiagnosticModal-specific props
interface AddDiagnosticModalComponentProps extends ModalComponentProps {
  onSave: (newDiagnostic: Omit<Diagnostic, "id">) => void;
}

// Define the mapping of modal types to their respective components
const MODAL_COMPONENTS: Record<ModalType, ComponentType<any>> = {
  [MODAL_TYPES.ADD_DIAGNOSTIC]: AddDiagnosticModal as ComponentType<AddDiagnosticModalComponentProps>,
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
