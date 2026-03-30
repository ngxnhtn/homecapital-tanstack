import type { InferResultType } from 'groqd'

import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { memo, useCallback, useMemo, useState } from 'react'

import type { entryQuery } from '../sanity/query'

import { Lightbox } from '../components/Lightbox'
import { ListingFeatures } from '../components/ListingFeatures'
import { ListingGallery } from '../components/ListingGallery'
import { ListingHero } from '../components/ListingHero'
import { ListingSidebar } from '../components/ListingSidebar'
import { entryQueryOptions } from '../sanity/sanity.function'

export const Route = createFileRoute('/listing/$slug')({
  loader: async ({ params, context }) => {
    const listing = await context.queryClient.ensureQueryData(
      entryQueryOptions(params.slug),
    )
    return {
      listing,
    }
  },
  component: Listing,
})

function Listing() {
  const params = Route.useParams()
  const { data: listing } = useSuspenseQuery(entryQueryOptions(params.slug))
  const {
    isLightboxOpen,
    lightboxIndex,
    openLightbox,
    closeLightbox,
    nextLightboxImage,
    prevLightboxImage,
    images,
    gallery,
  } = useLightbox(listing)

  if (!listing) {
    return <h1>Not Found</h1>
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <Lightbox
        isOpen={isLightboxOpen}
        images={images}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNext={nextLightboxImage}
        onPrev={prevLightboxImage}
        title={listing.title!}
      />

      <ListingContent
        listing={listing}
        gallery={gallery}
        onOpenLightbox={openLightbox}
      />
    </div>
  )
}

/* Components
 */

function useLightbox(listing: InferResultType<ReturnType<typeof entryQuery>>) {
  const listingGallery = listing?.gallery
  const hasListing = listing != null
  const featureImage = listing?.featureImage ?? ''

  const gallery = useMemo(() => {
    return listingGallery
      ? listingGallery.map(({ url }) => url).filter((u) => u !== '')
      : []
  }, [listingGallery])

  const images = useMemo(() => {
    return hasListing ? [featureImage, ...gallery] : []
  }, [hasListing, featureImage, gallery])

  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false)
  }, [])

  const nextLightboxImage = useCallback(() => {
    setLightboxIndex((prev) =>
      images.length ? (prev + 1) % images.length : prev,
    )
  }, [images.length])

  const prevLightboxImage = useCallback(() => {
    setLightboxIndex((prev) =>
      images.length ? (prev - 1 + images.length) % images.length : prev,
    )
  }, [images.length])

  return {
    isLightboxOpen,
    lightboxIndex,
    openLightbox,
    closeLightbox,
    nextLightboxImage,
    prevLightboxImage,
    images,
    gallery,
  }
}

const ListingContent = memo(function ListingContent({
  listing,
  gallery,
  onOpenLightbox,
}: {
  listing: NonNullable<ReturnType<typeof Route.useLoaderData>['listing']>
  gallery: string[]
  onOpenLightbox: (index: number) => void
}) {
  return (
    <>
      <ListingHero listing={listing} onOpenLightbox={onOpenLightbox} />

      <div className="relative z-20 mx-auto -mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ListingFeatures listing={listing} />
            <ListingGallery images={gallery} onOpenLightbox={onOpenLightbox} />
          </div>
          <ListingSidebar listing={listing} />
        </div>
      </div>
    </>
  )
})
