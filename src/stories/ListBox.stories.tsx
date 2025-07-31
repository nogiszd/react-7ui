import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { ListBox } from "../components/ListBox";

const meta = {
  title: "Components/ListBox",
  component: ListBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof ListBox>;

const sampleItems = [
  { text: "Facebook" },
  { text: "Amazon" },
  { text: "Apple" },
  { text: "Netflix" },
  { text: "Google" },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    onChange: (value) => console.log("Selected:", value),
  },
};

export const WithDefaultValue: Story = {
  args: {
    items: sampleItems,
    defaultValue: "Apple",
    onChange: (value) => console.log("Selected:", value),
  },
};

export const MultiSelect: Story = {
  args: {
    items: sampleItems,
    multiple: true,
    defaultValue: ["Apple", "Google"],
    onChange: (value) => console.log("Selected:", value),
  },
};

export const WithDisabledOption: Story = {
  args: {
    items: [
      ...sampleItems.slice(0, 2),
      { ...sampleItems[2], disabled: true },
      ...sampleItems.slice(3),
    ],
    onChange: (value) => console.log("Selected:", value),
  },
};

// Example of controlled component
const ControlledListBox = () => {
  const [value, setValue] = useState("Apple");
  return (
    <ListBox
      items={sampleItems}
      value={value}
      onChange={(newValue) => setValue(newValue as string)}
    />
  );
};

export const Controlled: Story = {
  render: () => <ControlledListBox />,
};

export const NoShadow: Story = {
  args: {
    items: sampleItems,
    showShadow: false,
    onChange: (value) => console.log("Selected:", value),
  },
};
