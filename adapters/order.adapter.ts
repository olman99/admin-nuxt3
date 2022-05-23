import { OrderData } from "../models/orders";
export default function (object: any): OrderData {
  return object.map((o: any) => {
    const data: OrderData = {
      accountId: o.account_id,
      channel: o.channel,
      clusterId: o.cluster_id,
      customerDocumentType: o.customer_document_type,
      customerFirstName: o.customer_firstname,
      customerLastname: o.customer_lastname,
      customerPhone: o.customer_phone,
      externalOrderCode: o.external_order_code,
      grandTotal: o.grand_total,
      id: o.id,
      incrementId: o.increment_id,
      integrationOrderCode: o.integration_order_code,
      origin: o.origin,
      paymentMethod: o.payment_method,
      posStore: o.pos_store,
      preOrder: o.pre_order,
      storeId: o.store_id,
      storeName: o.store_name,
      totalPaid: o.total_paid,
    };
    return data;
  });
}
