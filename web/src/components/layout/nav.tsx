import { useState, useEffect, useLayoutEffect } from "react";
import { useSpring, animated as a } from "@react-spring/web";
import { RemoveScroll } from "react-remove-scroll";
import useMeasure from "react-use-measure";

//! ----------> TYPES <----------
interface NavLinkProps {
  label: string;
  href: string;
}

interface MobileProps {
  setHeight: (height: number) => void;
}

//! ----------> HELPERS <----------
const useIsomorphicLayoutEffect = typeof window !== `undefined` ? useLayoutEffect : useEffect;

//! ----------> COMPONENTS <----------
const Arrow = () => (
  <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-700 sm:hidden">
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

const Close = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_84_9342)">
      <path d="M3 3V5.25H4.125V6.375H5.25V7.5H6.375V8.625H7.5V9.75H8.625V10.875H9.75V13.125H8.625V14.25H7.5V15.375H6.375V16.5H5.25V17.625H4.125V18.75H3V21H5.25V19.875H6.375V18.75H7.5V17.625H8.625V16.5H9.75V15.375H10.875V14.25H13.125V15.375H14.25V16.5H15.375V17.625H16.5V18.75H17.625V19.875H18.75V21H21V18.75H19.875V17.625H18.75V16.5H17.625V15.375H16.5V14.25H15.375V13.125H14.25V10.875H15.375V9.75H16.5V8.625H17.625V7.5H18.75V6.375H19.875V5.25H21V3H18.75V4.125H17.625V5.25H16.5V6.375H15.375V7.5H14.25V8.625H13.125V9.75H10.875V8.625H9.75V7.5H8.625V6.375H7.5V5.25H6.375V4.125H5.25V3H3Z" fill="#FCFCFA"/>
    </g>
    <defs>
      <clipPath id="clip0_84_9342">
        <rect width="18" height="18" fill="white" transform="translate(3 3)"/>
      </clipPath>
    </defs>
  </svg>
);

const Menu = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.95996 3.51001H20.96V5.51001H2.95996V3.51001Z" fill="#FCFCFA"/>
    <path d="M2.95996 8.51001H20.96V10.51H2.95996V8.51001Z" fill="#FCFCFA"/>
    <path d="M2.95996 13.51H20.96V15.51H2.95996V13.51Z" fill="#FCFCFA"/>
    <path d="M2.95996 18.51H20.96V20.51H2.95996V18.51Z" fill="#FCFCFA"/>
  </svg>
);

const NavLink = ({ label, href }: NavLinkProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <li className="flex items-center space-x-2 sm:space-x-0" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <div className={isHover ? `slide` : ``}>
        <Arrow />
      </div>
      <a href={href} className="settings nav-link">
        {label}
      </a>
    </li>
  );
};

const Mobile = ({ setHeight }: MobileProps) => {
  const [ref, bounds] = useMeasure();

  useIsomorphicLayoutEffect(() => {
    setHeight(bounds.height);
  }, [bounds, setHeight]);

  return (
    <nav
      ref={ref}
      className="w-screen h-[95dvh] [flex: 1] px-[5.3%] pt-10 pb-20 bg-green-300 flex flex-col justify-between font-display sm:hidden"
    >
      <ul className="flex flex-col space-y-8 text-6xl">
        <NavLink label="Blog" href="/blog" />
        <NavLink label="Games" href="/games" />
        <NavLink label="Contact" href="#contact" />
      </ul>

      <div className="flex items-center space-x-2 float-right">
        <p className="font-display font-bold uppercase text-green-700 text-[3rem] leading-[2.25rem]">
          Goblin <br /> Delight
        </p>

        <div className="flex h-[4.25rem]">
          <img src="/images/head.png" alt="Pixelated goblin head" />
        </div>
      </div>
    </nav>
  );
};

const Navigation = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);

  const toggle = () => setOpen(!open);

  const menuSpring = useSpring({
    height: open ? height: 0,
    config: { tension: 120, friction: 14, clamp: true },
  });

  return (
    <RemoveScroll enabled={open}>
      <header className="wrapper nav">
        <div className="inner flex items-center justify-between text-6xl sm:text-4xl lg:text-[2.5rem] lg:leading-[2.75rem] xl:text-5xl">
          <a href="/" aria-label="Home" className="flex h-11 sm:h-12 xl:h-[3.75rem]">
            <img src="/images/logo.png" alt="Goblin Delight logo" />
          </a>

          <button
            type="button"
            onClick={toggle}
            className="w-11 h-11 grid place-items-center sm:hidden"
            aria-label="Menu"
          >
            <div className="flex w-6 h-6">
              {open ? (
                <Close />
              ) : (
                <Menu />
              )}
            </div>
          </button>

          <ul className="hidden sm:flex sm:space-x-6 md:space-x-8 xl:space-x-10">
            <NavLink label="Blog" href="/blog" />
            <NavLink label="Games" href="/games" />
            <NavLink label="Contact" href="#contact" />
          </ul>
        </div>
      </header>
      <a.div style={menuSpring} className="overflow-hidden fixed z-50 top-[4.25rem]">
        <Mobile setHeight={(num: number) => setHeight(num)} />
      </a.div>
    </RemoveScroll>
  );
};

export default Navigation;
