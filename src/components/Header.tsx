import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import { useLocales } from '../hooks/locales'

export default function Header({
  siteName,
  logo,
}: {
  siteName: string
  logo: string
}) {
  const { toggleLang, lang, t } = useLocales()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gold-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link to="/" className="group flex items-center gap-3">
              <div className="w-auto p-2">
                {/* <i className="fa-solid fa-crown text-3xl"></i> */}
                <img src={logo} className="h-10 w-10" alt={siteName} />
              </div>
              <div className="flex w-fit flex-col">
                <span className="w-50 font-serif text-2xl leading-none font-bold tracking-wide text-stone-900 uppercase md:w-auto">
                  {siteName}
                </span>
                <span className="text-[10px] font-medium tracking-[0.3em] text-gold-600 uppercase">
                  Budapest
                </span>
              </div>
            </Link>

            <nav className="hidden items-center gap-10 md:flex">
              <Link
                to="/collection"
                className="text-sm font-medium tracking-widest text-stone-500 uppercase transition-colors hover:text-gold-600"
              >
                {t('collection')}
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium tracking-widest text-stone-500 uppercase transition-colors hover:text-gold-600"
              >
                {t('about-us')}
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium tracking-widest text-stone-500 uppercase transition-colors hover:text-gold-600"
              >
                {t('contact')}
              </Link>
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 text-sm font-medium tracking-widest text-stone-500 uppercase transition-colors hover:text-gold-600"
                title="Toggle Language"
              >
                <i className="fa-solid fa-globe"></i>
                {lang.toLocaleUpperCase()}
              </button>
            </nav>

            <div className="flex items-center gap-4 md:hidden">
              <button
                onClick={toggleLang}
                className="flex items-center gap-1 text-sm font-medium tracking-widest text-stone-500 uppercase transition-colors hover:text-gold-600"
              >
                <i className="fa-solid fa-globe"></i>
                {lang.toLocaleUpperCase()}
              </button>
              <button
                className="rounded-lg p-2 text-stone-600 hover:bg-stone-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <i className="fa-solid fa-xmark"></i>
                ) : (
                  <i className="fa-solid fa-bars"></i>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-gold-200 bg-white md:hidden"
          >
            <nav className="flex flex-col gap-6 p-6 text-center">
              <Link
                to="/collection"
                className="font-serif text-xl text-stone-600 italic hover:text-gold-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('collection')}
              </Link>
              <Link
                to="/about"
                className="font-serif text-xl text-stone-600 italic hover:text-gold-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('about-us')}
              </Link>
              <Link
                to="/contact"
                className="font-serif text-xl text-stone-600 italic hover:text-gold-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('contact')}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
