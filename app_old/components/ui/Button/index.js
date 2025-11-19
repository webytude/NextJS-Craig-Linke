// components/ui/Button.js
import React from 'react';
import styles from './button.module.css';

/**
 * @param {object} props
 * @param {'primary' | 'secondary' | 'outline' | 'text'} [props.variant='primary']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} rest - other button props
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}) => {
  const classes = `${styles.button} ${styles[variant]} ${styles[size]} ${className || ''}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;