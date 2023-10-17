import { regex } from "./utils/utility";

export const inputFormElements = [
  {
    name: "productId",
    type: "text",

    label: "Product Id",
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
    name: "productName",
    type: "text",
    label: " Product Name",
    variant: "outlined",
    fullWidth: true,
    required: true,
    xs: 12,
    sm: 4,
  },

  {
    name: "category",
    type: "text",

    label: "Category",
    variant: "outlined",
    fullWidth: true,
    required: true,
    xs: 12,
    sm: 4,
  },
  {
    name: "price",
    type: "text",

    label: "Price",
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
    name: "desc",
    type: "text",

    label: "Description",
    variant: "outlined",
    fullWidth: true,
    required: true,
    xs: 12,
    sm: 4,
  },
];
