import React from "react";
import "7.css";

/**
 * OptionButton component that implements a Windows 7-style radio button.
 * Used for selecting a single option from a group of choices.
 *
 * @component
 * @example
 * ```tsx
 * import { OptionButton } from 'react-7ui';
 *
 * function MyComponent() {
 *   return (
 *     <>
 *       <OptionButton
 *         name="color"
 *         label="Red"
 *         value="red"
 *         checked={selectedColor === 'red'}
 *         onChange={(e) => setSelectedColor(e.target.value)}
 *       />
 *       <OptionButton
 *         name="color"
 *         label="Blue"
 *         value="blue"
 *         checked={selectedColor === 'blue'}
 *         onChange={(e) => setSelectedColor(e.target.value)}
 *       />
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * // With default selection
 * ```tsx
 * <OptionButton
 *   name="size"
 *   label="Medium"
 *   value="M"
 *   defaultChecked
 * />
 * ```
 */
export interface OptionButtonProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /**
   * Label for the option button
   */
  label: string;
  /**
   * Name of the radio group
   */
  name: string;
}

export const OptionButton = React.forwardRef<
  HTMLInputElement,
  OptionButtonProps
>(({ label, id, name, className = "", ...props }, ref) => {
  const inputId =
    id || `radio-${name}-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={className}>
      <input type="radio" id={inputId} name={name} ref={ref} {...props} />
      <label htmlFor={inputId}>{label}</label>
    </div>
  );
});

OptionButton.displayName = "OptionButton";
