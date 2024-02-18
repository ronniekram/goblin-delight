import { useState } from "react";
import type { SanityClient } from "@sanity/client";
import { useSpring, animated as a  } from "@react-spring/web";
import useMeasure from "react-use-measure";

import type { SanityGameCard, SanityTag } from "@utils/sanity";
import sanityImgUrl from "@utils/image";

type Props = SanityGameCard & { client: SanityClient };

const container = `group w-full overflow-hidden relative flex h-[17.1875rem] sm:h-[18.75rem] md:h-[20.3125rem] lg:h-[21.875rem] xl:h-[28.125rem] rounded border-green-800 border-2 md:border-[3px] xl:border-4 bg-center bg-cover`;
const inner = `w-full flex flex-col justify-between items-stretch p-4 sm:p-5 md:px-8 xl:px-10 xl:py-8`;
const titleStyle = `font-display font-bold uppercase text-green-200 group-hover:text-green-100 text-2xl leading-[100%] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl`;
const padding = `px-6 pt-[7px] pb-1.5 xl:px-7 py-1.5`;
const text = `font-sans font-bold uppercase text-green-100 tracking-[6%] text-[12px] leading-[100%] lg:text-[14px] xl:text-[16px]`;

const FeaturedGame = (props: Props) => {
  const [ref, bounds] = useMeasure();

  const [isHover, setIsHover] = useState<boolean>(false);

  const { title, slug, blurb, tags, header, client } = props;
  const imgURL = sanityImgUrl(client, header).url();

  const spring = useSpring({
    height: isHover ? bounds.height : (bounds.height * 1.5),
    backgroundColor: isHover ? `rgba(5, 55, 59, 0.5)` : `rgba(19, 93, 80, 0.5)`,
    config: { tension: 210, friction: 22 },
  });

  return (
    <a
      href={`/games/${slug.current}`}
      aria-label={title}
      className={container}
      ref={ref}
      style={{ backgroundImage: `url(${imgURL})`}}
    >
      <a.div
        className={inner}
        style={spring}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <h3 className={titleStyle}>{title}</h3>
        <div className="w-full flex flex-col space-y-2 sm:space-y-3 xl:space-y-4">
          <p className="clamped font-sans font-medium text-green-100 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">{blurb}</p>
          <div className="flex space-x-1 sm:space-x-2 lg:space-x-3 xl:space-x-4">
            {tags.map((tag: SanityTag) => (
              <a
                href={`/tags/${tag.slug.current}`}
                className={`h-fit settings nowrap rounded-[2.75rem] bg-green-200/70 text-green-800 hover:bg-green-200 ${padding} ${text}`}
                key={tag.slug.current}
              >
                {tag.title}
              </a>
            ))}
          </div>
        </div>
      </a.div>
    </a>
  );
};

export default FeaturedGame;
