"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { createPortal } from "react-dom";
import Image from "next/image";

const MegaMenuOverlay = ({ activeItem, onClose, onLinkClick }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (activeItem && activeItem.SubMenu && activeItem.SubMenu.length > 0) {
      setActiveImage(activeItem.SubMenu[0].Image?.url);
    }
  }, [activeItem]);

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {activeItem && (
        <motion.div
          key="mega-menu-overlay"
          className={`${styles.megaMenuWrapper} borderBottom megaMenuBG`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          onMouseLeave={onClose}
        >
          <div className={styles.megaMenuContent}>
            <div className={styles.megaMenuLinks}>
              <div className="uppercase">{activeItem.Name}</div>
              <div>
                {activeItem.SubMenu.map((sub, index) => (
                  <Link
                    key={index}
                    href={`/aesthetics-details/${sub.Link}`}
                    onClick={() => {
                      onLinkClick && onLinkClick();
                      onClose();
                    }}
                    onMouseEnter={() => setActiveImage(sub.Image?.url)}
                    className={styles.subMenuItem}
                  >
                    {sub.Name}
                  </Link>
                ))}
              </div>
            </div>

            <div className={`${styles.megaMenuImageContainer} hide-mobile`}>
              <AnimatePresence mode="wait">
                {activeImage && (
                  <Image src={activeImage} alt={""} width={176} height={238} />
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default function Navigation({
  menu,
  onCloseMenu,
  onLinkClick,
  isMenuOpen,
}) {
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    if (!isMenuOpen) {
      setActiveItem(null);
    }
  }, [isMenuOpen]);

  const handleMainItemClick = (e, item) => {
    const hasSubMenu = item.SubMenu && item.SubMenu.length > 0;

    if (!hasSubMenu) {
      return;
    }

    if (activeItem?.Name !== item.Name) {
      e.preventDefault();
      setActiveItem(item);
      return;
    }

    setActiveItem(null);
  };

  return (
    <>
      <ul
        className={styles.navListContainer}
        // onMouseLeave={() => setActiveItem(null)}
      >
        {menu.map((item, index) => {
          const hasSubMenu = item.SubMenu && item.SubMenu.length > 0;
          const isActive = activeItem?.Name === item.Name;

          return (
            <li
              key={`${item.Link}-${index}`}
              className={styles.navItem}
              onMouseEnter={() => {
                if (item.SubMenu?.length) setActiveItem(item);
              }}
            >
              <span
                className={`${styles.navLink} ${isActive ? styles.active : ""}`}
              >
                <Link
                  href={item.Link}
                  onClick={(e) => {
                    if (item.SubMenu?.length) {
                      if (activeItem?.Name !== item.Name) {
                        e.preventDefault();
                        setActiveItem(item);
                        return;
                      }

                      setActiveItem(null);
                      onLinkClick?.();
                    }
                  }}
                >
                  {item.Name}
                </Link>
              </span>
            </li>
          );
        })}
      </ul>
      <MegaMenuOverlay
        activeItem={activeItem}
        onClose={() => setActiveItem(null)}
        onLinkClick={onLinkClick}
      />
    </>
  );
}
