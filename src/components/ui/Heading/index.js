import styles from "./heading.module.css";

export default function Heading({
  level = 1,
  children,
  color = "",
  align = "",
  weight = 300,
  margin,
  lineHeight = 1.2,
  className = "",
  style = {},
  ...rest
}) {
  const Tag = `h${level}`;

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
      {...rest}
    >
      {children}
    </Tag>
  );
}
