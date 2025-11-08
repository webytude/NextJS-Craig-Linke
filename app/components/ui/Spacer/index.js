// components/ui/Spacer.js
import React from 'react';
import styles from './spacer.module.css';

/**
 * @param {object} props
 * @param {'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'xxxxl'} [props.size='md']
 * @param {'horizontal' | 'vertical'} [props.axis='vertical']
 * @param {string} [props.className]
 * @param {React.CSSProperties} [props.style]
 */
const Spacer = ({ size = 'md', axis = 'vertical', className, style }) => {
  const classes = `${styles.spacer} ${styles[`spacer-${axis}-${size}`]} ${className || ''}`;

  return <div className={classes} style={style} aria-hidden="true" />;
};

export default Spacer;