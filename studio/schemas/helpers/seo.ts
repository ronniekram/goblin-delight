import { defineType } from "sanity";

const SEO = defineType({
  name: `seo`,
  title: `SEO`,
  type: `object`,
  fields: [
    {
      name: `title`,
      title: `Page Title*`,
      type: `string`,
      validation: (Rule) => Rule.required(),
    },
    {
      name: `desc`,
      title: `Page Description*`,
      type: `text`,
      validation: (Rule) => Rule.required(),
    },
  ],
});

export default SEO;
