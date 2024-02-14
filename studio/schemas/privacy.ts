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
      name: `body`,
      title: `Body*`,
      type: `array`,
      of: [
        {
          type: `block`,
          lists: [],
          styles: [
            { title: `Normal`, value: `normal` },
            { title: `Heading`, value: `h2` },
          ],
          marks: {
            decorators: [
              { title: `Strong`, value: `strong`, },
              { title: `Emphasis`, value: `em`, },
            ],
          },
        },
      ],
    }
  ],
});

export default PrivacyPolicy;
