// Define constants for modal types to ensure consistency
export const MODAL_TYPES = Object.freeze({
  ADD_DIAGNOSTIC: "ADD_DIAGNOSTIC",
  // Add other modal types here as needed, e.g.:
  // EDIT_DIAGNOSTIC: 'EDIT_DIAGNOSTIC',
  // CONFIRM_DELETE: 'CONFIRM_DELETE',
} as const);

// Export a type for the modal types
export type ModalType = (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES];
