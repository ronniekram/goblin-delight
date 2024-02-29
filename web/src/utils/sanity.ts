import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

//! ----------> QUERIES <----------
export const tags = groq`tags[]->{
  slug,
  title,
}`;

export const allTagSlugs = groq`*[_type == "tag"]{
  slug {
    current,
  },
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
    blurb,
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

export const allGames = groq`*[_type == "game"] | order(orderRank) { ${gameCard} }`;

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
  "estimatedReadingTime": round(length(markdown) / 5 / 180 ),
`;
export const blogDetail = groq`*[_type == "post" && slug.current == $slug][0] {
  title,
  slug,
  tagline,
  titleImg,
  ${tags},
  markdown,
  _createdAt,
  "estimatedReadingTime": round(length(markdown) / 5 / 180 ),
  related[]-> { ${blogCard} },
}`;

export const allBlogs = groq`*[_type == "post"] { ${blogCard} }`;

export const allBlogSlugs = groq`*[_type == "post"] { slug { current }}`;

export const firstBlog = groq`*[_type == "post"][0] | order(_createdAt, asc ) { ${blogCard} }`;

//? ----------> PAGES
export const homePage = groq`*[_type == "home"][0]{
  title,
  tagline,
  intro,
  seo,
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

export const tagPage = groq`{
  "title": *[_type == "tag" && slug.current == $slug][0] { title },
  "blogs": *[_type == "post" && $slug in tags[]-> slug.current] { ${blogCard} },
  "games": *[_type == "game" && $slug in tags[]-> slug.current] { ${gameCard} },
}`;


//! ----------> TYPES <----------
//? ----------> DOCUMENTS & PAGES
export type SanityBlog = {
  title: string;
  slug: Slug;
  tagline: string;
  _createdAt: string;
  estimatedReadingTime: number;
  titleImg: ImageAsset;
  tags: SanityTag[];
  markdown: string;
  related: SanityBlog[];
};

export type SanityGame = {
  basic: {
    title: string;
    slug: Slug;
    blurb: string;
    header: ImageAsset;
    description: PortableTextBlock[];
    features: string[];
    tags?: SanityTag[];
  };
  // DETAILS
  details: {
    team: SanityTeam[];
    release?: string;
    platforms?: string;
    genre?: string;
    madeWith?: string;
    jam?: string;
    links?: SanityLink[];
    blogs?: {
      title: string;
      slug: {
        current: string;
      };
    }[];
  };
  // MEDIA
  media: {
    videos?: SanityYouTube[];
    images?: ImageAsset[];
    logoIcons?: ImageAsset[];
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
  content: string;
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
  title: {
    title: string;
  };
  games: SanityGameCard[];
  blogs: SanityBlogCard[];
};

export type SanityTeam = {
  name: string;
  position: string;
  website?: string;
};

export type SanityYouTube = {
  url: string;
};
