import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

//! ----------> QUERIES <----------
export const tags = groq`tags[]->{
  slug,
  title,
}`;

//? ----------> GAMES
export const gameCard = groq`
  title,
  slug,
  blurb,
  ${tags},
  header,
`;

export const gameDetail = groq`*[_type == "game" && slug.current == $slug][0] {
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
    links[]{
      label,
      url,
    },
    blogs[]->{
      _type == "reference" => @-> {
        title,
        slug { current },
      },
    },
  },
  "media": {
    videos,
    images,
    logoIcons,
  },
}`;

export const allGames = groq`*[_type == "game"] { ${gameCard} }`;

export const allGameSlugs = groq`*[_type == "game"] { slug { current } }`;

export const firstGame = groq`*[_type == "game"][0] | order(_createdAt, asc ) { ${gameCard} }`;

//? ----------> BLOGS
export const blogCard = groq`
  title,
  slug,
  tagline,
  ${tags},
  titleImg,
  _createdAt,
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
`;
export const blogDetail = groq`*[_type == "post" && slug.current == $slug][0] {
  title,
  slug,
  titleImg,
  ${tags},
  body,
  related[]-> {
    _type == "reference" => @-> { ${blogCard} },
  },
}`;

export const allBlogs = groq`*[_type == "post"] { ${blogCard} }`;

export const allBlogSlugs = groq`*[_type == "post"] { slug { current }}`;

export const firstBlog = groq`*[_type == "post"][0] | order(_createdAt, asc ) { ${blogCard} }`;

export const tagDetail = groq`{
  "blogs": *[_type == "post" && $slug in tags[]-> slug.current] { ${blogCard} },
  "games": *[_type == "game" && $slug in tags[]-> slug.current] { ${gameCard} },
}`;

//? ----------> PAGES
export const homePage = groq`*[_type == "home"][0]{
  title,
  tagline,
  intro,
  featured {
    post {
      _type == "reference" => @-> { ${blogCard} },
    },
    game {
      _type == "reference" => @-> { ${gameCard} },
    }
  }
}`;

export const gamesPage = groq`{
  "featured": *[_type == "home"][0] {
    featured {
      game {
        _type == "reference" => @-> { ${gameCard} },
      },
    },
  },
  "all": ${allGames}
}`;

export const blogsPage = groq`{
  "featured": *[_type == "home"][0] {
    featured {
      post {
        _type == "reference" => @-> { ${blogCard} },
      },
    },
  },
  "all": ${allBlogs}
}`;


//! ----------> TYPES <----------
//? ----------> DOCUMENTS & PAGES
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
      slug: {
        current: string;
      };
    }[];
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
  featured: {
    post: SanityBlogCard;
    game: SanityGameCard;
  };
};

export type SanityGamePage = {
  featured: {
    featured: {
      game: SanityGameCard;
    };
  };
  all: SanityGameCard[];
};

export type SanityBlogPage = {
  featured: {
    featured: {
      post: SanityBlogCard;
    };
  };
  all: SanityBlogCard[];
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
  tagline: string;
  tags: SanityTag[];
  titleImg: ImageAsset;
  _createdAt: string;
  estimatedReadingTime: number;
};

export type SanityGameCard = {
  title: string;
  slug: Slug;
  blurb: string;
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
