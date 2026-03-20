import { useLocales } from "../hooks/locales";
import Markdown from "react-markdown";
import type { DetailListingType } from "../sanity/sanity.function";
import { resolveLanguage } from "../sanity/utils";

interface ListingFeaturesProps {
  listing: DetailListingType;
}

export function ListingFeatures({ listing }: ListingFeaturesProps) {
  const { t, lang } = useLocales();

  return (
    <div className="bg-white shadow-xl p-10 md:p-12 mb-12 border-t-4 border-gold-600">
      <div className="flex flex-wrap gap-12 mb-12 pb-12 border-b border-stone-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-stone-50 text-gold-600">
            <i className="fa-solid fa-house-chimney"></i>
          </div>
          <div>
            <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1">
              {t("rooms")}
            </div>
            <div className="text-3xl font-serif text-stone-900">{listing.specs?.rooms}</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-stone-50 text-gold-600">
            <i className="fa-regular fa-square"></i>
          </div>
          <div>
            <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-1">
              {t("livingArea")}
            </div>
            <div className="text-3xl font-serif text-stone-900">{listing.specs?.area} m²</div>
          </div>
        </div>
      </div>

      <div className="prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:font-medium prose-p:font-light prose-p:leading-relaxed prose-a:text-gold-600 prose-blockquote:border-gold-400 prose-blockquote:bg-stone-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-li:marker:text-gold-500">
        <Markdown>{resolveLanguage(listing.description, lang)}</Markdown>
      </div>

      {listing.features && listing.features.length > 0 ? (
        <div className="mt-16">
          <h3 className="text-2xl font-serif text-stone-900 mb-8">{t("residenceFeatures")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            {listing.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 text-stone-600 py-3 border-b border-stone-50"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                <span className="font-light tracking-wide">{feature[lang]}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
