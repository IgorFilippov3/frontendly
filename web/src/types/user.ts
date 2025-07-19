import type { UserRole } from "./user-role";

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  slug: string;
}
