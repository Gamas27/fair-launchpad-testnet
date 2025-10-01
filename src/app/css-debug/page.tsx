'use client'

import React from 'react'

export default function CSSDebugPage() {
  return (
    <div className="min-h-screen bg-g8-bg text-g8-text-primary p-6">
      <h1 className="text-g8-h1 text-g8-text-primary font-bold mb-6">CSS Debug Page</h1>
      
      {/* Color System Test */}
      <div className="space-y-4 mb-8">
        <h2 className="text-g8-h2 text-g8-text-primary font-semibold">Color System</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-g8-bg border border-g8-stroke p-4 rounded-g8-lg">
            <p className="text-g8-text-primary">Primary Text</p>
            <p className="text-g8-text-secondary">Secondary Text</p>
          </div>
          <div className="bg-g8-surface border border-g8-stroke p-4 rounded-g8-lg">
            <p className="text-g8-text-primary">Surface Background</p>
            <p className="text-g8-text-secondary">Secondary Text</p>
          </div>
          <div className="bg-g8-surface2 border border-g8-stroke p-4 rounded-g8-lg">
            <p className="text-g8-text-primary">Surface2 Background</p>
            <p className="text-g8-text-secondary">Secondary Text</p>
          </div>
          <div className="bg-gradient-g8 text-g8-bg p-4 rounded-g8-lg">
            <p className="font-bold">Gradient Background</p>
          </div>
        </div>
      </div>

      {/* Typography Test */}
      <div className="space-y-4 mb-8">
        <h2 className="text-g8-h2 text-g8-text-primary font-semibold">Typography</h2>
        <div className="space-y-2">
          <p className="text-g8-display text-g8-text-primary">Display Text</p>
          <p className="text-g8-h1 text-g8-text-primary">Heading 1</p>
          <p className="text-g8-h2 text-g8-text-primary">Heading 2</p>
          <p className="text-g8-body text-g8-text-primary">Body Text</p>
          <p className="text-g8-caption text-g8-text-secondary">Caption Text</p>
        </div>
      </div>

      {/* Spacing Test */}
      <div className="space-y-4 mb-8">
        <h2 className="text-g8-h2 text-g8-text-primary font-semibold">Spacing</h2>
        <div className="space-y-2">
          <div className="bg-g8-surface p-g8-xs border border-g8-stroke rounded-g8-sm">
            <span className="text-g8-caption">XS Spacing (4px)</span>
          </div>
          <div className="bg-g8-surface p-g8-sm border border-g8-stroke rounded-g8-sm">
            <span className="text-g8-caption">SM Spacing (8px)</span>
          </div>
          <div className="bg-g8-surface p-g8-md border border-g8-stroke rounded-g8-sm">
            <span className="text-g8-caption">MD Spacing (12px)</span>
          </div>
          <div className="bg-g8-surface p-g8-lg border border-g8-stroke rounded-g8-sm">
            <span className="text-g8-caption">LG Spacing (16px)</span>
          </div>
        </div>
      </div>

      {/* Border Radius Test */}
      <div className="space-y-4 mb-8">
        <h2 className="text-g8-h2 text-g8-text-primary font-semibold">Border Radius</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-g8-surface border border-g8-stroke rounded-g8-xs p-4">
            <span className="text-g8-caption">XS (4px)</span>
          </div>
          <div className="bg-g8-surface border border-g8-stroke rounded-g8-sm p-4">
            <span className="text-g8-caption">SM (8px)</span>
          </div>
          <div className="bg-g8-surface border border-g8-stroke rounded-g8-md p-4">
            <span className="text-g8-caption">MD (12px)</span>
          </div>
          <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-4">
            <span className="text-g8-caption">LG (16px)</span>
          </div>
        </div>
      </div>

      {/* Shadow Test */}
      <div className="space-y-4 mb-8">
        <h2 className="text-g8-h2 text-g8-text-primary font-semibold">Shadows</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-4 shadow-g8-s">
            <span className="text-g8-caption">Small Shadow</span>
          </div>
          <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-4 shadow-g8-m">
            <span className="text-g8-caption">Medium Shadow</span>
          </div>
          <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-4 shadow-g8-glow">
            <span className="text-g8-caption">Glow Shadow</span>
          </div>
        </div>
      </div>

      {/* Status Colors Test */}
      <div className="space-y-4 mb-8">
        <h2 className="text-g8-h2 text-g8-text-primary font-semibold">Status Colors</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-g8-success/20 border border-g8-success/50 rounded-g8-lg p-4">
            <span className="text-g8-success text-g8-caption">Success</span>
          </div>
          <div className="bg-g8-warning/20 border border-g8-warning/50 rounded-g8-lg p-4">
            <span className="text-g8-warning text-g8-caption">Warning</span>
          </div>
          <div className="bg-g8-error/20 border border-g8-error/50 rounded-g8-lg p-4">
            <span className="text-g8-error text-g8-caption">Error</span>
          </div>
        </div>
      </div>

      {/* Button Test */}
      <div className="space-y-4 mb-8">
        <h2 className="text-g8-h2 text-g8-text-primary font-semibold">Buttons</h2>
        <div className="flex space-x-4">
          <button className="bg-gradient-g8 text-g8-bg font-medium py-3 px-6 rounded-g8-lg shadow-g8-glow hover:shadow-g8-m transition-all duration-200">
            Primary Button
          </button>
          <button className="bg-g8-surface text-g8-text-primary border border-g8-stroke font-medium py-3 px-6 rounded-g8-lg hover:border-g8-text-primary/20 transition-all duration-200">
            Secondary Button
          </button>
        </div>
      </div>

      {/* Card Test */}
      <div className="space-y-4 mb-8">
        <h2 className="text-g8-h2 text-g8-text-primary font-semibold">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-6">
            <h3 className="text-g8-h2 text-g8-text-primary font-semibold mb-2">Card Title</h3>
            <p className="text-g8-body text-g8-text-secondary">Card description with some content to test the layout.</p>
          </div>
          <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-6 shadow-g8-glow">
            <h3 className="text-g8-h2 text-g8-text-primary font-semibold mb-2">Glowing Card</h3>
            <p className="text-g8-body text-g8-text-secondary">Card with glow effect.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
