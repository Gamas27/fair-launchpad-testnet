#!/bin/bash

# Documentation Cleanup Script
# This script organizes scattered documentation files

echo "🧹 Cleaning up documentation..."

# Create archive directory for old docs
mkdir -p docs/archive

# Move duplicate analysis files
echo "📁 Moving duplicate analysis files..."
mv COMPETITIVE_ANALYSIS.md docs/archive/ 2>/dev/null || true
mv COMPETITIVE_COMPARISON_CHART.md docs/archive/ 2>/dev/null || true
mv TECHNICAL_APPENDIX.md docs/archive/ 2>/dev/null || true

# Move deployment guides to deployment folder
echo "📁 Consolidating deployment guides..."
mv DEPLOYMENT_GUIDE.md docs/deployment/ 2>/dev/null || true
mv DEPLOYMENT.md docs/deployment/ 2>/dev/null || true
mv QUICK_DEPLOYMENT_GUIDE.md docs/deployment/ 2>/dev/null || true
mv QUICK_DEPLOYMENT_SOLUTION.md docs/deployment/ 2>/dev/null || true

# Move status files to status folder
echo "📁 Organizing status files..."
mv PHASE_1_COMPLETE.md docs/status/ 2>/dev/null || true
mv PHASE_2_COMPLETE.md docs/status/ 2>/dev/null || true
mv HACKATHON_PROGRESS.md docs/status/ 2>/dev/null || true
mv HACKATHON_FINAL_SUMMARY.md docs/status/ 2>/dev/null || true
mv WORLD_APP_STATUS_SUMMARY.md docs/status/ 2>/dev/null || true

# Move business files to business folder
echo "📁 Organizing business files..."
mv PITCH_DECK.md docs/business/ 2>/dev/null || true
mv HACKATHON_IMPLEMENTATION_PLAN.md docs/business/ 2>/dev/null || true
mv HACKATHON_MVP_ANALYSIS.md docs/business/ 2>/dev/null || true

# Move architecture files
echo "📁 Organizing architecture files..."
mv ARCHITECTURE.md docs/architecture/ 2>/dev/null || true
mv FRONTEND_BACKEND_INTEGRATION_SUMMARY.md docs/architecture/ 2>/dev/null || true
mv SMART_CONTRACT_INTEGRATION_PLAN.md docs/architecture/ 2>/dev/null || true

# Move development files
echo "📁 Organizing development files..."
mv IMPLEMENTATION_ROADMAP.md docs/development/ 2>/dev/null || true
mv TEST_RESULTS.md docs/development/ 2>/dev/null || true
mv USER_STORY_FLOW.md docs/development/ 2>/dev/null || true

# Move G8 specific files to archive
echo "📁 Archiving G8 specific files..."
mv G8_*.md docs/archive/ 2>/dev/null || true
mv README_G8.md docs/archive/ 2>/dev/null || true
mv README_FRA.md docs/archive/ 2>/dev/null || true

# Move other scattered files to archive
echo "📁 Archiving other scattered files..."
mv *_ANALYSIS.md docs/archive/ 2>/dev/null || true
mv *_COMPLETE.md docs/archive/ 2>/dev/null || true
mv *_INTEGRATION_*.md docs/archive/ 2>/dev/null || true
mv *_DEPLOYMENT_*.md docs/archive/ 2>/dev/null || true
mv *_TESTING_*.md docs/archive/ 2>/dev/null || true
mv *_SUCCESS.md docs/archive/ 2>/dev/null || true
mv *_PLAN.md docs/archive/ 2>/dev/null || true
mv *_SUMMARY.md docs/archive/ 2>/dev/null || true
mv *_REPORT.md docs/archive/ 2>/dev/null || true
mv *_GUIDE.md docs/archive/ 2>/dev/null || true
mv *_SOLUTION.md docs/archive/ 2>/dev/null || true
mv *_FIX.md docs/archive/ 2>/dev/null || true
mv *_VERIFICATION.md docs/archive/ 2>/dev/null || true
mv *_NOTES.md docs/archive/ 2>/dev/null || true
mv *_ONLY_*.md docs/archive/ 2>/dev/null || true

# Remove empty files and duplicates
echo "🗑️  Removing empty and duplicate files..."
find . -name "*.md" -size 0 -delete 2>/dev/null || true

# Count remaining files
echo "📊 Documentation cleanup complete!"
echo "📁 Files in root directory:"
ls -la *.md 2>/dev/null | wc -l || echo "0"
echo "📁 Files in docs/ directory:"
find docs/ -name "*.md" | wc -l
echo "📁 Files in docs/archive/ directory:"
find docs/archive/ -name "*.md" | wc -l

echo "✅ Documentation organized successfully!"
