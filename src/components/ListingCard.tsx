import { motion } from "motion/react";

import { Link } from "@tanstack/react-router";
import { useLocales } from "../hooks/locales";
import { getDistrictFromZip } from "../sanity/utils";
import type { Feature } from "../sanity/sanity.function";

export function ListingCard({ listing, featured }: { listing: Feature; featured?: boolean }) {
  const { t } = useLocales();

  const status = (() => {
    if (listing.listingStatus == "rent") {
      return t("rentProperty");
    }
    if (listing.listingStatus == "sale") {
      return t("saleProperty");
    }
    if (listing.listingStatus == "closed") {
      return t("closedProperty");
    }
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0, ease: "easeOut" }}
      className={`group bg-white shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-stone-100`}
    >
      <Link
        to="/listing/$slug"
        params={{ slug: listing.slug! }}
        className="relative block overflow-hidden aspect-4/3"
      >
        <img
          src={listing.photo}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className={`absolute top-6 left-6 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest shadow-gold-500 text-stone-900 shadow-lg/30 ${listing.listingStatus == "closed" ? "bg-red-500" : ""}`}
        >
          {status}
        </div>
      </Link>

      <div className="p-8 flex flex-col grow relative">
        {/* Decorative border line */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gold-100"></div>

        <div className="mb-4">
          <span className="text-gold-600 text-[10px] uppercase tracking-[0.2em] font-bold">
            Budapest • {t("district")} {getDistrictFromZip(listing.location?.postalCode)}
          </span>
        </div>

        <Link to="/listing/$slug" params={{ slug: listing.slug! }} className="block mb-3">
          <h3
            className={`font-serif text-stone-900 group-hover:text-gold-700 transition-colors leading-tight ${featured ? "text-3xl" : "text-xl"}`}
          >
            {listing.title}
          </h3>
        </Link>

        <div className="flex items-center text-stone-500 text-sm mb-4 font-light">
          <i className="fa-solid fa-map-pin mr-2 text-gold-500 shrink-0" />
          <span className="truncate">{listing.location?.address}</span>
        </div>

        <div className="text-2xl font-serif text-stone-900 mb-6 flex justify-end lining-nums">
          {listing.value?.currency} {listing.value?.priceAmount!.toLocaleString()}
          {listing.listingStatus == "rent" ? t("month") : ""}
        </div>

        <div className="mt-auto">
          <div className="pt-5 border-t border-stone-100">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2" title={t("rooms")}>
                <i className="text-gold-600 shrink-0 fa-solid fa-house-chimney" />
                <span className="font-serif text-stone-900 lining-nums">
                  {listing.specs?.rooms} {t("rooms")}
                </span>
              </div>
              <div className="w-px h-6 bg-stone-200"></div>
              <div className="flex items-center gap-2" title={t("livingArea")}>
                <i className="text-gold-600 shrink-0  fa-regular fa-square" />
                <span className="font-serif text-stone-900 whitespace-nowrap lining-nums">
                  {listing.specs?.area} m²
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
