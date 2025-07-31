import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { ComboBox } from "../components/ComboBox";

const meta = {
  title: "Components/ComboBox",
  component: ComboBox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ComboBox>;

export default meta;
type Story = StoryObj<typeof ComboBox>;

const sampleOptions = [
  { text: "Facebook" },
  { text: "Amazon" },
  { text: "Apple" },
  { text: "Netflix" },
  { text: "Google" },
];

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Select a company...",
    listboxId: "company",
    onChange: (value) => console.log("Selected:", value),
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Select a company...",
    listboxId: "company-with-value",
    defaultValue: "Google",
    onChange: (value) => console.log("Selected:", value),
  },
};

// Example of controlled component
const ControlledComboBox = () => {
  const [value, setValue] = useState("Apple");
  return (
    <ComboBox
      options={sampleOptions}
      value={value}
      onChange={setValue}
      listboxId="company-controlled"
      placeholder="Select a company..."
    />
  );
};

export const Controlled: Story = {
  render: () => <ControlledComboBox />,
};

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Select a company...",
    listboxId: "company-disabled",
    disabled: true,
  },
};
