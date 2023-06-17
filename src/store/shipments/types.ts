export interface IShipmentsData {
  orderNo: string
  date: string
  customer: string
  trackingNo: string
  status: string
  consignee: string
}

export interface IShipmentsState {
  shipments: {
    [orderNo: string]: IShipmentsData
  }
  status: Status
}

export type Status = 'idle' | 'loading' | 'error'
