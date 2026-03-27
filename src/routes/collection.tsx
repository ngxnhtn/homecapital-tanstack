import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useLocales } from "../hooks/locales";
import { ListingCard } from "../components/ListingCard";
import { allQueryOptions } from "../sanity/sanity.function";
import { useEffect, useMemo, useState } from "react";
import { getDistrictFromZip } from "../sanity/utils";

export const Route = createFileRoute("/collection")({
  loader: async ({ context }) => {
    const all = await context.queryClient.ensureQueryData(allQueryOptions());
    return {
      all,
    };
  },
  component: Collection,
});

function Collection() {
  const { all } = Route.useLoaderData();
  const { t } = useLocales();

  const [statusFilter, setStatusFilter] = useState<"all" | "sale" | "rent">("all");
  const [districtFilter, setDistrictFilter] = useState<string>("all");

  const availableDistricts = useMemo(() => {
    const filtered = all.filter((l) => statusFilter === "all" || l.listingStatus === statusFilter);
    const districts = new Set(filtered.map((l) => getDistrictFromZip(l.location!.postalCode!)));
    return Array.from(districts).sort();
  }, [statusFilter]);

  const availableStatuses = useMemo(() => {
    const filtered = all.filter(
      (l) =>
        districtFilter === "all" || getDistrictFromZip(l.location!.postalCode!) === districtFilter,
    );
    const statuses = new Set(filtered.map((l) => l.listingStatus));
    return Array.from(statuses);
  }, [districtFilter]);

  // Reset district filter if the currently selected district is no longer available
  useEffect(() => {
    if (districtFilter !== "all" && !availableDistricts.includes(districtFilter)) {
      setDistrictFilter("all");
    }
  }, [availableDistricts, districtFilter]);

  // Reset status filter if the currently selected status is no longer available
  useEffect(() => {
    if (statusFilter !== "all" && !availableStatuses.includes(statusFilter)) {
      setStatusFilter("all");
    }
  }, [availableStatuses, statusFilter]);

  const filteredListings = useMemo(() => {
    return all.filter((listing) => {
      const matchesStatus = statusFilter === "all" || listing.listingStatus === statusFilter;
      const matchesDistrict =
        districtFilter === "all" ||
        getDistrictFromZip(listing.location!.postalCode!) === districtFilter;
      return matchesStatus && matchesDistrict;
    });
  }, [statusFilter, districtFilter]);

  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Title />

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12"
          >
            <div className="flex bg-white shadow-sm border border-stone-200 rounded-full p-1">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-6 py-2 rounded-full text-sm font-medium uppercase tracking-widest transition-colors ${statusFilter === "all" ? "bg-stone-900 text-white" : "text-stone-500 hover:text-stone-900"}`}
              >
                {t("all")}
              </button>
              {(availableStatuses.includes("sale") || statusFilter === "sale") && (
                <button
                  onClick={() => setStatusFilter("sale")}
                  className={`px-6 py-2 rounded-full text-sm font-medium uppercase tracking-widest transition-colors ${statusFilter === "sale" ? "bg-stone-900 text-white" : "text-stone-500 hover:text-stone-900"}`}
                >
                  {t("saleProperty")}
                </button>
              )}
              {(availableStatuses.includes("rent") || statusFilter === "rent") && (
                <button
                  onClick={() => setStatusFilter("rent")}
                  className={`px-6 py-2 rounded-full text-sm font-medium uppercase tracking-widest transition-colors ${statusFilter === "rent" ? "bg-stone-900 text-white" : "text-stone-500 hover:text-stone-900"}`}
                >
                  {t("rentProperty")}
                </button>
              )}
            </div>

            <div className="relative">
              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="appearance-none bg-white shadow-sm border border-stone-200 rounded-full px-6 py-2.5 pr-12 text-sm font-medium uppercase tracking-widest text-stone-700 focus:outline-none focus:ring-2 focus:ring-gold-500 cursor-pointer min-w-50"
              >
                <option value="all">{t("allDistricts")}</option>
                {availableDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-stone-500">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Listings */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredListings.map((listing) => (
              <motion.div
                key={listing.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ListingCard listing={listing} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredListings.length === 0 && (
          <div className="text-center py-20 text-stone-500 font-light text-lg">{t("notFound")}</div>
        )}
      </div>
    </div>
  );
}

/* Components
 */

function Title() {
  const { t } = useLocales();
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-serif text-stone-900 mb-6"
      >
        {t("collectionTitle")}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-lg text-stone-500 max-w-2xl mx-auto font-light"
      >
        {t("collectionSubtitle")}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-24 h-1 bg-gold-400 mx-auto mt-8 mb-12"
      ></motion.div>
    </>
  );
}
