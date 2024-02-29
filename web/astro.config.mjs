import { defineConfig, squooshImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { sanityIntegration } from "@sanity/astro";
import markdownIntegration from "@astropub/md";
import react from "@astrojs/react";

import { loadEnv } from "vite";

const { PUBLIC_SITE_URL } = loadEnv(process.env.PUBLIC_SITE_URL, process.cwd(), ``);

// https://astro.build/config
export default defineConfig({
  site: PUBLIC_SITE_URL,
  integrations: [
    icon(),
    markdownIntegration(),
    sanityIntegration({
      projectId: `atx0gy8j`,
      dataset: `production`,
      useCdn: false
    }),
    tailwind({
      // prevents virtual import of base tailwind styles being added to every page
      config: { applyBaseStyles: false },
      nesting: true,
    }),
    sitemap(),
    react(),
],
  image: {
    service: squooshImageService(),
    domains: [`cdn.sanity.io`],
  },
  output: `static`,
});
