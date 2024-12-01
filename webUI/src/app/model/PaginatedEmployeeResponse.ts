import { Employee } from "./Employee";

export interface PaginatedEmployeeResponse {
  data: Employee[];
  first: number;
  items: number;
  last: number;
  next: number;
  pages: number;
  prev: null
}
