'use client'

import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import * as THREE from 'three'

interface STLModelProps {
  url: string
  isDark: boolean
}

function RotatingSTL({ url, isDark }: STLModelProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null)
  const [scale, setScale] = useState(1)
  const [error, setError] = useState(false)

  // Load STL file
  useEffect(() => {
    const loader = new STLLoader()
    loader.load(
      url,
      (loadedGeometry) => {
        // Calculate bounding box to center the model
        loadedGeometry.computeBoundingBox()
        const boundingBox = loadedGeometry.boundingBox!
        const center = new THREE.Vector3()
        boundingBox.getCenter(center)
        loadedGeometry.translate(-center.x, -center.y, -center.z)
        
        // Calculate scale to fit nicely (recompute after translation)
        loadedGeometry.computeBoundingBox()
        const newBoundingBox = loadedGeometry.boundingBox!
        const size = newBoundingBox.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const calculatedScale = maxDim > 0 ? 8 / maxDim : 1 // Much larger scale
        
        setGeometry(loadedGeometry)
        setScale(calculatedScale)
      },
      undefined,
      (err) => {
        console.error('Error loading STL file:', err)
        setError(true)
      }
    )
  }, [url])

  // Rotate the model slowly
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.3 // Slow rotation around Z axis
    }
  })

  // Theme-dependent colors
  const materialColor = isDark ? '#4ade80' : '#16a34a' // Green tones matching the theme
  const wireframeColor = isDark ? '#22c55e' : '#15803d'

  if (error || !geometry) {
    // Fallback: show a simple geometric shape if STL fails to load
    return (
      <mesh ref={meshRef}>
        <torusGeometry args={[1, 0.4, 16, 100]} />
        <meshStandardMaterial
          color={materialColor}
          metalness={0.3}
          roughness={0.7}
          emissive={isDark ? wireframeColor : '#000000'}
          emissiveIntensity={isDark ? 0.2 : 0}
        />
      </mesh>
    )
  }

  return (
    <mesh 
      ref={meshRef} 
      scale={scale} 
      geometry={geometry}
      rotation={[0, Math.PI, Math.PI / 2]} // Rotate 180 degrees around Y axis and 90 degrees around Z axis
    >
      <meshStandardMaterial
        color={materialColor}
        metalness={0.3}
        roughness={0.7}
        emissive={isDark ? wireframeColor : '#000000'}
        emissiveIntensity={isDark ? 0.2 : 0}
      />
    </mesh>
  )
}

interface STLViewerProps {
  stlPath: string
  className?: string
}

export default function STLViewer({ stlPath, className = '' }: STLViewerProps) {
  const { theme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark' || theme === 'dark'

  return (
    <div className={`fixed inset-0 -z-10 overflow-visible ${className}`}>
      <Canvas
        camera={{ position: [0, 8, 0], fov: 50 }} // Bird's eye view - straight down from above
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <group rotation={[0, 0, Math.PI / 2]}>
            {/* Ambient light for overall illumination */}
            <ambientLight intensity={isDark ? 0.4 : 0.6} />
            {/* Directional light for depth */}
            <directionalLight position={[5, 5, 5]} intensity={isDark ? 0.6 : 0.8} />
            <directionalLight position={[-5, -5, -5]} intensity={isDark ? 0.3 : 0.4} />
            {/* Point light for highlights */}
            <pointLight position={[0, 0, 5]} intensity={isDark ? 0.5 : 0.6} />
            
            <RotatingSTL url={stlPath} isDark={isDark} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  )
}
