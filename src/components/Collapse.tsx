import React from "react";
import "7.css";

export interface CollapseProps
  extends React.HTMLAttributes<HTMLDetailsElement> {
  /**
   * The summary/title of the collapse section
   */
  summary: React.ReactNode;
  /**
   * Whether the collapse is open by default
   */
  defaultOpen?: boolean;
}

export const Collapse = React.forwardRef<HTMLDetailsElement, CollapseProps>(
  ({ summary, defaultOpen, children, ...props }, ref) => {
    return (
      <details ref={ref} open={defaultOpen} {...props}>
        <summary>{summary}</summary>
        {children}
      </details>
    );
  }
);

Collapse.displayName = "Collapse";
