'use client'

import React, { useState } from 'react'
import { ScreenV2 } from '@/components/layout/screen-v2'
import { CardV2 } from '@/components/ui/card-v2'
import { ButtonV2 } from '@/components/ui/button-v2'
import { IconButtonV2 } from '@/components/ui/icon-button-v2'
import { SelectV2, SelectOption } from '@/components/ui/select-v2'
import { CheckboxV2 } from '@/components/ui/checkbox-v2'
import { RadioV2 } from '@/components/ui/radio-v2'
import { SwitchV2 } from '@/components/ui/switch-v2'
import { TagV2 } from '@/components/ui/tag-v2'
import { StepperDotV2 } from '@/components/ui/stepper-dot-v2'
import { DividerV2 } from '@/components/ui/divider-v2'
import { TooltipV2 } from '@/components/ui/tooltip-v2'
import { 
  Plus, 
  Search, 
  Settings,
  Heart,
  Star,
  Check,
  X,
  Home,
  User,
  Bell,
  Shield,
  Wallet,
  Globe,
  MessageCircle,
  Info,
  ExternalLink,
  Copy,
  ChevronDown,
  MoreHorizontal
} from 'lucide-react'

export default function AtomsDemoPage() {
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [radioValue, setRadioValue] = useState('option1')
  const [switchValue, setSwitchValue] = useState(false)
  const [selectValue, setSelectValue] = useState('')
  const [tags, setTags] = useState(['React', 'TypeScript', 'Next.js'])

  const selectOptions: SelectOption[] = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid' },
  ]

  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <ScreenV2
      title="Atoms Demo"
      background="pattern"
      actions={
        <div className="flex items-center space-x-2">
          <TooltipV2 title="Settings" body="Configure your preferences">
            <IconButtonV2 icon={Settings} variant="ghost" size="sm" />
          </TooltipV2>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Icon Buttons */}
        <CardV2 variant="elevated" className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Icon Buttons</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-400">Variants</h3>
              <div className="flex space-x-2">
                <IconButtonV2 icon={Plus} variant="default" />
                <IconButtonV2 icon={Heart} variant="outline" />
                <IconButtonV2 icon={Star} variant="ghost" />
                <IconButtonV2 icon={Settings} variant="gradient" glow />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-400">Sizes</h3>
              <div className="flex items-center space-x-2">
                <IconButtonV2 icon={Plus} size="xs" />
                <IconButtonV2 icon={Plus} size="sm" />
                <IconButtonV2 icon={Plus} size="md" />
                <IconButtonV2 icon={Plus} size="lg" />
                <IconButtonV2 icon={Plus} size="xl" />
              </div>
            </div>
          </div>
        </CardV2>

        {/* Select Dropdown */}
        <CardV2 variant="elevated" className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Select Dropdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-400">Basic Select</h3>
              <SelectV2
                options={selectOptions}
                value={selectValue}
                onValueChange={setSelectValue}
                placeholder="Choose a framework"
                label="Framework"
                helperText="Select your preferred frontend framework"
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-400">Searchable Select</h3>
              <SelectV2
                options={selectOptions}
                value={selectValue}
                onValueChange={setSelectValue}
                placeholder="Search frameworks"
                searchable
                label="Searchable Framework"
                variant="neon"
              />
            </div>
          </div>
        </CardV2>

        {/* Form Controls */}
        <CardV2 variant="elevated" className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Form Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400">Checkboxes</h3>
              <div className="space-y-3">
                <CheckboxV2
                  checked={checkboxValue}
                  onChange={(e) => setCheckboxValue(e.target.checked)}
                  label="Accept terms and conditions"
                  helperText="You must agree to continue"
                />
                <CheckboxV2
                  variant="neon"
                  label="Enable notifications"
                  glow
                />
                <CheckboxV2
                  variant="success"
                  label="Premium features"
                  checked
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400">Radio Buttons</h3>
              <div className="space-y-3">
                <RadioV2
                  name="framework"
                  value="react"
                  checked={radioValue === 'react'}
                  onChange={(e) => setRadioValue(e.target.value)}
                  label="React"
                />
                <RadioV2
                  name="framework"
                  value="vue"
                  checked={radioValue === 'vue'}
                  onChange={(e) => setRadioValue(e.target.value)}
                  label="Vue.js"
                />
                <RadioV2
                  name="framework"
                  value="angular"
                  checked={radioValue === 'angular'}
                  onChange={(e) => setRadioValue(e.target.value)}
                  label="Angular"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400">Switches</h3>
              <div className="space-y-3">
                <SwitchV2
                  checked={switchValue}
                  onChange={(e) => setSwitchValue(e.target.checked)}
                  label="Dark mode"
                  helperText="Toggle dark theme"
                />
                <SwitchV2
                  variant="neon"
                  label="Notifications"
                  glow
                />
                <SwitchV2
                  variant="success"
                  label="Auto-save"
                  checked
                />
              </div>
            </div>
          </div>
        </CardV2>

        {/* Tags */}
        <CardV2 variant="elevated" className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Tags & Chips</h2>
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-400">Tag Variants</h3>
              <div className="flex flex-wrap gap-2">
                <TagV2 variant="default">Default</TagV2>
                <TagV2 variant="success">Success</TagV2>
                <TagV2 variant="warning">Warning</TagV2>
                <TagV2 variant="danger">Danger</TagV2>
                <TagV2 variant="info">Info</TagV2>
                <TagV2 variant="neon">Neon</TagV2>
                <TagV2 variant="gradient">Gradient</TagV2>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-400">Removable Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <TagV2
                    key={tag}
                    variant="default"
                    removable
                    onRemove={() => handleTagRemove(tag)}
                  >
                    {tag}
                  </TagV2>
                ))}
              </div>
            </div>
          </div>
        </CardV2>

        {/* Stepper */}
        <CardV2 variant="elevated" className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Stepper Dots</h2>
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-400">Stepper States</h3>
              <div className="flex space-x-4">
                <StepperDotV2 state="todo" stepNumber={1} label="Step 1" showLabel />
                <StepperDotV2 state="current" stepNumber={2} label="Step 2" showLabel />
                <StepperDotV2 state="done" stepNumber={3} label="Step 3" showLabel />
                <StepperDotV2 state="todo" stepNumber={4} label="Step 4" showLabel />
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-400">Stepper Sizes</h3>
              <div className="flex items-center space-x-4">
                <StepperDotV2 state="current" size="sm" stepNumber={1} />
                <StepperDotV2 state="current" size="md" stepNumber={2} />
                <StepperDotV2 state="current" size="lg" stepNumber={3} />
              </div>
            </div>
          </div>
        </CardV2>

        {/* Dividers */}
        <CardV2 variant="elevated" className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Dividers</h2>
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-400">Horizontal Dividers</h3>
              <div className="space-y-4">
                <DividerV2 variant="default" />
                <DividerV2 variant="subtle" />
                <DividerV2 variant="accent" />
                <DividerV2 variant="neon" />
                <DividerV2 variant="gradient" />
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-400">Dividers with Labels</h3>
              <DividerV2 variant="default" label="Section 1" showLabel />
              <DividerV2 variant="accent" label="Section 2" showLabel />
            </div>
          </div>
        </CardV2>

        {/* Tooltips */}
        <CardV2 variant="elevated" className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Tooltips</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TooltipV2 title="Top tooltip" placement="top">
              <ButtonV2 variant="outline">Top</ButtonV2>
            </TooltipV2>
            <TooltipV2 title="Bottom tooltip" placement="bottom">
              <ButtonV2 variant="outline">Bottom</ButtonV2>
            </TooltipV2>
            <TooltipV2 title="Left tooltip" placement="left">
              <ButtonV2 variant="outline">Left</ButtonV2>
            </TooltipV2>
            <TooltipV2 title="Right tooltip" placement="right">
              <ButtonV2 variant="outline">Right</ButtonV2>
            </TooltipV2>
          </div>
          
          <div className="mt-4">
            <TooltipV2 
              title="Advanced Tooltip" 
              body="This is a more detailed tooltip with both title and body content"
              variant="neon"
            >
              <ButtonV2 variant="primary">Advanced Tooltip</ButtonV2>
            </TooltipV2>
          </div>
        </CardV2>
      </div>
    </ScreenV2>
  )
}
