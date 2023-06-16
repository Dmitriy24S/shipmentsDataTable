export interface IFilterState {
  activeSort: SortingType
  sortDirection: SortDirection
}

export type SortingType = 'customer' | 'trackingNo' | 'status' | 'consignee' | null

export type SortDirection = 'ASC' | 'DESC' | null
