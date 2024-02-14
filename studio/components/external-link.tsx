import React from "react";
import { PreviewProps } from "sanity";
import { Text } from "@sanity/ui";

interface PreviewLinkProps extends PreviewProps {
  selection?: {
    url: string;
    label: string;
  };
}

const ExternalLinkRenderer = (props: PreviewLinkProps) => {
  const { selection } = props;
  const url = selection?.url;
  const label = selection?.label;

  if (!url || !label) {
    return (
      <Text>Enter a valid link and label</Text>
    );
  }

  return (
    <a href={url} target="_blank" rel="noreferrer">
      {label}
    </a>
  );
};

export default ExternalLinkRenderer;
