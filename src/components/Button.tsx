import React from "react";
import "7.css";

/**
 * Button component that follows Windows 7 UI style guidelines.
 * Extends the native HTML button with Windows 7-specific styling.
 *
 * @component
 * @example
 * ```tsx
 * import { Button } from 'react-7ui';
 *
 * function MyComponent() {
 *   return (
 *     <Button isDefault onClick={() => alert('Clicked!')}>
 *       Click Me
 *     </Button>
 *   );
 * }
 * ```
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Makes the button a default button (blue border and light blue gradient).
   * In Windows 7, the default button is highlighted to indicate the primary action in a dialog or form.
   * @default false
   */
  isDefault?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isDefault, className = "", children, ...props }, ref) => {
    const combinedClassName = `${
      isDefault ? "default" : ""
    } ${className}`.trim();

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
