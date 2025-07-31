import React from "react";
import "7.css";

/**
 * ProgressBar component that implements a Windows 7-style progress indicator.
 * Supports both determinate and indeterminate (marquee) progress states.
 *
 * @component
 * @example
 * ```tsx
 * import { ProgressBar } from 'react-7ui';
 *
 * function MyComponent() {
 *   return (
 *     <ProgressBar
 *       value={75}
 *       animate
 *       aria-label="Download progress"
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * // Indeterminate progress with marquee animation
 * ```tsx
 * <ProgressBar
 *   marquee
 *   aria-label="Loading..."
 * />
 * ```
 *
 * @example
 * // Error state
 * ```tsx
 * <ProgressBar
 *   value={30}
 *   variant="error"
 *   aria-label="Failed operation"
 * />
 * ```
 */
export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Current value (0-100)
   */
  value?: number;
  /**
   * Enable animation
   */
  animate?: boolean;
  /**
   * Whether to show marquee animation (indeterminate progress)
   */
  marquee?: boolean;
  /**
   * Variant of the progress bar
   */
  variant?: "default" | "paused" | "error";
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      marquee = false,
      variant = "default",
      animate = true,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="progressbar"
        className={`${marquee ? "marquee" : ""} ${
          animate ? "animate" : ""
        } ${variant} ${className}`.trim()}
        {...(!marquee && { "aria-valuenow": value })}
        {...props}
      >
        {!marquee && <div style={{ width: `${value}%` }} />}
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";
