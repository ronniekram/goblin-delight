import imageUrlBuilder from "@sanity/image-url";
import type { SanityClient } from "@sanity/client";
import type { ImageAsset } from "@sanity/types";

const sanityImgUrl = (client: SanityClient, asset: ImageAsset) => {
  const builder = imageUrlBuilder(client);
  return builder.image(asset);
};

export default sanityImgUrl;
