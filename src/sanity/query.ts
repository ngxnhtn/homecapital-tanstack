import type { Location } from "../../sanity.types";
import { q } from "./client";
import { urlForImage } from "./utils";

const locationFragments = q.fragment<Location>().project((sub) => ({
  address: sub.field("address"),
  gmaps: sub.field("gmaps"),
  postalCode: sub.field("postalCode"),
}));

export const propertyCardFragments = q.fragmentForType<"property">().project((sub) => ({
  id: sub.field("_id"),
  featureImage: sub.field("featureImage.asset").transform((img) => urlForImage(img!).url()),
  location: sub.field("location").project(locationFragments),
  slug: sub.field("slug.current"),
  specs: sub.field("specs"),
  propertyValue: sub.field("propertyValue"),
  title: sub.field("title"),
  listingStatus: sub.field("listingStatus"),
}));

export const agencyQuery = q.star
  .filterByType("agency")
  .slice(0)
  .project((sub) => ({
    name: sub.field("name").notNull(),
    bio: sub.field("bio[]"),
    contactDetails: sub.field("contactDetails"),
    location: sub.field("location").project(locationFragments),
    openingHours: sub.field("openingHours"),
    socials: sub.field("socials"),
    logo: sub
      .field("logo.asset")
      .deref()
      .transform((img) => urlForImage(img!).width(100).height(100).format("png").url()),
  }))
  .notNull();

export const landingQuery = q.star
  .filterByType("landing")
  .slice(0)
  .project((sub) => ({
    backgroundImage: sub
      .field("backgroundImage.asset")
      .transform((img) => urlForImage(img!).width(2000).url()),
    subtitle: sub.field("subtitle[]"),
    title: sub.field("title[]"),
  }))
  .notNull();

export const aboutQuery = q.star
  .filterByType("about")
  .slice(0)
  .project((sub) => ({
    hero: sub.field("hero").project((h) => ({
      aboutPhoto: h.field("aboutPhoto.asset").transform((img) => urlForImage(img!).url()),
      philosophyDesc: h.field("philosophyDesc[]"),
      philosophyTitle: h.field("philosophyTitle[]"),
    })),
    title: sub.field("title[]"),
    subtitle: sub.field("subtitle[]"),
    members: sub.field("members[]").project((m) => ({
      memberAbout: m.field("memberAbout[]"),
      memberName: m.field("memberName[]"),
      memberPhoto: m.field("memberPhoto.asset").transform((img) => urlForImage(img!).url()),
      memberTitle: m.field("memberTitle[]"),
    })),
  }))
  .notNull();

export const featuredQuery = q.star
  .filterByType("property")
  .filterRaw(`featured == true`)
  .filterBy('listingStatus != "closed"')
  .project(propertyCardFragments);

export const latestQuery = (status: "sale" | "rent") =>
  q.star
    .filterByType("property")
    .filterBy('listingStatus != "closed"')
    .filterBy(`listingStatus == "${status}"`)
    .order("_updatedAt desc")
    .slice(0, 5)
    .project(propertyCardFragments);

export const allQuery = q.star
  .filterByType("property")
  .filterBy('listingStatus != "closed"')
  .order("_updatedAt desc")
  .project(propertyCardFragments);

export const entryQuery = (slug: string) =>
  q.star
    .filterByType("property")
    .filterBy('listingStatus != "closed"')
    .filterBy(`slug.current == "${slug}"`)
    .slice(0)
    .project((sub) => ({
      ...propertyCardFragments,
      features: sub.field("features[]"),
      description: sub.field("description[]"),
      gallery: sub.field("gallery[]").project((i) => ({
        url: i.field("asset").transform((img) => (img ? urlForImage(img).url() : "")),
      })),
    }));
