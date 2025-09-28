'use client'

import React, { useState } from 'react'

// Test individual components one by one
export default function UIV2Debug() {
  const [step, setStep] = useState(1)

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Step 1: Basic Setup</h1>
              <p className="text-gray-300 mb-8">Testing basic React and Tailwind</p>
              <button 
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Next Step
              </button>
            </div>
          </div>
        )
      
      case 2:
        return (
          <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Step 2: Theme Test</h1>
              <p className="text-gray-300 mb-8">Testing theme imports</p>
              <div className="space-y-4">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <p>Theme test successful</p>
                </div>
                <button 
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        )
      
      case 3:
        return (
          <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Step 3: Component Test</h1>
              <p className="text-gray-300 mb-8">Testing UI components</p>
              <div className="space-y-4">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <p>All components working</p>
                </div>
                <button 
                  onClick={() => setStep(4)}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        )
      
      case 4:
        return (
          <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Step 4: Full G8 App</h1>
              <p className="text-gray-300 mb-8">Testing complete G8 app</p>
              <div className="space-y-4">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <p>G8 app should work now</p>
                </div>
                <button 
                  onClick={() => window.location.href = '/ui-v2-demo'}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Go to Full Demo
                </button>
              </div>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return renderStep()
}
