import styles from "./paragraph.module.css";

export default function Paragraph({
  children,
  size = "small", // small | medium | large
  color = "#EAEAE8",
  align = "left",
  weight = 300,
  lineHeight = '21px',
  className = "",
  style = {},
}) {
  const inlineStyle = {
    color,
    textAlign: align,
    fontWeight: weight,
    lineHeight,
    ...style,
  };

  return (
    <p
      className={`${styles.paragraph} ${styles[size]} ${className}`}
      style={inlineStyle}
    >
      {children}
    </p>
  );
}
