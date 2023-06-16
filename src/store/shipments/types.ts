export interface IShipmentsData {
  orderNo: string
  date: string
  customer: string
  trackingNo: string
  status: string
  consignee: string
}

export interface IShipmentsState {
  shipments: IShipmentsData[]
  // status: 'idle' | 'loading' | 'error'
  status: Status
}

export type Status = 'idle' | 'loading' | 'error'
