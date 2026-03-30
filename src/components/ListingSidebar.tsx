import type { InferResultType } from 'groqd'

import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'

import type { entryQuery } from '../sanity/query'

import { useLocales } from '../hooks/locales'
import { aboutQueryOptions } from '../sanity/sanity.function'
import { resolveLanguage } from '../sanity/utils'

interface ListingSidebarProps {
  listing: InferResultType<ReturnType<typeof entryQuery>>
}

export function ListingSidebar({ listing }: ListingSidebarProps) {
  const { t, lang } = useLocales()
  const { data: members } = useSuspenseQuery({
    ...aboutQueryOptions(),
    select: (about) => {
      return {
        ...about.members,
      }
    },
  })

  const director = members[0]

  return (
    <div className="space-y-8 lg:col-span-1">
      {/* Price Card (Mobile only) */}
      <div className="flex flex-col gap-4 border-t-4 border-gold-600 bg-white p-8 shadow-xl md:hidden">
        <div>
          <div className="mb-1 font-serif text-3xl text-stone-900">
            {listing!.propertyValue?.currency}{' '}
            {listing?.propertyValue?.priceAmount!.toLocaleString()}
            {listing!.listingStatus == 'rent' ? t('month') : ''}
          </div>
          <div className="text-xs tracking-widest text-stone-400 uppercase">
            Asking Price
          </div>
        </div>
        <a
          href={listing!.location!.gmaps!}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold-200 bg-gold-50 px-4 py-2 text-xs tracking-widest text-gold-600 uppercase transition-colors hover:border-gold-300 hover:text-gold-700"
        >
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
          {t('openInMaps')}
        </a>
      </div>

      {/* Agent Card */}
      <div className="sticky top-24 bg-stone-900 p-8 text-white shadow-2xl">
        <div className="mb-8 flex items-center gap-2 text-gold-400">
          <i className="fa-solid fa-crown"></i>
          <span className="text-xs font-bold tracking-[0.2em] uppercase">
            View the property
          </span>
        </div>

        <div className="mb-8 flex items-center gap-6">
          <img
            src={
              director.memberPhoto
                ? director.memberPhoto
                : listing?.featureImage
            }
            className="h-20 w-20 rounded-full border-2 border-gold-500 object-cover p-1"
          />
          <div>
            <div className="mb-1 font-serif text-xl">
              {director.memberName
                ? resolveLanguage(director.memberName, lang)
                : 'Agency'}
            </div>
            <div className="text-xs tracking-widest text-stone-400 uppercase">
              {director.memberTitle
                ? resolveLanguage(director.memberTitle, lang)
                : 'Senior Partner'}
            </div>
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <Link
            to="/contact"
            className="block w-full bg-gold-600 px-6 py-4 text-center text-xs font-medium tracking-widest text-white uppercase transition-colors hover:bg-gold-700"
          >
            Contact
          </Link>
          {/* <a
            href=""
            className="block w-full border border-stone-700 bg-transparent px-6 py-4 text-center text-xs font-medium tracking-widest text-stone-300 uppercase transition-colors hover:border-gold-500 hover:text-gold-400"
          >
            Email
          </a> */}
        </div>

        {/* <div className="border-t border-stone-800 pt-8">
          <h4 className="mb-6 font-serif text-lg text-white italic">
            Request Viewing
          </h4>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-stone-700 bg-stone-800 px-4 py-3 font-light text-white placeholder-stone-500 transition-all focus:border-gold-500 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-stone-700 bg-stone-800 px-4 py-3 font-light text-white placeholder-stone-500 transition-all focus:border-gold-500 focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full border border-stone-700 bg-stone-800 px-4 py-3 font-light text-white placeholder-stone-500 transition-all focus:border-gold-500 focus:outline-none"
            />
            <textarea
              placeholder="Interested In"
              rows={3}
              className="w-full resize-none border border-stone-700 bg-stone-800 px-4 py-3 font-light text-white placeholder-stone-500 transition-all focus:border-gold-500 focus:outline-none"
            ></textarea>
            <button className="mt-2 w-full bg-white px-6 py-4 text-xs font-bold tracking-widest text-stone-900 uppercase transition-colors hover:bg-gold-50">
              Send Request
            </button>
          </form>
        </div> */}
      </div>
    </div>
  )
}
