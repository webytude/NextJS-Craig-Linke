// components/ui/Link.js
import NextLink from 'next/link';
import React from 'react';
import styles from './link.module.css';

/**
 * @param {object} props
 * @param {string} props.href
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 * @param {'default' | 'arrow' | 'footer'} [props.variant='default']
 * @param {'_blank' | '_self' | '_parent' | '_top'} [props.target]
 * @param {string} [props.rel]
 * @param {any} rest - other props to pass to NextLink or a
 */
const Link = ({
  href,
  children,
  className,
  variant = 'default',
  target,
  rel,
  ...props
}) => {
  const classes = `${styles.link} ${styles[variant]} ${className || ''}`;

  if (href.startsWith('/') || href.startsWith('#')) {
    return (
      <NextLink href={href} className={classes} {...props}>
        {children}
        {variant === 'arrow' && <span className={styles.arrow}>&rarr;</span>}
      </NextLink>
    );
  } else {
    return (
      <a href={href} className={classes} target={target || '_blank'} rel={rel || 'noopener noreferrer'} {...props}>
        {children}
        {variant === 'arrow' && <span className={styles.arrow}>&rarr;</span>}
      </a>
    );
  }
};

export default Link;