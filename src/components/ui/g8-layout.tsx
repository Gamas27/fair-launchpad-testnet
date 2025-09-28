'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface G8ColumnProps {
  children: React.ReactNode
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  pad?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  className?: string
}

export const G8Column = ({ 
  children, 
  gap = 'md', 
  align = 'start', 
  justify = 'start',
  pad,
  className 
}: G8ColumnProps) => {
  const gapClass = {
    xs: 'gap-g8-xs',
    sm: 'gap-g8-sm', 
    md: 'gap-g8-md',
    lg: 'gap-g8-lg',
    xl: 'gap-g8-xl',
    xxl: 'gap-g8-xxl'
  }[gap]

  const alignClass = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  }[align]

  const justifyClass = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  }[justify]

  const padClass = pad ? {
    xs: 'p-g8-xs',
    sm: 'p-g8-sm',
    md: 'p-g8-md', 
    lg: 'p-g8-lg',
    xl: 'p-g8-xl',
    xxl: 'p-g8-xxl'
  }[pad] : ''

  return (
    <div className={cn(
      "flex flex-col",
      gapClass,
      alignClass,
      justifyClass,
      padClass,
      className
    )}>
      {children}
    </div>
  )
}

interface G8RowProps {
  children: React.ReactNode
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  pad?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  className?: string
}

export const G8Row = ({ 
  children, 
  gap = 'md', 
  align = 'center', 
  justify = 'start',
  pad,
  className 
}: G8RowProps) => {
  const gapClass = {
    xs: 'gap-g8-xs',
    sm: 'gap-g8-sm',
    md: 'gap-g8-md',
    lg: 'gap-g8-lg',
    xl: 'gap-g8-xl',
    xxl: 'gap-g8-xxl'
  }[gap]

  const alignClass = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  }[align]

  const justifyClass = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  }[justify]

  const padClass = pad ? {
    xs: 'p-g8-xs',
    sm: 'p-g8-sm',
    md: 'p-g8-md',
    lg: 'p-g8-lg',
    xl: 'p-g8-xl',
    xxl: 'p-g8-xxl'
  }[pad] : ''

  return (
    <div className={cn(
      "flex flex-row",
      gapClass,
      alignClass,
      justifyClass,
      padClass,
      className
    )}>
      {children}
    </div>
  )
}

interface G8StackProps {
  children: React.ReactNode
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  pad?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  className?: string
}

export const G8Stack = ({ 
  children, 
  gap = 'md', 
  align = 'start', 
  justify = 'start',
  pad,
  className 
}: G8StackProps) => {
  const gapClass = {
    xs: 'gap-g8-xs',
    sm: 'gap-g8-sm',
    md: 'gap-g8-md',
    lg: 'gap-g8-lg',
    xl: 'gap-g8-xl',
    xxl: 'gap-g8-xxl'
  }[gap]

  const alignClass = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  }[align]

  const justifyClass = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  }[justify]

  const padClass = pad ? {
    xs: 'p-g8-xs',
    sm: 'p-g8-sm',
    md: 'p-g8-md',
    lg: 'p-g8-lg',
    xl: 'p-g8-xl',
    xxl: 'p-g8-xxl'
  }[pad] : ''

  return (
    <div className={cn(
      "flex flex-col",
      gapClass,
      alignClass,
      justifyClass,
      padClass,
      className
    )}>
      {children}
    </div>
  )
}
