import persistance from "../libs/dataPersistance";
import { DataPaginationIndexedDB } from "../models/response";
export default async function (
  name: string,
  key: string,
  queryFilters: Array<{ label: string; value: string; filter: string }>,
  limit: number,
  offset: number
): Promise<DataPaginationIndexedDB | null> {
  let data = await persistance.get(name, key);

  if (data) {
    const filtersPersistance = JSON.parse(data.queryFilters);
    let isSameFilters = true;

    if (filtersPersistance.length !== queryFilters.length) {
      isSameFilters = false;
    }

    if (isSameFilters) {
      for (let index = 0; index < queryFilters.length; index++) {
        if (
          queryFilters[index].label != filtersPersistance[index].label &&
          queryFilters[index].value != filtersPersistance[index].value
        ) {
          isSameFilters = false;
          break;
        }
      }
    }

    if (isSameFilters && data.limit === limit && data.offset === offset) {
      return data;
    }
  }
  return null;
}
