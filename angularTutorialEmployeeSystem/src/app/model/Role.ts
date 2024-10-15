
export interface Role {
  roleId: number;
  role: string;
}
export interface Designation {
  designationId: number;
  designation: string;
}
export interface ApiResponse<T> {
  data: T;
  result: boolean;
}

