import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Standard: Story = {
  args: {
    children: "Click me",
  },
};

export const DefaultButton: Story = {
  args: {
    children: "I am the one!",
    isDefault: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "I cannot be clicked",
    disabled: true,
  },
};
