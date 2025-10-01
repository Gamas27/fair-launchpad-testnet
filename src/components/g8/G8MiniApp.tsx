'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

// Welcome Screen Component
const WelcomeScreen = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="min-h-screen bg-g8-bg text-g8-text-primary flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        {/* Welcome Card */}
        <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-8 shadow-g8-glow">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-g8 rounded-full mx-auto flex items-center justify-center">
              <span className="text-g8-bg font-bold text-xl">G8</span>
            </div>
            <h1 className="text-g8-h1 text-g8-text-primary font-bold">
              Welcome to [G8]
            </h1>
            <p className="text-g8-body text-g8-text-secondary">
              Explore the decentralized future. Connect, create, and transact securely.
            </p>
          </div>
        </div>

        {/* Get Started Button */}
        <button 
          onClick={onNext}
          className="w-full bg-gradient-g8 text-g8-bg font-medium py-4 px-6 rounded-g8-lg shadow-g8-glow hover:shadow-g8-m transition-all duration-200"
        >
          Get started
        </button>
      </div>
    </div>
  )
}

// Terms of Service Screen
const TermsScreen = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-g8-bg text-g8-text-primary p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="text-g8-text-secondary hover:text-g8-text-primary transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-g8-h1 text-g8-text-primary font-bold">
            Terms of Service
          </h1>
        </div>

        {/* Content */}
        <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-6 space-y-4">
          <h2 className="text-g8-h2 text-g8-text-primary font-semibold">
            Please read and accept to continue:
          </h2>
          <ul className="space-y-3 text-g8-body text-g8-text-secondary">
            <li>• Trading memecoins involves substantial risk, including possible loss of all funds.</li>
            <li>• Prices can be extremely volatile and may change without warning.</li>
            <li>• Your data is processed according to our Privacy Policy.</li>
            <li>• You agree to follow our User Conduct Policy.</li>
          </ul>
        </div>

        {/* Accept Button */}
        <button 
          onClick={onNext}
          className="w-full bg-gradient-g8 text-g8-bg font-medium py-4 px-6 rounded-g8-lg shadow-g8-glow hover:shadow-g8-m transition-all duration-200"
        >
          Accept & continue
        </button>
      </div>
    </div>
  )
}

// World ID Verification Screen
const WorldIdScreen = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => {
  const [isVerified, setIsVerified] = useState(false)

  const handleVerify = () => {
    // Simulate World ID verification
    setTimeout(() => {
      setIsVerified(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-g8-bg text-g8-text-primary p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="text-g8-text-secondary hover:text-g8-text-primary transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-g8-h1 text-g8-text-primary font-bold">
            World ID Verification
          </h1>
        </div>

        {/* Content */}
        <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-6 space-y-4">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-g8-success/20 rounded-full mx-auto flex items-center justify-center">
              <span className="text-g8-success text-2xl">🌍</span>
            </div>
            <h2 className="text-g8-h2 text-g8-text-primary font-semibold">
              Verify once to enable secure platform interactions.
            </h2>
            <p className="text-g8-body text-g8-text-secondary">
              World ID helps us verify you're a unique human without compromising your privacy.
            </p>
          </div>
        </div>

        {/* Verification Button */}
        {!isVerified ? (
          <button 
            onClick={handleVerify}
            className="w-full bg-gradient-g8 text-g8-bg font-medium py-4 px-6 rounded-g8-lg shadow-g8-glow hover:shadow-g8-m transition-all duration-200"
          >
            Verify with World ID
          </button>
        ) : (
          <div className="space-y-4">
            <div className="bg-g8-success/20 border border-g8-success/50 rounded-g8-lg p-4 text-center">
              <p className="text-g8-success font-medium">✅ Verified Successfully!</p>
            </div>
            <button 
              onClick={onNext}
              className="w-full bg-gradient-g8 text-g8-bg font-medium py-4 px-6 rounded-g8-lg shadow-g8-glow hover:shadow-g8-m transition-all duration-200"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// Wallet Created Screen
const WalletScreen = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <div className="min-h-screen bg-g8-bg text-g8-text-primary flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        {/* Success Card */}
        <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-8 shadow-g8-glow">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-g8-success/20 rounded-full mx-auto flex items-center justify-center">
              <span className="text-g8-success text-2xl">🔐</span>
            </div>
            <h1 className="text-g8-h1 text-g8-text-primary font-bold">
              Wallet created
            </h1>
            <p className="text-g8-body text-g8-text-secondary">
              You're ready to explore [G8].
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={onComplete}
            className="w-full bg-gradient-g8 text-g8-bg font-medium py-4 px-6 rounded-g8-lg shadow-g8-glow hover:shadow-g8-m transition-all duration-200"
          >
            Go to Home
          </button>
          <button 
            onClick={onComplete}
            className="w-full bg-g8-surface text-g8-text-primary border border-g8-stroke font-medium py-4 px-6 rounded-g8-lg hover:border-g8-text-primary/20 transition-all duration-200"
          >
            View Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

// Main Mini App Component
export const G8MiniApp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'terms' | 'worldid' | 'wallet' | 'complete'>('welcome')
  const router = useRouter()

  const handleNext = () => {
    switch (currentStep) {
      case 'welcome':
        setCurrentStep('terms')
        break
      case 'terms':
        setCurrentStep('worldid')
        break
      case 'worldid':
        setCurrentStep('wallet')
        break
      case 'wallet':
        setCurrentStep('complete')
        break
    }
  }

  const handleBack = () => {
    switch (currentStep) {
      case 'terms':
        setCurrentStep('welcome')
        break
      case 'worldid':
        setCurrentStep('terms')
        break
      case 'wallet':
        setCurrentStep('worldid')
        break
    }
  }

  const handleComplete = () => {
    // Navigate to main app or show completion
    router.push('/')
  }

  // Render current step
  switch (currentStep) {
    case 'welcome':
      return <WelcomeScreen onNext={handleNext} />
    case 'terms':
      return <TermsScreen onNext={handleNext} onBack={handleBack} />
    case 'worldid':
      return <WorldIdScreen onNext={handleNext} onBack={handleBack} />
    case 'wallet':
      return <WalletScreen onComplete={handleComplete} />
    case 'complete':
      return (
        <div className="min-h-screen bg-g8-bg text-g8-text-primary flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="bg-g8-success/20 border border-g8-success/50 rounded-g8-lg p-8">
              <h1 className="text-g8-h1 text-g8-success font-bold mb-4">
                🎉 Welcome to G8!
              </h1>
              <p className="text-g8-body text-g8-text-secondary">
                Your onboarding is complete. You're ready to start trading and creating tokens.
              </p>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="w-full bg-gradient-g8 text-g8-bg font-medium py-4 px-6 rounded-g8-lg shadow-g8-glow hover:shadow-g8-m transition-all duration-200"
            >
              Start Trading
            </button>
          </div>
        </div>
      )
    default:
      return <WelcomeScreen onNext={handleNext} />
  }
}

export default G8MiniApp

