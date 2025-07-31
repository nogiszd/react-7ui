import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../components/Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  args: {
    label: "Enable feature",
  },
};

export const Checked: Story = {
  args: {
    label: "Enable feature",
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled option",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled checked option",
    disabled: true,
    defaultChecked: true,
  },
};
