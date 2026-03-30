import type { InferResultType } from 'groqd'

import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import Markdown from 'react-markdown'

import type { aboutQuery } from '../sanity/query'

import { useLocales } from '../hooks/locales'
import { aboutQueryOptions } from '../sanity/sanity.function'
import { resolveLanguage } from '../sanity/utils'

export const Route = createFileRoute('/about')({
  loader: async ({ context }) => {
    const about = await context.queryClient.ensureQueryData(aboutQueryOptions())
    return {
      about,
    }
  },
  component: About,
})

function About() {
  const { data: about } = useSuspenseQuery(aboutQueryOptions())

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <Hero about={about} />
      <Mission about={about} />
      <Team about={about} />
    </div>
  )
}

/* Components
 */

function Hero({ about }: { about: InferResultType<typeof aboutQuery> }) {
  const { lang } = useLocales()

  return (
    <section className="relative overflow-hidden bg-stone-900 px-4 py-32 text-white">
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1565426873118-a17ed65d74b9?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 font-serif text-5xl font-medium md:text-7xl"
        >
          {resolveLanguage(about.title!, lang)}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto max-w-2xl text-xl leading-relaxed font-light text-stone-300"
        >
          {resolveLanguage(about.subtitle!, lang)}
        </motion.p>
      </div>
    </section>
  )
}

function Mission({ about }: { about: InferResultType<typeof aboutQuery> }) {
  const { t, lang } = useLocales()

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
        <div>
          <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-gold-600 uppercase">
            {t('philosophy')}
          </span>
          <h2 className="mb-8 font-serif text-4xl text-stone-900">
            {resolveLanguage(about.hero!.philosophyTitle!, lang)}
          </h2>
          <p className="mb-6 text-lg leading-relaxed font-light text-stone-600">
            {resolveLanguage(about.hero!.philosophyDesc!, lang)}
          </p>
        </div>
        <div className="relative h-125 border-8 border-white shadow-2xl">
          <img
            src={about.hero!.aboutPhoto}
            alt="Budapest Architecture"
            className="h-full w-full object-cover"
          />
          <div className="absolute -right-6 -bottom-6 -z-10 h-32 w-32 bg-gold-600"></div>
          <div className="absolute -top-6 -left-6 -z-10 h-32 w-32 bg-stone-200"></div>
        </div>
      </div>
    </section>
  )
}

function Team({ about }: { about: InferResultType<typeof aboutQuery> }) {
  const { t } = useLocales()

  return (
    <section className="border-t border-stone-100 bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <h2 className="mb-6 font-serif text-4xl text-stone-900">
            {t('expert')}
          </h2>
          <div className="mx-auto mb-6 h-1 w-16 bg-gold-400"></div>
          <p className="mx-auto max-w-2xl text-lg font-light text-stone-500">
            {t('memberSubtitle')}
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {about?.members
            ? about.members.map((member, id) => (
                <TeamMember member={member} key={id} />
              ))
            : ''}
        </div>
      </div>
    </section>
  )
}

function TeamMember({
  member,
}: {
  member: NonNullable<InferResultType<typeof aboutQuery>['members']>[number]
}) {
  const { lang } = useLocales()
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 1 * 0.2, duration: 0.6 }}
      className="flex flex-col items-center justify-between border border-stone-100 bg-stone-50 p-8 px-10 text-center transition-shadow duration-500 hover:shadow-xl lg:mx-20 lg:flex-row lg:gap-20"
    >
      <div className="min-w-fit">
        <div className="mx-auto mb-8 h-48 w-48 overflow-hidden rounded-full border-4 border-white shadow-lg">
          {member.memberPhoto ? (
            <img
              src={member.memberPhoto}
              className="h-full w-full object-cover transition-all duration-500"
            />
          ) : (
            ''
          )}
        </div>
        <div className="min-w-fit">
          <h3 className="mb-2 inline-block min-w-fit font-serif text-2xl text-stone-900">
            {resolveLanguage(member.memberName!, lang)}
          </h3>
          <div className="mb-6 text-xs font-bold tracking-widest text-gold-600 uppercase">
            {resolveLanguage(member.memberTitle!, lang)}
          </div>
        </div>
      </div>

      <div className="text-md flex flex-col gap-2 font-light text-stone-600">
        <Markdown>{resolveLanguage(member.memberAbout!, lang)}</Markdown>
      </div>
    </motion.div>
  )
}
