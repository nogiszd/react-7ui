import React, { useState } from "react";
import "7.css";

/**
 * Represents a single tab item in the Tabs component.
 */
export interface Tab {
  /**
   * Unique ID for the tab.
   * Used for ARIA attributes and tab panel association.
   * @required
   */
  id: string;
  /**
   * Label text for the tab button.
   * Displayed in the tab header.
   * @required
   */
  label: string;
  /**
   * Content to display in the tab panel.
   * Can be any valid React node.
   * @required
   */
  content: React.ReactNode;
  /**
   * Whether the tab is disabled.
   * Disabled tabs cannot be selected.
   * @default false
   */
  disabled?: boolean;
}

/**
 * Tabs component that implements Windows 7-style tabbed interface.
 * Provides an accessible way to organize content into separate views.
 *
 * @component
 * @example
 * ```tsx
 * import { Tabs } from 'react-7ui';
 *
 * function MyComponent() {
 *   const tabs = [
 *     {
 *       id: "general",
 *       label: "General",
 *       content: <div>General settings content</div>
 *     },
 *     {
 *       id: "advanced",
 *       label: "Advanced",
 *       content: <div>Advanced settings content</div>
 *     }
 *   ];
 *
 *   return (
 *     <Tabs
 *       tabs={tabs}
 *       ariaLabel="Settings tabs"
 *       onChange={(tabId) => console.log(`Switched to tab: ${tabId}`)}
 *     />
 *   );
 * }
 * ```
 */
export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /**
   * Array of tab items
   */
  tabs: Tab[];
  /**
   * Currently active tab ID
   */
  activeTab?: string;
  /**
   * Label for the tablist (for screen readers)
   */
  ariaLabel?: string;
  /**
   * Callback when active tab changes
   */
  onChange?: (tabId: string) => void;
}

export const Tabs = React.forwardRef<HTMLElement, TabsProps>(
  (
    {
      tabs,
      activeTab: controlledActiveTab,
      ariaLabel = "Tabs",
      onChange,
      className = "",
      ...props
    },
    ref
  ) => {
    const [internalActiveTab, setInternalActiveTab] = useState(
      tabs.find((tab) => !tab.disabled)?.id ?? tabs[0]?.id
    );

    const activeTabId = controlledActiveTab ?? internalActiveTab;

    const handleTabClick = (tab: Tab) => {
      if (tab.disabled) return;

      if (!controlledActiveTab) {
        setInternalActiveTab(tab.id);
      }
      onChange?.(tab.id);
    };

    return (
      <section ref={ref} className={`tabs ${className}`.trim()} {...props}>
        <menu role="tablist" aria-label={ariaLabel}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-controls={tab.id}
              aria-selected={tab.id === activeTabId}
              disabled={tab.disabled}
              onClick={() => handleTabClick(tab)}
            >
              {tab.label}
            </button>
          ))}
        </menu>
        {tabs.map((tab) => (
          <article
            key={tab.id}
            role="tabpanel"
            id={tab.id}
            hidden={tab.id !== activeTabId}
          >
            {tab.content}
          </article>
        ))}
      </section>
    );
  }
);

Tabs.displayName = "Tabs";
