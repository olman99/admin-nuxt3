import { ClusterData } from "../models/cluster";
export default function (object: any): ClusterData {
  return object.map((o: any) => {
    return {
      AccountId: o.id,
      Count: o.count,
      CreatedAt: o.created_at,
      ExternalCode: o.external_code,
      Id: o.id,
      Name: o.name,
      ShippingMethods: o.shipping_methods,
      UserId: o.user_id,
      DeletedAt: o.deleted_at,
      UpdatedAt: o.updated_at,
    };
  });
}
