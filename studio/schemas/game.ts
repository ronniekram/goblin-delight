import { defineType } from "sanity";
// import { orderRankField } from "@sanity/orderable-document-list";
import { LuGamepad2 } from "react-icons/lu";

const Game = defineType({
  name: `game`,
  title: `Game/Project`,
  type: `document`,
  icon: LuGamepad2,
  groups: [
    { title: `Basic Information`, name: `basic`, default: true },
    { title: `Details`, name: `details` },
    { title: `Media`, name: `media` },
  ],
  fieldsets: [
    { name: `details`, title: `Details`, options: { columns: 2 } },
  ],
  fields: [
    // orderRankField({ type: `game` }),
    // BASIC INFO
    {
      name: `title`,
      title: `Title*`,
      type: `string`,
      validation: (Rule) => Rule.required(),
      group: `basic`,
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
      group: `basic`,
    },
    {
      name: `header`,
      title: `Header Image`,
      type: `image`,
      group: `basic`,
      options: {
        metadata: [`blurhash`, `lqip`],
        hotspot: true,
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
      name: `description`,
      title: `Description*`,
      type: `basicBlock`,
      validation: (Rule) => Rule.required(),
      group: `basic`,
    },
    {
      name: `features`,
      title: `Features*`,
      type: `array`,
      of: [{ type: `string` }],
      validation: (Rule) => Rule.required(),
      group: `basic`,
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
      group: `basic`,
    },
    {
      name: `team`,
      title: `Team`,
      type: `array`,
      of: [{ type: `team` }],
      group: `basic`,
    },
    // DETAILS
    {
      name: `release`,
      title: `Release Date`,
      type: `string`,
      group: `details`,
      fieldset: `details`,
    },
    {
      name: `platforms`,
      title: `Platforms`,
      type: `string`,
      group: `details`,
      fieldset: `details`,
    },
    {
      name: `genre`,
      title: `Genre`,
      type: `string`,
      group: `details`,
      fieldset: `details`,
    },
    {
      name: `madetWith`,
      title: `Made with`,
      type: `string`,
      group: `details`,
      fieldset: `details`,
    },
    {
      name: `jam`,
      title: `Game Jam`,
      type: `string`,
      group: `details`,
      fieldset: `details`,
    },
    {
      name: `links`,
      title: `Links`,
      type: `array`,
      of: [{ type: `link` }],
      group: `details`,
    },
    {
      name: `blogs`,
      title: `Dev Logs`,
      type: `array`,
      of: [{ type: `post` }],
      group: `details`,
    },
    // MEDIA
    {
      name: `videos`,
      title: `Videos`,
      type: `array`,
      of: [{ type: `youtube` }],
      group: `media`,
    },
    {
      name: `images`,
      title: `Images`,
      type: `array`,
      of: [
        {
          type: `image`,
          options: {
            metadata: [`blurhash`, `lqip`],
            hotspot: true,
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
      ],
      group: `media`,
    },
    {
      name: `logoIcons`,
      title: `Logos & Icons`,
      type: `array`,
      of: [
        {
          type: `image`,
          options: {
            metadata: [`blurhash`, `lqip`],
            hotspot: true,
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
      ],
      group: `media`,
    },
  ],
});

export default Game;
