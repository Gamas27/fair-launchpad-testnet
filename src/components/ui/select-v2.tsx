import React, { useState, useRef, useEffect } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { ChevronDown, Search, Check } from 'lucide-react'

const selectVariants = cva(
  'relative w-full',
  {
    variants: {
      variant: {
        default: 'bg-gray-800 border border-gray-600 focus:border-cyan-500',
        outlined: 'bg-transparent border-2 border-gray-600 focus:border-cyan-500',
        filled: 'bg-gray-800 border-0 focus:ring-2 focus:ring-cyan-500',
        neon: 'bg-transparent border border-cyan-500/50 focus:ring-2 focus:ring-cyan-500 shadow-neon-cyan/20',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-5 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectV2Props extends VariantProps<typeof selectVariants> {
  options: SelectOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchable?: boolean
  disabled?: boolean
  error?: boolean
  label?: string
  helperText?: string
  errorText?: string
  className?: string
}

export const SelectV2: React.FC<SelectV2Props> = ({
  options,
  value,
  onValueChange,
  placeholder = 'Select an option',
  searchable = false,
  disabled = false,
  error = false,
  label,
  helperText,
  errorText,
  variant = 'default',
  size = 'md',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null)
  const selectRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  // Find selected option
  useEffect(() => {
    const option = options.find(opt => opt.value === value)
    setSelectedOption(option || null)
  }, [value, options])

  // Filter options based on search
  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options

  // Handle option selection
  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return
    setSelectedOption(option)
    onValueChange?.(option.value)
    setIsOpen(false)
    setSearchQuery('')
  }

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Focus search input when opened
  useEffect(() => {
    if (isOpen && searchable && searchRef.current) {
      searchRef.current.focus()
    }
  }, [isOpen, searchable])

  return (
    <div className="relative w-full" ref={selectRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      
      <div
        className={cn(
          'flex items-center justify-between rounded-lg cursor-pointer transition-all duration-200',
          selectVariants({ variant, size }),
          error && 'border-red-500 focus:border-red-500 ring-red-500',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={cn(
          'flex-1 truncate',
          selectedOption ? 'text-white' : 'text-gray-500'
        )}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={cn(
          'h-4 w-4 text-gray-400 transition-transform duration-200',
          isOpen && 'rotate-180'
        )} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-gray-900 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-hidden">
          {searchable && (
            <div className="p-2 border-b border-gray-600">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search options..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          )}
          
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-gray-500 text-sm">No options found</div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    'flex items-center justify-between px-3 py-2 cursor-pointer transition-colors duration-200',
                    option.disabled
                      ? 'text-gray-500 cursor-not-allowed'
                      : 'text-white hover:bg-gray-800',
                    selectedOption?.value === option.value && 'bg-cyan-500/20'
                  )}
                  onClick={() => handleSelect(option)}
                >
                  <span className="flex-1 truncate">{option.label}</span>
                  {selectedOption?.value === option.value && (
                    <Check className="h-4 w-4 text-cyan-400" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {error && errorText ? (
        <p className="text-sm text-red-500 mt-1">{errorText}</p>
      ) : (
        helperText && <p className="text-sm text-gray-500 mt-1">{helperText}</p>
      )}
    </div>
  )
}
