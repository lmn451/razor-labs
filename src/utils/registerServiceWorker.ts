// This file contains utilities for service worker registration and update handling

/**
 * Registers a service worker and sets up update checking
 * @returns A promise that resolves with the service worker registration, or null if not supported
 */
export async function registerSW(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service workers are not supported in this browser');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
    
    // Set up periodic update checking
    setupUpdateChecking(registration);
    
    return registration;
  } catch (error) {
    console.error('ServiceWorker registration failed:', error);
    return null;
  }
}

/**
 * Sets up periodic update checking for a service worker
 * @param registration - The service worker registration to check for updates
 */
function setupUpdateChecking(registration: ServiceWorkerRegistration): void {
  // Check for updates immediately
  registration.update().catch(error => 
    console.error('Error checking for updates:', error)
  );
  
  // Then check every hour
  setInterval(() => {
    registration.update().catch(error => 
      console.error('Error during periodic update check:', error)
    );
  }, 60 * 60 * 1000);
}

/**
 * Checks for updates and handles controller changes
 * @param registration - The service worker registration to check
 * @returns A cleanup function to remove event listeners
 */
export function checkForUpdates(registration: ServiceWorkerRegistration): () => void {
  if (!registration || !('serviceWorker' in navigator)) {
    return () => {}; // No-op function if no cleanup needed
  }
  
  // Check for updates
  registration.update().catch(error => 
    console.error('Error checking for updates:', error)
  );
  
  // Listen for controller changes
  const onControllerChange = () => {
    console.log('New service worker activated, reloading...');
    window.location.reload();
  };
  
  navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);
  
  // Return cleanup function to remove event listener
  return () => {
    navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
  };
}

/**
 * Handles waiting service workers and prompts user to update
 * @param registration - The service worker registration
 * @param onUpdate - Callback when an update is available
 * @returns A cleanup function to remove event listeners
 */
export function handleServiceWorkerUpdate(
  registration: ServiceWorkerRegistration,
  onUpdate: () => void
): () => void {
  if (!registration.waiting) {
    // If there's no waiting worker, listen for updates
    const onUpdateFound = () => {
      const installingWorker = registration.installing;
      if (!installingWorker) return;
      
      const onStateChange = () => {
        if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // New update available
          onUpdate();
        }
      };
      
      installingWorker.addEventListener('statechange', onStateChange);
      
      // Return cleanup function to remove state change listener
      return () => installingWorker.removeEventListener('statechange', onStateChange);
    };
    
    registration.addEventListener('updatefound', onUpdateFound);
    
    // Return cleanup function to remove update found listener
    return () => registration.removeEventListener('updatefound', onUpdateFound);
  }
  
  // If there's a waiting worker, notify the user immediately
  if (registration.waiting && navigator.serviceWorker.controller) {
    onUpdate();
  }
  
  // No cleanup needed in this case
  return () => {};
}

/**
 * Skips waiting and activates the waiting service worker
 * @param registration - The service worker registration
 * @returns A promise that resolves when the service worker has been activated
 */
export function skipWaiting(registration: ServiceWorkerRegistration): Promise<void> {
  const { waiting } = registration;
  
  if (!waiting) {
    return Promise.reject(new Error('No waiting service worker found'));
  }
  
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();
    
    channel.port1.onmessage = (event) => {
      if (event.data.error) {
        reject(new Error(event.data.error));
      } else {
        resolve();
      }
    };
    
    // Send message to the waiting service worker
    waiting.postMessage({ type: 'SKIP_WAITING' }, [channel.port2]);
  });
}
