'use client';

import TwoColumnLayout from '@/components/layouts/TwoColumnLayout';
import FadeUp from '@/components/ui/animations/FadeUp';
import Box from '@/components/ui/Box/Box';
import Divider from '@/components/ui/Divider';
import Link from 'next/link';
import styles from './awards.module.css';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { useState } from 'react';
import LinkWithArrow from '@/components/ui/Link';

export default function Awards({ data }) {

  const {AwardTitle, Lists} = data;

  const [showAll, setShowAll] = useState(false);

  const visibleAwards = showAll ? Lists : Lists.slice(0, 10);

  const leftContent = (
    <>
      <Box className={styles.awardsLeftCol} fullHeight direction="column" justify="space-between">
        <FadeUp style={{ maxWidth: 480 }}>
          <BlocksRenderer content={AwardTitle || []} />
        </FadeUp>
      </Box>
    </>
  );

  const rightContent = (
    <>
      <div className="p20">
        <ul className={styles.awardList}>
        {visibleAwards.map((button, index) => (
          <li key={index}>
            <Link href={button?.ButtonURL || '#'} target={button?.OpenNewTab ? "_blank" : "_self"}>{button?.ButtonText}</Link>
          </li>
        ))}
        </ul>
        {Lists.length > 10 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className={styles.viewAllBtn}
          >
            {showAll ? "Show Less" : "VIEW ALL AWARDS"}
          </button>
        )}
      </div>
    </>
  );

  return (
    <>
    <section className="text-module padding">
      <TwoColumnLayout left={leftContent} right={rightContent} />
    </section>
    <Divider />
    </>
  )
}
