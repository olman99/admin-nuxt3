import { DataPaginationIndexedDB, QueryFilters } from "../models/response";
import persistance from "../libs/dataPersistance";
export default function <T>(
  db: string,
  dataPersistance: DataPaginationIndexedDB | null,
  limit: number,
  offset: number,
  totalRows: number,
  totalPages: number,
  data: T,
  queryFilters: Array<QueryFilters>
): DataPaginationIndexedDB {
  const objectDB: DataPaginationIndexedDB = {
    id: db,
    limit: limit,
    offset: offset,
    total: totalRows,
    totalPages: totalPages,
    data: data,
    queryFilters: JSON.stringify(queryFilters),
  };

  if (dataPersistance !== undefined) {
    persistance.put("persistance", objectDB);
  } else {
    persistance.add("persistance", objectDB);
  }

  return objectDB;
}
