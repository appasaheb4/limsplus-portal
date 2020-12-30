export interface Users {
  userId: string;
  lab?: string;
  password?: string;
  deginisation?: string;
  status?: string | "Active" | "Retired" | "Disable";
  fullName?: string;
  department?: string;
  exipreDate?: string;
  role?: string;
}
