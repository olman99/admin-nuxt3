export interface DefaultResponse<T> {
  data: T;
  status: boolean;
  errors?: object;
  error?: string;
}

export interface Response<T> {
  data: DataResponse<T>;
  status: boolean;
  errors?: object;
  error?: string;
}

interface DataResponse<T> {
  limit: number;
  page: number;
  sort: string;
  order: string;
  total_rows: number;
  total_pages: number;
  first_page: string;
  previous_page: string;
  next_page: string;
  last_page: string;
  from_row: number;
  to_row: number;
  rows: Array<T>;
  searches?: string;
  paginate: boolean;
}

export interface DataPaginationIndexedDB {
  id: string;
  limit: number;
  offset: number;
  total: number;
  totalPages: number;
  data: any;
  queryFilters: string;
}

export interface QueryFilters {
  label: string;
  value: string;
  filter: string;
}
