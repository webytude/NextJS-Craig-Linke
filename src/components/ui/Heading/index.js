import styles from "./heading.module.css";

export default function Heading({
  level = 1, // 1–6 for h1–h6
  children,
  color = "",
  align = "",
  weight = 300,
  margin,
  lineHeight = 1.2,
  className = "",
  style = {},
}) {
  const Tag = `h${level}`; // dynamic HTML tag (h1, h2, etc.)

  const inlineStyle = {
    color,
    textAlign: align,
    fontWeight: weight,
    margin,
    lineHeight,
    ...style,
  };

  return (
    <Tag
      className={`${styles.heading} ${styles[`h${level}`]} ${className}`}
      style={inlineStyle}
    >
      {children}
    </Tag>
  );
}
