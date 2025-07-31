import React from "react";
import "7.css";

/**
 * Represents an option in the Dropdown component.
 */
export interface DropdownOption {
  /**
   * The value to be used when the option is selected.
   * This is the value that will be passed to onChange handlers.
   * @required
   */
  value: string;
  /**
   * The text to display for this option.
   * @required
   */
  label: string;
  /**
   * Whether this option is disabled.
   * Disabled options cannot be selected.
   * @default false
   */
  disabled?: boolean;
}

/**
 * Dropdown component that implements a Windows 7-style select input.
 * Provides a native select element with Windows 7 styling and optional label.
 *
 * @component
 * @example
 * ```tsx
 * import { Dropdown } from 'react-7ui';
 *
 * function MyComponent() {
 *   const options = [
 *     { value: "1", label: "Option 1" },
 *     { value: "2", label: "Option 2" },
 *     { value: "3", label: "Option 3", disabled: true }
 *   ];
 *
 *   return (
 *     <Dropdown
 *       label="Select an option"
 *       options={options}
 *       onChange={(e) => console.log('Selected:', e.target.value)}
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * // With default value and required field
 * ```tsx
 * <Dropdown
 *   label="Country"
 *   options={[
 *     { value: "us", label: "United States" },
 *     { value: "uk", label: "United Kingdom" }
 *   ]}
 *   defaultValue="us"
 *   required
 * />
 * ```
 */
export interface DropdownProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  /**
   * Array of options for the dropdown
   */
  options: DropdownOption[];
  /**
   * Label for the dropdown
   */
  label?: string;
}

export const Dropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(
  ({ options, label, id, ...props }, ref) => {
    const selectId =
      id || `dropdown-${label?.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <div>
        {label && <label htmlFor={selectId}>{label}</label>}
        <select ref={ref} id={selectId} {...props}>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";
