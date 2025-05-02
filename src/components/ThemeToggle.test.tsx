import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from './ThemeContext';
import { ThemeToggle } from './ThemeToggle';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ThemeToggle', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('renders all theme options', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    // Find buttons by their accessible names
    expect(screen.getByTitle('Light theme')).toBeInTheDocument();
    expect(screen.getByTitle('Dark theme')).toBeInTheDocument();
    expect(screen.getByTitle('System theme')).toBeInTheDocument();
  });

  it('highlights the current theme button', () => {
    // Set initial theme to dark
    localStorage.setItem('theme', 'dark');
    
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    // Check that dark theme button has aria-pressed=true
    expect(screen.getByTitle('Dark theme')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTitle('Light theme')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTitle('System theme')).toHaveAttribute('aria-pressed', 'false');
  });

  it('changes theme when buttons are clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    // Initially system theme is selected
    expect(screen.getByTitle('System theme')).toHaveAttribute('aria-pressed', 'true');
    
    // Click dark theme button
    await user.click(screen.getByTitle('Dark theme'));
    expect(screen.getByTitle('Dark theme')).toHaveAttribute('aria-pressed', 'true');
    expect(localStorage.getItem('theme')).toBe('dark');
    
    // Click light theme button
    await user.click(screen.getByTitle('Light theme'));
    expect(screen.getByTitle('Light theme')).toHaveAttribute('aria-pressed', 'true');
    expect(localStorage.getItem('theme')).toBe('light');
  });
});