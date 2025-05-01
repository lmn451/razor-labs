/// <reference types="vitest" />
/// <reference types="vite/client" />
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare global {
  namespace Vi {
    interface Assertion<T = any> extends TestingLibraryMatchers<T, void> {}
    interface AsymmetricMatchersContaining extends TestingLibraryMatchers<any, void> {}
  }
}