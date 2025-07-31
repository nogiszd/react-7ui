import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Window } from "../components/Window";

const meta = {
  title: "Components/Window",
  component: Window,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Window>;

export default meta;
type Story = StoryObj<typeof Window>;

export const Basic: Story = {
  args: {
    title: "My First Program",
    children: "Hello, world!",
    style: { maxWidth: "300px" },
  },
};

export const WithControls: Story = {
  args: {
    title: "Window With Controls",
    showMinimize: true,
    showMaximize: true,
    showClose: true,
    showHelp: true,
    children: (
      <>
        <p>This window has all control buttons:</p>
        <ul>
          <li>Help</li>
          <li>Minimize</li>
          <li>Maximize</li>
          <li>Close</li>
        </ul>
      </>
    ),
    style: { maxWidth: "300px" },
  },
};

export const WithStatusBar: Story = {
  args: {
    title: "A Window With A Status Bar",
    children: (
      <>
        <p>There are just so many possibilities:</p>
        <ul>
          <li>A Task Manager</li>
          <li>A Notepad</li>
          <li>Or even a File Explorer!</li>
        </ul>
      </>
    ),
    statusBarFields: ["Press F1 for help", "Slide 1", "CPU Usage: 14%"],
    style: { maxWidth: "320px" },
  },
};

// Example with glass effect and background
const GlassWindow = () => {
  const backgroundStyle: React.CSSProperties = {
    background: "url(https://picsum.photos/800/600) center/cover",
    padding: "2rem",
  };

  return (
    <div style={backgroundStyle}>
      <Window
        title="A glass window frame"
        glass
        active
        style={{ maxWidth: "100%" }}
      >
        <p>The background behind is blurred.</p>
      </Window>
    </div>
  );
};

export const Glass: Story = {
  render: () => <GlassWindow />,
};

export const CustomColor: Story = {
  args: {
    title: "A violet window frame",
    children: <p>You can change the window color just as simple.</p>,
    backgroundColor: "#805ba5",
    style: { maxWidth: "100%" },
  },
};

export const GlassWithColor: Story = {
  render: () => {
    const backgroundStyle: React.CSSProperties = {
      background: "url(https://picsum.photos/800/600) center/cover",
      padding: "2rem",
    };

    return (
      <div style={backgroundStyle}>
        <Window
          title="A glass violet window frame"
          glass
          active
          backgroundColor="#805ba5"
          style={{ maxWidth: "100%" }}
        >
          <p>And even the glass window frame as well.</p>
        </Window>
      </div>
    );
  },
};

export const GlassWithLocalBackground: Story = {
  render: () => {
    const backgroundStyle: React.CSSProperties = {
      background: "url(https://picsum.photos/800/600) center/cover",
      padding: "2rem",
      height: "200px",
      overflow: "auto",
    };

    return (
      <div style={backgroundStyle}>
        <Window
          title="A glass window frame with local background-attachment"
          glass
          active
          backgroundAttachment="local"
          style={{ maxWidth: "100%" }}
        >
          <p>
            The aero effect is now staying in place with the scroll position.
          </p>
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i}>Scroll content {i + 1}</p>
          ))}
        </Window>
      </div>
    );
  },
};

// Example of a dialog box
const DialogExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Dialog</button>

      {isOpen && (
        <Window
          isDialog
          isBright
          dialogId="dialog-demo"
          dialogTitleId="dialog-title"
          title="Problem Diagnostics"
          showClose
          onClose={() => setIsOpen(false)}
          active
        >
          <h2 className="instruction instruction-primary">
            Identifying your problem...
          </h2>
          <div role="progressbar" className="marquee"></div>
          <footer style={{ textAlign: "right", marginTop: "1rem" }}>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </footer>
        </Window>
      )}
    </>
  );
};

export const Dialog: Story = {
  render: () => <DialogExample />,
};
