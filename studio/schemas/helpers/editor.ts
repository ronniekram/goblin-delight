import { defineType } from "sanity";
import { MdFormatBold, MdFormatItalic, MdCode, MdOutlineSignpost } from "react-icons/md";

const Editor = defineType({
  name: `editor`,
  title: `Block`,
  type: `array`,
  of: [
    {
      type: `block`,
      lists: [
        { title: `Numbered`, value: `number`, },
        { title: `Bullet`, value: `bullet` },
      ],
      styles: [
        { title: `Normal`, value: `normal` },
        { title: `H1`, value: `h1` },
        { title: `H2`, value: `h2` },
        { title: `H3`, value: `h3` },
        { title: `H4`, value: `h4` },
      ],
      marks: {
        decorators: [
          { title: `Strong`, value: `strong`, icon: MdFormatBold },
          { title: `Emphasis`, value: `em`, icon: MdFormatItalic },
          { title: `Code`, value: `code`, icon: MdCode },
        ],
        annotations: [
          {
            name: `postLink`,
            type: `object`,
            title: `Link to Post`,
            fields: [
              {
                name: `reference`,
                type: `reference`,
                title: `Reference`,
                to: [{ type: `post` }],
              },
            ],
            icon: MdOutlineSignpost,
          },
        ],
      },
    },
    { type: `code` },
    { type: `youtube` },
    { type: `gallery` },
  ],
});

export default Editor;
