import { useLocales } from '../hooks/locales'

interface ListingGalleryProps {
  images: string[]
  onOpenLightbox: (index: number) => void
}

export function ListingGallery({
  images,
  onOpenLightbox,
}: ListingGalleryProps) {
  const { t } = useLocales()

  return (
    <div className="border border-stone-100 bg-white p-10 shadow-xl md:p-12">
      <h3 className="mb-8 font-serif text-2xl text-stone-900">
        {t('gallery')}
      </h3>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {images.map((img, idx) => (
          <button
            key={idx + 1}
            onClick={() => onOpenLightbox(idx + 1)}
            className={`group relative aspect-square overflow-hidden`}
          >
            <img
              src={img}
              alt={`Gallery ${idx + 1}`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
          </button>
        ))}
      </div>
    </div>
  )
}
