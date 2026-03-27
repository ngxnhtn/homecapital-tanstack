import { createFileRoute } from "@tanstack/react-router";
import { Lightbox } from "../components/Lightbox";
import { ListingHero } from "../components/ListingHero";
import { ListingFeatures } from "../components/ListingFeatures";
import { ListingGallery } from "../components/ListingGallery";
import { memo, useCallback, useMemo, useState } from "react";

import { ListingSidebar } from "../components/ListingSidebar";
import { entryQueryOptions } from "../sanity/sanity.function";
import type { InferResultType } from "groqd";
import type { entryQuery } from "../sanity/query";

export const Route = createFileRoute("/listing/$slug")({
  loader: async ({ params, context }) => {
    const listing = await context.queryClient.ensureQueryData(entryQueryOptions(params.slug));
    return {
      listing,
    };
  },
  component: Listing,
});

function Listing() {
  const { listing } = Route.useLoaderData();
  const {
    isLightboxOpen,
    lightboxIndex,
    openLightbox,
    closeLightbox,
    nextLightboxImage,
    prevLightboxImage,
    images,
    gallery,
  } = useLightbox(listing);

  if (!listing) {
    return <h1>Not Found</h1>;
  }

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      <Lightbox
        isOpen={isLightboxOpen}
        images={images}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNext={nextLightboxImage}
        onPrev={prevLightboxImage}
        title={listing.title!}
      />

      <ListingContent listing={listing} gallery={gallery} onOpenLightbox={openLightbox} />
    </div>
  );
}

/* Components
 */

function useLightbox(listing: InferResultType<ReturnType<typeof entryQuery>>) {
  const listingGallery = listing?.gallery;
  const hasListing = listing != null;
  const featureImage = listing?.featureImage ?? "";

  const gallery = useMemo(() => {
    return listingGallery ? listingGallery.map(({ url }) => url).filter((u) => u !== "") : [];
  }, [listingGallery]);

  const images = useMemo(() => {
    return hasListing ? [featureImage, ...gallery] : [];
  }, [hasListing, featureImage, gallery]);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const nextLightboxImage = useCallback(() => {
    setLightboxIndex((prev) => (images.length ? (prev + 1) % images.length : prev));
  }, [images.length]);

  const prevLightboxImage = useCallback(() => {
    setLightboxIndex((prev) => (images.length ? (prev - 1 + images.length) % images.length : prev));
  }, [images.length]);

  return {
    isLightboxOpen,
    lightboxIndex,
    openLightbox,
    closeLightbox,
    nextLightboxImage,
    prevLightboxImage,
    images,
    gallery,
  };
}

const ListingContent = memo(function ListingContent({
  listing,
  gallery,
  onOpenLightbox,
}: {
  listing: NonNullable<ReturnType<typeof Route.useLoaderData>["listing"]>;
  gallery: string[];
  onOpenLightbox: (index: number) => void;
}) {
  return (
    <>
      <ListingHero listing={listing} onOpenLightbox={onOpenLightbox} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <ListingFeatures listing={listing} />
            <ListingGallery images={gallery} onOpenLightbox={onOpenLightbox} />
          </div>
          <ListingSidebar listing={listing} />
        </div>
      </div>
    </>
  );
});
