'use client'

import React from 'react'

export const G8SimpleWelcome: React.FC = () => {
  return (
    <div className="min-h-screen bg-g8-bg text-g8-text-primary flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        {/* Welcome Card */}
        <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-6 shadow-g8-glow">
          <div className="text-center space-y-4">
            <h1 className="text-g8-h1 text-g8-text-primary font-bold">
              Welcome to [G8]
            </h1>
            <p className="text-g8-body text-g8-text-secondary">
              Explore the decentralized future. Connect, create, and transact securely.
            </p>
          </div>
        </div>

        {/* Get Started Button */}
        <button className="w-full bg-gradient-g8 text-g8-bg font-medium py-3 px-6 rounded-g8-lg shadow-g8-glow hover:shadow-g8-m transition-all duration-200">
          Get started
        </button>

        {/* Color Test */}
        <div className="space-y-2">
          <div className="bg-g8-success text-g8-bg p-2 rounded text-sm">
            Success Color
          </div>
          <div className="bg-g8-warning text-g8-bg p-2 rounded text-sm">
            Warning Color
          </div>
          <div className="bg-g8-error text-g8-bg p-2 rounded text-sm">
            Error Color
          </div>
        </div>
      </div>
    </div>
  )
}

export default G8SimpleWelcome

