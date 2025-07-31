import React from "react";
import "7.css";

/**
 * Types of menu items supported by the Menu component.
 * - link: Standard clickable menu item, optionally with href
 * - radio: Radio button menu item for exclusive selection
 * - checkbox: Checkbox menu item for multiple selections
 * - submenu: Nested menu that opens on hover/click
 */
export type MenuItemType = "link" | "radio" | "checkbox" | "submenu";

/**
 * Base interface for all menu item types.
 * Provides common properties shared across different menu item variants.
 */
export interface BaseMenuItem {
  type?: MenuItemType;
  label: string;
  disabled?: boolean;
  hasDivider?: boolean;
  icon?: string;
}

export interface LinkMenuItem extends BaseMenuItem {
  type?: "link";
  href?: string;
  onClick?: () => void;
}

export interface RadioMenuItem extends BaseMenuItem {
  type: "radio";
  name: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
}

export interface CheckboxMenuItem extends BaseMenuItem {
  type: "checkbox";
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export interface SubmenuMenuItem extends BaseMenuItem {
  type: "submenu";
  items: MenuItem[];
}

export type MenuItem =
  | LinkMenuItem
  | RadioMenuItem
  | CheckboxMenuItem
  | SubmenuMenuItem;

/**
 * Menu component that implements a Windows 7-style menu system.
 * Supports multiple types of menu items including links, radio buttons, checkboxes, and nested submenus.
 *
 * @component
 * @example
 * ```tsx
 * import { Menu } from 'react-7ui';
 *
 * function MyComponent() {
 *   const menuItems = [
 *     { label: "New", onClick: () => console.log("New clicked") },
 *     { label: "Open", onClick: () => console.log("Open clicked") },
 *     { type: "submenu", label: "Recent", items: [
 *       { label: "Document 1" },
 *       { label: "Document 2" }
 *     ]},
 *     { hasDivider: true },
 *     { type: "checkbox", label: "Auto Save", onChange: (checked) => console.log("Auto save:", checked) }
 *   ];
 *
 *   return (
 *     <Menu
 *       items={menuItems}
 *       canHover
 *       width={200}
 *     />
 *   );
 * }
 * ```
 */
export interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * Array of menu items
   */
  items: MenuItem[];
  /**
   * Whether to show hover effects
   */
  canHover?: boolean;
  /**
   * Width of the menu
   */
  width?: number | string;
}

const MenuItemComponent: React.FC<{
  item: MenuItem;
  tabIndex?: number;
  radioGroup?: { [key: string]: string };
  onRadioChange?: (name: string, value: string) => void;
}> = ({ item, tabIndex = 0, radioGroup = {}, onRadioChange }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = React.useState(false);

  const handleMouseEnter = () => {
    if (item.type === "submenu") {
      setIsSubmenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (item.type === "submenu") {
      setIsSubmenuOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (item.type === "submenu") {
      if (e.key === "Enter" || e.key === "ArrowRight") {
        setIsSubmenuOpen(true);
      } else if (e.key === "Escape" || e.key === "ArrowLeft") {
        setIsSubmenuOpen(false);
      }
    }
  };

  const renderContent = () => {
    switch (item.type) {
      case "radio":
        return (
          <>
            <input
              type="radio"
              name={item.name}
              id={`${item.name}-${item.value}`}
              checked={item.checked || radioGroup[item.name] === item.value}
              onChange={() => {
                item.onChange?.(item.value);
                onRadioChange?.(item.name, item.value);
              }}
            />
            <label htmlFor={`${item.name}-${item.value}`}>{item.label}</label>
          </>
        );

      case "checkbox":
        return (
          <>
            <input
              type="checkbox"
              id={`checkbox-${item.label}`}
              checked={item.checked}
              onChange={(e) => item.onChange?.(e.target.checked)}
            />
            <label htmlFor={`checkbox-${item.label}`}>{item.label}</label>
          </>
        );

      case "submenu":
        return (
          <>
            {item.label}
            {isSubmenuOpen && (
              <Menu
                items={item.items}
                style={{ position: "absolute", left: "100%", top: 0 }}
              />
            )}
          </>
        );

      default:
        return (
          <>
            {item.icon && <img src={item.icon} alt="" width={18} height={18} />}
            {item.href ? (
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  item.onClick?.();
                }}
              >
                {item.label}
              </a>
            ) : (
              item.label
            )}
          </>
        );
    }
  };

  return (
    <li
      role="menuitem"
      tabIndex={tabIndex}
      aria-haspopup={item.type === "submenu"}
      aria-disabled={item.disabled}
      className={item.hasDivider ? "has-divider" : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      {renderContent()}
    </li>
  );
};

export const Menu = React.forwardRef<HTMLUListElement, MenuProps>(
  ({ items, canHover, width, className = "", style, ...props }, ref) => {
    const [radioGroup, setRadioGroup] = React.useState<{
      [key: string]: string;
    }>({});

    const handleRadioChange = (name: string, value: string) => {
      setRadioGroup((prev) => ({ ...prev, [name]: value }));
    };

    const menuStyle = {
      ...style,
      width: width || style?.width,
    };

    return (
      <ul
        ref={ref}
        role="menu"
        className={`${canHover ? "can-hover" : ""} ${className}`.trim()}
        style={menuStyle}
        {...props}
      >
        {items.map((item, index) => (
          <MenuItemComponent
            key={index}
            item={item}
            radioGroup={radioGroup}
            onRadioChange={handleRadioChange}
          />
        ))}
      </ul>
    );
  }
);

Menu.displayName = "Menu";
