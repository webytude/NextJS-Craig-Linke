import styles from "./twoColumnLayout.module.css";

export default function TwoColumnLayout({
  left,
  right,
  fullHeight = false,
  reverse = false,
  gap = "0px",
  bg = "transparent",
  showDivider = false,
  showMobileDivider = null,
  dividerColor = "#938579",
  dividerWidth = "1px",
  dividerHeight = "1px",
  className = "",
  style = {},
}) {
  const containerStyle = {
    // flexDirection: reverse ? "row-reverse" : "row",
    backgroundColor: bg,
    height: fullHeight ? "calc(100vh - 52px)" : "auto",
    gap,
    ...style,
  };

  const shouldRenderHorizontalDivider = showMobileDivider !== null
    ? showMobileDivider // If showMobileDivider is explicitly set (true/false)
    : showDivider;

  return (
    <div className={`${styles.container} ${className} ${reverse ? styles.reverseColumns : ''}`} style={containerStyle}>
      <div className={styles.leftColumn}>{left}</div>
      {/* <div className={styles.rightColumn}>{right}</div> */}

      {showDivider && (
        <div
          className={styles.verticalDivider}
          style={{
            backgroundColor: dividerColor,
            width: dividerWidth,
          }}
        ></div>
      )}
      {shouldRenderHorizontalDivider && (
        <div
          className={styles.horizontalDivider}
          style={{
            backgroundColor: dividerColor,
            height: dividerWidth,
          }}
        ></div>
      )}

      <div className={styles.rightColumn}>{right}</div>

    </div>
  );
}
