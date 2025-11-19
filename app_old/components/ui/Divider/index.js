import styles from "./divider.module.css";

export default function Divider({
  direction = "horizontal", // 'horizontal' or 'vertical'
  color = "#938579",
  margin = "0 0",
  className = "",
  style = {},
}) {
  return (
    <div
      className={`${styles.divider} ${
        direction === "vertical" ? styles.vertical : ""
      } ${className}`}
      style={{
        backgroundColor: color,
        margin,
        ...style,
      }}
    ></div>
  );
}
