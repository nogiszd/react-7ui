import React from "react";
import "7.css";

/**
 * Represents a node in the tree structure.
 * Can contain children nodes to create a hierarchical structure.
 */
export interface TreeNode {
  /**
   * Text label for the tree node
   * @required
   */
  label: string;
  /**
   * Optional array of child nodes
   */
  children?: TreeNode[];
  /**
   * Whether the node should be expanded by default
   * @default false
   */
  defaultExpanded?: boolean;
}

/**
 * TreeView component that implements a Windows 7-style hierarchical tree view.
 * Perfect for displaying file systems, organizational structures, or any hierarchical data.
 *
 * @component
 * @example
 * ```tsx
 * import { TreeView } from 'react-7ui';
 *
 * function MyComponent() {
 *   const treeData = [
 *     {
 *       label: "Documents",
 *       defaultExpanded: true,
 *       children: [
 *         { label: "Work" },
 *         {
 *           label: "Personal",
 *           children: [
 *             { label: "Photos" },
 *             { label: "Music" }
 *           ]
 *         }
 *       ]
 *     }
 *   ];
 *
 *   return (
 *     <TreeView
 *       items={treeData}
 *       showConnectors
 *       showCollapseButton
 *       hasContainer
 *     />
 *   );
 * }
 * ```
 */
export interface TreeViewProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * Tree data structure
   */
  items: TreeNode[];
  /**
   * Whether to show connectors between nodes
   */
  showConnectors?: boolean;
  /**
   * Whether to show collapse buttons
   */
  showCollapseButton?: boolean;
  /**
   * Whether to show container style
   */
  hasContainer?: boolean;
}

interface TreeNodeProps extends TreeNode {
  showConnectors?: boolean;
  showCollapseButton?: boolean;
}

const TreeNodeComponent: React.FC<TreeNodeProps> = ({
  label,
  children,
  defaultExpanded,
  showConnectors,
  showCollapseButton,
}) => {
  const hasChildren = children && children.length > 0;

  if (!hasChildren) {
    return <li>{label}</li>;
  }

  return (
    <li>
      <details open={defaultExpanded}>
        <summary>{label}</summary>
        <ul>
          {children.map((child, index) => (
            <TreeNodeComponent
              key={index}
              {...child}
              showConnectors={showConnectors}
              showCollapseButton={showCollapseButton}
            />
          ))}
        </ul>
      </details>
    </li>
  );
};

export const TreeView = React.forwardRef<HTMLUListElement, TreeViewProps>(
  (
    {
      items,
      showConnectors = false,
      showCollapseButton = false,
      hasContainer = true,
      className = "",
      ...props
    },
    ref
  ) => {
    const classNames = [
      "tree-view",
      hasContainer && "has-container",
      showConnectors && "has-connector",
      showCollapseButton && "has-collapse-button",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <ul ref={ref} className={classNames} {...props}>
        {items.map((item, index) => (
          <TreeNodeComponent
            key={index}
            {...item}
            showConnectors={showConnectors}
            showCollapseButton={showCollapseButton}
          />
        ))}
      </ul>
    );
  }
);

TreeView.displayName = "TreeView";
