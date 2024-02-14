import React from "react";
import { PreviewProps } from "sanity";
import { Flex, Text } from "@sanity/ui";
import YouTubePlayer from "react-player/youtube";

interface PreviewYouTubeProps extends PreviewProps {
  selection?: {
    url: string;
  };
}

const YouTubePreview = (props: PreviewYouTubeProps) => {
  const { selection } = props;
  const url = selection?.url;

  if (!url) return <Text>Missing YouTube URL</Text>;

  return (
    <Flex padding={4} justify="center">
      <YouTubePlayer url={url} />
    </Flex>
  );
};

export default YouTubePreview;

