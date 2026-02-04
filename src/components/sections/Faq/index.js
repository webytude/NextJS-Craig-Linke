'use client';

import TwoColumnLayout from '@/components/layouts/TwoColumnLayout';
import styles from './faq.module.css'
import { useState } from 'react';
import Paragraph from '@/components/ui/Paragraph';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export default function Faq({ data }) {
  const {Title, FAQContent} = data;

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const leftContent = (
    <div className='p20'>
      <h2 className='heading' style={{ maxWidth: 200 }}>{Title}</h2>
    </div>
  );

  const rightContent = (
    <div className={`${styles.faq} p20`}>
      {FAQContent.map((faq, index) => (
          <div key={index} className={styles.item}>
            <button
              className={styles.question}
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.Title}</span>
              <span className={styles.icon}>
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>

            <div
              className={`${styles.answer} ${
                activeIndex === index ? styles.open : ""
              }`}
            >
              <Paragraph>
                <BlocksRenderer content={faq.Content || []} />
              </Paragraph>
            </div>
          </div>
        ))}
    </div>
  );
  return (
    <section className={styles.faqSection}>
      <TwoColumnLayout left={leftContent} right={rightContent} />
    </section>
  )
}
