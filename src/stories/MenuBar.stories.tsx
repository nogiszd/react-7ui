import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MenuBar } from "../components/MenuBar";

const meta = {
  title: "Components/MenuBar",
  component: MenuBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MenuBar>;

export default meta;
type Story = StoryObj<typeof MenuBar>;

const simpleItems = [
  { label: "File" },
  { label: "Edit" },
  { label: "View" },
  { label: "Help" },
];

export const Simple: Story = {
  args: {
    items: simpleItems,
  },
};

const fullItems = [
  {
    label: "File",
    items: [
      {
        label: "Open",
        href: "#menubar",
        shortcut: { ctrl: true, key: "O" },
      },
      {
        label: "Save",
        href: "#menubar",
        shortcut: { ctrl: true, key: "S" },
      },
      {
        label: "Save As...",
        href: "#menubar",
        shortcut: { ctrl: true, shift: true, key: "S" },
        hasDivider: true,
      },
      { label: "Exit", href: "#menubar" },
    ],
  },
  {
    label: "Edit",
    items: [
      { label: "Undo", href: "#menubar" },
      { label: "Copy", href: "#menubar" },
      { label: "Cut", href: "#menubar" },
      { label: "Paste", href: "#menubar", hasDivider: true },
      { label: "Delete", href: "#menubar" },
      { label: "Find...", href: "#menubar" },
      { label: "Replace...", href: "#menubar" },
      { label: "Go to...", href: "#menubar" },
    ],
  },
  {
    label: "View",
    items: [
      {
        label: "Zoom",
        items: [
          { label: "Zoom In", onClick: () => console.log("Zoom in") },
          { label: "Zoom Out", onClick: () => console.log("Zoom out") },
        ],
      },
      { label: "Status Bar", href: "#menubar" },
    ],
  },
  {
    label: "Help",
    items: [
      { label: "View Help", href: "#menubar" },
      { label: "About", href: "#menubar" },
    ],
  },
];

export const WithDropdowns: Story = {
  args: {
    items: fullItems,
    canHover: true,
  },
};

// Example of interactive menubar
const InteractiveMenuBar = () => {
  const items = [
    {
      label: "File",
      items: [
        {
          label: "New",
          shortcut: { ctrl: true, key: "N" },
          onClick: () => alert("New file"),
        },
        {
          label: "Open",
          shortcut: { ctrl: true, key: "O" },
          onClick: () => alert("Open file"),
        },
        {
          label: "Save",
          shortcut: { ctrl: true, key: "S" },
          onClick: () => alert("Save file"),
          hasDivider: true,
        },
        {
          label: "Exit",
          onClick: () => alert("Exit application"),
        },
      ],
    },
    {
      label: "Edit",
      items: [
        {
          label: "Undo",
          shortcut: { ctrl: true, key: "Z" },
          onClick: () => alert("Undo"),
        },
        {
          label: "Redo",
          shortcut: { ctrl: true, shift: true, key: "Z" },
          onClick: () => alert("Redo"),
        },
      ],
    },
  ];

  return <MenuBar items={items} canHover />;
};

export const Interactive: Story = {
  render: () => <InteractiveMenuBar />,
};
