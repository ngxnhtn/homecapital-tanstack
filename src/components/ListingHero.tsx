import type { InferResultType } from 'groqd'

import { Link } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'motion/react'

import type { entryQuery } from '../sanity/query'

import { useLocales } from '../hooks/locales'
import { getDistrictFromZip } from '../sanity/utils'

interface ListingHeroProps {
  listing: InferResultType<ReturnType<typeof entryQuery>>
  onOpenLightbox: (index: number) => void
}

export function ListingHero({ listing, onOpenLightbox }: ListingHeroProps) {
  const { t } = useLocales()

  return (
    <div className="group relative h-[70vh] bg-stone-900 md:h-[85vh]">
      <AnimatePresence mode="wait">
        <motion.img
          src={listing!.featureImage}
          alt={listing!.title!}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="h-full w-full cursor-pointer object-cover"
          onClick={() => onOpenLightbox(0)}
        />
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/80" />

      <Link
        to="/collection"
        className="absolute top-8 left-8 z-10 rounded-full border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md transition-colors hover:bg-white/20"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </Link>

      <div className="absolute right-0 bottom-0 left-0 z-10 mb-10 flex flex-col justify-between gap-8 p-8 md:mx-12 md:mb-2 md:flex-row md:p-16">
        <div className="max-w-4xl text-white">
          <div className="mb-4 flex items-center gap-3">
            <span className="bg-gold-600 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-white uppercase">
              {t('district')}{' '}
              {getDistrictFromZip(listing!.location!.postalCode!)}
            </span>
            <span className="text-xs font-medium tracking-[0.2em] text-gold-200 uppercase">
              Budapest
            </span>
          </div>
          <h1 className="mb-4 font-serif text-4xl leading-tight font-medium md:text-6xl">
            {listing!.title}
          </h1>
          <div className="mt-2 flex items-center text-lg font-light text-stone-300">
            <i className="fa-solid fa-map-pin mr-2 text-gold-500"></i>
            {listing!.location?.address}, Budapest
          </div>
        </div>
        <div className="hidden flex-col gap-4 md:flex">
          <a
            href={listing!.location!.gmaps!}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-gold-500/30 bg-black/50 px-4 py-1.5 text-xs tracking-widest text-gold-400 uppercase backdrop-blur-sm transition-colors hover:border-gold-400 hover:text-gold-300"
          >
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
            {t('openInMaps')}
          </a>
          <div className="min-w-75 border border-white/20 bg-white/10 p-8 text-white backdrop-blur-md">
            <div className="mb-1 font-serif text-4xl">
              {listing?.propertyValue?.currency}{' '}
              {listing?.propertyValue?.priceAmount!.toLocaleString()}
            </div>
            <div className="text-xs tracking-widest text-gold-200 uppercase">
              {listing!.listingStatus == 'rent' ? t('month') : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
