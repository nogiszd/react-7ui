import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Menu } from "../components/Menu";

const meta = {
  title: "Components/Menu",
  component: Menu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof Menu>;

const simpleItems = [
  { label: "View", type: "submenu" as const, items: [] },
  {
    label: "Sort by",
    type: "submenu" as const,
    items: [
      { label: "Name", href: "#menu" },
      { label: "Size", href: "#menu" },
      { label: "Item type", href: "#menu" },
      { label: "Date modified", href: "#menu" },
    ],
  },
  { label: "Refresh", href: "#menu" },
  { label: "Paste", href: "#menu" },
  { label: "Paste shortcut", href: "#menu" },
  { label: "Screen resolution", href: "#menu" },
  { label: "Gadgets", href: "#menu" },
  { label: "Personalize", href: "#menu" },
];

export const SimpleMenu: Story = {
  args: {
    items: simpleItems,
    width: 200,
  },
};

const itemsWithDividers = [
  { label: "View", type: "submenu" as const, items: [] },
  {
    label: "Sort by",
    type: "submenu" as const,
    items: [
      { label: "Name", href: "#menu" },
      { label: "Size", href: "#menu" },
      { label: "Item type", href: "#menu" },
      { label: "Date modified", href: "#menu" },
    ],
  },
  { label: "Refresh", href: "#menu", hasDivider: true },
  { label: "Paste", href: "#menu", disabled: true },
  { label: "Paste shortcut", href: "#menu", disabled: true, hasDivider: true },
  {
    label: "Screen resolution",
    href: "#menu",
    icon: "https://img.icons8.com/color/18/000000/monitor--v1.png",
  },
  {
    label: "Gadgets",
    href: "#menu",
    icon: "https://img.icons8.com/color/18/000000/virtual-machine2.png",
  },
  {
    label: "Personalize",
    href: "#menu",
    icon: "https://img.icons8.com/color/18/000000/remote-desktop.png",
  },
];

export const WithDividers: Story = {
  args: {
    items: itemsWithDividers,
    width: 200,
    canHover: true,
  },
};

const itemsWithChecks = [
  {
    type: "radio" as const,
    name: "icon-size",
    value: "large",
    label: "Large icons",
  },
  {
    type: "radio" as const,
    name: "icon-size",
    value: "medium",
    label: "Medium icons",
    checked: true,
  },
  {
    type: "radio" as const,
    name: "icon-size",
    value: "small",
    label: "Small icons",
    hasDivider: true,
  },
  {
    type: "checkbox" as const,
    label: "Auto arrange icons",
  },
  {
    type: "checkbox" as const,
    label: "Align icons to grid",
    checked: true,
  },
];

export const WithChecks: Story = {
  args: {
    items: itemsWithChecks,
    width: 200,
  },
};

// Example of controlled radio and checkbox state
const ControlledMenu = () => {
  const [iconSize, setIconSize] = React.useState("medium");
  const [autoArrange, setAutoArrange] = React.useState(false);
  const [alignGrid, setAlignGrid] = React.useState(true);

  const items = [
    {
      type: "radio" as const,
      name: "icon-size",
      value: "large",
      label: "Large icons",
      checked: iconSize === "large",
      onChange: () => setIconSize("large"),
    },
    {
      type: "radio" as const,
      name: "icon-size",
      value: "medium",
      label: "Medium icons",
      checked: iconSize === "medium",
      onChange: () => setIconSize("medium"),
    },
    {
      type: "radio" as const,
      name: "icon-size",
      value: "small",
      label: "Small icons",
      hasDivider: true,
      checked: iconSize === "small",
      onChange: () => setIconSize("small"),
    },
    {
      type: "checkbox" as const,
      label: "Auto arrange icons",
      checked: autoArrange,
      onChange: setAutoArrange,
    },
    {
      type: "checkbox" as const,
      label: "Align icons to grid",
      checked: alignGrid,
      onChange: setAlignGrid,
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        Icon size: {iconSize}
        <br />
        Auto arrange: {autoArrange ? "Yes" : "No"}
        <br />
        Align to grid: {alignGrid ? "Yes" : "No"}
      </div>
      <Menu items={items} width={200} />
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledMenu />,
};
