#!/bin/bash

# Clean script to reset index.html to template state
# Use this before committing to ensure no credentials are in the file

echo "Cleaning build artifacts..."

if [ -f "public/index.html.template" ]; then
    cp public/index.html.template public/index.html
    echo "✅ index.html reset to template state"
else
    echo "❌ Template file not found!"
    exit 1
fi

echo "✅ Ready for commit - no credentials in source files"
