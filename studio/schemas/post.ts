import { defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";
import { LuBookOpen } from "react-icons/lu";

const Post = defineType({
  name: `post`,
  title: `Blog Post`,
  type: `document`,
  icon: LuBookOpen,
  fields: [
    orderRankField({ type: `post` }),
    {
      name: `title`,
      title: `Title*`,
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
    {
      name: `tagline`,
      title: `Tagline*`,
      type: `text`,
      validation: (Rule) => Rule.required(),
      description: `1-2 sentence attention grabber for display on feature cards`,
    },
    {
      name: `titleImg`,
      title: `Header Image`,
      type: `image`,
      options: {
        metadata: [`blurhash`, `lqip`],
      },
      fields: [
        {
          name: `alt`,
          type: `string`,
          title: `Alt Text*`,
          description: `Describe what's in the image`,
          options: {
            isHighlighted: true,
          },
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: `tags`,
      type: `array`,
      of: [
        {
          type: `reference`,
          to: [{ type: `tag` }],
        },
      ],
    },
    {
      name: `body`,
      title: `Post Body*`,
      type: `editor`,
      validation: (Rule) => Rule.required(),
    },
    {
      name: `related`,
      title: `Related Posts`,
      type: `array`,
      of: [
        {
          type: `reference`,
          to: [{ type: `post` }],
        },
      ],
      validation: (Rule) => Rule.max(3),
    },
  ],
});

export default Post;
