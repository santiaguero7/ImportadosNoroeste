'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, X } from 'lucide-react'
import { Button } from './ui/button'

interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

export default function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className="bg-[#070707] border border-[#23232a] rounded-xl px-6 py-4 shadow-2xl flex items-center gap-3 max-w-sm">
        <CheckCircle className="h-6 w-6 flex-shrink-0 text-white" />
        <span className="text-sm font-medium text-white" style={{ fontFamily: 'Libre Bodoni, serif' }}>{message}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-6 w-6 text-gray-300 hover:text-white hover:bg-[#23232a] ml-2 transition-all duration-200"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
