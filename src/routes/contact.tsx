import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useLocales } from "../hooks/locales";
import type { InferResultType } from "groqd";
import type { agencyQuery } from "../sanity/query";

export const Route = createFileRoute("/contact")({
  loader: async ({ context }) => {
    return { agency: context.metadata };
  },
  component: Contact,
});

function Contact() {
  const { agency } = Route.useLoaderData();
  const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSfNftU1OeNOgXNDFUqGrR0pxjebH83saLuSUtq2iYR142x_2Q/viewform?embedded=true`;

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      <Hero />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ContactInfo agency={agency} />
          <Form url={formUrl} />
        </div>
      </section>
    </div>
  );
}

/* Components
 */

function Hero() {
  const { t } = useLocales();

  return (
    <section className="bg-stone-900 text-white py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1522885147691-06d859633fb8?q=80&w=2670&auto=format&fit=crop"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-serif font-medium mb-6"
        >
          {t("contactTitle")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-stone-300 leading-relaxed font-light"
        >
          {t("contactSubtitle")}
        </motion.p>
      </div>
    </section>
  );
}

function ContactInfo({ agency }: { agency: InferResultType<typeof agencyQuery> }) {
  const { t } = useLocales();

  return (
    <div className="bg-stone-900 text-white p-12 shadow-2xl">
      <h2 className="text-3xl font-serif text-white mb-12">{t("contactInfo")}</h2>

      <div className="space-y-10">
        <div className="flex items-start gap-6">
          <div className="p-3 border border-gold-600 text-gold-500 rounded-none">
            <i className="fa-solid fa-map-pin"></i>
          </div>
          <div>
            <h3 className="font-serif text-xl text-white mb-2">{t("visitUs")}</h3>
            <p className="text-stone-400 font-light leading-relaxed">{agency!.location!.address}</p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="p-3 border border-gold-600 text-gold-500 rounded-none">
            <i className="fa-solid fa-phone"></i>
          </div>
          <div>
            <h3 className="font-serif text-xl text-white mb-2">{t("callUs")}</h3>
            <p className="text-stone-400 font-light">{agency.contactDetails?.phone}</p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="p-3 border border-gold-600 text-gold-500 rounded-none">
            <i className="fa-regular fa-envelope"></i>
          </div>
          <div>
            <h3 className="font-serif text-xl text-white mb-2">{t("emailUs")}</h3>
            <p className="text-stone-400 font-light">{agency.contactDetails?.email}</p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="p-3 border border-gold-600 text-gold-500 rounded-none">
            <i className="fa-regular fa-clock"></i>
          </div>
          <div>
            <h3 className="font-serif text-xl text-white mb-2">{t("openingHours")}</h3>
            <p className="text-stone-400 font-light">{agency.openingHours}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Form({ url }: { url: string }) {
  return (
    <div className="p-0 m-0">
      <iframe src={url} width="600" height="1096"></iframe>
    </div>
  );
}
