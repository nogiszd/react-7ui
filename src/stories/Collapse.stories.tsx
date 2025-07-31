import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Collapse } from "../components/Collapse";

const meta = {
  title: "Components/Collapse",
  component: Collapse,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Collapse>;

export default meta;
type Story = StoryObj<typeof Collapse>;

export const Default: Story = {
  args: {
    summary: "Click to expand",
    children: (
      <div style={{ padding: "8px" }}>
        <p>This is the collapsible content.</p>
        <p>You can put any content here.</p>
      </div>
    ),
  },
};

export const DefaultOpen: Story = {
  args: {
    summary: "Click to collapse",
    defaultOpen: true,
    children: (
      <div style={{ padding: "8px" }}>
        <p>This content is visible by default.</p>
      </div>
    ),
  },
};
