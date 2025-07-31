import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Slider } from "../components/Slider";

const meta = {
  title: "Components/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof Slider>;

export const Basic: Story = {
  args: {
    min: 0,
    max: 100,
    value: 50,
  },
};

export const WithLabels: Story = {
  args: {
    label: "Volume:",
    lowLabel: "Low",
    highLabel: "High",
    min: 1,
    max: 11,
    value: 5,
    style: { maxWidth: "300px" },
  },
};

export const WithBoxIndicator: Story = {
  args: {
    label: "Volume",
    min: 0,
    max: 100,
    value: 50,
    boxIndicator: true,
  },
};

export const Vertical: Story = {
  args: {
    label: "Volume",
    lowLabel: "Low",
    highLabel: "High",
    min: 1,
    max: 11,
    value: 5,
    vertical: true,
    style: { height: "300px" },
  },
};

export const VerticalWithBoxIndicator: Story = {
  args: {
    label: "Volume",
    lowLabel: "Low",
    highLabel: "High",
    min: 1,
    max: 11,
    value: 5,
    vertical: true,
    boxIndicator: true,
    style: { height: "300px" },
  },
};

// Example of a controlled slider
const ControlledSlider = () => {
  const [value, setValue] = React.useState(5);

  return (
    <Slider
      label="Volume:"
      lowLabel="Low"
      highLabel="High"
      min={1}
      max={11}
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      boxIndicator
      style={{ maxWidth: "300px" }}
    />
  );
};

export const Controlled: Story = {
  render: () => <ControlledSlider />,
};
