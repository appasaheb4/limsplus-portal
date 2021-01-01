export interface Users {
  userId?: string;
  lab?: string;
  password?: string;
  deginisation?: string;
  status?: string | "Active" | "Retired" | "Disable";
  fullName?: string;
  department?: string;
  exipreDate?: Date;
  exipreDays?: number;
  role?: string;
}
