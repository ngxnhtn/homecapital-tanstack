import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useLayoutEffect } from 'react'

interface LightboxProps {
  isOpen: boolean
  images: string[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  title: string
}

export function Lightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  title,
}: LightboxProps) {
  // Handle escape key to close lightbox
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight') {
        onNext()
      } else if (e.key === 'ArrowLeft') {
        onPrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onNext, onPrev, onClose])

  // Prevent scrolling when lightbox is open
  useLayoutEffect(() => {
    if (!isOpen) return

    const { body, documentElement } = document
    const prevOverflow = body.style.overflow
    const prevPaddingRight = body.style.paddingRight

    const scrollbarWidth = window.innerWidth - documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPaddingRight
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/95"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-2 text-white/70 transition-colors hover:text-white"
          >
            <i className="fa-solid fa-x"></i>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            className="absolute top-1/2 left-4 z-50 -translate-y-1/2 p-4 text-white/50 transition-colors hover:text-white md:left-8"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <button
            type="button"
            className="flex h-full w-full items-center justify-center border-0 bg-transparent p-4 md:p-12"
            onClick={onClose}
          >
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={images[currentIndex]}
              alt={`${title} - ${currentIndex + 1} of ${images.length}`}
              className="max-h-full max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute top-1/2 right-4 z-50 -translate-y-1/2 p-4 text-white/50 transition-colors hover:text-white md:right-8"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-sm tracking-widest text-white/70">
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
