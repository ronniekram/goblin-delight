// REPEATERS
import game from "./game";
import post from "./post";
import tag from "./tag";
// SINGLETON
import home from "./home";
import privacy from "./privacy";
import socials from "./social-accounts";
// HELPERS
import basicBlock from "./helpers/basic-block";
import editor from "./helpers/editor";
import gallery from "./helpers/gallery";
import gameDetail from "./helpers/game-detail";
import link from "./helpers/link";
import seo from "./helpers/seo";
import team from "./helpers/team";
import youtube from "./helpers/youtube";

const schemas = [
  // repeater
  game,
  post,
  tag,
  // singleton
  home,
  privacy,
  socials,
  // helpers
  basicBlock,
  editor,
  gallery,
  gameDetail,
  link,
  seo,
  team,
  youtube,
];

export default schemas;

