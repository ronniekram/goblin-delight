import { defineType } from "sanity";
import { LuTags } from "react-icons/lu";

const Tag = defineType({
  name: `tag`,
  title: `Tag`,
  type: `document`,
  icon: LuTags,
  fields: [
    {
      name: `title`,
      title: `Title`,
      type: `string`,
      validation: (Rule) => Rule.required(),
    },
    {
      name: `slug`,
      title: `Slug*`,
      type: `slug`,
      validation: (Rule) => Rule.required(),
      options: {
        source: `title`,
        slugify: (input) => input.toLowerCase().replace(/\s+/g, `-`).slice(0, 200),
      },
    },
  ],
});

export default Tag;
