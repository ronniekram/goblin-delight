import { useState } from "react";
import { useSpring, animated as a } from "@react-spring/web";
import useMeasure from "react-use-measure";
import { useWindowSize } from "react-use";

//! ----------> TYPES <----------
interface Props {
  title: string;
  content: JSX.Element;
}

//! ----------> STYLES <----------
const arrowInfoWrapper = `flex w-6 md:w-8 lg:hidden`;
const arrowMediaWrapper = `flex w-5 sm:w-6 lg:w-8 lg:w-10`;

const infoHeaderClosed = `w-full flex items-center justify-between px-5 py-2 sm:px-8 md:px-40 md:py-3 lg:px-0 lg:py-2 border-green-700 lg:border-b-2 font-display font-bold uppercase text-green-700 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl`;
const infoHeaderOpen = `border-y-2 bg-green-200 lg:border-y-0 lg:bg-transparent`;
const infoBody = `px-5 py-4 sm:px-32 sm:py-5 md:px-10 md:py-8 lg:px-0`;

const mediaHeader = `w-full flex items-center justify-between py-1.5 lg:py-2 xl:py-3 border-green-700 font-display uppercase text-green-700 text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl`;
const mediaBody = `py-4 sm:py-5 md:py-8 xl:py-10`;

//! ----------> COMPONENTS <----------
const Arrow = () => (
  <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-90">
  <g clipPath="url(#clip0_8_5751)">
  <path d="M14.48 9.0375H19.9188V11.7607H22.642V14.4764H25.3652V17.1995H28.0809V19.9227H30.8041V22.6384H33.5198V25.3616H30.8041V28.0773H28.0809V30.8005H25.3652V33.5236H22.642V36.2393H19.9188V38.9625H14.48V9.0375Z" fill="currentColor"/>
  </g>
  <defs>
  <clipPath id="clip0_8_5751">
  <rect width="19.0398" height="29.925" fill="white" transform="translate(14.48 9.0375)"/>
  </clipPath>
  </defs>
  </svg>
);

export const MediaAccordion = ({ title, content }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [ref, { height }] = useMeasure();
  const { width } = useWindowSize();

  const spring = useSpring({
    height: open ? height : 0,
  });

  const toggle = () => setOpen(!open);

  return (
    <div className="w-full">
      <button
        type="button"
        aria-label={open ? `Open ${title}` : `Close ${title}`}
        onClick={toggle}
        className={`${mediaHeader} settings`}
        disabled={width >= 1024}
      >
        <p>{title}</p>
        <p className={`${arrowMediaWrapper} ${open && `-rotate-180`}`}>
          <Arrow />
        </p>
      </button>
      <a.div className="overflow-hidden" style={spring}>
        <div className={mediaBody} ref={ref}>
          {content}
        </div>
      </a.div>
    </div>
  );
};

const Accordion = ({ title, content }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [ref, { height }] = useMeasure();
  const { width } = useWindowSize();

  const spring = useSpring({
    height: open ? height : 0,
  });

  const toggle = () => setOpen(!open);

  return (
    <div className="w-full">
      <button
        type="button"
        aria-label={open ? `Open ${title}` : `Close ${title}`}
        onClick={toggle}
        className={`${infoHeaderClosed} ${open && infoHeaderOpen} settings`}
        disabled={width >= 1024}
      >
        <p>{title}</p>
        <p className={`${arrowInfoWrapper} ${open && `-rotate-180`}`}>
          <Arrow />
        </p>
      </button>
      <a.div className="overflow-hidden" style={spring}>
        <div className={infoBody} ref={ref}>
          {content}
        </div>
      </a.div>
    </div>
  );
};

export default Accordion;
