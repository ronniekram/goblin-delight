import { defineType } from "sanity";

const BasicBlock = defineType({
  name: `basicBlock`,
  title: `Basic Block Editor`,
  type: `array`,
  of: [
    {
      type: `block`,
      lists: [],
      styles: [
        { title: `Normal`, value: `normal` },
      ],
      marks: {
        decorators: [
          { title: `Strong`, value: `strong`, },
          { title: `Emphasis`, value: `em`, },
        ],
      },
    },
  ],
});

export default BasicBlock;
