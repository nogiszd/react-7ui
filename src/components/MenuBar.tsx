import React, { useState, useCallback } from "react";
import "7.css";

export interface MenuBarShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
}

export interface MenuBarItem {
  label: string;
  href?: string;
  onClick?: () => void;
  shortcut?: MenuBarShortcut;
  hasDivider?: boolean;
  items?: MenuBarItem[];
}

export interface MenuBarProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * Array of menu items
   */
  items: MenuBarItem[];
  /**
   * Whether to show hover effects
   */
  canHover?: boolean;
}

interface MenuItemProps {
  item: MenuBarItem;
  isSubmenu?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, isSubmenu = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubmenu = item.items && item.items.length > 0;

  const handleMouseEnter = useCallback(() => {
    if (hasSubmenu) {
      setIsOpen(true);
    }
  }, [hasSubmenu]);

  const handleMouseLeave = useCallback(() => {
    if (hasSubmenu) {
      setIsOpen(false);
    }
  }, [hasSubmenu]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (hasSubmenu) {
        if (e.key === "Enter" || e.key === "ArrowRight") {
          setIsOpen(true);
        } else if (e.key === "Escape" || e.key === "ArrowLeft") {
          setIsOpen(false);
        }
      }
    },
    [hasSubmenu]
  );

  const renderContent = () => {
    if (item.onClick && !item.href) {
      return <button onClick={item.onClick}>{item.label}</button>;
    }

    if (item.href) {
      return (
        <a
          href={item.href}
          onClick={(e) => {
            e.preventDefault();
            item.onClick?.();
          }}
        >
          {item.label}
          {item.shortcut && (
            <span>
              {[
                item.shortcut.ctrl && "Ctrl",
                item.shortcut.shift && "Shift",
                item.shortcut.alt && "Alt",
                item.shortcut.key,
              ]
                .filter(Boolean)
                .join("+")}
            </span>
          )}
        </a>
      );
    }

    return item.label;
  };

  return (
    <li
      role="menuitem"
      tabIndex={0}
      aria-haspopup={hasSubmenu}
      className={item.hasDivider ? "has-divider" : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      {renderContent()}
      {hasSubmenu && isOpen && item.items && (
        <ul role="menu">
          {item.items.map((subItem, index) => (
            <MenuItem key={index} item={subItem} isSubmenu={true} />
          ))}
        </ul>
      )}
    </li>
  );
};

export const MenuBar = React.forwardRef<HTMLUListElement, MenuBarProps>(
  ({ items, canHover = false, className = "", ...props }, ref) => {
    return (
      <ul
        ref={ref}
        role="menubar"
        className={`${canHover ? "can-hover" : ""} ${className}`.trim()}
        {...props}
      >
        {items.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </ul>
    );
  }
);

MenuBar.displayName = "MenuBar";
