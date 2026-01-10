'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export default function Logo({ className = '', width = 120, height = 40 }: LogoProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme } = useTheme()

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])

  // Determine which logo to show
  // Use resolvedTheme to handle 'system' theme properly
  const isDark = mounted && (resolvedTheme === 'dark' || theme === 'dark')

  if (!mounted) {
    // Return a placeholder with same dimensions to prevent layout shift
    return (
      <div 
        className={className}
        style={{ width, height }}
        aria-label="Ashtree Studio"
      />
    )
  }

  return (
    <Image
      src={isDark ? '/logo-dark.webp' : '/logo-light.webp'}
      alt="Ashtree Studio"
      width={width}
      height={height}
      className={className}
      priority
    />
  )
}
