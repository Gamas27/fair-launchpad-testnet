'use client'

import React from 'react'

export default function TestSimple() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Test Page</h1>
        <p className="text-gray-300">This is a simple test page</p>
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <p>If you can see this, the basic setup is working</p>
        </div>
      </div>
    </div>
  )
}
