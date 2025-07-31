import React from "react";
import "7.css";

/**
 * Checkbox component that follows Windows 7 UI style guidelines.
 * Renders a checkbox with an associated label in the classic Windows 7 style.
 *
 * @component
 * @example
 * ```tsx
 * import { Checkbox } from 'react-7ui';
 *
 * function MyComponent() {
 *   return (
 *     <Checkbox
 *       label="Enable notifications"
 *       checked={isChecked}
 *       onChange={(e) => setIsChecked(e.target.checked)}
 *     />
 *   );
 * }
 * ```
 */
export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * The label text displayed next to the checkbox.
   * In Windows 7 style, the label appears to the right of the checkbox.
   * @required
   */
  label: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, ...props }, ref) => {
    const checkboxId =
      id || `checkbox-${label.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <div>
        <input type="checkbox" id={checkboxId} ref={ref} {...props} />
        <label htmlFor={checkboxId}>{label}</label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
