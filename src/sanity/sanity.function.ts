import { createServerFn } from "@tanstack/react-start";
import { loadQuery } from "./sanityClient";
import { urlForImage } from "./utils";
import type {
  Landing,
  Agency,
  About,
  Property,
  Location,
  InternationalizedArrayDescription,
  IconPicker,
} from "../../sanity.types";

export const getMetadata = createServerFn().handler(async () => {
  const { data } = await loadQuery<Agency>(`*[_type=="agency"][0]`);

  return {
    title: data.name ? data.name : "Real Estate",
    icon: data.logo
      ? urlForImage(data.logo.asset!).width(100).height(100).format("png").url()
      : undefined,
    location: data.location,
    contacts: data.contactDetails,
    bio: data.bio,
    hour: data.openingHours,
  };
});

export const getLanding = createServerFn().handler(async () => {
  const { data } = await loadQuery<Landing>(`*[_type=="landing"][0]`);
  const backdropUrl = data?.backgroundImage?.asset
    ? urlForImage(data.backgroundImage.asset).url()
    : "https://images.unsplash.com/photo-1565426873118-a17ed65d74b9?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return {
    title: data.title,
    subtitle: data.subtitle,
    banner: backdropUrl,
  };
});

export const getAbout = createServerFn().handler(async () => {
  const { data } = await loadQuery<About>(`*[_type=="about"][0]`);

  const bannerImage = data.hero?.aboutPhoto?.asset
    ? urlForImage(data.hero.aboutPhoto.asset).url()
    : "";

  const members = data.members?.map((m) => ({
    photo: m.memberPhoto?.asset ? urlForImage(m.memberPhoto.asset).url() : "",
    name: m.memberName,
    title: m.memberTitle,
    about: m.memberAbout,
  }));

  return {
    title: data.title,
    subtitle: data.subtitle,
    hero: {
      banner: bannerImage,
      title: data.hero?.philosophyTitle,
      desc: data.hero?.philosophyDesc,
    },
    members,
  };
});

export const getSanityConfig = createServerFn().handler(async () => {
  return {
    projectId: process.env.SANITY_PROJECT_ID,
    apiVersion: process.env.SANITY_API_VERSION,
    dataset: process.env.SANITY_DATASET,
  };
});

const deserialProperty = (p: Property) => ({
  id: p._id,
  title: p.title,
  slug: p.slug?.current,
  location: p.location,
  specs: p.specs,
  value: p.propertyValue,
  photo: p.featureImage?.asset ? urlForImage(p.featureImage.asset).url() : "",
  listingStatus: p.listingStatus,
});

export type Feature = {
  id: string;
  title: string | undefined;
  slug: string | undefined;
  location: Location | undefined;
  specs:
    | {
        area?: number;
        bedrooms?: number;
        bathrooms?: number;
        rooms?: number;
      }
    | undefined;
  value:
    | {
        priceAmount?: number;
        currency?: "HUF" | "EUR";
      }
    | undefined;
  photo: string;
  listingStatus: "rent" | "sale" | "closed" | undefined;
};

export const getFeatured = createServerFn().handler(async () => {
  const { data } = await loadQuery<Property[]>(
    `*[_type=="property" && featured && listingStatus != "closed"]{_id, featureImage, location, slug, specs, propertyValue, title, listingStatus}`,
  );
  const result = data.map(deserialProperty);
  return result;
});

export const getLatest = createServerFn()
  .inputValidator((data: string) => data)
  .handler(async ({ data }) => {
    const initial = await loadQuery<Property[]>(
      `*[_type=="property" && listingStatus == "${data}"]{_id, featureImage, location, slug, specs, propertyValue, title, listingStatus} | order(_updatedAt desc)[0..5] `,
    );
    const result = initial.data.map(deserialProperty);
    return result;
  });

export const getAll = createServerFn().handler(async () => {
  const { data } = await loadQuery<Property[]>(
    `*[_type=="property" && listingStatus != "closed"]{_id, featureImage, location, slug, specs, propertyValue, title, listingStatus}`,
  );
  const result = data.map(deserialProperty);
  return result;
});

export type DetailListingType = Feature & {
  gallery: string[];
  features?:
    | {
        icon?: IconPicker;
        en?: string | undefined;
        vi?: string | undefined;
        _type: "feature";
        _key: string;
      }[]
    | undefined;
  description: InternationalizedArrayDescription | undefined;
};

export const getEntry = createServerFn()
  .inputValidator((data: string) => data)
  .handler(async ({ data }) => {
    const { data: p } = await loadQuery<Property>(
      `*[_type=="property" && slug.current == "${data}" && listingStatus != "closed"][0] `,
    );

    const processGallery = p.gallery
      ? p.gallery.map((i) => {
          if (i.asset) {
            return urlForImage(i.asset).url();
          }
        })
      : [];
    return {
      title: p.title,
      id: p._id,
      slug: p.slug?.current,
      location: p.location,
      specs: p.specs,
      value: p.propertyValue,
      photo: p.featureImage?.asset ? urlForImage(p.featureImage.asset).url() : "",
      listingStatus: p.listingStatus,
      gallery: processGallery.filter((i) => typeof i == "string"),
      description: p.description,
      features: p.features,
    };
  });
