import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "../components/ProgressBar";

const meta = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    value: 50,
    style: { width: 200 },
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    style: { width: 200 },
  },
};

export const Marquee: Story = {
  args: {
    marquee: true,
    style: { width: 200 },
  },
};
