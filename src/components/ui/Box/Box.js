import React, { Children, cloneElement } from "react";
import styles from "./box.module.css";
import classNames from 'classnames';

export default function Box({
  children,
  direction = "column",
  justify = "flex-start",
  align = "flex-start",
  equalChildren = false,
  gap,

  mobileDirection,
  mobileJustify,
  mobileAlign,
  mobileEqualChildren,
  mobileGap,

  padding = "20px",
  bg = "transparent",
  fullHeight = false,

  borderTop = false,
  borderBottom = false,
  borderLeft = false,
  borderRight = false,
  borderColor = "#938579",

  mobileBorderTop = null,
  mobileBorderBottom = null,
  mobileBorderLeft = null,
  mobileBorderRight = null,
  
  showDivider = false,
  hideMobileDivider = false,
  dividerColor = "#938579",
  dividerWidth = "1px",
  className = "",
  style = {},
}) {


  const boxStyle = {
    flex: fullHeight ? 1 : "unset",
    padding,
    backgroundColor: bg,
    position: "relative",
    '--box-gap': gap || '0',
    '--mobile-box-gap': mobileGap || '0',
    '--box-border-top': borderTop ? `1px solid ${borderColor}` : "none",
    '--box-border-bottom': borderBottom ? `1px solid ${borderColor}` : "none",
    '--box-border-left': borderLeft ? `1px solid ${borderColor}` : "none",
    '--box-border-right': borderRight ? `1px solid ${borderColor}` : "none",
    '--box-border-color': borderColor,
    '--mobile-box-border-top': mobileBorderTop === true ? `1px solid ${borderColor}` : "none",
    '--mobile-box-border-bottom': mobileBorderBottom === true ? `1px solid ${borderColor}` : "none",
    '--mobile-box-border-left': mobileBorderLeft === true ? `1px solid ${borderColor}` : "none",
    '--mobile-box-border-right': mobileBorderRight === true ? `1px solid ${borderColor}` : "none",
    
    ...style,
  };

  const currentDirection = mobileDirection || direction;
  const currentEqualChildren = mobileEqualChildren !== undefined ? mobileEqualChildren : equalChildren;

  const processedChildren =
    currentEqualChildren && currentDirection.includes("row")
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

  const boxClasses = classNames(
    styles.box,
    styles[`direction-${direction}`],
    styles[`justify-${justify}`],
    styles[`align-${align}`],
    {
      [styles.equalChildren]: equalChildren && direction.includes("row"),
    },
    {
      [styles[`mobile-direction-${mobileDirection}`]]: mobileDirection,
      [styles[`mobile-justify-${mobileJustify}`]]: mobileJustify,
      [styles[`mobile-align-${mobileAlign}`]]: mobileAlign,
      [styles['mobile-equalChildren']]: mobileEqualChildren && mobileDirection?.includes("row"),
      [styles['has-mobile-gap']]: mobileGap,
      [styles['mobile-border-top-defined']]: mobileBorderTop !== null,
      [styles['mobile-border-bottom-defined']]: mobileBorderBottom !== null,
      [styles['mobile-border-left-defined']]: mobileBorderLeft !== null,
      [styles['mobile-border-right-defined']]: mobileBorderRight !== null,
    },
    className
  );

  return (
    <div className={boxClasses} style={boxStyle}>
      {processedChildren}
      {showDivider && currentDirection.includes("row") && (
        <div 
          className={classNames(styles.dividersWrapper, {
            [styles.hideMobileDivider]: hideMobileDivider 
          })}
        >
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