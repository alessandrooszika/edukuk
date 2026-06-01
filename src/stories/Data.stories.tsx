import { useState } from "react";
import { Table } from "../components/table";
import { DataTable } from "../components/data-table";
import type { Column } from "../components/data-table";
import { TreeView } from "../components/tree-view";
import type { TreeNode } from "../utils/tree";
import { VirtualizedList } from "../components/virtualized-list";
import { TreeSelect } from "../components/tree-select";
import { Pagination } from "../components/pagination";

export default { title: "Data" };

const columns = [
  { key: "Name", label: "Name" },
  { key: "Role", label: "Role" },
  { key: "Age", label: "Age" },
];
const rows = [
  { Name: "Alice", Role: "Dev", Age: 30 },
  { Name: "Bob", Role: "Designer", Age: 28 },
  { Name: "Charlie", Role: "PM", Age: 35 },
];

export const TableDefault = () => <Table columns={columns} data={rows} />;
export const TableStriped = () => <Table columns={columns} data={rows} striped />;
export const TableSmall = () => <Table columns={columns} data={rows} size="sm" />;

interface User { name: string; email: string; role: string; }
const userColumns: Column<User>[] = [
  { key: "name", label: "Name", sortable: true, filterable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "role", label: "Role" },
];
const userData: User[] = [
  { name: "Alice", email: "alice@dev.com", role: "Developer" },
  { name: "Bob", email: "bob@design.com", role: "Designer" },
  { name: "Charlie", email: "charlie@pm.com", role: "PM" },
];
export const DataTableDefault = () => (
  <DataTable columns={userColumns} data={userData} pageSize={5} />
);

const treeData: TreeNode[] = [
  { id: "1", label: "Documents", children: [
    { id: "2", label: "Report Q1" },
    { id: "3", label: "Projects", children: [
      { id: "4", label: "edukuk" },
    ]},
  ]},
  { id: "5", label: "Images" },
];
export const TreeViewDefault = () => {
  const [selected, setSelected] = useState("4");
  return <TreeView data={treeData} selectedId={selected} onSelect={setSelected} defaultExpandedIds={["1", "3"]} />;
};

const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
export const VirtualizedListDefault = () => (
  <VirtualizedList items={items} itemHeight={36} height={250}
    renderItem={(item) => <div style={{ padding: "0 0.75rem", lineHeight: "36px" }}>{item}</div>}
  />
);

export const TreeSelectDefault = () => {
  const [value, setValue] = useState("");
  return <TreeSelect options={treeData} value={value} onChange={setValue} placeholder="Select..." />;
};

export const PaginationDefault = () => {
  const [page, setPage] = useState(1);
  return <Pagination current={page} total={10} onChange={setPage} />;
};
