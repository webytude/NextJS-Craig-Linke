// components/ui/Link.js
import Link from "next/link";
import styles from './link.module.css';


export default function LinkWithArrow({
  text = "Learn More",
  href = "#",
  arrowDirection = "right", // 'right' | 'left'
  underline = true,
  target = "_self",
  className = "",
}) {
  return (
    <Link href={href} target={target} className={`${styles.link} ${className}`}>
      {arrowDirection === "left" && <span className={styles.arrow}>←</span>}
      <span className={styles.text}>{text}</span>
      {arrowDirection === "right" && <span className={styles.arrow}>
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" viewBox="0 0 11 9" fill="none">
          <path d="M5.77842 8.66763L5.16603 8.05524L7.38005 5.85693C8.14946 5.08752 8.71474 4.67926 8.71474 4.67926C8.71474 4.67926 8.02384 4.77348 6.92468 4.77348H0V3.87845H6.90898C8.00814 3.87845 8.69903 3.98837 8.69903 3.98837C8.69903 3.98837 8.13375 3.56441 7.36434 2.795L5.18174 0.596685L5.79412 0L10.1122 4.33381L5.77842 8.66763Z" fill="#EAEAE8"/>
        </svg>  
      </span>}
      {underline && <span className={styles.underline}></span>}
    </Link>
  );
}