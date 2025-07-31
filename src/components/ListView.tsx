import React, { useState, useCallback, useMemo } from "react";
import "7.css";

/**
 * Column configuration for ListView component.
 * Defines how each column should be rendered and behave.
 */
export interface ListViewColumn<T> {
  /**
   * Key from the data object to use for this column
   * @required
   */
  key: keyof T;
  /**
   * Column header text
   * @required
   */
  header: string;
  /**
   * Column width (number for pixels, string for other units)
   */
  width?: number | string;
  /**
   * Text alignment within the column
   * @default "left"
   */
  align?: "left" | "right" | "center";
  /**
   * Whether the column can be sorted
   * @default false
   */
  sortable?: boolean;
  /**
   * Whether to highlight the column header
   * @default false
   */
  highlighted?: boolean;
  /**
   * Custom render function for cell content
   * @param value The value from the data object
   * @param item The entire data object
   */
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

/**
 * ListView component that implements a Windows 7-style data grid/table.
 * Supports sorting, selection, and custom column rendering.
 *
 * @component
 * @example
 * ```tsx
 * import { ListView } from 'react-7ui';
 *
 * function MyComponent() {
 *   const data = [
 *     { id: 1, name: "John", age: 30 },
 *     { id: 2, name: "Jane", age: 25 }
 *   ];
 *
 *   const columns = [
 *     { key: "name", header: "Name", sortable: true },
 *     { key: "age", header: "Age", align: "right" }
 *   ];
 *
 *   return (
 *     <ListView
 *       data={data}
 *       columns={columns}
 *       multiSelect
 *       onSelectionChange={(keys) => console.log('Selected:', keys)}
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * // With custom column rendering
 * ```tsx
 * const columns = [
 *   {
 *     key: "status",
 *     header: "Status",
 *     render: (value) => (
 *       <span className={`status-${value}`}>{value}</span>
 *     )
 *   }
 * ];
 * ```
 */
export interface ListViewProps<T extends Record<string, any>>
  extends Omit<React.TableHTMLAttributes<HTMLTableElement>, "onChange"> {
  /**
   * Array of data items
   */
  data: T[];
  /**
   * Column definitions
   */
  columns: ListViewColumn<T>[];
  /**
   * Selected row keys
   */
  selectedKeys?: (string | number)[];
  /**
   * Default selected row keys
   */
  defaultSelectedKeys?: (string | number)[];
  /**
   * Whether to allow multiple selection
   */
  multiSelect?: boolean;
  /**
   * Callback when selection changes
   */
  onSelectionChange?: (selectedKeys: (string | number)[]) => void;
  /**
   * Key to use for row identification
   */
  rowKey?: keyof T;
  /**
   * Default sort column
   */
  defaultSortKey?: keyof T;
  /**
   * Default sort direction
   */
  defaultSortDirection?: "asc" | "desc";
  /**
   * Callback when sort changes
   */
  onSortChange?: (key: keyof T, direction: "asc" | "desc") => void;
}

export function ListView<T extends Record<string, any>>({
  data,
  columns,
  selectedKeys: controlledSelectedKeys,
  defaultSelectedKeys = [],
  multiSelect = false,
  onSelectionChange,
  rowKey = "id" as keyof T,
  defaultSortKey,
  defaultSortDirection = "asc",
  onSortChange,
  className = "",
  ...props
}: ListViewProps<T>) {
  // Selection state
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>(
    controlledSelectedKeys ?? defaultSelectedKeys
  );

  // Sorting state
  const [sortKey, setSortKey] = useState<keyof T | undefined>(defaultSortKey);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    defaultSortDirection
  );

  // Update selection when controlled value changes
  React.useEffect(() => {
    if (controlledSelectedKeys !== undefined) {
      setSelectedKeys(controlledSelectedKeys);
    }
  }, [controlledSelectedKeys]);

  // Handle row selection
  const handleRowClick = useCallback(
    (item: T, event: React.MouseEvent) => {
      const key = item[rowKey] as string | number;
      let newSelectedKeys: (string | number)[];

      if (multiSelect && event.ctrlKey) {
        newSelectedKeys = selectedKeys.includes(key)
          ? selectedKeys.filter((k) => k !== key)
          : [...selectedKeys, key];
      } else if (multiSelect && event.shiftKey && selectedKeys.length > 0) {
        const dataKeys = data.map((item) => item[rowKey]) as (
          | string
          | number
        )[];
        const lastSelectedIndex = dataKeys.indexOf(
          selectedKeys[selectedKeys.length - 1]
        );
        const currentIndex = dataKeys.indexOf(key);
        const start = Math.min(lastSelectedIndex, currentIndex);
        const end = Math.max(lastSelectedIndex, currentIndex);
        newSelectedKeys = [
          ...new Set([...selectedKeys, ...dataKeys.slice(start, end + 1)]),
        ];
      } else {
        newSelectedKeys = [key];
      }

      setSelectedKeys(newSelectedKeys);
      onSelectionChange?.(newSelectedKeys);
    },
    [data, multiSelect, onSelectionChange, rowKey, selectedKeys]
  );

  // Handle column sort
  const handleSort = useCallback(
    (column: ListViewColumn<T>) => {
      if (!column.sortable) return;

      const key = column.key;
      const newDirection =
        key === sortKey && sortDirection === "asc" ? "desc" : "asc";

      setSortKey(key);
      setSortDirection(newDirection);
      onSortChange?.(key, newDirection);
    },
    [sortKey, sortDirection, onSortChange]
  );

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortKey) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [data, sortKey, sortDirection]);

  return (
    <table className={`has-shadow ${className}`.trim()} {...props}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={String(column.key)}
              style={{
                width: column.width,
                textAlign: column.align,
                cursor: column.sortable ? "pointer" : undefined,
              }}
              className={[
                // Original highlighted columns from props
                column.highlighted && "highlighted",
                // Highlight the currently sorted column
                sortKey === column.key && "highlighted",
                // Add indicator and direction for sortable columns
                column.sortable && sortKey === column.key && "indicator",
                column.sortable &&
                  sortKey === column.key &&
                  (sortDirection === "asc" ? "up" : "down"),
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => handleSort(column)}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item) => {
          const key = item[rowKey] as string | number;
          return (
            <tr
              key={key}
              onClick={(e) => handleRowClick(item, e)}
              className={selectedKeys.includes(key) ? "selected" : undefined}
              style={{ cursor: "pointer" }}
            >
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  style={{ textAlign: column.align }}
                >
                  {column.render
                    ? column.render(item[column.key], item)
                    : String(item[column.key] ?? "")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

ListView.displayName = "ListView";
