import React, { useState, useRef } from "react";
import "7.css";

/**
 * Option interface for ComboBox items
 */
export interface ComboBoxOption {
  /**
   * The text to display in the option.
   * This text will be shown in the dropdown list and used for filtering.
   * @required
   */
  text: string;
}

/**
 * ComboBox component that implements a Windows 7-style combination of text input and dropdown list.
 * Supports both free text input and selection from a predefined list of options.
 *
 * @component
 * @example
 * ```tsx
 * import { ComboBox } from 'react-7ui';
 *
 * function MyComponent() {
 *   const options = [
 *     { text: "Option 1" },
 *     { text: "Option 2" },
 *     { text: "Option 3" }
 *   ];
 *
 *   return (
 *     <ComboBox
 *       options={options}
 *       listboxId="my-combobox"
 *       onChange={(value) => console.log('Selected:', value)}
 *       placeholder="Select an option..."
 *     />
 *   );
 * }
 * ```
 *
 */
export interface ComboBoxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  /**
   * Array of options for the combobox
   */
  options: ComboBoxOption[];
  /**
   * ID for the listbox (required for ARIA)
   */
  listboxId: string;
  /**
   * Callback when selection changes
   */
  onChange?: (value: string) => void;
}

export const ComboBox = React.forwardRef<HTMLInputElement, ComboBoxProps>(
  (
    {
      options,
      listboxId,
      className = "",
      onChange,
      value: controlledValue,
      defaultValue = "",
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(
      controlledValue ?? defaultValue
    );
    const containerRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Update internal value when controlled value changes
    React.useEffect(() => {
      if (controlledValue !== undefined) {
        setInputValue(controlledValue);
      }
    }, [controlledValue]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onChange?.(newValue);
      setIsOpen(true);
    };

    const handleOptionClick = (text: string) => {
      setInputValue(text);
      onChange?.(text);
      setIsOpen(false);
    };

    const filteredOptions = options.filter((option) =>
      option.text.toLowerCase().includes(String(inputValue).toLowerCase())
    );

    return (
      <div ref={containerRef} className={`combobox ${className}`.trim()}>
        <input
          type="text"
          role="combobox"
          aria-owns={listboxId}
          aria-expanded={isOpen}
          aria-autocomplete="list"
          value={inputValue}
          onChange={handleInputChange}
          ref={ref}
          {...props}
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close options" : "Open options"}
        />
        {isOpen && filteredOptions.length > 0 && (
          <ul role="listbox" id={listboxId}>
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                role="option"
                aria-selected={option.text === inputValue}
                onClick={() => handleOptionClick(option.text)}
              >
                {option.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

ComboBox.displayName = "ComboBox";
