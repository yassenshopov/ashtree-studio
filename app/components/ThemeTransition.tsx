'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useTheme } from 'next-themes'

interface TransitionState {
  x: number
  y: number
  isActive: boolean
  newTheme: 'light' | 'dark' | null
}

let transitionState: TransitionState = {
  x: 0,
  y: 0,
  isActive: false,
  newTheme: null,
}

let listeners: Array<() => void> = []
let isAnimatingGlobally = false

function resetGlobalState() {
  transitionState.isActive = false
  transitionState.newTheme = null
  isAnimatingGlobally = false
  listeners.forEach((listener) => listener())
}

export function triggerThemeTransition(x: number, y: number, newTheme: 'light' | 'dark') {
  // Reset any stuck state first
  if (isAnimatingGlobally) {
    resetGlobalState()
    // Small delay to ensure state is reset
    setTimeout(() => {
      transitionState = { x, y, isActive: true, newTheme }
      isAnimatingGlobally = true
      listeners.forEach((listener) => listener())
    }, 50)
    return
  }
  
  transitionState = { x, y, isActive: true, newTheme }
  isAnimatingGlobally = true
  listeners.forEach((listener) => listener())
}

function useTransitionState() {
  const [state, setState] = useState<TransitionState>(transitionState)

  useEffect(() => {
    const listener = () => setState({ ...transitionState })
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }, [])

  return state
}

export default function ThemeTransition() {
  const { setTheme } = useTheme()
  const transition = useTransitionState()
  const [radius, setRadius] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const animationRef = useRef<number | undefined>(undefined)
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const themeChangedRef = useRef(false)
  const hasStartedRef = useRef(false)

  // Cleanup function - use useCallback to ensure stable reference
  const cleanup = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = undefined
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = undefined
    }
    setRadius(0)
    setIsAnimating(false)
    themeChangedRef.current = false
    hasStartedRef.current = false
    resetGlobalState()
  }, [])

  useEffect(() => {
    // Reset when transition becomes inactive
    if (!transition.isActive || !transition.newTheme) {
      if (hasStartedRef.current) {
        cleanup()
      }
      return
    }

    // Prevent starting if already animating this transition
    if (hasStartedRef.current) {
      return
    }

    hasStartedRef.current = true
    setIsAnimating(true)
    setRadius(0)
    
    // Calculate the maximum radius needed to cover the entire viewport
    const maxRadius = Math.sqrt(
      Math.max(
        transition.x ** 2 + transition.y ** 2,
        (window.innerWidth - transition.x) ** 2 + transition.y ** 2,
        transition.x ** 2 + (window.innerHeight - transition.y) ** 2,
        (window.innerWidth - transition.x) ** 2 + (window.innerHeight - transition.y) ** 2
      )
    ) + 100

    const startTime = performance.now()
    const duration = 800

    // Fallback timeout to ensure cleanup always happens (1.5 seconds max)
    timeoutRef.current = setTimeout(() => {
      cleanup()
    }, 1500)

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3)
      
      setRadius(maxRadius * eased)

      // Change theme when animation is about 40% complete
      if (progress > 0.4 && !themeChangedRef.current && transition.newTheme) {
        setTheme(transition.newTheme)
        themeChangedRef.current = true
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        // Animation complete - ensure we reach full radius
        setRadius(maxRadius)
        
        // Clean up after a brief delay
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          cleanup()
        }, 150)
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      cleanup()
    }
  }, [transition.isActive, transition.x, transition.y, transition.newTheme, setTheme, cleanup])

  // Don't render if not animating
  if (!isAnimating || radius === 0) {
    return null
  }

  // Get the new theme colors from CSS variables
  const newThemeBg = transition.newTheme === 'dark' 
    ? 'hsl(148, 15%, 8%)' // dark background from globals.css
    : 'hsl(42, 20%, 95%)' // light background from globals.css

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        clipPath: `circle(${radius}px at ${transition.x}px ${transition.y}px)`,
        backgroundColor: newThemeBg,
        opacity: 0.5,
      }}
    />
  )
}
