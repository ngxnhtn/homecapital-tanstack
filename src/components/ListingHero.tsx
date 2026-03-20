import { motion, AnimatePresence } from "motion/react";
import { useLocales } from "../hooks/locales";
import { Link } from "@tanstack/react-router";
import type { DetailListingType } from "../sanity/sanity.function";
import { getDistrictFromZip } from "../sanity/utils";

interface ListingHeroProps {
  listing: DetailListingType;

  onOpenLightbox: (index: number) => void;
}

export function ListingHero({ listing, onOpenLightbox }: ListingHeroProps) {
  const { t } = useLocales();

  return (
    <div className="relative h-[70vh] md:h-[85vh] bg-stone-900 group">
      <AnimatePresence mode="wait">
        <motion.img
          src={listing.photo}
          alt={listing.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => onOpenLightbox(0)}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

      <Link
        to="/collection"
        className="absolute top-8 left-8 z-10 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-4 rounded-full transition-colors border border-white/20"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </Link>

      <div className="absolute bottom-0 left-0 right-0 z-10 p-8 md:p-16 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="text-white max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-gold-600 text-white px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold">
              {t("district")} {getDistrictFromZip(listing.location?.postalCode)}
            </span>
            <span className="text-gold-200 uppercase tracking-[0.2em] text-xs font-medium">
              Budapest
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-medium mb-4 leading-tight">
            {listing.title}
          </h1>
          <div className="flex items-center text-stone-300 text-lg font-light mt-2">
            <i className="fa-solid fa-map-pin mr-2 text-gold-500"></i>
            {listing.location?.address}, Budapest
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-4">
          <a
            href={listing.location?.gmaps}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-400 hover:text-gold-300 transition-colors border border-gold-500/30 hover:border-gold-400 rounded-full px-4 py-1.5 w-fit bg-black/50 backdrop-blur-sm"
          >
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
            {t("openInMaps")}
          </a>
          <div className="bg-white/10 backdrop-blur-md p-8 text-white border border-white/20 min-w-75">
            <div className="text-4xl font-serif mb-1">
              {listing.value?.currency} {listing.value?.priceAmount!.toLocaleString()}
            </div>
            <div className="text-xs text-gold-200 uppercase tracking-widest">
              {listing.listingStatus == "rent" ? t("month") : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
