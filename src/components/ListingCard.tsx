import type { InferFragmentType } from 'groqd'

import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'

import { useLocales } from '../hooks/locales'
import type { propertyCardFragments } from '../sanity/query'
import { getDistrictFromZip } from '../sanity/utils'

type PropertyListingProps = InferFragmentType<typeof propertyCardFragments>

export function ListingCard({
  listing,
  featured,
}: {
  listing: PropertyListingProps
  featured?: boolean
}) {
  const { t } = useLocales()

  const status = (() => {
    if (listing.listingStatus == 'rent') {
      return t('rentProperty')
    }
    if (listing.listingStatus == 'sale') {
      return t('saleProperty')
    }
    if (listing.listingStatus == 'closed') {
      return t('closedProperty')
    }
  })()

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0, ease: 'easeOut' }}
      className={`group flex h-full flex-col border border-stone-100 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl`}
    >
      <Link
        to="/listing/$slug"
        params={{ slug: listing.slug! }}
        className="relative block aspect-4/3 overflow-hidden"
      >
        <img
          src={listing.featureImage}
          alt={listing.title!}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className={`absolute top-6 left-6 bg-white px-4 py-2 text-xs font-bold tracking-widest text-stone-900 uppercase shadow-lg/30 shadow-gold-500 ${listing.listingStatus == 'closed' ? 'bg-red-500' : ''}`}
        >
          {status}
        </div>
      </Link>

      <div className="relative flex grow flex-col p-8">
        {/* Decorative border line */}
        <div className="absolute top-0 right-8 left-8 h-px bg-gold-100"></div>

        <div className="mb-4">
          <span className="text-[10px] font-bold tracking-[0.2em] text-gold-600 uppercase">
            Budapest • {t('district')}{' '}
            {getDistrictFromZip(listing.location!.postalCode!)}
          </span>
        </div>

        <Link
          to="/listing/$slug"
          params={{ slug: listing.slug! }}
          className="mb-3 block"
        >
          <h3
            className={`font-serif leading-tight text-stone-900 transition-colors group-hover:text-gold-700 ${featured ? 'text-3xl' : 'text-xl'}`}
          >
            {listing.title}
          </h3>
        </Link>

        <div className="mb-4 flex items-center text-sm font-light text-stone-500">
          <i className="fa-solid fa-map-pin mr-2 shrink-0 text-gold-500" />
          <span className="truncate">{listing.location?.address}</span>
        </div>

        <div className="mb-6 flex justify-end font-serif text-2xl text-stone-900 lining-nums">
          {listing.propertyValue?.currency}{' '}
          {listing.propertyValue?.priceAmount!.toLocaleString()}
          {listing.listingStatus == 'rent' ? t('month') : ''}
        </div>

        <div className="mt-auto">
          <div className="border-t border-stone-100 pt-5">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2" title={t('rooms')}>
                <i className="fa-solid fa-house-chimney shrink-0 text-gold-600" />
                <span className="font-serif text-stone-900 lining-nums">
                  {listing.specs?.rooms} {t('rooms')}
                </span>
              </div>
              <div className="h-6 w-px bg-stone-200"></div>
              <div className="flex items-center gap-2" title={t('livingArea')}>
                <i className="fa-regular fa-square shrink-0 text-gold-600" />
                <span className="font-serif whitespace-nowrap text-stone-900 lining-nums">
                  {listing.specs?.area} m²
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
