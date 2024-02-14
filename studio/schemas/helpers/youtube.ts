import { defineType } from "sanity";

import YouTubePreview from "../../components/youtube-preview";

const YouTubeEmbed = defineType({
  name: 'youtube',
  type: 'object',
  title: 'YouTube Embed',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'URL',
    },
  ],
  preview: {
    select: {
      url: 'url',
    },
  },
  components: {
    preview: YouTubePreview,
  },
});

export default YouTubeEmbed;
