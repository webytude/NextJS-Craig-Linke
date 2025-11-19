"use client";

import { useEffect, useRef, useState } from "react";
import Navigation from "./Navigation";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Link from "next/link";
import styles from './navbar.module.css';

export default function Header({ globalData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [positions, setPositions] = useState({ left: 0, right: 0 });


  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const craigRef = useRef(null);
  const linkeRef = useRef(null);

  const menuButtonControls = useAnimation();

  useEffect(() => {
    const updatePositions = () => {
      if (leftRef.current && rightRef.current && craigRef.current && linkeRef.current) {
        const leftEdge = leftRef.current.getBoundingClientRect().left;
        const craigEdge = craigRef.current.getBoundingClientRect().left;
        const linkeEdge = linkeRef.current.getBoundingClientRect().right;
        const rightEdge = rightRef.current.getBoundingClientRect().right;

        setPositions({
          craigToLeft: leftEdge - craigEdge + 10,
          linkeToRight: rightEdge - linkeEdge - 10,
        });
      }
    };

    updatePositions();
    // window.addEventListener("resize", updatePositions);
    // return () => window.removeEventListener("resize", updatePositions);
  }, []);

  const handleMenuToggle = async () => {
    await menuButtonControls.start({
      x: 50,
      opacity: 0,
      transition: { duration: 1, ease: "easeInOut" },
    });
    setMenuOpen(true);
  };

  const handleClose = async () => {
    setMenuOpen(false);
    await menuButtonControls.start({
      x: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeInOut" },
    });
  };

  const headerData = globalData?.Header;

  const openMenu = () => {
    setMenuOpen(true);
  };

  return (
    <header className={`${styles.header} borderBottom`}>
        <motion.div
          ref={leftRef}
          className={styles.leftLogo}
          animate={menuOpen ? { x: -100, opacity: 0 } : { x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <span>
              <svg
                width="25"
                height="13"
                viewBox="0 0 26 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.0734 8.81889C24.0099 9.62031 23.4564 10.3221 22.8711 10.8292C22.2269 11.3861 21.451 11.7484 20.6117 11.8933C19.7088 12.0472 18.7197 12.02 17.8441 11.7303C16.5964 11.3182 15.4576 10.5394 14.3642 9.78331C13.8061 9.39392 13.2299 8.95925 12.6719 8.56533C12.2908 8.29366 11.9006 8.02652 11.5059 7.76844C12.5403 6.78138 13.6564 5.62679 14.827 4.56729C15.7979 5.18759 16.7824 5.79885 17.8123 6.32407C18.8332 6.83118 19.913 7.27038 21.0835 7.28849C22.7259 7.32471 24.4818 6.65913 25.2349 5.10609C26.2603 2.91917 24.8583 0.700547 22.617 0.170795C19.5545 -0.576292 17.0547 1.25294 14.9449 3.22253C13.357 2.26264 11.7554 1.28916 10.0087 0.650741C9.01959 0.279462 7.93978 0.0168498 6.87812 0.0168498C4.99526 0.0168498 3.26665 0.646214 2.01897 1.79175C1.38379 2.37583 0.884719 3.07311 0.539905 3.87C0.181481 4.70312 0 5.62679 0 6.60932C0 8.62872 0.680553 10.304 1.96453 11.4586C2.57249 12.0065 3.30295 12.423 4.1423 12.7083C4.96804 12.989 5.88451 13.1293 6.86451 13.1293C9.01506 13.1293 10.1811 12.6132 10.8026 12.3143L11.1066 10.3991H11.0522C10.6756 10.9968 9.11033 12.183 7.15034 12.183C6.13405 12.183 5.10868 11.9702 4.21489 11.4812C3.1623 10.9062 2.37286 9.95989 1.96453 8.837C1.69231 8.08991 1.57888 7.29302 1.57888 6.50065C1.57888 4.83895 2.05073 3.43986 2.93545 2.4528C3.84739 1.44311 5.1722 0.949576 6.76016 0.949576C8.13034 0.949576 9.43246 1.45216 10.6393 2.05436C11.8235 2.6475 12.9441 3.34931 14.0557 4.0647C13.1165 4.98837 11.946 6.22899 10.7074 7.26585C10.4578 7.12096 10.2083 6.9806 9.95422 6.84929C9.29181 6.50971 8.57043 6.22446 7.82636 6.09315C6.7284 5.90299 5.47164 5.91657 4.56878 6.68629C3.7748 7.36094 3.58424 8.511 4.18313 9.3758C4.62776 10.0369 5.42174 10.39 6.18849 10.467C7.5859 10.6436 8.89256 9.96895 9.94968 9.14036C10.1629 8.97283 10.3807 8.79172 10.603 8.59702C11.0885 8.90039 11.5512 9.22186 11.9913 9.52522C13.1437 10.3402 14.2598 11.1824 15.4894 11.8978C16.1246 12.2645 16.787 12.5996 17.4947 12.826C18.8377 13.2742 20.3304 13.1882 21.6869 12.826C22.5989 12.5815 23.5018 12.174 24.2005 11.5175C24.4318 11.3092 25.0942 10.6798 25.2984 10.2542L24.1324 8.80983L24.078 8.82341L24.0734 8.81889ZM21.383 1.32086C22.4945 1.38424 23.7059 1.90494 24.078 2.99161C24.3411 3.73417 24.0961 4.5854 23.5108 5.11062C22.8666 5.69923 21.9546 5.90751 21.0881 5.91657C20.1534 5.91657 19.237 5.54529 18.3885 5.15137C17.5492 4.75292 16.6826 4.25487 15.7979 3.72512C17.5764 2.26264 19.4638 1.17597 21.383 1.31633V1.32086ZM6.33821 9.2445C5.96618 9.19922 5.54877 9.05433 5.31285 8.80078C4.78202 8.23933 5.19489 7.56016 5.85729 7.34735C6.24294 7.20699 6.7284 7.19793 7.15034 7.22963C8.01691 7.29755 8.86987 7.62808 9.682 8.05822C8.53867 8.86416 7.38173 9.38486 6.33821 9.23997V9.2445Z"
                  fill="currentColor"
                />
              </svg>
          </span>
          {/* <button
            type="button"
            onClick={openMenu}
            className={styles.toggleicon}
            aria-label="Open mobile menu"
          /> */}
        </motion.div>
      <div className={styles.centerLogos}>
        <motion.h1
          ref={craigRef}
          className={styles.craig}
          animate={menuOpen ? { x: positions.craigToLeft } : { x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Link href={'/'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="68" height="13" viewBox="0 0 68 13" fill="none">
            <path d="M6.26839 11.4733C3.913 11.4733 1.28745 9.93573 1.28745 6.24974C1.28745 2.79965 3.72727 1.12726 6.06578 1.12726C7.45453 1.12726 8.60691 1.71702 9.26962 2.90075H9.32028L9.42159 0.718647C8.94882 0.684946 8.55625 0.583845 8.13414 0.465893C7.61072 0.331091 7.03242 0.196289 6.18397 0.196289C2.74374 0.196289 0 2.42895 0 6.19919C0 9.96943 2.43982 12.4548 6.28528 12.4043C7.55584 12.3874 8.67444 12.1347 9.33294 11.6924L9.61998 9.88518H9.56933C8.90661 10.7488 7.72469 11.4733 6.26417 11.4733H6.26839Z" fill="currentColor"/>
            <path d="M24.1176 9.88537L22.1844 6.70489C23.6744 6.21623 24.5398 5.1336 24.5398 3.62972C24.5398 1.61612 23.0666 0.381836 20.6268 0.381836H16.5449V0.415536C16.6462 0.68514 16.8151 1.00529 16.8151 2.34489V10.2561C16.8151 11.5915 16.6462 11.9116 16.5449 12.1854V12.2191H18.2207V12.1854C18.1194 11.9158 17.9506 11.5957 17.9506 10.2561V7.00819H21.0658L23.438 10.8795C23.9277 11.6926 24.1008 12.0127 24.1683 12.2149H25.9961V12.1644C25.6752 11.9959 24.8606 11.0986 24.1134 9.88116L24.1176 9.88537ZM20.1202 6.09828H17.9506V1.29596H20.5255C22.4587 1.29596 23.2523 2.34489 23.2523 3.61287C23.2523 4.88085 22.4039 6.09828 20.116 6.09828H20.1202Z" fill="currentColor"/>
            <path d="M48.8496 0.415536C48.9509 0.68514 49.1198 1.00529 49.1198 2.34489V10.2561C49.1198 11.5915 48.9509 11.9116 48.8496 12.1854V12.2191H50.5254V12.1854C50.4241 11.9158 50.2552 11.5957 50.2552 10.2561V2.34489C50.2552 1.00951 50.4241 0.689353 50.5254 0.415536V0.381836H48.8496V0.415536Z" fill="currentColor"/>
            <path d="M66.1553 5.62798C66.2566 5.84703 66.4255 6.16719 66.4255 7.55733V10.464C65.6446 11.0706 64.9523 11.2939 63.3272 11.2939C60.8029 11.2939 58.667 9.62149 58.667 6.08715C58.667 2.55281 61.09 0.930976 63.5298 0.930976C64.9861 0.930976 66.493 1.52073 67.1557 2.70446L67.2064 2.68761L67.3077 0.522357C66.206 0.438106 65.0198 0 63.5635 0C60.1233 0 57.2445 2.33376 57.3796 6.2725C57.5146 10.0427 59.7687 12.2248 63.4454 12.2248C64.9354 12.2248 65.7163 11.8373 66.9193 11.2265C67.1895 11.0917 67.3077 11.0243 67.5821 10.9063V7.55733C67.5821 6.1714 67.7509 5.85125 67.8522 5.62798V5.59428H66.1595V5.62798H66.1553Z" fill="currentColor"/>
            <path d="M41.4824 11.0185L38.3629 1.09376C38.2616 0.773604 38.2279 0.466087 38.2616 0.381836H34.8763C34.91 0.466087 34.8763 0.769391 34.775 1.09376L31.6555 11.0185C31.4529 11.6631 31.2165 12.0338 31.1152 12.1854V12.2191H32.7235V12.1854C32.7066 11.7305 32.9092 10.9848 33.1118 10.3108L33.7028 8.39834H39.4267L40.0176 10.3108C40.2202 10.9891 40.4228 11.7305 40.406 12.1854V12.2191H42.0142V12.1854C41.9129 12.0338 41.6765 11.6631 41.4739 11.0185H41.4824ZM33.9772 7.48421L35.8936 1.31281H37.2485L39.1649 7.48421H33.9814H33.9772Z" fill="currentColor"/>
          </svg>
          </Link>
        </motion.h1>

        <motion.h1
          ref={linkeRef}
          className={styles.linke}
          onClick={handleClose}
          animate={menuOpen ? { x: positions.linkeToRight } : { x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="67" height="12" viewBox="0 0 67 12" fill="none">
            <path d="M6.45412 10.9063H1.40564V1.96305C1.40564 0.577122 1.57449 0.256967 1.67579 0.0337014V9.53674e-07H0V0.0337014C0.101307 0.252755 0.270153 0.572909 0.270153 1.96305V9.87424C0.270153 11.2602 0.101307 11.5803 0 11.8036V11.8373H8.43806V10.6536H8.38741C8.16791 10.7547 7.84709 10.9063 6.45412 10.9063Z" fill="currentColor"/>
            <path d="M14.123 0.0337005C14.2244 0.303304 14.3932 0.623459 14.3932 1.96305V9.87424C14.3932 11.2096 14.2244 11.5298 14.123 11.8036V11.8373H15.7988V11.8036C15.6975 11.534 15.5287 11.2138 15.5287 9.87424V1.96305C15.5287 0.627671 15.6975 0.307517 15.7988 0.0337005V0H14.123V0.0337005Z" fill="currentColor"/>
            <path d="M32.2994 0.0337005C32.4007 0.303304 32.5864 0.623459 32.5864 1.96305V8.48831L25.0137 2.26636C24.7773 2.06415 24.5578 1.76085 24.5578 1.23428C24.5578 0.661372 24.5916 0.387555 24.7435 0.0337005V0H23.3379V0.0337005C23.4392 0.303304 23.608 0.623459 23.608 1.96305V9.87424C23.608 11.2096 23.4392 11.5298 23.3379 11.8036V11.8373H24.8448V11.8036C24.7435 11.534 24.5578 11.2138 24.5578 9.87424V3.39954L31.9279 9.45298C32.4513 9.87424 32.6075 10.2323 32.6075 10.6873V11.0411C32.6075 11.3781 32.5569 11.5803 32.4724 11.8036V11.8373H33.8105V11.8036C33.7261 11.534 33.5404 11.0917 33.5404 9.89109V1.96305C33.5404 0.627671 33.7092 0.307517 33.8105 0.0337005V0H32.3036V0.0337005H32.2994Z" fill="currentColor"/>
            <path d="M49.85 10.2829L46.9206 5.44684L49.3942 1.8788C50.0906 0.880425 50.7323 0.341217 51.0362 0.037913V0.00421256H49.3942C49.3097 0.459169 48.7652 1.18794 48.3431 1.79455L45.9877 5.19409H42.7501V1.96305C42.7501 0.577121 42.9189 0.256966 43.0202 0.0337005V0H41.3613V0.0337005C41.4626 0.252754 41.6146 0.572908 41.6146 1.96305V9.53724C41.6146 10.9232 41.4626 11.5845 41.3613 11.8036V11.8373H43.0202V11.8036C42.9189 11.5845 42.7501 11.2644 42.7501 9.53724V6.104H45.9877L48.6639 10.5019C49.0522 11.1464 49.3435 11.6688 49.3435 11.8373H51.205V11.7867C50.9349 11.6519 50.3059 11.0411 49.85 10.2829Z" fill="currentColor"/>
            <path d="M66.2322 10.6704C66.0127 10.7715 65.6919 10.9232 64.2989 10.9232H59.2842V6.05345H62.1462C63.3661 6.05345 64.3665 6.2051 64.586 6.3062H64.6366V4.88657H64.586C64.3665 4.98767 63.3661 5.13932 62.1462 5.13932H59.2842V0.914125H63.7249C65.1136 0.914125 65.4344 1.06578 65.6581 1.16688H65.7088V0H57.8828V0.0337005C57.9841 0.303304 58.153 0.623459 58.153 1.96305V9.87424C58.153 11.2096 57.9841 11.5298 57.8828 11.8036V11.8373H66.2871V10.6704H66.2365H66.2322Z" fill="currentColor"/>
          </svg>
        </motion.h1>
      </div>
      {/* Menu Button */}
      {!menuOpen && (
        <motion.button
          ref={rightRef}
          key="menuButton"
          className={styles.menuButton}
          onClick={handleMenuToggle}
          animate={menuButtonControls}
          whileTap={{ scale: 0.9 }}
        >
          MENU
        </motion.button>
      )}

      {/* Navigation Animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="navMenu"
            className={styles.nav}
            initial={{ y: "-150%", opacity: 0 }}
            animate={{ y: "-50%", opacity: 1 }}
            exit={{ y: "-150%", opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Navigation menu={headerData?.Menu} />
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      {/*<div
        className={`${styles.mobileMenuWrapper} ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div className="flex justify-between items-center border-b border-[#B6C380]/40">
          <button
            className="text-[20px] font-light leading-none ps-4 menuLogo"
            onClick={() => handleLinkClick('/')}
          >
            logo
          </button>
          <button
            type="button"
            // onClick={closeMenu}
            className="text-[16px] font-light w-[60px] h-[60px] text-center flex items-center justify-center border-l border-[#B6C380]/40"
            aria-label="Close menu"
          >
            close
          </button>
        </div>

        {global?.header?.right_side_text && (
          <Link
            href="#"
            className="mt-4 text-base font-light text-[#E5E1D5] hover:text-[#B6C380]"
            // onClick={closeMenu}
          >
            {global.header.right_side_text}
          </Link>
        )}

        <nav className="flex flex-col md:gap-4 text-xl font-light border-t border-[#B6C380]/40 pt-8 leading-none">
          navtigation
        </nav>

        <address className="text-[16px] font-light text-[#a1a68b] not-italic">
          sdfsdf
        </address>
      </div>*/} 
    </header>
  )
}
