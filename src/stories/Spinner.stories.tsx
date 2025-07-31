import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "../components/Spinner";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    variant: "spinner",
    ariaLabel: "Spinning",
  },
};

export const Loader: Story = {
  args: {
    variant: "loader",
    ariaLabel: "Loading",
  },
};

export const LoaderAnimate: Story = {
  args: {
    variant: "loader-animate",
    ariaLabel: "Processing your request",
  },
};

export const CustomLabel: Story = {
  args: {
    variant: "spinner",
    ariaLabel: "Fetching data...",
  },
};
