import type { Meta, StoryObj } from "@storybook/react";
import { SearchBox } from "../components/SearchBox";

const meta = {
  title: "Components/SearchBox",
  component: SearchBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SearchBox>;

export default meta;
type Story = StoryObj<typeof SearchBox>;

export const Default: Story = {
  args: {
    placeholder: "Search...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Search files",
    placeholder: "Enter search term",
  },
};

export const Disabled: Story = {
  args: {
    label: "Search",
    placeholder: "Search disabled",
    disabled: true,
  },
};
