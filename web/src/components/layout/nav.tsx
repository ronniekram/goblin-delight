import { useState, useEffect } from "react";
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

//! ----------> COMPONENTS <----------
const Bullet = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:hidden">
    <path d="M9.6 3.9H6.7V6.8H9.6V3.9Z" fill="#FAFCF1"/>
    <path d="M15.3 3.9H9.6V6.7H3.9V12.4H6.7V15.3H12.4V12.4H15.3V3.9Z" fill="#9ADCAF"/>
    <path d="M18.1 6.7H15.3V12.4H12.4V15.3H6.7V18.1H15.3V15.3H18.1V6.7Z" fill="#48AD6A"/>
    <path d="M21 6.7H18.1V15.3L21 15.3V6.7Z" fill="#05373B"/>
    <path d="M15.3 18.1H6.7V21H15.3L15.3 18.1Z" fill="#05373B"/>
    <path d="M3.9 6.7H1V15.3H3.9V6.7Z" fill="#05373B"/>
    <path d="M15.3 1H6.7V3.9H15.3L15.3 1Z" fill="#05373B"/>
    <path d="M18.2 3.9H15.3V6.8H18.2V3.9Z" fill="#05373B"/>
    <path d="M18.2 15.3H15.3V18.2H18.2V15.3Z" fill="#05373B"/>
    <path d="M6.8 15.3L3.9 15.3V18.2H6.8V15.3Z" fill="#05373B"/>
    <path d="M3.9 3.9V6.7H6.7V3.9" fill="#05373B"/>
    <path d="M3.9 12.4V15.3L6.7 15.3V12.4" fill="#48AD6A"/>
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
  const navLink = `settings text-green-700 sm:text-green-100 hover:text-green-800 sm:hover:text-green-300`;

  return (
    <li className="flex items-center space-x-4 sm:space-x-0">
      <Bullet />
      <a href={href} className={navLink}>
        {label}
      </a>
    </li>
  );
};

const Mobile = ({ setHeight }: MobileProps) => {
  const [ref, bounds] = useMeasure();

  useEffect(() => {
    setHeight(bounds.height);
  }, [bounds, setHeight]);

  return (
    <nav
      ref={ref}
      className="w-screen h-[95dvh] [flex: 1] px-[5.3%] pt-10 pb-20 bg-green-300 flex flex-col justify-between font-display"
    >
      <ul className="flex flex-col space-y-8 text-6xl">
        <NavLink label="Blog" href="/blog" />
        <NavLink label="Games" href="/games" />
        <NavLink label="Contact" href="#contact" />
      </ul>

      <div className="flex items-center space-x-2">
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
      <header className="font-display w-full bg-green-600 text-green-100 px-[5.3%] py-3 sm:px-[5.2%] sm:py-4 2xl:px-0">
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
