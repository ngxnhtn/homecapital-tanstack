import { Link } from '@tanstack/react-router'

import type { agencyQuery } from '../sanity/query'

// import { Crown } from "lucide-react";
import { useLocales } from '../hooks/locales'
import { resolveLanguage } from '../sanity/utils'

type PropsType = ReturnType<typeof agencyQuery.parse>

export default function Footer({ agency }: { agency: PropsType }) {
  const { t, lang } = useLocales()

  return (
    <footer className="mt-20 border-t-4 border-gold-600 bg-stone-900 py-16 text-stone-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3 md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-6 flex items-center gap-2 text-gold-100">
              {/* <Crown size={24} /> */}
              <i className="fa-solid fa-crown"></i>
              <span className="font-serif text-xl font-bold tracking-wide uppercase">
                {agency.name || 'Real Estate'}
              </span>
            </div>
            <p className="max-w-xs font-serif text-sm leading-relaxed text-stone-500 italic">
              {resolveLanguage(agency.bio!, lang) || 'Description'}
            </p>
          </div>
          <div>
            <h3 className="mb-6 font-serif text-lg text-gold-200 italic">
              {t('navigation')}
            </h3>
            <ul className="space-y-3 text-sm tracking-wide uppercase">
              <li>
                <Link
                  to="/collection"
                  className="transition-colors hover:text-gold-400"
                >
                  {t('collection')}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="transition-colors hover:text-gold-400"
                >
                  {t('about-us')}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="transition-colors hover:text-gold-400"
                >
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 font-serif text-lg text-gold-200 italic">
              {t('office')}
            </h3>
            <ul className="space-y-3 text-sm font-light">
              <li>{agency.location?.address || 'Somewhere'}</li>
              <li>{agency.location?.postalCode || '1000'} Budapest, Hungary</li>
              <li>{agency.contactDetails?.email || 'example@gmail.com'}</li>
              <li>{agency.contactDetails?.phone || '+366969696969'}</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-stone-800 pt-8 text-center text-[10px] tracking-widest text-stone-600 uppercase">
          © {new Date().getFullYear()} {agency.name || 'Real Estate'}.{' '}
          {t('rights')}
        </div>
      </div>
    </footer>
  )
}
