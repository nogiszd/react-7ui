import React from "react";
import "7.css";

/**
 * TextBox component that implements a Windows 7-style text input field.
 * Provides a styled input with optional label in the classic Windows 7 appearance.
 *
 * @component
 * @example
 * ```tsx
 * import { TextBox } from 'react-7ui';
 *
 * function MyComponent() {
 *   return (
 *     <TextBox
 *       label="Username"
 *       placeholder="Enter your username"
 *       onChange={(e) => console.log('Value:', e.target.value)}
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * With validation and disabled state
 * ```tsx
 * <TextBox
 *   label="Email"
 *   type="email"
 *   required
 *   disabled={isSubmitting}
 *   pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
 * />
 * ```
 */
export interface TextBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Optional label text for the text box.
   * When provided, creates a properly associated label element.
   */
  label?: string;
}

export const TextBox = React.forwardRef<HTMLInputElement, TextBoxProps>(
  ({ label, id, ...props }, ref) => {
    const inputId =
      id || `textbox-${label?.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <div className="group">
        {label && <label htmlFor={inputId}>{label}</label>}
        <input type="text" id={inputId} ref={ref} {...props} />
      </div>
    );
  }
);

TextBox.displayName = "TextBox";
