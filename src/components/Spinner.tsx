import React from "react";
import "7.css";

/**
 * Spinner component that implements Windows 7-style loading indicators.
 * Provides multiple variants of loading animations.
 *
 * @component
 * @example
 * ```tsx
 * import { Spinner } from 'react-7ui';
 *
 * function MyComponent() {
 *   return (
 *     <Spinner
 *       variant="spinner"
 *       ariaLabel="Loading content"
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * // Animated loader variant
 * ```tsx
 * <Spinner
 *   variant="loader-animate"
 *   ariaLabel="Processing request"
 *   style={{ margin: '10px' }}
 * />
 * ```
 *
 * @example
 * // Static loader
 * ```tsx
 * <Spinner
 *   variant="loader"
 *   ariaLabel="Please wait"
 * />
 * ```
 */
export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The type of spinner to display
   */
  variant?: "spinner" | "loader" | "loader-animate";
  /**
   * Accessibility label for the spinner
   */
  ariaLabel?: string;
}

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  (
    { variant = "spinner", ariaLabel = "Loading", className = "", ...props },
    ref
  ) => {
    const variantClassMap = {
      spinner: "spinner",
      loader: "loader",
      "loader-animate": "loader animate",
    };

    return (
      <span
        ref={ref}
        className={`${variantClassMap[variant]} ${className}`.trim()}
        aria-label={ariaLabel}
        {...props}
      />
    );
  }
);

Spinner.displayName = "Spinner";
