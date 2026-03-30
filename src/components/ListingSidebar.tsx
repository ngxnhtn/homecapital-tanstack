import type { InferResultType } from 'groqd'

import { Link } from '@tanstack/react-router'

import type { entryQuery } from '../sanity/query'

import { useLocales } from '../hooks/locales'

interface ListingSidebarProps {
  listing: InferResultType<ReturnType<typeof entryQuery>>
}

export function ListingSidebar({ listing }: ListingSidebarProps) {
  const { t } = useLocales()

  return (
    <div className="space-y-8 lg:col-span-1">
      {/* Price Card (Mobile only) */}
      <div className="flex flex-col gap-4 border-t-4 border-gold-600 bg-white p-8 shadow-xl md:hidden">
        <div>
          <div className="mb-1 font-serif text-3xl text-stone-900">
            {listing!.propertyValue?.currency}{' '}
            {listing?.propertyValue?.priceAmount!.toLocaleString()}
            {listing!.listingStatus == 'rent' ? t('month') : ''}
          </div>
          <div className="text-xs tracking-widest text-stone-400 uppercase">
            Asking Price
          </div>
        </div>
        <a
          href={listing!.location!.gmaps!}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold-200 bg-gold-50 px-4 py-2 text-xs tracking-widest text-gold-600 uppercase transition-colors hover:border-gold-300 hover:text-gold-700"
        >
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
          {t('openInMaps')}
        </a>
      </div>

      {/* Agent Card */}
      <div className="sticky top-24 bg-stone-900 p-8 text-white shadow-2xl">
        <div className="mb-8 flex items-center gap-2 text-gold-400">
          <i className="fa-solid fa-crown"></i>
          <span className="text-xs font-bold tracking-[0.2em] uppercase">
            View the property
          </span>
        </div>

        <div className="mb-8 flex items-center gap-6">
          <img
            src={listing!.featureImage}
            className="h-20 w-20 rounded-full border-2 border-gold-500 object-cover p-1"
          />
          <div>
            <div className="mb-1 font-serif text-xl">Agent</div>
            <div className="text-xs tracking-widest text-stone-400 uppercase">
              Senior Partner
            </div>
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <Link
            to="/contact"
            className="block w-full bg-gold-600 px-6 py-4 text-center text-xs font-medium tracking-widest text-white uppercase transition-colors hover:bg-gold-700"
          >
            Contact
          </Link>
          {/* <a
            href=""
            className="block w-full py-4 px-6 bg-transparent border border-stone-700 hover:border-gold-500 hover:text-gold-400 text-stone-300 text-center font-medium transition-colors uppercase tracking-widest text-xs"
          >
            Email
          </a> */}
        </div>

        {/* <div className="pt-8 border-t border-stone-800">
          <h4 className="font-serif text-lg text-white mb-6 italic">Request Viewing</h4>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 bg-stone-800 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-gold-500 transition-all font-light"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-stone-800 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-gold-500 transition-all font-light"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full px-4 py-3 bg-stone-800 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-gold-500 transition-all font-light"
            />
            <textarea
              placeholder="Interested In"
              rows={3}
              className="w-full px-4 py-3 bg-stone-800 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-gold-500 transition-all resize-none font-light"
            ></textarea>
            <button className="w-full py-4 px-6 bg-white text-stone-900 hover:bg-gold-50 font-bold transition-colors uppercase tracking-widest text-xs mt-2">
              Send Request
            </button>
          </form>
        </div> */}
      </div>
    </div>
  )
}
