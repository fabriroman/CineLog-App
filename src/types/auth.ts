export type Role = "admin" | "user";

export type User = {
  id: string;
  email: string;
  username: string;
  role: Role;
};
