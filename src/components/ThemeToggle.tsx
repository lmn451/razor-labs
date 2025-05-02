import React from 'react';
import { useTheme } from './ThemeContext';
import { Sun, Moon, Monitor } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center bg-muted/20 border border-border rounded-lg p-1" role="group" aria-label="Theme selection">
      <button
        onClick={() => setTheme('light')}
        className={`p-1.5 rounded-md ${theme === 'light' ? 'bg-background shadow-sm ring-1 ring-border text-foreground' : 'text-muted-foreground'} transition-colors`}
        aria-pressed={theme === 'light'}
        title="Light theme"
      >
        <Sun size={16} />
        <span className="sr-only">Light theme</span>
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-1.5 rounded-md ${theme === 'dark' ? 'bg-background shadow-sm ring-1 ring-border text-foreground' : 'text-muted-foreground'} transition-colors`}
        aria-pressed={theme === 'dark'}
        title="Dark theme"
      >
        <Moon size={16} />
        <span className="sr-only">Dark theme</span>
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-1.5 rounded-md ${theme === 'system' ? 'bg-background shadow-sm ring-1 ring-border text-foreground' : 'text-muted-foreground'} transition-colors`}
        aria-pressed={theme === 'system'}
        title="System theme"
      >
        <Monitor size={16} />
        <span className="sr-only">System theme</span>
      </button>
    </div>
  );
}