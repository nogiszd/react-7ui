import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Tabs } from "../components/Tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;

const defaultTabs = [
  { id: "tab-A", label: "Tab A", content: "Tab A is active" },
  { id: "tab-B", label: "Tab B", content: "Tab B is active" },
  { id: "tab-C", label: "Tab C", content: "Tab C is active" },
  { id: "tab-D", label: "Tab D", content: "Tab D is inactive", disabled: true },
];

export const Basic: Story = {
  args: {
    tabs: defaultTabs,
    ariaLabel: "Tabs Template",
  },
};

// Example of a controlled tabs component
const ControlledTabs = () => {
  const [activeTab, setActiveTab] = React.useState("tab-A");

  return (
    <Tabs
      tabs={defaultTabs}
      activeTab={activeTab}
      onChange={setActiveTab}
      ariaLabel="Controlled Tabs Example"
    />
  );
};

export const Controlled: Story = {
  render: () => <ControlledTabs />,
};

// Example with rich content
const richTabs = [
  {
    id: "info",
    label: "Information",
    content: (
      <div style={{ padding: "1rem" }}>
        <h3>Product Information</h3>
        <p>This is a detailed description of the product.</p>
        <ul>
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
        </ul>
      </div>
    ),
  },
  {
    id: "specs",
    label: "Specifications",
    content: (
      <div style={{ padding: "1rem" }}>
        <h3>Technical Specifications</h3>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td>Dimensions:</td>
              <td>10 x 20 x 30 cm</td>
            </tr>
            <tr>
              <td>Weight:</td>
              <td>500g</td>
            </tr>
            <tr>
              <td>Material:</td>
              <td>Aluminum</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "reviews",
    label: "Reviews",
    content: (
      <div style={{ padding: "1rem" }}>
        <h3>Customer Reviews</h3>
        <p>⭐⭐⭐⭐⭐ Great product! Would buy again.</p>
        <p>⭐⭐⭐⭐ Works as expected.</p>
      </div>
    ),
  },
];

export const RichContent: Story = {
  args: {
    tabs: richTabs,
    ariaLabel: "Product Details",
  },
};
