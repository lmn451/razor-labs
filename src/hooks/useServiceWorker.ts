import { useEffect } from 'react';
import { Workbox } from 'workbox-window';
import { checkForUpdates, handleServiceWorkerUpdate } from '../utils/registerServiceWorker';

export function useServiceWorker() {
  useEffect(() => {
    if (!import.meta.env.PROD || !('serviceWorker' in navigator)) {
      return;
    }

    let cleanupFunctions: Array<() => void> = [];

    const register = async () => {
      try {
        const wb = new Workbox('/sw.js');
        const registration = await wb.register();
        
        if (!registration) {
          throw new Error('Service worker registration failed: No registration object returned');
        }
        
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        
        // Set up periodic update checking
        const cleanupUpdateChecker = checkForUpdates(registration);
        if (cleanupUpdateChecker) {
          cleanupFunctions.push(cleanupUpdateChecker);
        }
        
        // Set up update handling
        const cleanupUpdateHandler = handleServiceWorkerUpdate(registration, () => {
          console.log('New content is available; please refresh.');
          // You could show a UI notification here to prompt the user to refresh
          window.location.reload();
        });
        
        if (cleanupUpdateHandler) {
          cleanupFunctions.push(cleanupUpdateHandler);
        }
        
      } catch (error) {
        console.error('ServiceWorker registration failed: ', error);
      }
    };

    register();

    // Cleanup function
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, []);
}
