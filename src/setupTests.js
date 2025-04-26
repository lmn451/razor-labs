import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom/vitest'; // Extends Vitest's expect with jest-dom matchers

expect.extend(matchers);
