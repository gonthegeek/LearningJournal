#!/bin/bash

# Build script for Firebase deployment
# This script injects environment variables into the HTML for production builds
# Usage: ./build.sh [production]

ENVIRONMENT=${1:-development}

echo "Building for environment: $ENVIRONMENT"

# Load environment variables for local development
if [ "$ENVIRONMENT" = "development" ] && [ -f ".env" ]; then
    echo "Loading .env for development"
    source ".env"
elif [ "$ENVIRONMENT" = "production" ]; then
    echo "Using production environment variables from CI/CD"
    # In production, environment variables should be set by GitHub Actions
fi

# Create index.html from template
if [ ! -f "public/index.html.template" ]; then
    echo "Error: public/index.html.template not found!"
    exit 1
fi

# Copy template to index.html
cp public/index.html.template public/index.html

# Inject environment variables if they exist
if [ ! -z "$FIREBASE_API_KEY" ]; then
    # Replace the placeholder comment with actual environment variables
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' 's|// Environment variables will be injected here by the build process|// Injected environment variables\
        window.__ENV__ = {\
            FIREBASE_API_KEY: "'"$FIREBASE_API_KEY"'",\
            FIREBASE_AUTH_DOMAIN: "'"$FIREBASE_AUTH_DOMAIN"'",\
            FIREBASE_PROJECT_ID: "'"$FIREBASE_PROJECT_ID"'",\
            FIREBASE_STORAGE_BUCKET: "'"$FIREBASE_STORAGE_BUCKET"'",\
            FIREBASE_MESSAGING_SENDER_ID: "'"$FIREBASE_MESSAGING_SENDER_ID"'",\
            FIREBASE_APP_ID: "'"$FIREBASE_APP_ID"'",\
            FIREBASE_MEASUREMENT_ID: "'"$FIREBASE_MEASUREMENT_ID"'"\
        };|' public/index.html
    else
        # Linux
        sed -i 's|// Environment variables will be injected here by the build process|// Injected environment variables\
        window.__ENV__ = {\
            FIREBASE_API_KEY: "'"$FIREBASE_API_KEY"'",\
            FIREBASE_AUTH_DOMAIN: "'"$FIREBASE_AUTH_DOMAIN"'",\
            FIREBASE_PROJECT_ID: "'"$FIREBASE_PROJECT_ID"'",\
            FIREBASE_STORAGE_BUCKET: "'"$FIREBASE_STORAGE_BUCKET"'",\
            FIREBASE_MESSAGING_SENDER_ID: "'"$FIREBASE_MESSAGING_SENDER_ID"'",\
            FIREBASE_APP_ID: "'"$FIREBASE_APP_ID"'",\
            FIREBASE_MEASUREMENT_ID: "'"$FIREBASE_MEASUREMENT_ID"'"\
        };|' public/index.html
    fi
else
    echo "Warning: No environment variables found, using defaults from config.js"
fi

echo "Build completed for $ENVIRONMENT environment!"
echo "Config source: ${FIREBASE_API_KEY:+Environment Variables}${FIREBASE_API_KEY:-Development Defaults}"
