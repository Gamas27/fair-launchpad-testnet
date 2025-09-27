'use client'

import { useState } from 'react'
import { Button } from '../../design-system/components/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../design-system/components/Card'
import { Progress, CircularProgress } from '../../design-system/components/Progress'
import { Badge } from '../../components/ui/badge'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { 
  Shield, 
  Wallet, 
  Rocket, 
  Star, 
  Zap, 
  CheckCircle,
  AlertCircle,
  Info,
  Loader2
} from 'lucide-react'

export default function DesignSystemPage() {
  const [progress, setProgress] = useState(65)
  const [circularProgress, setCircularProgress] = useState(75)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Fair Launchpad Design System
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive design system featuring glassmorphism, neon effects, and modern UI components
          </p>
        </div>

        {/* Buttons Section */}
        <Card variant="glass" className="p-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Buttons</CardTitle>
            <CardDescription className="text-gray-300">
              Various button styles with different variants and sizes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            
            {/* Primary Buttons */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Primary Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="sm">Primary Small</Button>
                <Button variant="primary" size="md">Primary Medium</Button>
                <Button variant="primary" size="lg">Primary Large</Button>
                <Button variant="primary-outline">Primary Outline</Button>
                <Button variant="primary-ghost">Primary Ghost</Button>
              </div>
            </div>

            {/* Secondary Buttons */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Secondary Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary">Secondary</Button>
                <Button variant="secondary-outline">Secondary Outline</Button>
                <Button variant="secondary-ghost">Secondary Ghost</Button>
              </div>
            </div>

            {/* Special Effects */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Special Effects</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="glass">Glass Effect</Button>
                <Button variant="glass-primary">Glass Primary</Button>
                <Button variant="neon">Neon Glow</Button>
                <Button variant="neon-secondary">Neon Secondary</Button>
              </div>
            </div>

            {/* Button States */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Button States</h3>
              <div className="flex flex-wrap gap-4">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button leftIcon={<Shield className="h-4 w-4" />}>With Left Icon</Button>
                <Button rightIcon={<Rocket className="h-4 w-4" />}>With Right Icon</Button>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Cards Section */}
        <Card variant="glass" className="p-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Cards</CardTitle>
            <CardDescription className="text-gray-300">
              Different card styles with glassmorphism and special effects
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Default Card */}
              <Card variant="default" className="p-6">
                <CardHeader>
                  <CardTitle className="text-white">Default Card</CardTitle>
                  <CardDescription className="text-gray-300">
                    Standard card with default styling
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">This is a default card with standard styling.</p>
                </CardContent>
              </Card>

              {/* Glass Card */}
              <Card variant="glass" className="p-6">
                <CardHeader>
                  <CardTitle className="text-white">Glass Card</CardTitle>
                  <CardDescription className="text-gray-300">
                    Glassmorphism effect with backdrop blur
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">This card features a glassmorphism effect.</p>
                </CardContent>
              </Card>

              {/* Neon Card */}
              <Card variant="neon" className="p-6">
                <CardHeader>
                  <CardTitle className="text-white">Neon Card</CardTitle>
                  <CardDescription className="text-gray-300">
                    Neon glow effect with cyan border
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">This card has a neon glow effect.</p>
                </CardContent>
              </Card>

              {/* Gradient Card */}
              <Card variant="gradient" className="p-6">
                <CardHeader>
                  <CardTitle className="text-white">Gradient Card</CardTitle>
                  <CardDescription className="text-gray-300">
                    Gradient background with cyan to purple
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">This card features a gradient background.</p>
                </CardContent>
              </Card>

              {/* Elevated Card */}
              <Card variant="elevated" className="p-6">
                <CardHeader>
                  <CardTitle className="text-white">Elevated Card</CardTitle>
                  <CardDescription className="text-gray-300">
                    Enhanced shadow with hover effects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">This card has enhanced shadows.</p>
                </CardContent>
              </Card>

              {/* Outlined Card */}
              <Card variant="outlined" className="p-6">
                <CardHeader>
                  <CardTitle className="text-white">Outlined Card</CardTitle>
                  <CardDescription className="text-gray-300">
                    Transparent with border emphasis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">This card has a transparent background.</p>
                </CardContent>
              </Card>

            </div>
          </CardContent>
        </Card>

        {/* Progress Section */}
        <Card variant="glass" className="p-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Progress Indicators</CardTitle>
            <CardDescription className="text-gray-300">
              Linear and circular progress components
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            
            {/* Linear Progress */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Linear Progress</h3>
              
              <div className="space-y-4">
                <Progress 
                  value={progress} 
                  variant="default" 
                  label="Default Progress"
                  showValue 
                />
                <Progress 
                  value={progress} 
                  variant="primary" 
                  label="Primary Progress"
                  showValue 
                />
                <Progress 
                  value={progress} 
                  variant="neon" 
                  label="Neon Progress"
                  showValue 
                />
                <Progress 
                  value={progress} 
                  variant="glass" 
                  label="Glass Progress"
                  showValue 
                />
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={() => setProgress(Math.max(0, progress - 10))}
                  variant="secondary"
                  size="sm"
                >
                  Decrease
                </Button>
                <Button 
                  onClick={() => setProgress(Math.min(100, progress + 10))}
                  variant="primary"
                  size="sm"
                >
                  Increase
                </Button>
              </div>
            </div>

            {/* Circular Progress */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Circular Progress</h3>
              
              <div className="flex flex-wrap gap-8 justify-center">
                <div className="text-center">
                  <CircularProgress 
                    value={circularProgress} 
                    variant="default"
                    showValue
                    label="Default"
                  />
                </div>
                <div className="text-center">
                  <CircularProgress 
                    value={circularProgress} 
                    variant="neon"
                    showValue
                    label="Neon"
                  />
                </div>
                <div className="text-center">
                  <CircularProgress 
                    value={circularProgress} 
                    variant="glass"
                    showValue
                    label="Glass"
                  />
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => setCircularProgress(Math.max(0, circularProgress - 10))}
                  variant="secondary"
                  size="sm"
                >
                  Decrease
                </Button>
                <Button 
                  onClick={() => setCircularProgress(Math.min(100, circularProgress + 10))}
                  variant="primary"
                  size="sm"
                >
                  Increase
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges and Alerts */}
        <Card variant="glass" className="p-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Badges & Alerts</CardTitle>
            <CardDescription className="text-gray-300">
              Status indicators and notification components
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            
            {/* Badges */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Badges</h3>
              <div className="flex flex-wrap gap-4">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Error</Badge>
              </div>
            </div>

            {/* Alerts */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Alerts</h3>
              <div className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    This is an informational alert with default styling.
                  </AlertDescription>
                </Alert>
                
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    This is a destructive alert for errors and warnings.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Design System Info */}
        <Card variant="glass" className="p-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Design System Features</CardTitle>
            <CardDescription className="text-gray-300">
              Key features and capabilities of the Fair Launchpad Design System
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  <h4 className="font-semibold text-white">Glassmorphism</h4>
                </div>
                <p className="text-sm text-gray-400">
                  Modern glass-like effects with backdrop blur and transparency
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-400" />
                  <h4 className="font-semibold text-white">Neon Effects</h4>
                </div>
                <p className="text-sm text-gray-400">
                  Glowing neon effects for buttons and interactive elements
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <h4 className="font-semibold text-white">Gradient Text</h4>
                </div>
                <p className="text-sm text-gray-400">
                  Beautiful gradient text effects for headings and highlights
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <h4 className="font-semibold text-white">Responsive Design</h4>
                </div>
                <p className="text-sm text-gray-400">
                  Mobile-first responsive design with flexible layouts
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-teal-400" />
                  <h4 className="font-semibold text-white">Dark Theme</h4>
                </div>
                <p className="text-sm text-gray-400">
                  Optimized dark theme with proper contrast and accessibility
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-pink-400" />
                  <h4 className="font-semibold text-white">Accessibility</h4>
                </div>
                <p className="text-sm text-gray-400">
                  WCAG compliant components with proper focus management
                </p>
              </div>

            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
