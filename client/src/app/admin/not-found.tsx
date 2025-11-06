'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Home, Search, ArrowLeft, Sparkles } from 'lucide-react'

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className='relative h-screen w-full bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950 overflow-hidden flex items-center justify-center'>
      {/* Background Effects */}
      <div className='absolute inset-0 overflow-hidden'>
        {/* Floating orbs */}
        <div
          className='absolute w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse'
          style={{ top: '10%', left: '10%', animationDuration: '4s' }}
        ></div>
        <div
          className='absolute w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl animate-pulse'
          style={{
            bottom: '10%',
            right: '10%',
            animationDuration: '6s',
            animationDelay: '1s',
          }}
        ></div>
        <div
          className='absolute w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse'
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animationDuration: '5s',
            animationDelay: '2s',
          }}
        ></div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className='absolute w-2 h-2 bg-white/20 rounded-full'
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${
                5 + Math.random() * 10
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}

        {/* Reactive gradient */}
        <div
          className='absolute inset-0 opacity-10'
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      {/* Main content */}
      <div className='relative z-10 max-w-3xl mx-auto px-6 text-center space-y-8'>
        {/* 404 Number */}
        <div className='relative'>
          <h1 className='text-[10rem] md:text-[14rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 leading-none select-none'>
            404
          </h1>
          <div className='absolute inset-0 flex items-center justify-center'>
            <h1 className='text-[10rem] md:text-[14rem] font-black text-blue-500/20 blur-2xl leading-none select-none'>
              404
            </h1>
          </div>
        </div>

        {/* Icon */}
        <div className='flex justify-center mb-4'>
          <div className='relative bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full p-6'>
            <Search
              className='w-16 h-16 text-blue-300 animate-bounce'
              style={{ animationDuration: '3s' }}
            />
          </div>
        </div>

        {/* Text */}
        <div className='space-y-2'>
          <h2 className='text-4xl md:text-5xl font-bold text-white'>
            Oops! Page Not Found
          </h2>
          <p className='text-lg md:text-xl text-blue-200/80 max-w-2xl mx-auto'>
            Looks like you’ve drifted off course. The page you’re looking for
            doesn’t exist.
          </p>
        </div>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mt-6'>
          <Link href='/'>
            <button
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className='group relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 overflow-hidden'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 transition-all duration-300'></div>
              <div className='absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300'></div>
              <span className='relative flex items-center gap-2 text-white'>
                <Home className='w-5 h-5' />
                Take Me Home
                <Sparkles
                  className={`w-4 h-4 transition-all duration-300 ${
                    isHovering ? 'rotate-180 scale-110' : ''
                  }`}
                />
              </span>
            </button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className='group px-8 py-4 rounded-2xl font-bold text-lg border-2 border-blue-400/50 text-blue-200 hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300 backdrop-blur-sm'
          >
            <span className='flex items-center gap-2'>
              <ArrowLeft className='w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300' />
              Go Back
            </span>
          </button>
        </div>
      </div>

      {/* Floating animation */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh);
          }
        }
      `}</style>
    </div>
  )
}
