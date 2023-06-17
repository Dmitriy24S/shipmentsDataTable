import { createSelector } from 'reselect'

import { RootState } from '../store'

import {
  sortShipmentsByConsignee,
  sortShipmentsByCustomer,
  sortShipmentsByStatus,
  sortShipmentsByTrackingNo,
} from './sortingUtils'


// Selectors
export const selectShipments = (state: RootState) => state.shipments.shipments

export const selectShipmentById = (state: RootState, shipmentId: string) => {
  return selectShipments(state).find((shipment) => shipment.orderNo === shipmentId)
}

// TODO: normalized data?
// const selectShipmentsEntities = (state) => state.shipments.entities
// export const selectShipments = createSelector(selectShipmentsEntities, (entities) =>
//   Object.values(entities)
// )

// Selectors memoized with reselect
export const selectShipmentsIdsMemoized = createSelector(
  // First, pass one or more "input selector" functions:
  selectShipments,
  // Then, an "output selector" that receives all the input results as arguments
  // and returns a final result value
  (shipments) => shipments.map((shipment) => shipment.orderNo)
)

export const selectFilteredShipments = createSelector(
  // First input selector: all todos
  selectShipments,
  // Second input selector: all filter values
  (state: RootState) => state.filters,
  // Output selector: receives both values
  (shipments, filters) => {
    const { activeSort, sortDirection } = filters

    // if no active sorting selected -> return unfiltered data
    if (activeSort === null) {
      return shipments
    }

    if (activeSort === null) {
      return shipments
    }

    switch (activeSort) {
      case 'customer':
        return sortShipmentsByCustomer(shipments, sortDirection)
      case 'trackingNo':
        return sortShipmentsByTrackingNo(shipments, sortDirection)
      case 'status':
        return sortShipmentsByStatus(shipments, sortDirection)
      case 'consignee':
        return sortShipmentsByConsignee(shipments, sortDirection)
      default:
        return shipments
    }
  }
)
