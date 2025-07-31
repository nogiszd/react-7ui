import type { Meta, StoryObj } from "@storybook/react";
import { TextBox } from "../components/TextBox";

const meta = {
  title: "Components/TextBox",
  component: TextBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextBox>;

export default meta;
type Story = StoryObj<typeof TextBox>;

export const Basic: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    value: "Cannot edit this",
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: "Read Only",
    value: "Cannot edit this",
    readOnly: true,
  },
};
