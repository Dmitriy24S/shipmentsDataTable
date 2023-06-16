import { SortDirection } from '../filters/types'
import { IShipmentsData } from './types'

// Shipments Table sorting logic

export function sortShipmentsByCustomer(
  shipments: IShipmentsData[],
  sortDirection: SortDirection
) {
  return [...shipments].sort((a, b) => {
    let customerA = a.customer
    let customerB = b.customer

    // Convert strings to lowercase for case-insensitive sorting
    if (typeof customerA === 'string' && typeof customerB === 'string') {
      customerA = customerA.toLowerCase()
      customerB = customerB.toLowerCase()
    }

    // Handle numbers and strings separately
    if (typeof customerA === 'number' && typeof customerB === 'number') {
      return sortDirection === 'ASC' ? customerA - customerB : customerB - customerA
    } else {
      return sortDirection === 'ASC'
        ? customerA.localeCompare(customerB)
        : customerB.localeCompare(customerA)
    }
  })
}

export function sortShipmentsByTrackingNo(
  shipments: IShipmentsData[],
  sortDirection: SortDirection
) {
  return [...shipments].sort((a, b) => {
    let trackingNoA = a.trackingNo
    let trackingNoB = b.trackingNo

    // Handle numbers and strings separately
    if (typeof trackingNoA === 'number' && typeof trackingNoB === 'number') {
      return sortDirection === 'ASC'
        ? trackingNoA - trackingNoB
        : trackingNoB - trackingNoA
    } else {
      return sortDirection === 'ASC'
        ? String(trackingNoA).localeCompare(String(trackingNoB))
        : String(trackingNoB).localeCompare(String(trackingNoA))
    }
  })
}

export function sortShipmentsByStatus(
  shipments: IShipmentsData[],
  sortDirection: SortDirection
) {
  return [...shipments].sort((a, b) => {
    let statusA = a.status
    let statusB = b.status

    // Convert strings to lowercase for case-insensitive sorting
    if (typeof statusA === 'string' && typeof statusB === 'string') {
      statusA = statusA.toLowerCase()
      statusB = statusB.toLowerCase()
    }

    // Handle numbers and strings separately
    if (typeof statusA === 'number' && typeof statusB === 'number') {
      return sortDirection === 'ASC' ? statusA - statusB : statusB - statusA
    } else {
      return sortDirection === 'ASC'
        ? statusA.localeCompare(statusB)
        : statusB.localeCompare(statusA)
    }
  })
}

export function sortShipmentsByConsignee(
  shipments: IShipmentsData[],
  sortDirection: SortDirection
) {
  return [...shipments].sort((a, b) => {
    let consigneeA = a.consignee
    let consigneeB = b.consignee

    // Convert strings to lowercase for case-insensitive sorting
    if (typeof consigneeA === 'string' && typeof consigneeB === 'string') {
      consigneeA = consigneeA.toLowerCase()
      consigneeB = consigneeB.toLowerCase()
    }

    // Handle numbers and strings separately
    if (typeof consigneeA === 'number' && typeof consigneeB === 'number') {
      return sortDirection === 'ASC' ? consigneeA - consigneeB : consigneeB - consigneeA
    } else {
      return sortDirection === 'ASC'
        ? consigneeA.localeCompare(consigneeB)
        : consigneeB.localeCompare(consigneeA)
    }
  })
}
