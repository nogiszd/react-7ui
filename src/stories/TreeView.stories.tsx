import type { Meta, StoryObj } from "@storybook/react";
import { TreeView } from "../components/TreeView";

const meta = {
  title: "Components/TreeView",
  component: TreeView,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof TreeView>;

const sampleItems = [
  { label: "Table of Contents" },
  { label: "What is web development?" },
  {
    label: "CSS",
    children: [
      { label: "Selectors" },
      { label: "Specificity" },
      { label: "Properties" },
    ],
  },
  {
    label: "JavaScript",
    defaultExpanded: true,
    children: [
      { label: "Avoid at all costs" },
      {
        label: "Unless",
        children: [
          { label: "Avoid" },
          {
            label: "At",
            children: [
              { label: "Avoid" },
              { label: "At" },
              { label: "All" },
              { label: "Cost" },
            ],
          },
          { label: "All" },
          { label: "Cost" },
        ],
      },
    ],
  },
  { label: "HTML" },
  { label: "Special Thanks" },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    style: { width: 300 },
  },
};

export const WithConnectors: Story = {
  args: {
    items: sampleItems,
    showConnectors: true,
    style: { width: 300 },
  },
};

export const WithCollapseButton: Story = {
  args: {
    items: sampleItems,
    showCollapseButton: true,
    style: { width: 300 },
  },
};

export const WithConnectorsAndCollapseButton: Story = {
  args: {
    items: sampleItems,
    showConnectors: true,
    showCollapseButton: true,
    style: { width: 300 },
  },
};

export const NoContainer: Story = {
  args: {
    items: sampleItems,
    hasContainer: false,
    style: { width: 300 },
  },
};
