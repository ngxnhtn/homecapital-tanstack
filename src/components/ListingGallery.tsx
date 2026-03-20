import { useLocales } from "../hooks/locales";

interface ListingGalleryProps {
  images: string[];
  onOpenLightbox: (index: number) => void;
}

export function ListingGallery({ images, onOpenLightbox }: ListingGalleryProps) {
  const { t } = useLocales();

  return (
    <div className="bg-white shadow-xl p-10 md:p-12 border border-stone-100">
      <h3 className="text-2xl font-serif text-stone-900 mb-8">{t("gallery")}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => onOpenLightbox(idx)}
            className={`aspect-square overflow-hidden relative group `}
          >
            <img
              src={img}
              alt={`Gallery ${idx}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}
