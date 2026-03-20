import { Link } from "@tanstack/react-router";
import { useLocales } from "../hooks/locales";
import type { DetailListingType } from "../sanity/sanity.function";

interface ListingSidebarProps {
  listing: DetailListingType;
}

export function ListingSidebar({ listing }: ListingSidebarProps) {
  const { t } = useLocales();

  return (
    <div className="lg:col-span-1 space-y-8">
      {/* Price Card (Mobile only) */}
      <div className="bg-white shadow-xl p-8 border-t-4 border-gold-600 md:hidden flex flex-col gap-4">
        <div>
          <div className="text-3xl font-serif text-stone-900 mb-1">
            {listing.value?.currency} {listing.value?.priceAmount!.toLocaleString()}
            {listing.listingStatus == "rent" ? t("month") : ""}
          </div>
          <div className="text-xs text-stone-400 uppercase tracking-widest">Asking Price</div>
        </div>
        <a
          href={listing.location?.gmaps}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-gold-600 hover:text-gold-700 transition-colors border border-gold-200 hover:border-gold-300 rounded-full px-4 py-2 w-full bg-gold-50"
        >
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
          {t("openInMaps")}
        </a>
      </div>

      {/* Agent Card */}
      <div className="bg-stone-900 text-white shadow-2xl p-8 sticky top-24">
        <div className="flex items-center gap-2 mb-8 text-gold-400">
          <i className="fa-solid fa-crown"></i>
          <span className="text-xs uppercase tracking-[0.2em] font-bold">View the property</span>
        </div>

        <div className="flex items-center gap-6 mb-8">
          <img
            src={listing.photo}
            className="w-20 h-20 rounded-full object-cover border-2 border-gold-500 p-1"
          />
          <div>
            <div className="font-serif text-xl mb-1">Agent</div>
            <div className="text-stone-400 text-xs uppercase tracking-widest">Senior Partner</div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <Link
            to="/contact"
            className="block w-full py-4 px-6 bg-gold-600 hover:bg-gold-700 text-white text-center font-medium transition-colors uppercase tracking-widest text-xs"
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
  );
}
