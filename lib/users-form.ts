// user-form.config.ts
export const userFields = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "John",
    type: "text",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Doe",
    type: "text",
  },
  {
    name: "phone",
    label: "Phone Number",
    placeholder: "9876543210",
    type: "tel",
  },
  {
    name: "email",
    label: "Email Address",
    placeholder: "john@example.com",
    type: "email",
  },
] as const;
