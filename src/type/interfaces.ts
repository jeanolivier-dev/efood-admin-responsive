export interface User {
  name?: string;
  email?: string;
  user_id?: number;
  phone?: string;
  address?: string;
  image?: string | null;
  role?: "admin" | "client" | null;
  is_active?: boolean | null;
  has_accepted?: boolean | null;
  createdAt?: Date | null;
  sub?: string;
}

export interface Menu {
  name?: string;
  description?: string;
  image?: string | null;
}
