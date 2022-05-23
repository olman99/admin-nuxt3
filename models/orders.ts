export interface OrderData {
  accountId: number;
  channel: string;
  clusterId: number;
  customerDocumentType: string;
  customerFirstName: string;
  customerLastname: string;
  customerPhone: string;
  externalOrderCode: string;
  grandTotal: number;
  id: number;
  incrementId: string;
  integrationOrderCode: number;
  origin: string;
  paymentMethod: string;
  posStore: string;
  preOrder: boolean;
  storeId: number;
  storeName: string;
  totalPaid: number;
}
