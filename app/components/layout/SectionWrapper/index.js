// components/layout/SectionWrapper.js
import React from 'react';

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {'light' | 'dark'} [props.variant='light']
 * @param {string} [props.className]
 */
const SectionWrapper = ({ children, variant = 'light', className }) => {
  return (
    <section className={`${styles.section} ${styles[variant]} ${className || ''}`}>
      {children}
    </section>
  );
};

export default SectionWrapper;