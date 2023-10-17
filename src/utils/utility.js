export const regex = {
  onlyNumbers: /^[0-9]+$/,
  onlyAlphabets: /^[A-Za-z]+$/,
  alphanumeric: /^[A-Za-z0-9]+$/,
  validEmail: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  phoneNumber: /^\d{10}$|^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/,
};

export const url = {
  createEmployee: "http://localhost:8080/api/employee/create",
  deleteEmployee: "http://localhost:8080/api/employee/delete",
  updateEmployee: "http://localhost:8080/api/employee/update",
  fetchEmployee: "http://localhost:8080/api/employee/fetch",
  createProduct: "http://localhost:8080/api/product/create",
  deleteProduct: "http://localhost:8080/api/product/delete",
  updateProduct: "http://localhost:8080/api/product/update",
  fetchProduct: "http://localhost:8080/api/product/fetch",
};

export function makeColumn(arr) {
  return arr.length > 0
    ? Object.keys(arr?.[0])
        .filter(
          (key) =>
            typeof arr[0]?.[key] === "string" ||
            typeof arr[0]?.[key] === "number"
        )
        .filter((key) => arr[0][key] != null)
        .filter((key) => !key.includes("_"))
        .map((key) => ({
          accessorKey: key,
          header: key?.charAt(0).toUpperCase() + key?.slice(1),
        }))
    : [];
}
