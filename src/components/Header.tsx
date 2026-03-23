import { AnimatePresence, motion } from "motion/react";
import { useLocales } from "../hooks/locales";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

export default function Header({ siteName, logo }: { siteName: string; logo: string }) {
  const { toggleLang, lang, t } = useLocales();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gold-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 w-auto">
                {/* <i className="fa-solid fa-crown text-3xl"></i> */}
                <img src={logo} className="h-10 w-10" alt={siteName} />
              </div>
              <div className="flex flex-col w-fit">
                <span className="w-50 md:w-auto font-serif font-bold text-2xl tracking-wide text-stone-900 uppercase leading-none">
                  {siteName}
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold-600 font-medium">
                  Budapest
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-10">
              <Link
                to="/collection"
                className="text-sm font-medium uppercase tracking-widest text-stone-500 hover:text-gold-600 transition-colors"
              >
                {t("collection")}
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium uppercase tracking-widest text-stone-500 hover:text-gold-600 transition-colors"
              >
                {t("about-us")}
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium uppercase tracking-widest text-stone-500 hover:text-gold-600 transition-colors"
              >
                {t("contact")}
              </Link>
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-stone-500 hover:text-gold-600 transition-colors"
                title="Toggle Language"
              >
                <i className="fa-solid fa-globe"></i>
                {lang.toLocaleUpperCase()}
              </button>
            </nav>

            <div className="flex items-center gap-4 md:hidden">
              <button
                onClick={toggleLang}
                className="flex items-center gap-1 text-sm font-medium uppercase tracking-widest text-stone-500 hover:text-gold-600 transition-colors"
              >
                <i className="fa-solid fa-globe"></i>
                {lang.toLocaleUpperCase()}
              </button>
              <button
                className="p-2 text-stone-600 hover:bg-stone-100 rounded-lg"
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
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gold-200 overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-6 text-center">
              <Link
                to="/collection"
                className="text-stone-600 hover:text-gold-600 font-serif text-xl italic"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("collection")}
              </Link>
              <Link
                to="/about"
                className="text-stone-600 hover:text-gold-600 font-serif text-xl italic"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("about-us")}
              </Link>
              <Link
                to="/contact"
                className="text-stone-600 hover:text-gold-600 font-serif text-xl italic"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("contact")}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
