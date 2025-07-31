import type { Meta, StoryObj } from "@storybook/react";
import { Balloon } from "../components/Balloon";

const meta = {
  title: "Components/Balloon",
  component: Balloon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Balloon>;

export default meta;
type Story = StoryObj<typeof Balloon>;

export const Default: Story = {
  args: {
    children: "This is a tooltip message",
  },
};

export const TopLeft: Story = {
  args: {
    children: "Tooltip at top-left position",
    position: "top-left",
  },
};

export const TopRight: Story = {
  args: {
    children: "Tooltip at top-right position",
    position: "top-right",
  },
};

export const BottomLeft: Story = {
  args: {
    children: "Tooltip at bottom-left position",
    position: "bottom-left",
  },
};
