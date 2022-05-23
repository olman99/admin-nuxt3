import persistance from "../libs/dataPersistance";
import loginAdapter from "../adapters/login.adapter";
import axios from "../libs/axios";
import { LoginData } from "../models/auth";
import {
  DefaultResponse,
  Response,
  DataPaginationIndexedDB,
} from "../models/response";
import validatePersistance from "../utils/validatePersistance";
import { ClusterData } from "../models/cluster";
import clusterAdapter from "../adapters/cluster.adapter";
import orderAdapter from "../adapters/order.adapter";
import { QueryFilters } from "../models/response";
import savePersistance from "../utils/savePersistance";
import { OrderData } from "../models/orders";

class UserRepository {
  private path: string = "/admin/auth/";

  public async login(
    username: string,
    password: string
  ): Promise<LoginData | null> {
    const resp = await axios.post(this.path + "login", {
      email: username,
      password,
    });

    const data: DefaultResponse<LoginData> = resp.data;

    if (resp.status) {
      return loginAdapter(data.data);
    } else {
      return null;
    }
  }

  public async getAll(
    offset: number = 0,
    limit: number = 5,
    queryFilters: Array<QueryFilters> = []
  ): Promise<DataPaginationIndexedDB | null> {
    let dataPersistance = await validatePersistance(
      "persistance",
      "ClusterGrid",
      queryFilters,
      limit,
      offset
    );

    if (dataPersistance) {
      return dataPersistance;
    }

    let queryFilter = "?";
    queryFilters.forEach((filter) => {
      queryFilter += `${filter.filter}=${filter.value}&`;
    });
    queryFilter += "limit=" + limit + "&page=" + offset;

    const token = localStorage.getItem("token");
    const resp = await axios.get("/admin/general/2/cluster" + queryFilter, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const response: Response<ClusterData> = resp.data;

    let data: ClusterData;
    if (response.status) {
      data = clusterAdapter(response.data.rows);

      const objectDB: DataPaginationIndexedDB = savePersistance<ClusterData>(
        "ClusterGrid",
        dataPersistance,
        response.data.limit,
        offset,
        response.data.total_rows,
        response.data.total_pages,
        data,
        queryFilters
      );

      return objectDB;
    }

    return null;
  }

  public async getAllOrders(
    offset: number = 0,
    limit: number = 5,
    queryFilters: Array<QueryFilters> = []
  ): Promise<DataPaginationIndexedDB | null> {
    let dataPersistance = await validatePersistance(
      "persistance",
      "OrdersGrid",
      queryFilters,
      limit,
      offset
    );

    if (dataPersistance) {
      return dataPersistance;
    }

    let queryFilter = "?";
    queryFilters.forEach((filter) => {
      queryFilter += `${filter.filter}=${filter.value}&`;
    });
    queryFilter += "limit=" + limit + "&page=" + offset;

    const token = localStorage.getItem("token");
    const resp = await axios.get("/admin/general/1/order" + queryFilter, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const response: Response<OrderData> = resp.data;

    let data: OrderData;
    if (response.status) {
      data = orderAdapter(response.data.rows);

      const objectDB: DataPaginationIndexedDB = savePersistance<OrderData>(
        "OrdersGrid",
        dataPersistance,
        response.data.limit,
        offset,
        response.data.total_rows,
        response.data.total_pages,
        data,
        queryFilters
      );

      return objectDB;
    }

    return null;
  }
}

export default new UserRepository();
