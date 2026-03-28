import { createFileRoute } from "@tanstack/react-router";
import { resolveLanguage } from "../sanity/utils";
import { motion } from "motion/react";
import { useLocales } from "../hooks/locales";
import { aboutQueryOptions } from "../sanity/sanity.function";
import type { InferResultType } from "groqd";
import type { aboutQuery } from "../sanity/query";
import { useSuspenseQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";

export const Route = createFileRoute("/about")({
  loader: async ({ context }) => {
    const about = await context.queryClient.ensureQueryData(aboutQueryOptions());
    return {
      about,
    };
  },
  component: About,
});

function About() {
  const { data: about } = useSuspenseQuery(aboutQueryOptions());

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      <Hero about={about} />
      <Mission about={about} />
      <Team about={about} />
    </div>
  );
}

/* Components
 */

function Hero({ about }: { about: InferResultType<typeof aboutQuery> }) {
  const { lang } = useLocales();

  return (
    <section className="bg-stone-900 text-white py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1565426873118-a17ed65d74b9?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-serif font-medium mb-8"
        >
          {resolveLanguage(about.title!, lang)}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-stone-300 leading-relaxed font-light max-w-2xl mx-auto"
        >
          {resolveLanguage(about.subtitle!, lang)}
        </motion.p>
      </div>
    </section>
  );
}

function Mission({ about }: { about: InferResultType<typeof aboutQuery> }) {
  const { t, lang } = useLocales();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-gold-600 uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
            {t("philosophy")}
          </span>
          <h2 className="text-4xl font-serif text-stone-900 mb-8">
            {resolveLanguage(about.hero!.philosophyTitle!, lang)}
          </h2>
          <p className="text-stone-600 mb-6 leading-relaxed font-light text-lg">
            {resolveLanguage(about.hero!.philosophyDesc!, lang)}
          </p>
        </div>
        <div className="relative h-125 shadow-2xl border-8 border-white">
          <img
            src={about.hero!.aboutPhoto}
            alt="Budapest Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold-600 -z-10"></div>
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-stone-200 -z-10"></div>
        </div>
      </div>
    </section>
  );
}

function Team({ about }: { about: InferResultType<typeof aboutQuery> }) {
  const { t } = useLocales();

  return (
    <section className="bg-white py-24 border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-serif text-stone-900 mb-6">{t("expert")}</h2>
          <div className="w-16 h-1 bg-gold-400 mx-auto mb-6"></div>
          <p className="text-stone-500 max-w-2xl mx-auto font-light text-lg">
            {t("memberSubtitle")}
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {about?.members
            ? about.members.map((member, id) => <TeamMember member={member} key={id} />)
            : ""}
        </div>
      </div>
    </section>
  );
}

function TeamMember({
  member,
}: {
  member: NonNullable<InferResultType<typeof aboutQuery>["members"]>[number];
}) {
  const { lang } = useLocales();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 1 * 0.2, duration: 0.6 }}
      className="flex flex-col lg:flex-row bg-stone-50 p-8 text-center hover:shadow-xl transition-shadow duration-500 border border-stone-100 justify-between px-10 lg:gap-20 lg:mx-20 items-center"
    >
      <div className="min-w-fit">
        <div className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white shadow-lg">
          {member.memberPhoto ? (
            <img
              src={member.memberPhoto}
              className="w-full h-full object-cover transition-all duration-500"
            />
          ) : (
            ""
          )}
        </div>
        <div className="min-w-fit">
          <h3 className="text-2xl font-serif text-stone-900 mb-2 min-w-fit inline-block">
            {resolveLanguage(member.memberName!, lang)}
          </h3>
          <div className="text-gold-600 text-xs uppercase tracking-widest font-bold mb-6">
            {resolveLanguage(member.memberTitle!, lang)}
          </div>
        </div>
      </div>

      <div className="text-stone-600 font-light text-md flex flex-col gap-2 ">
        <Markdown>{resolveLanguage(member.memberAbout!, lang)}</Markdown>
      </div>
    </motion.div>
  );
}
