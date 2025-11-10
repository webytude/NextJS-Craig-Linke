import styles from "./spacer.module.css";

export default function Spacer({
  desktop = 60, // default 60px space on desktop
  tablet = 40,  // 40px on tablets
  mobile = 20,  // 20px on mobile
  direction = "vertical", // "vertical" | "horizontal"
  className = "",
  style = {},
}) {
  // CSS variable-based responsive design
  const inlineStyle = {
    "--spacer-desktop": `${desktop}px`,
    "--spacer-tablet": `${tablet}px`,
    "--spacer-mobile": `${mobile}px`,
    ...style,
  };

  return (
    <div
      className={`${styles.spacer} ${
        direction === "horizontal" ? styles.horizontal : styles.vertical
      } ${className}`}
      style={inlineStyle}
    />
  );
}