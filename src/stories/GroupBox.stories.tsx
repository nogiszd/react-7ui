import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { GroupBox } from "../components/GroupBox";
import { Checkbox } from "../components/Checkbox";

const meta = {
  title: "Components/GroupBox",
  component: GroupBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GroupBox>;

export default meta;
type Story = StoryObj<typeof GroupBox>;

export const Default: Story = {
  args: {
    title: "Settings",
    children: (
      <div style={{ padding: "8px" }}>
        <Checkbox label="Enable feature 1" />
        <Checkbox label="Enable feature 2" />
        <Checkbox label="Enable feature 3" />
      </div>
    ),
    style: { width: 300 },
  },
};

export const WithCustomContent: Story = {
  args: {
    title: "User Information",
    children: (
      <div style={{ padding: "8px" }}>
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
        <p>Role: Administrator</p>
      </div>
    ),
    style: { width: 300 },
  },
};
