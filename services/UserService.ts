import UserRepository from "../repositories/UserRepository";
import { DataPaginationIndexedDB, QueryFilters } from "../models/response";

class UserService {
  async getAll(
    offset: number,
    limit: number,
    queryFilters: Array<QueryFilters>
  ): Promise<DataPaginationIndexedDB | null> {
    const data = await UserRepository.getAll(offset, limit, queryFilters);

    return data;
  }

  async getAllOrders(
    offset: number,
    limit: number,
    queryFilters: Array<QueryFilters>
  ): Promise<DataPaginationIndexedDB | null> {
    const data = await UserRepository.getAllOrders(offset, limit, queryFilters);

    return data;
  }
}

export default new UserService();
