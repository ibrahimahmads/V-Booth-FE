export interface PageResponse<T>{
    content: T[];
    page:number;
    size:number;
    totalElements:number;
    totalPages:number;
}

export interface QueryParams {
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: "ASC" | "DESC";
}