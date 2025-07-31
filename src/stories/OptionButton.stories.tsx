import type { Meta, StoryObj } from "@storybook/react";
import { OptionButton } from "../components/OptionButton";

const meta = {
  title: "Components/OptionButton",
  component: OptionButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof OptionButton>;

export default meta;
type Story = StoryObj<typeof OptionButton>;

export const Default: Story = {
  args: {
    label: "Option 1",
    name: "group1",
  },
};

export const Checked: Story = {
  args: {
    label: "Option 2",
    name: "group1",
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled option",
    name: "group1",
    disabled: true,
  },
};
