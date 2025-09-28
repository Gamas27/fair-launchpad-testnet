'use client'

import React, { useState, useRef } from 'react'
import { Upload, X, Image, File, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface G8FileUploadProps {
  label: string
  accept?: string
  maxSize?: number // in MB
  multiple?: boolean
  value?: File[]
  onChange?: (files: File[]) => void
  onError?: (error: string) => void
  help?: string
  error?: string
  disabled?: boolean
  required?: boolean
  className?: string
}

export const G8FileUpload = ({
  label,
  accept = 'image/*',
  maxSize = 5, // 5MB default
  multiple = false,
  value = [],
  onChange,
  onError,
  help,
  error,
  disabled = false,
  required = false,
  className
}: G8FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const hasError = !!error
  const hasFiles = value.length > 0

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`
    }

    // Check file type
    if (accept && accept !== '*') {
      const acceptedTypes = accept.split(',').map(type => type.trim())
      const fileType = file.type
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
      
      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return fileExtension === type
        }
        if (type.includes('*')) {
          const baseType = type.split('/')[0]
          return fileType.startsWith(baseType + '/')
        }
        return fileType === type
      })

      if (!isAccepted) {
        return `File type not supported. Accepted: ${accept}`
      }
    }

    return null
  }

  const handleFiles = (files: FileList | null) => {
    if (!files) return

    const fileArray = Array.from(files)
    const validFiles: File[] = []
    const errors: string[] = []

    fileArray.forEach(file => {
      const error = validateFile(file)
      if (error) {
        errors.push(`${file.name}: ${error}`)
      } else {
        validFiles.push(file)
      }
    })

    if (errors.length > 0) {
      onError?.(errors.join(', '))
    }

    if (validFiles.length > 0) {
      const newFiles = multiple ? [...value, ...validFiles] : validFiles
      onChange?.(newFiles)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    if (disabled) return
    
    handleFiles(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragOver(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
  }

  const removeFile = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index)
    onChange?.(newFiles)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="h-4 w-4" />
    }
    return <File className="h-4 w-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className={cn("space-y-g8-sm", className)}>
      {/* Label */}
      <label className={cn(
        "text-g8-body font-medium transition-colors duration-200",
        {
          "text-g8-text-primary": !hasError,
          "text-g8-error": hasError,
        }
      )}>
        {label}
        {required && <span className="text-g8-error ml-1">*</span>}
      </label>

      {/* Upload Area */}
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative border-2 border-dashed rounded-g8-lg p-g8-lg transition-all duration-200 cursor-pointer",
          "bg-g8-surface text-g8-text-primary",
          {
            "border-g8-stroke hover:border-g8-text-primary/20": !isDragOver && !hasError,
            "border-g8-text-primary/20 bg-g8-text-primary/5": isDragOver,
            "border-g8-error": hasError,
            "opacity-50 cursor-not-allowed": disabled,
          }
        )}
      >
        <div className="text-center">
          <Upload className={cn(
            "h-8 w-8 mx-auto mb-g8-sm transition-colors duration-200",
            {
              "text-g8-text-secondary": !isDragOver,
              "text-g8-text-primary": isDragOver,
            }
          )} />
          
          <p className="text-g8-body font-medium mb-g8-xs">
            {isDragOver ? 'Drop files here' : 'Click to upload or drag and drop'}
          </p>
          
          <p className="text-g8-caption text-g8-text-secondary">
            {accept === 'image/*' ? 'Images' : 'Files'} up to {maxSize}MB
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          disabled={disabled}
          className="hidden"
        />
      </div>

      {/* File List */}
      {hasFiles && (
        <div className="space-y-g8-xs">
          {value.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center gap-g8-sm p-g8-sm bg-g8-surface2 rounded-g8-md border border-g8-stroke"
            >
              {getFileIcon(file)}
              <div className="flex-1 min-w-0">
                <p className="text-g8-body text-g8-text-primary truncate">
                  {file.name}
                </p>
                <p className="text-g8-caption text-g8-text-secondary">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(index)
                }}
                className="text-g8-text-secondary hover:text-g8-error transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Help Text / Error Message */}
      {(help || error) && (
        <div className="flex items-center gap-g8-xs">
          {hasError && <AlertCircle className="h-3 w-3 text-g8-error flex-shrink-0" />}
          <p className={cn(
            "text-g8-caption transition-colors duration-200",
            {
              "text-g8-text-secondary": !hasError,
              "text-g8-error": hasError,
            }
          )}>
            {error || help}
          </p>
        </div>
      )}
    </div>
  )
}
