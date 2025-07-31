import React from "react";
import "7.css";

/**
 * SearchBox component that implements a Windows 7-style search input field.
 * Provides both instant search and regular search modes with native styling.
 *
 * @component
 * @example
 * ```tsx
 * import { SearchBox } from 'react-7ui';
 *
 * function MyComponent() {
 *   return (
 *     <SearchBox
 *       placeholder="Search files..."
 *       type="regular"
 *       onChange={(e) => console.log('Search:', e.target.value)}
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * // Instant search mode
 * ```tsx
 * <SearchBox
 *   type="instant"
 *   placeholder="Filter items..."
 *   onChange={(e) => filterItems(e.target.value)}
 * />
 * ```
 */
export interface SearchBoxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /**
   * Placeholder for the search box
   */
  placeholder?: string;
  /**
   * Type of the search box
   */
  type?: "instant" | "regular";
}

export const SearchBox = React.forwardRef<HTMLInputElement, SearchBoxProps>(
  ({ placeholder, type = "regular", id, className = "", ...props }, ref) => {
    const inputId =
      id || `search-${placeholder?.toLowerCase().replace(/\s+/g, "-")}`;

    return type === "regular" ? (
      <div className="searchbox">
        <input
          type="search"
          placeholder={placeholder}
          id={inputId}
          ref={ref}
          {...props}
        />
        <button aria-label="search"></button>
      </div>
    ) : (
      <input
        type="search"
        placeholder={placeholder}
        id={inputId}
        ref={ref}
        {...props}
      />
    );
  }
);

SearchBox.displayName = "SearchBox";
