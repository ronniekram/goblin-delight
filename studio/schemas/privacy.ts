import { defineType } from "sanity";
import { LuLock } from "react-icons/lu";

const PrivacyPolicy = defineType({
  name: `privacy`,
  title: `Privacy Policy`,
  type: `document`,
  icon: LuLock,
  fields: [
    {
      name: `title`,
      title: `Title`,
      type: `string`,
      hidden: true,
    },
    {
      name: `content`,
      title: `Body*`,
      type: `markdown`,
      validation: (Rule) => Rule.required(),
      options: {
        imageUpload: true,
        toolbar: [`bold`, `italic`, `|`, `heading-2`, `|`, `numbered-list`, `bulleted-list`, `|`, `link`, `|`, `preview`, `side-by-side`, `fullscreen`, `|`, `guide`],
      },
    },
  ],
});

export default PrivacyPolicy;
