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
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:hidden">
  <g clip-path="url(#clip0_97_1272)">
    <path d="M10.6 4.9H7.7V7.8H10.6V4.9Z" fill="#FAFCF1"/>
    <path d="M16.3 4.9H10.6V7.7H4.9V13.4H7.7V16.3H13.4V13.4H16.3V4.9Z" fill="#E1F5E7"/>
    <path d="M19.1 7.7H16.3V13.4H13.4V16.3H7.7V19.1H16.3V16.3H19.1V7.7Z" fill="#48AD6A"/>
    <path d="M22 7.7H19.1V16.3L22 16.3V7.7Z" fill="#05373B"/>
    <path d="M16.3 19.1H7.7V22H16.3L16.3 19.1Z" fill="#05373B"/>
    <path d="M4.9 7.7H2V16.3H4.9V7.7Z" fill="#05373B"/>
    <path d="M16.3 2H7.7V4.9H16.3L16.3 2Z" fill="#05373B"/>
    <path d="M19.2 4.9H16.3V7.8H19.2V4.9Z" fill="#05373B"/>
    <path d="M19.2 16.3H16.3V19.2H19.2V16.3Z" fill="#05373B"/>
    <path d="M7.8 16.3L4.9 16.3V19.2H7.8V16.3Z" fill="#05373B"/>
    <path d="M4.9 4.9V7.7H7.7V4.9" fill="#05373B"/>
    <path d="M4.9 13.4V16.3L7.7 16.3V13.4" fill="#48AD6A"/>
  </g>
  <defs>
    <clipPath id="clip0_97_1272">
      <rect width="20" height="20" fill="white" transform="translate(2 2)"/>
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
