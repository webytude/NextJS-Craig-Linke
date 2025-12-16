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
                  href={`aesthetics/${sub.Link}`}
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

            <div className={styles.megaMenuImageContainer}>
              <AnimatePresence mode="wait">
                {activeImage && (
                  // <motion.img
                  //   key={activeImage}
                  //   src={activeImage}
                  //   alt="Preview"
                  //   initial={{ opacity: 0, scale: 1.05 }}
                  //   animate={{ opacity: 1, scale: 1 }}
                  //   exit={{ opacity: 0 }}
                  //   transition={{ duration: 0.4 }}
                  //   className={styles.megaMenuImage}
                  // />
                  <Image
                    src={activeImage}
                    alt={""}
                    width={176}
                    height={238}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default function Navigation({ menu, onCloseMenu, onLinkClick, isMenuOpen }) {
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    if (!isMenuOpen) {
      setActiveItem(null);
    }
  }, [isMenuOpen]);

  const handleMainItemClick = (item) => {
    if (item.SubMenu && item.SubMenu.length > 0) {
      if (activeItem?.Name === item.Name) {
        setActiveItem(null);
      } else {
        setActiveItem(item);
      }
    } else {
      if (onLinkClick) onLinkClick();
      setActiveItem(null);
    }
  };

  return (
    <>
      <ul className={styles.navListContainer}>
        {menu.map((item, index) => {
          const hasSubMenu = item.SubMenu && item.SubMenu.length > 0;
          const isActive = activeItem?.Name === item.Name;

          return (
            <li key={`${item.Link}-${index}`} className={styles.navItem}>
              <span
                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                onClick={() => handleMainItemClick(item)}
              >
                {hasSubMenu ? (
                  <span style={{ cursor: 'pointer' }}>{item.Name}</span>
                ) : (
                  <Link href={item.Link} onClick={onLinkClick}>
                    {item.Name}
                  </Link>
                )}
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