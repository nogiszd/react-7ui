import React from "react";
import "7.css";

/**
 * Slider component that implements a Windows 7-style range input.
 * Provides a customizable slider control with optional labels and visual indicators.
 *
 * @component
 * @example
 * ```tsx
 * import { Slider } from 'react-7ui';
 *
 * function MyComponent() {
 *   return (
 *     <Slider
 *       label="Volume"
 *       lowLabel="0%"
 *       highLabel="100%"
 *       min={0}
 *       max={100}
 *       defaultValue={50}
 *       onChange={(e) => console.log('Value:', e.target.value)}
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * // Vertical slider with box indicator
 * ```tsx
 * <Slider
 *   label="Brightness"
 *   vertical
 *   boxIndicator
 *   min={0}
 *   max={100}
 *   step={1}
 * />
 * ```
 */
export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /**
   * Main label for the slider
   */
  label?: string;
  /**
   * Label for the minimum value
   */
  lowLabel?: string;
  /**
   * Label for the maximum value
   */
  highLabel?: string;
  /**
   * Show box indicator
   */
  boxIndicator?: boolean;
  /**
   * Display slider vertically
   */
  vertical?: boolean;
  /**
   * Custom gap between elements (in rem)
   */
  gap?: number;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      label,
      lowLabel,
      highLabel,
      id,

      boxIndicator = false,
      vertical = false,
      gap = 0.5,
      className = "",
      style,
      ...props
    },
    ref
  ) => {
    const inputId = id || `slider-${label?.toLowerCase().replace(/\s+/g, "-")}`;
    const containerStyle = {
      ...style,
      display: "flex",
      alignItems: "center",
      gap: `${gap}rem`,
      ...(vertical ? { flexDirection: "column" as const } : {}),
    };

    const classNames = [
      boxIndicator && "has-box-indicator",
      vertical && "is-vertical",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div style={containerStyle}>
        {label && <label htmlFor={inputId}>{label}</label>}
        {lowLabel && <label>{lowLabel}</label>}
        <input
          type="range"
          id={inputId}
          ref={ref}
          className={classNames}
          {...props}
        />
        {highLabel && <label>{highLabel}</label>}
      </div>
    );
  }
);

Slider.displayName = "Slider";
