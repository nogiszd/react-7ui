import React from "react";
import "7.css";

/**
 * Balloon component that implements a Windows 7-style tooltip or popup balloon.
 * Can be positioned in any corner relative to its target element.
 *
 * @component
 * @example
 * ```tsx
 * import { Balloon } from 'react-7ui';
 *
 * function MyComponent() {
 *   return (
 *     <div style={{ position: 'relative' }}>
 *       <button>Hover me</button>
 *       <Balloon
 *         position="top-right"
 *         visible={isHovered}
 *       >
 *         This is a helpful tooltip
 *       </Balloon>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * // As a notification balloon
 * ```tsx
 * <Balloon
 *   position="bottom-right"
 *   style={{
 *     position: 'fixed',
 *     bottom: 20,
 *     right: 20
 *   }}
 * >
 *   <h4>New Message</h4>
 *   <p>You have received a new message</p>
 * </Balloon>
 * ```
 */
export interface BalloonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The position of the balloon
   */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /**
   * Whether the balloon is visible
   */
  visible?: boolean;
}

export const Balloon = React.forwardRef<HTMLDivElement, BalloonProps>(
  (
    {
      position = "bottom-right",
      visible = true,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const positionClasses = {
      "top-left": "is-top is-left",
      "top-right": "is-top is-right",
      "bottom-left": "is-bottom is-left",
      "bottom-right": "is-bottom is-right",
    };

    const combinedClassName = `${visible ? "" : "hidden"} ${
      positionClasses[position]
    } ${className}`.trim();

    return (
      <div ref={ref} role="tooltip" className={combinedClassName} {...props}>
        {children}
      </div>
    );
  }
);

Balloon.displayName = "Balloon";
