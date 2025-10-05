import type { User } from "../types/auth";

export const users: User[] = [
  {
    id: "admin@cinelog.com",
    email: "admin@cinelog.com",
    role: "admin",
  },
  {
    id: "user@cinelog.com",
    email: "user@cinelog.com",
    role: "user",
  },
  {
    id: "user2@cinelog.com",
    email: "user2@cinelog.com",
    role: "user",
  },
  {
    id: "user3@cinelog.com",
    email: "user3@cinelog.com",
    role: "user",
  },
];

export const getUserById = (id: string) => {
  return users.find((user) => user.id === id);
};
