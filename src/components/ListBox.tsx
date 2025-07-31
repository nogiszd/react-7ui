import React, { useState, useEffect } from "react";
import "7.css";

/**
 * Represents an item in the ListBox component.
 */
export interface ListBoxItem {
  /**
   * The text to display in the option.
   * This text will be shown in the list and used for selection.
   * @required
   */
  text: string;
  /**
   * Whether the option is disabled.
   * Disabled options cannot be selected and have a different visual style.
   * @default false
   */
  disabled?: boolean;
}

/**
 * ListBox component that implements a Windows 7-style selectable list.
 * Supports single and multiple selection modes with keyboard navigation.
 *
 * @component
 * @example
 * ```tsx
 * import { ListBox } from 'react-7ui';
 *
 * function MyComponent() {
 *   const items = [
 *     { text: "Option 1" },
 *     { text: "Option 2" },
 *     { text: "Option 3", disabled: true }
 *   ];
 *
 *   return (
 *     <ListBox
 *       items={items}
 *       multiple
 *       showHover
 *       showShadow
 *       onChange={(selected) => console.log('Selected:', selected)}
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * // Single selection with controlled value
 * ```tsx
 * function ControlledListBox() {
 *   const [selected, setSelected] = useState("Option 1");
 *
 *   return (
 *     <ListBox
 *       items={[
 *         { text: "Option 1" },
 *         { text: "Option 2" }
 *       ]}
 *       value={selected}
 *       onChange={(value) => setSelected(value as string)}
 *     />
 *   );
 * }
 * ```
 */
export interface ListBoxProps
  extends Omit<React.HTMLAttributes<HTMLUListElement>, "onChange"> {
  /**
   * Array of items for the list box
   */
  items: ListBoxItem[];
  /**
   * Whether to show hover effect
   */
  showHover?: boolean;
  /**
   * Whether to show shadow effect
   */
  showShadow?: boolean;
  /**
   * Whether to allow multiple selection
   */
  multiple?: boolean;
  /**
   * Currently selected item(s)
   */
  value?: string | string[];
  /**
   * Default selected item(s)
   */
  defaultValue?: string | string[];
  /**
   * Callback when selection changes
   */
  onChange?: (value: string | string[]) => void;
}

export const ListBox = React.forwardRef<HTMLUListElement, ListBoxProps>(
  (
    {
      items,
      showHover = true,
      showShadow = true,
      multiple = false,
      value: controlledValue,
      defaultValue,
      onChange,
      className = "",
      ...props
    },
    ref
  ) => {
    // Initialize selected values
    const [selectedValues, setSelectedValues] = useState<string[]>(() => {
      if (controlledValue !== undefined) {
        return Array.isArray(controlledValue)
          ? controlledValue
          : [controlledValue];
      }
      if (defaultValue !== undefined) {
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      }
      return [];
    });

    // Update internal state when controlled value changes
    useEffect(() => {
      if (controlledValue !== undefined) {
        setSelectedValues(
          Array.isArray(controlledValue) ? controlledValue : [controlledValue]
        );
      }
    }, [controlledValue]);

    const handleOptionClick = (text: string) => {
      let newValues: string[];

      if (multiple) {
        newValues = selectedValues.includes(text)
          ? selectedValues.filter((v) => v !== text)
          : [...selectedValues, text];
      } else {
        newValues = [text];
      }

      setSelectedValues(newValues);
      onChange?.(multiple ? newValues : newValues[0]);
    };

    const classNames = ["has-hover", showShadow && "has-shadow", className]
      .filter(Boolean)
      .join(" ");

    return (
      <ul
        ref={ref}
        role="listbox"
        className={classNames}
        aria-multiselectable={multiple}
        {...props}
      >
        {items.map((item, index) => (
          <li
            key={index}
            role="option"
            aria-selected={selectedValues.includes(item.text)}
            aria-disabled={item.disabled}
            onClick={() => !item.disabled && handleOptionClick(item.text)}
            className={item.disabled ? "disabled" : undefined}
          >
            {item.text}
          </li>
        ))}
      </ul>
    );
  }
);

ListBox.displayName = "ListBox";
