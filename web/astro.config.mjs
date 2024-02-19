import { defineConfig, squooshImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { sanityIntegration } from "@sanity/astro";
// import { astroImageTools } from "astro-imagetools";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: `http://localhost:4321`,
  integrations: [
    // astroImageTools(),
    icon(),
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
  output: `hybrid`,
  adapter: vercel({
    edgeMiddleware: true,
  }),
  image: {
    service: squooshImageService(),
    domains: [`cdn.sanity.io`],
  },
});
