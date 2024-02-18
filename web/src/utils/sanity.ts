// import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

//! ----------> QUERIES <----------
//? ----------> REPEATED QUERIES
const tags = groq`tags[]->{
  _type == "reference" => @-> {
    "ref": {
      title,
      slug { current },
    },
  },
}`;

const gameCard = groq`
  title,
  slug,
  description,
  ${tags},
  header,
`;

const gameDetail = groq`*[_type == "game" && slug.current == $slug] {
  "basic": {
    title,
    slug,
    header,
    description,
    features,
    ${tags},
  },
  "details": {
    release,
    platforms,
    genre,
    madeWith,
    jam,
    team,
    links,
    blogs[]->{
      _type == "reference" => @-> {
        "ref": {
          title,
          slug { current },
        },
      },
    },
  },
  "media": {
    videos,
    images,
    logoIcons,
  },
}`;

const blogCard = groq`
  title,
  slug,
  ${tags},
  titleImg,
  _createdAt,
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
`;
const blogDetail = groq`*[_type == "post" && slug.current == $slug] {
  title,
  slug,
  titleImg,
  ${tags},
  body,
  related[]-> {
    _type == "reference" => @-> {
      "ref": { ${blogCard} }
    },
  },
}`;

const tagDetail = groq`{
  "blogs": *[_type == "post" && $slug in tags[]-> slug.current] { ${blogCard} },
  "games": *[_type == "game" && $slug in tags[]-> slug.current] { ${gameCard} },
}`;

//? ----------> FUNCTIONS
// export const getAllBlogs = async (): Promise<SanityBlogCard[]> => {
//   return await sanityClient.fetch(`*[_type == "post] | order(_createdAt asc){
//     ${blogCard}
//   }`) || [];
// };

// export const getBlogDetail = async (options: { slug: string }): Promise<SanityBlog> => {
//   return await sanityClient.fetch(blogDetail, options);
// };

// export const getAllGames = async (): Promise<SanityGameCard[]> => {
//   return await sanityClient.fetch(`*[_type == "game"] {
//     ${gameCard}
//   }`) || [];
// };

// export const getGameDetail = async (options: { slug: string }): Promise<SanityGame> => {
//   return await sanityClient.fetch(gameDetail, options);
// };

// export const getHome = async (): Promise<SanityHome> => {
//   return await sanityClient.fetch(`*[_type == "home"][0]{
//     title,
//     tagline,
//     intro,
//     featured {
//       post {
//         _type == "reference" => @-> { "ref": { ${blogCard} } },
//       },
//       game {
//         _type == "reference" => @-> { "ref": { ${gameCard} } },
//       }
//     }
//   }`);
// };

// export const getTagDetails = async (options: { slug: string }): Promise<SanityTagPage> => {
//   return await sanityClient.fetch(tagDetail, options);
// };

// export const getPrivacy = async (): Promise<SanityPrivacy> => {
//   return await sanityClient.fetch(`*[_type == "privacy"][0]{
//     _updatedAt,
//     body,
//   }`);
// };

// export const getSocials = async (): Promise<SanitySocials> => {
//   return await sanityClient.fetch(`*[_type == "social"][0]{
//     email,
//     twitch,
//     tiktok,
//     yt,
//     git,
//   }`);
// };

//! ----------> TYPES <----------
//? ----------> DOCUMENTS
export type SanityBlog = {
  title: string;
  slug: Slug;
  _createdAt: string;
  estTime: number;
  titleImg: ImageAsset;
  tags: SanityTag[];
  body: PortableTextBlock[];
  related: SanityBlog[];
};

export type SanityGame = {
  basic: {
    title: string;
    slug: Slug;
    header: ImageAsset;
    description: PortableTextBlock[];
    features: string[];
    tags: SanityTag[];
  };
  // DETAILS
  details: {
    team: SanityTeam[];
    release: string;
    platforms: string;
    genre: string;
    madeWith: string;
    jam: string;
    links: SanityLink[];
    blogs: {
      title: string;
      slug: string;
    };
  };
  // MEDIA
  media: {
    videos: SanityYouTube[];
    images: ImageAsset[];
    logoIcons: ImageAsset[];
  };
};

export type SanityHome = {
  title: string;
  tagline: string;
  intro: string;
  featured?: {
    blog?: SanityBlogCard;
    game?: SanityGameCard;
  };
};

export type SanityPrivacy = {
  _updatedAt: string;
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
export type SanityBlogCard = {
  title: string;
  slug: Slug;
  tags: SanityTag[];
  titleImg: ImageAsset;
  _createdAt: string;
  estimatedReadingTime: number;
};

export type SanityGameCard = {
  title: string;
  slug: Slug;
  description: PortableTextBlock[];
  tags: SanityTag[];
  header: ImageAsset;
};

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

export type SanityTagPage = {
  games: SanityGameCard[];
  blogs: SanityBlogCard[];
};

export type SanityTeam = {
  name: string;
  positiong: string;
  website?: string;
};

export type SanityYouTube = {
  url: string;
};
