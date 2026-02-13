'use client';

import styles from './testimonial.module.css'
import { useState } from 'react';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export default function Testimonial({ data }) {
  const { Name, Description, Padding } = data;

  const sectionStyle = {};

  const hasPaddingData = Padding && Object.keys(Padding).length > 0;

  if (hasPaddingData) {
    const {
      DesktopTopPadding = 0,
      DesktopBottomPadding = 0,
      MobileTopPadding = 0,
      MobileBottomPadding = 0,
    } = Padding;

    sectionStyle['--desktop-top-padding'] = `${DesktopTopPadding}px`;
    sectionStyle['--desktop-bottom-padding'] = `${DesktopBottomPadding}px`;
    sectionStyle['--mobile-top-padding'] = `${MobileTopPadding}px`;
    sectionStyle['--mobile-bottom-padding'] = `${MobileBottomPadding}px`;
  }


  return (
    <>
      <section className={`${styles.testimonialSection} padding`} style={sectionStyle}>
        <div className={styles.description}>
          <BlocksRenderer content={Description || []} />
        </div>
        <h2 className={styles.name}>{Name}</h2>        
      </section>
    </>
  )
}
