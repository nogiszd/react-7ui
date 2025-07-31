import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "../components/Dropdown";

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof Dropdown>;

const sampleOptions = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3", disabled: true },
  { value: "4", label: "Option 4" },
];

export const Default: Story = {
  args: {
    options: sampleOptions,
  },
};

export const WithLabel: Story = {
  args: {
    label: "Select an option",
    options: sampleOptions,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled dropdown",
    options: sampleOptions,
    disabled: true,
  },
};
