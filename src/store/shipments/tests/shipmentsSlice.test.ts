import { configureStore } from '@reduxjs/toolkit'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'

import { deleteShipment, shipmentsSlice, updateShipment } from '../shipmentsSlice'
import { Status } from '../types'

const initialState = {
  shipments: {
    shipments: {
      'zz-450581-11385595-4210084': {
        orderNo: 'zz-450581-11385595-4210084',
        date: '10/16/2019',
        customer: 'NXP Semiconductors N.V.',
        trackingNo: 'TP-724057-72553473-5647860',
        status: "'In Transit'",
        consignee: 'Koppers Holdings Inc.',
      },
      'kk-275651-64476049-3346442': {
        orderNo: 'kk-275651-64476049-3346442',
        date: '8/20/2019',
        customer: 'Triumph Bancorp, Inc.',
        trackingNo: 'TP-011637-13598236-2700556',
        status: "'Delivered'",
        consignee: 'Celsius Holdings, Inc.',
      },
    },
    status: 'idle' as Status,
  },
}

describe('shipmentsSlice', () => {
  let store: ToolkitStore

  beforeEach(() => {
    store = configureStore({
      reducer: {
        shipments: shipmentsSlice.reducer,
      },
      preloadedState: initialState,
    })
  })

  it('should delete shipment', () => {
    const shipmentsCountBeforeDeletion = Object.keys(
      store.getState().shipments.shipments
    ).length
    expect(shipmentsCountBeforeDeletion).toBe(2)

    store.dispatch(deleteShipment('zz-450581-11385595-4210084'))

    const shipmentsCountAfterDeletion = Object.keys(
      store.getState().shipments.shipments
    ).length
    expect(shipmentsCountAfterDeletion).toBe(1)
  })

  it('should update shipment data', () => {
    // initial shipment
    // const firstShipmentBeforeUpdate = Object.values(
    // store.getState().shipments.shipments
    // )[0]

    // firstShipmenttBeforeUpdate {
    //   orderNo: 'zz-450581-11385595-4210084',
    //   date: '10/16/2019',
    //   customer: 'NXP Semiconductors N.V.',
    //   trackingNo: 'TP-724057-72553473-5647860',
    //   status: "'In Transit'",
    //   consignee: 'Koppers Holdings Inc.'
    // }

    // updated shipment data with new date and status
    const updatedFirstShipmentData = {
      orderNo: 'zz-450581-11385595-4210084',
      date: '10/16/2023',
      customer: 'NXP Semiconductors N.V.',
      trackingNo: 'TP-724057-72553473-5647860',
      status: "'Delivered'",
      consignee: 'Koppers Holdings Inc.',
    }

    // update shipment data
    store.dispatch(updateShipment(updatedFirstShipmentData))

    const firstShipmenttAfterUpdate = Object.values(
      store.getState().shipments.shipments
    )[0]

    expect(firstShipmenttAfterUpdate).toEqual(updatedFirstShipmentData)
  })
})
