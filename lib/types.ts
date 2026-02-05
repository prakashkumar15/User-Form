// user.types.ts
import { UserFormValues } from "./user.schema";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};
