import React from "react";
import "7.css";

/**
 * Window component that recreates the classic Windows 7 window appearance and behavior.
 * Supports various window styles including standard windows, dialog boxes, and glass effects.
 *
 * @component
 * @example
 * ```tsx
 * import { Window } from 'react-7ui';
 *
 * function MyComponent() {
 *   return (
 *     <Window
 *       title="My Application"
 *       glass={true}
 *       showMinimize
 *       showMaximize
 *       showClose
 *       onClose={() => console.log('Close clicked')}
 *     >
 *       <p>Window content goes here</p>
 *     </Window>
 *   );
 * }
 * ```
 *
 * @example
 * Dialog box example
 * ```tsx
 * <Window
 *   title="Settings"
 *   isDialog
 *   isBright
 *   dialogId="settings-dialog"
 *   dialogTitleId="settings-title"
 *   showClose
 * >
 *   <p>Dialog content</p>
 * </Window>
 * ```
 */
export interface WindowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /**
   * Title text for the window
   */
  title?: React.ReactNode;
  /**
   * Whether to show glass effect
   */
  glass?: boolean;
  /**
   * Whether the window is active (focused)
   */
  active?: boolean;
  /**
   * Whether to show minimize button
   */
  showMinimize?: boolean;
  /**
   * Whether to show maximize button
   */
  showMaximize?: boolean;
  /**
   * Whether to show close button
   */
  showClose?: boolean;
  /**
   * Whether to show help button
   */
  showHelp?: boolean;
  /**
   * Array of status bar fields
   */
  statusBarFields?: React.ReactNode[];
  /**
   * Whether to add space around window body content
   */
  hasSpace?: boolean;
  /**
   * Background color for the window (overrides --w7-w-bg CSS variable)
   */
  backgroundColor?: string;
  /**
   * Background attachment for glass effect ('fixed', 'local', or 'scroll')
   */
  backgroundAttachment?: "fixed" | "local" | "scroll";
  /**
   * Whether this is a dialog box
   */
  isDialog?: boolean;
  /**
   * Whether to make the dialog box bright
   */
  isBright?: boolean;
  /**
   * Dialog box ID (required for dialog boxes)
   */
  dialogId?: string;
  /**
   * Dialog box title ID (required for dialog boxes)
   */
  dialogTitleId?: string;
  /**
   * Callback when minimize button is clicked
   */
  onMinimize?: () => void;
  /**
   * Callback when maximize button is clicked
   */
  onMaximize?: () => void;
  /**
   * Callback when close button is clicked
   */
  onClose?: () => void;
  /**
   * Callback when help button is clicked
   */
  onHelp?: () => void;
}

export const Window = React.forwardRef<HTMLDivElement, WindowProps>(
  (
    {
      title,
      glass = false,
      active = true,
      backgroundColor,
      showMinimize = false,
      showMaximize = false,
      showClose = true,
      showHelp = false,
      statusBarFields,
      hasSpace = true,
      backgroundAttachment = "fixed",
      isDialog = false,
      isBright = false,
      dialogId,
      dialogTitleId,
      onMinimize,
      onMaximize,
      onClose,
      onHelp,
      children,
      className = "",
      style,
      ...props
    },
    ref
  ) => {
    const windowClasses = [
      "window",
      glass && "glass",
      active && "active",
      isDialog && isBright && "is-bright",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const windowStyle = {
      ...style,
      ...(backgroundColor && { "--w7-w-bg": backgroundColor }),
    } as React.CSSProperties;

    const titleBarStyle = {
      backgroundAttachment,
    };

    const windowProps = {
      ...(isDialog && {
        role: "dialog",
        id: dialogId,
        "aria-labelledby": dialogTitleId,
      }),
    };

    return (
      <div
        ref={ref}
        className={windowClasses}
        style={windowStyle}
        {...windowProps}
        {...props}
      >
        <div className="title-bar" style={titleBarStyle}>
          <div className="title-bar-text" id={dialogTitleId}>
            {title}
          </div>
          {(showMinimize || showMaximize || showClose || showHelp) && (
            <div className="title-bar-controls">
              {showHelp && <button aria-label="Help" onClick={onHelp}></button>}
              {showMinimize && (
                <button aria-label="Minimize" onClick={onMinimize}></button>
              )}
              {showMaximize && (
                <button aria-label="Maximize" onClick={onMaximize}></button>
              )}
              {showClose && (
                <button aria-label="Close" onClick={onClose}></button>
              )}
            </div>
          )}
        </div>
        <div className={`window-body${hasSpace ? " has-space" : ""}`}>
          {children}
        </div>
        {statusBarFields && (
          <div className="status-bar">
            {statusBarFields.map((field, index) => (
              <p key={index} className="status-bar-field">
                {field}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Window.displayName = "Window";
