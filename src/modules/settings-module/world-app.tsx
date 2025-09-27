'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Info,
  Star,
  Heart,
  MessageCircle,
  BarChart3,
  Wallet,
  Copy
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Simplified mock user settings for World App
const mockUserSettings = {
  profile: {
    username: '@CryptoTrader',
    displayName: 'Crypto Trader',
    bio: 'Passionate about DeFi and token launches',
    avatar: '🚀',
    verified: true,
    repScore: 1250,
    joinDate: '2024-01-15'
  },
  preferences: {
    theme: 'dark',
    language: 'en',
    currency: 'SOL',
    notifications: {
      push: true,
      email: true,
      trading: true,
      social: true
    },
    privacy: {
      profilePublic: true,
      showRep: true,
      showHoldings: true
    }
  },
  security: {
    twoFactor: false,
    biometric: true,
    sessionTimeout: 30,
    autoLock: true
  },
  wallet: {
    primary: '0x1234...5678',
    autoConnect: true,
    gasOptimization: true,
    slippageTolerance: 0.5
  }
}

// World App Settings Module
export function SettingsModuleWorldApp() {
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'security' | 'wallet' | 'about'>('profile')
  const [settings, setSettings] = useState(mockUserSettings)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleSettingChange = (category: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value
      }
    }))
  }

  const handleSave = () => {
    // Simulate save
    console.log('Settings saved:', settings)
    setIsEditing(false)
  }

  const handleReset = () => {
    setSettings(mockUserSettings)
    setIsEditing(false)
  }

  const renderProfileTab = () => (
    <div className="space-y-6">
      <Card className="card-gradient border-2 border-pink-400/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-2xl">
              {settings.profile.avatar}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">{settings.profile.displayName}</h3>
              <p className="text-gray-400">{settings.profile.username}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-blue-500 text-white text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
                <Badge className="bg-purple-500 text-white text-xs">
                  REP: {settings.profile.repScore}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
              <input
                type="text"
                value={settings.profile.displayName}
                onChange={(e) => handleSettingChange('profile', 'displayName', e.target.value)}
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
              <textarea
                value={settings.profile.bio}
                onChange={(e) => handleSettingChange('profile', 'bio', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Avatar</label>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-xl">
                  {settings.profile.avatar}
                </div>
                <Button 
                  variant="outline" 
                  className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                  disabled={!isEditing}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Change Avatar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="card-gradient border-2 border-cyan-400/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Account Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">1250</div>
              <div className="text-sm text-gray-400">REP Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">15</div>
              <div className="text-sm text-gray-400">Tokens Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">8</div>
              <div className="text-sm text-gray-400">Graduated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">2.5K</div>
              <div className="text-sm text-gray-400">Followers</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <Card className="card-gradient border-2 border-purple-400/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
            <div className="flex gap-2">
              <Button
                variant={settings.preferences.theme === 'light' ? 'default' : 'outline'}
                onClick={() => handleSettingChange('preferences', 'theme', 'light')}
                className="flex items-center gap-2"
              >
                <Sun className="h-4 w-4" />
                Light
              </Button>
              <Button
                variant={settings.preferences.theme === 'dark' ? 'default' : 'outline'}
                onClick={() => handleSettingChange('preferences', 'theme', 'dark')}
                className="flex items-center gap-2"
              >
                <Moon className="h-4 w-4" />
                Dark
              </Button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
            <select
              value={settings.preferences.language}
              onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
              className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Currency</label>
            <select
              value={settings.preferences.currency}
              onChange={(e) => handleSettingChange('preferences', 'currency', e.target.value)}
              className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
            >
              <option value="SOL">SOL</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="BTC">BTC</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card className="card-gradient border-2 border-green-400/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(settings.preferences.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                <div className="text-sm text-gray-400">
                  {key === 'push' && 'Push notifications on mobile'}
                  {key === 'email' && 'Email notifications'}
                  {key === 'trading' && 'Trading activity alerts'}
                  {key === 'social' && 'Social interactions'}
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value as boolean}
                  onChange={(e) => handleSettingChange('preferences', 'notifications', {
                    ...settings.preferences.notifications,
                    [key]: e.target.checked
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="card-gradient border-2 border-yellow-400/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(settings.preferences.privacy).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                <div className="text-sm text-gray-400">
                  {key === 'profilePublic' && 'Make profile visible to other users'}
                  {key === 'showRep' && 'Display REP score publicly'}
                  {key === 'showHoldings' && 'Display token holdings'}
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value as boolean}
                  onChange={(e) => handleSettingChange('preferences', 'privacy', {
                    ...settings.preferences.privacy,
                    [key]: e.target.checked
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <Card className="card-gradient border-2 border-red-400/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Two-Factor Authentication</div>
              <div className="text-sm text-gray-400">Add an extra layer of security</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.twoFactor}
                onChange={(e) => handleSettingChange('security', 'twoFactor', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Biometric Authentication</div>
              <div className="text-sm text-gray-400">Use fingerprint or face ID</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.biometric}
                onChange={(e) => handleSettingChange('security', 'biometric', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Session Timeout (minutes)</label>
            <input
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Auto Lock</div>
              <div className="text-sm text-gray-400">Lock app when inactive</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.autoLock}
                onChange={(e) => handleSettingChange('security', 'autoLock', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </CardContent>
      </Card>

      <Card className="card-gradient border-2 border-orange-400/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="outline" 
            className="border-red-400 text-red-400 hover:bg-red-400/10 w-full"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
          
          {showDeleteConfirm && (
            <Card className="border-2 border-red-400/50 bg-red-900/10">
              <CardContent className="p-4">
                <div className="text-center">
                  <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-2" />
                  <h3 className="text-lg font-bold text-white mb-2">Delete Account</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    This action cannot be undone. All your data will be permanently deleted.
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="border-gray-600 text-gray-400 hover:bg-gray-800/50"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancel
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderWalletTab = () => (
    <div className="space-y-6">
      <Card className="card-gradient border-2 border-blue-400/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Primary Wallet</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={settings.wallet.primary}
                onChange={(e) => handleSettingChange('wallet', 'primary', e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
              />
              <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Auto Connect</div>
              <div className="text-sm text-gray-400">Automatically connect wallet on app start</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.wallet.autoConnect}
                onChange={(e) => handleSettingChange('wallet', 'autoConnect', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Gas Optimization</div>
              <div className="text-sm text-gray-400">Optimize gas fees automatically</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.wallet.gasOptimization}
                onChange={(e) => handleSettingChange('wallet', 'gasOptimization', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Slippage Tolerance (%)</label>
            <input
              type="number"
              step="0.1"
              value={settings.wallet.slippageTolerance}
              onChange={(e) => handleSettingChange('wallet', 'slippageTolerance', parseFloat(e.target.value))}
              className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAboutTab = () => (
    <div className="space-y-6">
      <Card className="card-gradient border-2 border-purple-400/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Info className="h-5 w-5" />
            App Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-400">Version</span>
            <span className="text-white font-bold">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Build</span>
            <span className="text-white font-bold">2024.01.15</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Platform</span>
            <span className="text-white font-bold">World App</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Environment</span>
            <span className="text-white font-bold">Production</span>
          </div>
        </CardContent>
      </Card>

      <Card className="card-gradient border-2 border-cyan-400/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Support & Feedback
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 w-full">
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact Support
          </Button>
          <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400/10 w-full">
            <Star className="h-4 w-4 mr-2" />
            Rate App
          </Button>
          <Button variant="outline" className="border-green-400 text-green-400 hover:bg-green-400/10 w-full">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileTab()
      case 'preferences': return renderPreferencesTab()
      case 'security': return renderSecurityTab()
      case 'wallet': return renderWalletTab()
      case 'about': return renderAboutTab()
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-gray-800/50">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <div className="text-lg font-bold gradient-text">SETTINGS</div>
            <Badge className="bg-green-500 text-white text-xs font-bold animate-pulse">LIVE</Badge>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                  className="border-gray-600 text-gray-400 hover:bg-gray-800/50"
                >
                  Reset
                </Button>
                <Button 
                  onClick={handleSave}
                  className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
              >
                <Settings className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Tab Navigation */}
        <div className="flex gap-1 overflow-x-auto mb-6">
          <Button
            variant={activeTab === 'profile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('profile')}
            className={cn(
              "flex-shrink-0",
              activeTab === 'profile'
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "border-pink-400 text-pink-400 hover:bg-pink-400/10"
            )}
          >
            <User className="h-4 w-4 mr-2" />
            Profile
          </Button>
          <Button
            variant={activeTab === 'preferences' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('preferences')}
            className={cn(
              "flex-shrink-0",
              activeTab === 'preferences'
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
            )}
          >
            <Palette className="h-4 w-4 mr-2" />
            Preferences
          </Button>
          <Button
            variant={activeTab === 'security' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('security')}
            className={cn(
              "flex-shrink-0",
              activeTab === 'security'
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "border-red-400 text-red-400 hover:bg-red-400/10"
            )}
          >
            <Shield className="h-4 w-4 mr-2" />
            Security
          </Button>
          <Button
            variant={activeTab === 'wallet' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('wallet')}
            className={cn(
              "flex-shrink-0",
              activeTab === 'wallet'
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "border-blue-400 text-blue-400 hover:bg-blue-400/10"
            )}
          >
            <Wallet className="h-4 w-4 mr-2" />
            Wallet
          </Button>
          <Button
            variant={activeTab === 'about' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('about')}
            className={cn(
              "flex-shrink-0",
              activeTab === 'about'
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "border-green-400 text-green-400 hover:bg-green-400/10"
            )}
          >
            <Info className="h-4 w-4 mr-2" />
            About
          </Button>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  )
}

export const SettingsModuleWorldAppExport = {
  version: 'v1.0.0',
  SettingsModule: SettingsModuleWorldApp
}
