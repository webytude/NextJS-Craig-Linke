import React, { Children, cloneElement } from "react";
import styles from "./box.module.css";

export default function Box({
  children,
  direction = "column",
  justify = "flex-start",
  align = "flex-start",
  padding = "20px",
  bg = "transparent",
  fullHeight = false,
  borderTop = false,
  borderBottom = false,
  borderLeft = false,
  borderRight = false,
  borderColor = "#938579",
  equalChildren = false,
  showDivider = false,
  dividerColor = "#938579",
  dividerWidth = "1px",
  className = "",
  style = {},
}) {

  const borderStyles = {
    borderTop: borderTop ? `1px solid ${borderColor}` : "none",
    borderBottom: borderBottom ? `1px solid ${borderColor}` : "none",
    borderLeft: borderLeft ? `1px solid ${borderColor}` : "none",
    borderRight: borderRight ? `1px solid ${borderColor}` : "none",
  };

  const boxStyle = {
    flex: fullHeight ? 1 : "unset",
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    padding,
    backgroundColor: bg,
    position: "relative",
    ...borderStyles,
    ...style,
  };

  const processedChildren =
    equalChildren && direction === "row"
      ? Children.map(children, (child) =>
          React.isValidElement(child)
            ? cloneElement(child, {
                style: {
                  flex: 1,
                  width: "100%",
                  ...child.props.style,
                },
              })
            : child
        )
      : children;

  return (
    <div className={`${styles.box} ${className}`} style={boxStyle}>
      {processedChildren}
      {showDivider && direction === "row" && (
        <div className={styles.dividersWrapper}>
          {Children.count(children) > 1 &&
            Array.from({ length: Children.count(children) - 1 }).map((_, i) => (
              <div
                key={i}
                className={styles.divider}
                style={{
                  left: `calc(${((i + 1) / Children.count(children)) * 100}% - (${
                    dividerWidth
                  } / 2))`,
                  backgroundColor: dividerColor,
                  width: dividerWidth,
                }}
              />
            ))}
        </div>
      )}
    </div>
  );
}