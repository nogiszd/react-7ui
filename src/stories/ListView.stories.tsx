import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { ListView } from "../components/ListView";

const meta = {
  title: "Components/ListView",
  component: ListView,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ListView>;

export default meta;
type Story = StoryObj<typeof ListView>;

interface FileItem {
  id: number;
  name: string;
  location: string;
  dateDeleted: string;
  size: string;
  type: string;
}

const sampleData: FileItem[] = [
  {
    id: 1,
    name: "contents_files",
    location: "D:\\Users\\user\\Documents\\contents_files",
    dateDeleted: "3/29/2007 12:00 AM",
    size: "4 KB",
    type: "File Folder",
  },
  {
    id: 2,
    name: "Windows Vista User Experience Guidelines",
    location:
      "D:\\Users\\user\\Documents\\Windows Vista User Experience Guidelines",
    dateDeleted: "3/29/2007 12:00 AM",
    size: "0 KB",
    type: "File Folder",
  },
  {
    id: 3,
    name: "AutoRecovery save of Document.asd",
    location: "D:\\Users\\user\\Documents\\AutoRecovery save of Document.asd",
    dateDeleted: "3/23/2007 12:00 AM",
    size: "27 KB",
    type: "ASD File",
  },
  {
    id: 4,
    name: "AutoRecovery save of Tree Views.asd",
    location: "D:\\Users\\user\\Documents\\AutoRecovery save of Tree Views.asd",
    dateDeleted: "3/13/2007 12:00 AM",
    size: "693 KB",
    type: "ASD File",
  },
  {
    id: 5,
    name: "contents",
    location: "D:\\Users\\user\\Documents\\contents",
    dateDeleted: "3/29/2007 12:00 AM",
    size: "2 KB",
    type: "HTML Document",
  },
];

const columns = [
  {
    key: "name" as const,
    header: "Name",
    sortable: true,
    width: "30%",
  },
  {
    key: "location" as const,
    header: "Original Location",
    sortable: true,
    width: "40%",
  },
  {
    key: "dateDeleted" as const,
    header: "Date deleted",
    sortable: true,
    width: "15%",
  },
  {
    key: "size" as const,
    header: "Size",
    align: "right" as const,
    sortable: true,
    width: "7%",
  },
  {
    key: "type" as const,
    header: "Type",
    sortable: true,
    width: "8%",
  },
];

export const Default: Story = {
  args: {
    data: sampleData,
    columns,
    style: { width: 460 },
  },
};

export const WithDefaultSort: Story = {
  args: {
    data: sampleData,
    columns,
    defaultSortKey: "dateDeleted",
    defaultSortDirection: "desc",
    style: { width: 460 },
  },
};

// Example of controlled selection
const ControlledListView = () => {
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([2, 3]);

  return (
    <ListView<FileItem>
      data={sampleData}
      columns={columns}
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      style={{ width: 460 }}
    />
  );
};

export const WithSelection: Story = {
  render: () => <ControlledListView />,
};

export const MultiSelect: Story = {
  args: {
    data: sampleData,
    columns,
    multiSelect: true,
    defaultSelectedKeys: [1, 2],
    style: { width: 460 },
  },
};

// Example of controlled sorting
const ControlledSortListView = () => {
  const [sortKey, setSortKey] = useState<keyof FileItem>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        Sorted by: {String(sortKey)} ({sortDirection})
      </div>
      <ListView<FileItem>
        data={sampleData}
        columns={columns}
        defaultSortKey={sortKey}
        defaultSortDirection={sortDirection}
        onSortChange={(key, direction) => {
          setSortKey(key);
          setSortDirection(direction);
        }}
        style={{ width: 460 }}
      />
    </div>
  );
};

export const ControlledSort: Story = {
  render: () => <ControlledSortListView />,
};
