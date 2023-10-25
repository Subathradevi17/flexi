import { regex } from "./utils/utility";

export const inputFormElements = [
  {
    name: "empId",
    type: "text",

    label: "Emp Id",
    variant: "outlined",
    fullWidth: true,
    required: true,
    xs: 12,
    sm: 4,
    pattern: {
      value: regex.onlyNumbers,
      message: "Only numbers are allowed",
    },
  },
  {
    name: "name",
    type: "text",
    label: "Name",
    variant: "outlined",
    fullWidth: true,
    required: true,
    xs: 12,
    sm: 4,
  },

  {
    name: "email",
    type: "text",
    placeholder: "Enter email",
    label: "Email",
    variant: "outlined",
    fullWidth: true,
    required: true,
    xs: 12,
    sm: 4,
    pattern: {
      value: regex.validEmail,
      message: "Invalid Email",
    },
  },
  {
    name: "phNo",
    type: "text",
    placeholder: "Enter phone number",
    label: "Phone",
    variant: "outlined",
    fullWidth: true,
    required: true,
    xs: 12,
    sm: 4,
    pattern: {
      value: regex.phoneNumber,
      message: "Invalid Mobile",
    },
  },

  {
    type: "select",
    name: "role",
    label: "Role",
    variant: "outlined",
    required: true,
    xs: 12,
    sm: 4,
    options: [
      { label: "Admin", value: "admin" },
      { label: "Junior", value: "junior" },
      { label: "Senior", value: "senior" },
    ],
  },
  {
    name: "leaves",
    type: "text",
    value: "24",
    label: "Total Number of Leaves",
    variant: "outlined",
    fullWidth: true,
    // required: true,
    xs: 12,
    sm: 4,
  },
];
