import { Tag } from "antd";

export const IssueTableColumns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",

    ellipsis: true,
  },
  {
    title: "Tracking No",
    dataIndex: "trackingNumber",
    key: "trackingNumber",
    width: "11%",
    ellipsis: true,
  },
  {
    title: "Created Date ",
    dataIndex: "createdAt",
    key: "createdAt",
    ellipsis: true,
  },

  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    ellipsis: true,
  },

  {
    title: "Priority",
    key: "priority",
    width: "10%",
    dataIndex: "priority",
    render: (priority) => (
      <Tag
        color={
          priority === "CRITICAL"
            ? "magenta"
            : priority === "MEDIUM"
            ? "purple"
            : priority === "HIGH"
            ? "volcano"
            : priority === "LOW"
            ? "blue"
            : "default"
        }
        key={priority}
      >
        {priority === "CRITICAL"
          ? "CRITICAL"
          : priority === "HIGH"
          ? "HIGH"
          : priority === "MEDIUM"
          ? "MEDIUM"
          : priority === "LOW"
          ? "LOW"
          : "none"}
      </Tag>
    ),
  },
  {
    title: " Status",
    key: "issueStatus",
    width: "10%",
    dataIndex: "issueStatus",
    render: (issueStatus) => (
      <Tag
        color={
          issueStatus === "NEW"
            ? "cyan"
            : issueStatus === "WORKING_ON_IT"
            ? "processing"
            : issueStatus === "STUCK"
            ? "error"
            : issueStatus === "DONE"
            ? "success"
            : "default"
        }
        key={issueStatus}
      >
        {issueStatus === "NEW"
          ? "New"
          : issueStatus === "WORKING_ON_IT"
          ? "Working On It"
          : issueStatus === "STUCK"
          ? "Stuck"
          : issueStatus === "DONE"
          ? "Done"
          : "none"}
      </Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    width: "28%",
    render: (text, record) => <div>{record.action}</div>,
  },
];

export const RoleTableColumns = [
  {
    title: "Index",
    dataIndex: "index",
    key: "index",
    render: (text, record, index) => (
      <div style={{ marginRight: "2px !important" }}>
        <span>{index + 1}</span>
      </div>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Role Status",
    key: "role_status",
    dataIndex: "role_status",
    render: (role_status) => (
      <Tag
        color={
          role_status === 1
            ? "success"
            : role_status === 2
            ? "error"
            : "default"
        }
        key={role_status}
      >
        {role_status === 1 ? "Active" : role_status === 2 ? "Inactive" : "none"}
      </Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => <div>{record.action}</div>,
  },
];
