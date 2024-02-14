import { defineType } from "sanity";

const TeamMember = defineType({
  name: `team`,
  title: `Team Memeber`,
  type: `object`,
  fields: [
    {
      name: `name`,
      title: `Name*`,
      type: `string`,
      validation: (Rule) => Rule.required(),
    },
    {
      name: `position`,
      title: `Position*`,
      type: `string`,
      validation: (Rule) => Rule.required(),
    },
    {
      name: `website`,
      title: `Member Website/Portfolio/Social`,
      type: `url`,
    },
  ],
});

export default TeamMember;
