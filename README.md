# LearningJournal

A Firebase-powered learning journal application for tracking educational progress.

## Security Setup

This project uses Firebase for authentication and data storage. The Firebase configuration is managed securely using environment variables.

### Environment Configuration

1. **Copy the example environment file**:
   ```bash
   cp .env.example .env
   ```

2. **Update `.env` with your Firebase credentials**:
   - The `.env` file contains your Firebase project configuration
   - This file is gitignored and won't be committed to version control

### Important Security Notes

**Firebase Client Configuration is NOT Secret**: Firebase client-side configuration values (apiKey, authDomain, etc.) are designed to be public and exposed in client-side code. They are not secrets and cannot be used to access your Firebase project without proper authentication.

**What IS Secret**:
- Firebase Admin SDK private keys
- Database security rules
- Authentication tokens
- Environment-specific secrets

**What is NOT Secret** (Safe to expose in client-side code):
- Firebase apiKey
- authDomain  
- projectId
- storageBucket
- messagingSenderId
- appId
- measurementId

### Building and Deployment

The project uses a simplified configuration system:

#### Local Development
```bash
cp .env.example .env        # Copy and customize for your Firebase project
npm run build              # Development build with .env file
npm run serve             # Test locally
```

#### Production Deployment
```bash
npm run build:production   # Production build using GitHub secrets
npm run deploy:production  # Build and deploy to production
```

#### Configuration System

The app uses a dynamic configuration loader that supports:

1. **Development**: Uses `.env` file or hardcoded defaults in `config.js`
2. **Production**: Uses GitHub secrets injected as environment variables

**Configuration Priority:**
1. GitHub Actions environment variables (production)
2. Local `.env` file (development)  
3. Hardcoded defaults in `config.js` (fallback)

### GitHub Secrets Setup

For production deployments, set up these GitHub secrets in your repository:

#### Required Firebase Configuration Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions, then add:

```
FIREBASE_API_KEY              = "your_api_key"
FIREBASE_AUTH_DOMAIN          = "your_project.firebaseapp.com"
FIREBASE_PROJECT_ID           = "your_project_id"
FIREBASE_STORAGE_BUCKET       = "your_project.firebasestorage.app"
FIREBASE_MESSAGING_SENDER_ID  = "your_sender_id"
FIREBASE_APP_ID               = "your_app_id"
FIREBASE_MEASUREMENT_ID       = "your_measurement_id"
```

#### Required Firebase Service Account Secret

1. Go to Firebase Console → Project Settings → Service Accounts
2. Generate a new private key (downloads a JSON file)
3. Copy the entire JSON content
4. Add it as a secret named: `FIREBASE_SERVICE_ACCOUNT_LEARNINGJOURNAL_27009`

#### Automatic Deployment

The GitHub Actions workflow will automatically:
- Build the app with production configuration
- Deploy to Firebase Hosting on every push to `main`
- Use secrets for secure configuration injection

### Why This Approach is Better

✅ **Simplified**: Only two environments (dev + prod)  
✅ **Security**: Secrets managed via GitHub, not files  
✅ **CI/CD Ready**: Works seamlessly with GitHub Actions  
✅ **Maintainable**: Clear separation between local dev and production  
✅ **Flexible**: Easy to extend for additional environments if needed

### Configuration Loading Flow

```
1. App starts → loads config.js
2. config.js checks for window.__ENV__ (injected by build script)
3. Falls back to hardcoded defaults if not found
4. Firebase initializes with the resolved config
```

### Security Best Practices Implemented

1. **Environment Variables**: Sensitive configuration stored in `.env` file
2. **Gitignore**: Environment files are excluded from version control
3. **Build Process**: Configuration is injected at build time
4. **Firebase Security Rules**: Implement proper database and storage security rules
5. **Authentication**: User authentication required for data access

### Firebase Security Rules

Make sure to implement proper security rules in your Firebase console:

```javascript
// Firestore Security Rules Example
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow teachers to read all student data
    match /students/{document=**} {
      allow read, write: if request.auth != null && request.auth.token.email == "gronzon31@gmail.com";
    }
  }
}
```

### Project Structure

```
├── .env                    # Environment variables (gitignored)
├── .env.example           # Environment template
├── build.sh               # Build script
├── firebase.json          # Firebase configuration
├── package.json           # Project dependencies and scripts
└── public/
    ├── index.html         # Generated HTML file
    └── index.js           # React application
```