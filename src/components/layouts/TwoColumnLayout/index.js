import styles from "./twoColumnLayout.module.css";

export default function TwoColumnLayout({
  left,
  right,
  fullHeight = false,
  reverse = false,
  gap = "0px",
  showDivider = false,
  showMobileDivider = null,
  dividerColor = "#938579",
  dividerWidth = "1px",
  dividerHeight = "1px",
  className = "",
  style = {},
}) {
  const containerStyle = {
    height: fullHeight ? "calc(100vh - 52px)" : "auto",
    gap,
    ...style,
  };

  const shouldRenderHorizontalDivider = showMobileDivider !== null
    ? showMobileDivider
    : showDivider;

  return (
    <div className={`${styles.container} ${className} ${reverse ? styles.reverseColumns : ''}`} style={containerStyle}>
      <div className={styles.leftColumn}>{left}</div>

      {showDivider && (
        <div
          className={styles.verticalDivider}
          style={{
            borderRight: `1px solid ${dividerColor}`,
            width: dividerWidth,
          }}
        ></div>
      )}
      {shouldRenderHorizontalDivider && (
        <div
          className={styles.horizontalDivider}
          style={{
            borderBottom: `1px solid ${dividerColor}`,
            height: dividerWidth,
          }}
        ></div>
      )}

      <div className={styles.rightColumn}>{right}</div>

    </div>
  );
}
