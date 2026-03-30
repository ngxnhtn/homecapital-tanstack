import type { InferFragmentType, InferResultType } from 'groqd'

import { useSuspenseQueries } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'motion/react'

import type { landingQuery, propertyCardFragments } from '../sanity/query'

import { ListingCard } from '../components/ListingCard'
import { useLocales } from '../hooks/locales'
import {
  featuredQueryOptions,
  landingQueryOptions,
  latestQueryOptions,
} from '../sanity/sanity.function'

type ListingsProps = InferFragmentType<typeof propertyCardFragments>

export const Route = createFileRoute('/')({
  loader: async ({ context }) => {
    const landing = await context.queryClient.ensureQueryData(
      landingQueryOptions(),
    )
    const featured = await context.queryClient.ensureQueryData(
      featuredQueryOptions(),
    )
    const sale = await context.queryClient.ensureQueryData(
      latestQueryOptions('sale'),
    )
    const rent = await context.queryClient.ensureQueryData(
      latestQueryOptions('rent'),
    )
    return {
      landing,
      featured,
      sale,
      rent,
    }
  },
  component: App,
})

function App() {
  const [landing, featured, sale, rent] = useSuspenseQueries({
    queries: [
      landingQueryOptions(),
      featuredQueryOptions(),
      latestQueryOptions('sale'),
      latestQueryOptions('rent'),
    ],
  })
  return (
    <div className="bg-stone-50 pb-0">
      <Banner landing={landing.data} />
      <Featured featured={featured.data} />
      <Latest type={'saleProperty'} listings={sale.data} />
      <Latest type={'rentProperty'} listings={rent.data} />
    </div>
  )
}

/* Components
 */

function Banner({
  landing,
}: {
  landing: InferResultType<typeof landingQuery>
}) {
  const { t } = useLocales()

  const banner = landing.backgroundImage
    ? landing.backgroundImage
    : `https://images.unsplash.com/photo-1565426873118-a17ed65d74b9?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`

  return (
    <section className="relative flex h-[90vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={banner}
          alt="Hero Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-linear-to-t from-stone-900/80 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-4 text-left text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center font-serif text-xl leading-normal font-medium md:text-5xl"
        >
          {/* {resolveLanguage(landing.title!, lang)} */}
          {t('headline')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-8 text-center font-serif text-xl leading-normal font-medium md:text-5xl"
        >
          {/* {resolveLanguage(landing.subtitle!, lang)} */}
          {t('subheadline')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link
            to="/collection"
            className="inline-flex items-center gap-3 border border-gold-500 bg-gold-600 px-10 py-4 text-xs font-medium tracking-widest text-white uppercase transition-all hover:border-gold-400 hover:bg-gold-700"
          >
            {t('viewCollection')} <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function Featured({ featured }: { featured: ListingsProps[] }) {
  const { t } = useLocales()

  return (
    <section
      id="listings"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mb-16 text-center">
        <span className="mb-3 block text-xs font-bold tracking-[0.3em] text-gold-600 uppercase">
          {t('exclusivePortfolio')}
        </span>
        <h2 className="mb-6 font-serif text-4xl text-stone-900 md:text-5xl">
          {t('featuredResidences')}
        </h2>
        <div className="mx-auto h-1 w-24 bg-gold-400"></div>
      </div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {featured
          ? featured.map((listing) => (
              <ListingCard key={listing.id} listing={listing} featured />
            ))
          : ''}
      </div>
    </section>
  )
}

function Latest({
  type,
  listings,
}: {
  type: 'saleProperty' | 'rentProperty'
  listings: ListingsProps[]
}) {
  const { t } = useLocales()

  return (
    <section className="border-t border-stone-200 bg-stone-100 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div>
            <h2 className="mb-2 font-serif text-3xl text-stone-900">
              {t(type)}
            </h2>
          </div>
          <Link
            to="/collection"
            className="border-b border-gold-700 pb-1 text-xs font-bold tracking-widest text-gold-700 uppercase hover:text-gold-800"
          >
            {t('viewMore')}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  )
}
