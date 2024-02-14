import { defineType } from "sanity";

const LinkOut = defineType({
  name: `link`,
  title: `Link`,
  type: `object`,
  fields: [
    {
      name: `label`,
      title: `Label*`,
      type: `string`,
      validation: (Rule) => Rule.required(),
    },
    {
      name: `url`,
      title: `URL*`,
      type: `url`,
      description: `Relative URLs are allowed.`,
      validation: (Rule) => Rule.required().uri({ allowRelative: true }),
    },
  ],
});

export default LinkOut;
