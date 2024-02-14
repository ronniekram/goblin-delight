import { defineType } from "sanity";

const GameDetail = defineType({
  name: `gameDetail`,
  title: `Game Detail`,
  type: `object`,
  fields: [
    {
      name: `title`,
      title: `Title*`,
      type: `string`,
      validation: (Rule) => Rule.required(),
    },
    {
      name: `content`,
      title: `Content*`,
      type: `string`,
      validation: (Rule) => Rule.required(),
    },
  ],
});

export default GameDetail;
