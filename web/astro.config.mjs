import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import { sanityIntegration } from "@sanity/astro";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanityIntegration({
      projectId: `atx0gy8j`,
      dataset: `production`,
      useCdn: false
    }),
    tailwind({
      // prevents virtual import of base tailwind styles being added to every page
      config: { applyBaseStyles: false },
    }),
    sitemap(),
    react(),
],
  output: "server",
  adapter: vercel()
});
