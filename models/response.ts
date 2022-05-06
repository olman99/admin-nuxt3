export interface DefaultResponse<T> {
  data: T;
  status: boolean;
  errors?: object;
  error?: string;
}
