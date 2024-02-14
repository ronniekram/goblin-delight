import { defineType } from "sanity";
import { LuHome } from "react-icons/lu";

const Home = defineType({
  name: `home`,
  title: `Home Page`,
  type: `document`,
  icon: LuHome,
  fields: [
    {
      name: `title`,
      title: `Title`,
      type: `string`,
      hidden: true,
    },
    {
      name: `tagline`,
      title: `Tagline*`,
      type: `string`,
      validation: (Rule) => Rule.required(),
    },
    {
      name: `intro`,
      title: `Intro Text*`,
      type: `text`,
      validation: (Rule) => Rule.required(),
    },
    {
      name: `featured`,
      title: `Featured Post & Game`,
      type: `object`,
      description: `If no featured post or game is specfied, the most recently added post/game will be displayed.`,
      fields: [
        {
          name: `post`,
          title: `Blog Post`,
          type: `reference`,
          to: [{ type: `post` }],
        },
        {
          name: `game`,
          title: `Game`,
          type: `reference`,
          to: [{ type: `game` }],
        },
      ],
    },
  ],
});

export default Home;
