#!/bin/bash

# Fair Launchpad Documentation Finder
# Usage: ./find-docs.sh [keyword]

echo "🔍 Fair Launchpad Documentation Finder"
echo "======================================"

if [ $# -eq 0 ]; then
    echo "Usage: ./find-docs.sh [keyword]"
    echo ""
    echo "Available categories:"
    echo "  deployment  - Deployment guides and documentation"
    echo "  testing     - Testing guides and documentation"
    echo "  security    - Security analysis and reviews"
    echo "  analysis    - Competitive analysis and technical appendix"
    echo "  guides      - User guides and specifications"
    echo "  status      - Project status and roadmaps"
    echo ""
    echo "Examples:"
    echo "  ./find-docs.sh deployment"
    echo "  ./find-docs.sh security"
    echo "  ./find-docs.sh roadmap"
    exit 1
fi

KEYWORD=$1
echo "Searching for: $KEYWORD"
echo ""

# Search in all documentation files
find . -name "*.md" -type f | while read file; do
    if grep -qi "$KEYWORD" "$file"; then
        echo "📄 $file"
        # Show matching lines with context
        grep -ni "$KEYWORD" "$file" | head -3 | while read line; do
            echo "   $line"
        done
        echo ""
    fi
done

echo "Search complete!"
