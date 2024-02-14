import { defineType } from "sanity";
import { IoShareSocialOutline } from "react-icons/io5";

const SocialAccounts = defineType({
  name: `social`,
  title: `Social Media Accounts`,
  type: `document`,
  icon: IoShareSocialOutline,
  fields: [
    {
      name: `title`,
      title: `Title`,
      type: `string`,
      hidden: true,
    },
    {
      name: `email`,
      title: `Email Address`,
      type: `email`,
    },
    {
      name: `tiktok`,
      title: `TikTok Profile URL`,
      type: `url`,
    },
    {
      name: `twitch`,
      title: `Twitch Profile URL`,
      type: `url`,
    },
    {
      name: `yt`,
      title: `Youtube Profile URL`,
      type: `url`,
    },
    {
      name: `git`,
      title: `Github Profile URL`,
      type: `url`,
    },
  ],
});

export default SocialAccounts;
