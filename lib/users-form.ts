export type FieldConfig = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "date" | "number";
  component?: "input" | "select";
  options?: { label: string; value: string }[];
  required?: boolean;
};

export const userFields: FieldConfig[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    required: true,
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    required: true,
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: true,
  },

  // {
  //   name: "address",
  //   label: "Address",
  //   type: "text",
  //   required: true,
  // },
  // {
  //   name: "dateOfBirth",
  //   label: "Date of Birth",
  //   type: "date",
  //   required: true,
  // },
  // {
  //   name: "age",
  //   label: "Age",
  //   type: "number",
  //   component: "input",
  //   placeholder: "30",
  //   required: true,
  // },
  // {
  //   name: "country",
  //   label: "Country",
  //   type: "text",
  //   component: "select",
  //   options: [
  //     { label: "United States", value: "us" },
  //     { label: "Canada", value: "ca" },
  //   ],
  //   required: true,
  // },
];
