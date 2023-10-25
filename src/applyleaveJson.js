import { regex } from "./utils/utility";

export const applyFormElements = [
  {
    name: "leaveType",
    type: "text",

    label: "Leave Type",
    variant: "outlined",
    fullWidth: true,
    required: true,
    xs: 12,
    sm: 6,
  },
  {
    name: "startDate",
    type: "text",

    label: "Start Date",
    variant: "outlined",
    fullWidth: true,
    required: true,
    xs: 12,
    sm: 6,
    pattern: {
      value: regex.date,
      message: "Invalid date format (MM/DD/YYYY)",
    },
  },
  {
    name: "endDate",
    type: "text",

    label: "End Date",
    variant: "outlined",
    fullWidth: true,
    required: true,
    xs: 12,
    sm: 6,
    pattern: {
      value: regex.date,
      message: "Invalid date format (MM/DD/YYYY)",
    },
  },
  {
    type: "select",
    name: "status",
    label: "Status",
    variant: "outlined",
    required: true,
    xs: 12,
    sm: 6,
    options: [
      { label: "Pending", value: "pending " },
      { label: "Approved", value: "approved" },
      { label: "Rejected", value: "rejected" },
    ],
  },
];
