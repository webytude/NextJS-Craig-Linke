import styles from "./grid.module.css";

export default function Grid({
  cols = 3, // number of columns
  gap = "0", // spacing between items
  align = "stretch", // items vertical align
  justify = "start", // horizontal content alignment
  style = {},
  className = "",
  children,
}) {
  const inlineStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap,
    alignItems: align,
    justifyContent: justify,
    width: "100%",
    ...style,
  };

  return (
    <div className={`${styles.customGrid} ${className}`.trim()} style={inlineStyle}>
      {children}
    </div>
  );
}