import React from "react";
import "7.css";

/**
 * GroupBox component that implements a Windows 7-style fieldset container.
 * Used to group related form controls or content with a titled border.
 *
 * @component
 * @example
 * ```tsx
 * import { GroupBox } from 'react-7ui';
 *
 * function MyComponent() {
 *   return (
 *     <GroupBox title="Personal Information">
 *       <TextBox label="Name" />
 *       <TextBox label="Email" type="email" />
 *       <OptionButton name="gender" label="Male" />
 *       <OptionButton name="gender" label="Female" />
 *     </GroupBox>
 *   );
 * }
 * ```
 *
 * @example
 * // With disabled state
 * ```tsx
 * <GroupBox
 *   title="Advanced Settings"
 *   disabled
 * >
 *   <Checkbox label="Enable debugging" />
 *   <Checkbox label="Show developer tools" />
 * </GroupBox>
 * ```
 */
export interface GroupBoxProps
  extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /**
   * The title/legend of the group box
   */
  title: string;
}

export const GroupBox = React.forwardRef<HTMLFieldSetElement, GroupBoxProps>(
  ({ title, children, ...props }, ref) => {
    return (
      <fieldset ref={ref} {...props}>
        <legend>{title}</legend>
        {children}
      </fieldset>
    );
  }
);

GroupBox.displayName = "GroupBox";
