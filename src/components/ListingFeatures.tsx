import type { InferResultType } from 'groqd'

import Markdown from 'react-markdown'

import type { entryQuery } from '../sanity/query'

import { useLocales } from '../hooks/locales'
import { resolveLanguage } from '../sanity/utils'

interface ListingFeaturesProps {
  listing: InferResultType<ReturnType<typeof entryQuery>>
}

export function ListingFeatures({ listing }: ListingFeaturesProps) {
  const { t, lang } = useLocales()

  return (
    <div className="mb-12 border-t-4 border-gold-600 bg-white p-10 shadow-xl md:p-12">
      <div className="mb-12 flex flex-wrap gap-12 border-b border-stone-100 pb-12">
        <div className="flex items-center gap-4">
          <div className="bg-stone-50 p-3 text-gold-600">
            <i className="fa-solid fa-house-chimney"></i>
          </div>
          <div>
            <div className="mb-1 text-[10px] font-bold tracking-widest text-stone-400 uppercase">
              {t('rooms')}
            </div>
            <div className="font-serif text-3xl text-stone-900">
              {listing!.specs?.rooms}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-stone-50 p-3 text-gold-600">
            <i className="fa-regular fa-square"></i>
          </div>
          <div>
            <div className="mb-1 text-[10px] font-bold tracking-widest text-stone-400 uppercase">
              {t('livingArea')}
            </div>
            <div className="font-serif text-3xl text-stone-900">
              {listing!.specs?.area} m²
            </div>
          </div>
        </div>
      </div>

      <div className="prose prose-stone prose-base max-w-none prose-headings:font-serif prose-headings:font-medium prose-p:font-light prose-p:leading-relaxed prose-a:text-gold-600 prose-blockquote:border-gold-400 prose-blockquote:bg-stone-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-li:marker:text-gold-500">
        <Markdown>{resolveLanguage(listing!.description!, lang)}</Markdown>
      </div>

      {listing!.features && listing!.features.length > 0 ? (
        <div className="mt-16">
          <h3 className="mb-8 font-serif text-2xl text-stone-900">
            {t('residenceFeatures')}
          </h3>
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            {listing!.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 border-b border-stone-50 py-3 text-stone-600"
              >
                {feature.icon ? (
                  <i
                    className={`fa-solid text-gold-500 ${feature.icon.name}`}
                  />
                ) : (
                  <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                )}
                <span className="font-light tracking-wide">
                  {feature[lang]}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
