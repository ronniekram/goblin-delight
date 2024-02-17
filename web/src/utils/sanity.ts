import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

//! ----------> QUERIES <----------

//! ----------> TYPES <----------
//? ----------> DOCUMENTS
export type SanityBlog = {
  title: string;
  slug: Slug;
  titleImg: ImageAsset;
  tags: SanityTag[];
  body: PortableTextBlock[];
  related: SanityBlog[];
};

export type SanityGame = {
  title: string;
  slug: Slug;
  header: ImageAsset;
  description: PortableTextBlock[];
  features: string[];
  tags: SanityTag[];
  // DETAILS
  team: SanityTeam[];
  release: string;
  platforms: string;
  genre: string;
  madeWith: string;
  jam: string;
  links: SanityLink[];
  blogs: any[];
  // MEDIA
  videos: SanityYouTube[];
  images: ImageAsset[];
  logoIcons: ImageAsset[];
};

export type SanityHome = {
  title: string;
  tagline: string;
  intro: string;
  featured?: {
    blog?: SanityBlog[];
    game?: SanityGame;
  };
};

export type SanityPrivacy = {
  title: string;
  body: PortableTextBlock[];
};

export type SanitySocials = {
  email?: string;
  tiktok?: string;
  twitch?: string;
  yt?: string;
  git?: string;
};

export type SanityTag = {
  title: string;
  slug: Slug;
};

//? ----------> OBJECTS & HELPERS
export type SanityGallery = {
  images: ImageAsset[];
  display: `single` | `two` | `carousel` | `inline`;
};

export type SanityGameDetail = {
  title: string;
  content: string;
};

export type SanityLink = {
  label: string;
  url: string;
};

export type SanityTeam = {
  name: string;
  positiong: string;
  website?: string;
};

export type SanityYouTube = {
  url: string;
};
