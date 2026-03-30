import type { InferResultType } from 'groqd'

import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'

import type { agencyQuery } from '../sanity/query'

import { useLocales } from '../hooks/locales'
import { agencyQueryOptions } from '../sanity/sanity.function'

export const Route = createFileRoute('/contact')({
  loader: async ({ context }) => {
    return { agency: context.metadata }
  },
  component: Contact,
})

function Contact() {
  const { data: agency } = useSuspenseQuery(agencyQueryOptions())
  const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSfNftU1OeNOgXNDFUqGrR0pxjebH83saLuSUtq2iYR142x_2Q/viewform?embedded=true`

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <Hero />
      <section className="relative z-20 mx-auto -mt-12 max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <ContactInfo agency={agency} />
          <Form url={formUrl} />
        </div>
      </section>
    </div>
  )
}

/* Components
 */

function Hero() {
  const { t } = useLocales()

  return (
    <section className="relative overflow-hidden bg-stone-900 px-4 py-24 text-white">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1522885147691-06d859633fb8?q=80&w=2670&auto=format&fit=crop"
          alt="Background"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 font-serif text-4xl font-medium md:text-6xl"
        >
          {t('contactTitle')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl leading-relaxed font-light text-stone-300"
        >
          {t('contactSubtitle')}
        </motion.p>
      </div>
    </section>
  )
}

function ContactInfo({
  agency,
}: {
  agency: InferResultType<typeof agencyQuery>
}) {
  const { t } = useLocales()

  return (
    <div className="bg-stone-900 p-12 text-white shadow-2xl">
      <h2 className="mb-12 font-serif text-3xl text-white">
        {t('contactInfo')}
      </h2>

      <div className="space-y-10">
        <div className="flex items-start gap-6">
          <div className="rounded-none border border-gold-600 p-3 text-gold-500">
            <i className="fa-solid fa-map-pin"></i>
          </div>
          <div>
            <h3 className="mb-2 font-serif text-xl text-white">
              {t('visitUs')}
            </h3>
            <p className="leading-relaxed font-light text-stone-400">
              {agency!.location!.address}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="rounded-none border border-gold-600 p-3 text-gold-500">
            <i className="fa-solid fa-phone"></i>
          </div>
          <div>
            <h3 className="mb-2 font-serif text-xl text-white">
              {t('callUs')}
            </h3>
            <p className="font-light text-stone-400">
              {agency.contactDetails?.phone}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="rounded-none border border-gold-600 p-3 text-gold-500">
            <i className="fa-regular fa-envelope"></i>
          </div>
          <div>
            <h3 className="mb-2 font-serif text-xl text-white">
              {t('emailUs')}
            </h3>
            <p className="font-light text-stone-400">
              {agency.contactDetails?.email}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="rounded-none border border-gold-600 p-3 text-gold-500">
            <i className="fa-regular fa-clock"></i>
          </div>
          <div>
            <h3 className="mb-2 font-serif text-xl text-white">
              {t('openingHours')}
            </h3>
            <p className="font-light text-stone-400">{agency.openingHours}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Form({ url }: { url: string }) {
  return (
    <div className="m-0 p-0">
      <iframe src={url} width="600" height="1096"></iframe>
    </div>
  )
}
