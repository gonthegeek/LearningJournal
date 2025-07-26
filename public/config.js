// Firebase configuration loader
// This file dynamically loads Firebase config from environment variables

window.getFirebaseConfig = function() {
    // Try to load from environment variables injected by build process
    if (typeof window.__ENV__ !== 'undefined') {
        const env = window.__ENV__;
        
        // Validate that all required config is present
        if (!env.FIREBASE_API_KEY || !env.FIREBASE_PROJECT_ID) {
            console.error('Incomplete Firebase configuration in environment variables');
            return null;
        }
        
        return {
            apiKey: env.FIREBASE_API_KEY,
            authDomain: env.FIREBASE_AUTH_DOMAIN,
            projectId: env.FIREBASE_PROJECT_ID,
            storageBucket: env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
            appId: env.FIREBASE_APP_ID,
            measurementId: env.FIREBASE_MEASUREMENT_ID
        };
    }
    
    // No configuration found
    console.error('No Firebase configuration found. Please set up your .env file and run the build script.');
    return null;
};
