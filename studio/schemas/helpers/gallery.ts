import { defineType } from "sanity";

const Gallery = defineType({
  name: `gallery`,
  type: `object`,
  title: `Gallery`,
  fields: [
    {
      name: `images`,
      type: `array`,
      of: [
        {
          name: `image`,
          type: `image`,
          title: `Image`,
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
      ],
      options: {
        layout: `grid`,
      },
    },
    {
      name: `display`,
      type: `string`,
      title: `Display as`,
      description: `How should the images be displayed?`,
      options: {
        list: [
          { title: `One per line`, value: `single` },
          { title: `Two Columns`, value: `two` },
          { title: `Carousel`, value: `carousel` },
          { title: `Inline`, value: `inline` },
        ],
        layout: `radio`,
      },
    },
  ],
  preview: {
    select: {
      images: `images`,
      image: `images.0`,
    },
    prepare(selection) {
      const { images, image } = selection;
      const title = `Gallery`;
      const subtitle = `${images.length} images`;
      const media = image;
      return {
        title,
        subtitle,
        media,
      };
    },
  },
});

export default Gallery;
