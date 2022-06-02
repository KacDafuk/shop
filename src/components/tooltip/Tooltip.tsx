import React from "react";
import styles from "./tooltip.module.css";
interface TooltipProps {
  text: string;
}
//this component requires parent to have position relative, it would be
const Tooltip = ({ text }: TooltipProps) => {
  return <section className={styles.tooltip}>{text.toLowerCase()}</section>;
};

export default Tooltip;

// classes that should be used on parent element if there are no additional sections elements beside tooltip
// value of top may vary depending on what fits your tooltip
// .tooltipParent {
//   position: relative;
//   cursor: pointer;
// }
// .tooltipParent:hover > section {
//   top: -100%;
//   visibility: visible;
//   font-size: var(--font-xs);
//   height: min-content;
//   transition: var(--quick-anim) all;
//   border-radius: 20px;
// }
