/* eslint-disable */
import React from "react"
import { Table } from "reactstrap"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import _ from "lodash"

interface PackagesListProps {
  data: any
}

export const PackagesList = observer(({ data }: PackagesListProps) => {
  const { patientOrderStore, routerStore } = useStores()

  const onDeletePackage = (id) => {
    let panels = patientOrderStore.selectedItems?.panels
    panels = panels.filter((items) => {
      return items._id !== id
    })
    patientOrderStore.updateSelectedItems({
      ...patientOrderStore.selectedItems,
      panels,
      serviceTypes: _.union(_.map(panels, "serviceType")),
    })
    //get packages list
    patientOrderStore.patientOrderService.getPackageList({
      input: {
        filter: {
          panel: _.map(panels, (o) =>
            _.pick(o, ["_id", "panelCode", "panelName", "serviceType"])
          ),
        },
      },
    })
  }
  const onRemoveItem = (serviceType, packageCode, index) => {
    const packageList = patientOrderStore.packageList
    let pacakgeListS: any[] = []
    let pacakgeListM: any[] = []
    if (serviceType === "M") {
      pacakgeListM = packageList.pacakgeListM.filter((item) => {
        if (item.packageCode !== packageCode) return item
        else {
          if (item.index === index && item.packageCode === packageCode) return
          else return item
        }
      })
    } else {
      pacakgeListS = packageList.pacakgeListS.filter(
        (item) => item.packageCode === packageCode
      )
      let panels = patientOrderStore.selectedItems?.panels
      _.compact(_.map(pacakgeListS, "_id")).filter((id) => {
        panels = panels.filter((items) => {
          return items._id !== id
        })
      })
      patientOrderStore.updateSelectedItems({
        ...patientOrderStore.selectedItems,
        panels,
        serviceTypes: _.union(_.map(panels, "serviceType")),
      })
      //get packages list
      patientOrderStore.patientOrderService.getPackageList({
        input: {
          filter: {
            panel: _.map(panels, (o) =>
              _.pick(o, ["_id", "panelCode", "panelName", "serviceType"])
            ),
          },
        },
      })
    }
    patientOrderStore.updatePackageList({
      ...patientOrderStore.packageList,
      pacakgeListM,
    })
  }
  return (
    <>
      <Table striped bordered>
        <thead>
          <tr className="p-0 text-xs">
            <th className="text-white sticky left-0 z-10">Action</th>
            <th className="text-white">Panel Code</th>
            <th className="text-white">Panel Name</th>
            <th className="text-white">Package</th>
            <th className="text-white">Service Type</th>
            <th className="text-white">Department</th>
            <th className="text-white">Section</th>
            <th className="text-white">PLab</th>
            <th className="text-white">RLab</th>
            <th className="text-white">Bill</th>
            <th className="text-white">Gross Amt</th>
            <th className="text-white">Net Amt</th>
            <th className="text-white">Discount%</th>
            <th className="text-white">Due Date</th>
            <th className="text-white">Result Date</th>
            <th className="text-white">Order Status</th>
            <th className="text-white">Panel Status</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {data?.pacakgeListS?.map((item, index) => (
            <tr key={item.panelCode}>
              <td className="sticky left-0 bg-gray-500">
                <LibraryComponents.Atoms.Icons.IconContext
                  color="#fff"
                  size="20"
                  onClick={() => {
                    if (item._id) onDeletePackage(item._id)
                    else onRemoveItem("S", item.packageCode, item.index)
                  }}
                >
                  {LibraryComponents.Atoms.Icons.getIconTag(
                    LibraryComponents.Atoms.Icons.IconBs.BsFillTrashFill
                  )}
                </LibraryComponents.Atoms.Icons.IconContext>
              </td>
              <td>{item?.panelCode}</td>
              <td>{item?.panelName}</td>
              <td>{item.serviceType !== "M" && item?.packageCode}</td>
              <td>{item.serviceType}</td>
              <td>{item.department}</td>
              <td>{item.section?.code}</td>
              <td>{item.pLab}</td>
              <td>{item.rLab}</td>
              <td>
                <LibraryComponents.Atoms.Form.Toggle
                  label=""
                  value={item?.bill || false}
                  disabled={true}
                  onChange={(bill) => {
                    const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                    pacakgeListS[index] = Object.assign(item, { bill })
                    patientOrderStore.updatePackageList({
                      ...patientOrderStore.packageList,
                      pacakgeListS,
                    })
                  }}
                />
              </td>
              <td>
                <LibraryComponents.Atoms.Form.Input
                  label=""
                  placeholder="Gross Amt"
                  type="number"
                  style={{ width: 120 }}
                  value={item.grossAmt}
                  onChange={(grossAmt) => {
                    const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                    pacakgeListS[index] = Object.assign(item, { grossAmt })
                    patientOrderStore.updatePackageList({
                      ...patientOrderStore.packageList,
                      pacakgeListS,
                    })
                  }}
                />
              </td>
              <td>
                <LibraryComponents.Atoms.Form.Input
                  label=""
                  placeholder="Net Amt"
                  type="number"
                  style={{ width: 120 }}
                  value={item.netAmt}
                  onChange={(netAmt) => {
                    const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                    pacakgeListS[index] = Object.assign(item, { netAmt })
                    patientOrderStore.updatePackageList({
                      ...patientOrderStore.packageList,
                      pacakgeListS,
                    })
                  }}
                />
              </td>
              <td>
                <LibraryComponents.Atoms.Form.Input
                  label=""
                  placeholder="Discount"
                  type="number"
                  style={{ width: 120 }}
                  value={item.discount}
                  onChange={(discount) => {
                    const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                    pacakgeListS[index] = Object.assign(item, { discount })
                    patientOrderStore.updatePackageList({
                      ...patientOrderStore.packageList,
                      pacakgeListS,
                    })
                  }}
                />
              </td>
              <td>
                <LibraryComponents.Atoms.Form.InputDateTime
                  label=""
                  disabled={true}
                  style={{ width: 300 }}
                  placeholder="Due Date"
                  value={item.dueDate}
                  onChange={(dueDate) => {
                    const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                    pacakgeListS[index] = Object.assign(item, { dueDate })
                    patientOrderStore.updatePackageList({
                      ...patientOrderStore.packageList,
                      pacakgeListS,
                    })
                  }}
                />
              </td>
              <td>
                <LibraryComponents.Atoms.Form.InputDateTime
                  label=""
                  //disabled={true}
                  style={{ width: 300 }}
                  placeholder="Result Date"
                  value={item.resultDate}
                  onChange={(resultDate) => {
                    const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                    pacakgeListS[index] = Object.assign(item, { resultDate })
                    patientOrderStore.updatePackageList({
                      ...patientOrderStore.packageList,
                      pacakgeListS,
                    })
                  }}
                />
              </td>
              <td>
                <select
                  value={item.orderStatus}
                  className={`leading-4 p-2 focus:outline-none focus:ring block shadow-sm sm:text-base border-2 border-gray-300 rounded-md min-w-120`}
                  onChange={(e) => {
                    const orderStatus = e.target.value
                    const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                    pacakgeListS[index] = Object.assign(item, { orderStatus })
                    patientOrderStore.updatePackageList({
                      ...patientOrderStore.packageList,
                      pacakgeListS,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(
                    routerStore.lookupItems,
                    "PATIENT ORDER - ORDER_STATUS"
                  ).map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {`${item.value} - ${item.code}`}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={item.panelStatus}
                  className={`leading-4 p-2 focus:outline-none focus:ring block shadow-sm sm:text-base border-2 border-gray-300 rounded-md min-w-120`}
                  onChange={(e) => {
                    const panelStatus = e.target.value
                    const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                    pacakgeListS[index] = Object.assign(item, { panelStatus })
                    patientOrderStore.updatePackageList({
                      ...patientOrderStore.packageList,
                      pacakgeListS,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(
                    routerStore.lookupItems,
                    "PATIENT ORDER - PANEL_STATUS"
                  ).map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {`${item.value} - ${item.code}`}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
          {data?.pacakgeListM?.map((item, index) => (
            <tr key={item.panelCode}>
              <td className="sticky left-0 bg-gray-500">
                {" "}
                <LibraryComponents.Atoms.Icons.IconContext
                  color="#fff"
                  size="20"
                  onClick={() => {
                    if (item._id) onDeletePackage(item._id)
                    else
                      onRemoveItem && onRemoveItem("M", item.packageCode, item.index)
                  }}
                >
                  {LibraryComponents.Atoms.Icons.getIconTag(
                    LibraryComponents.Atoms.Icons.IconBs.BsFillTrashFill
                  )}
                </LibraryComponents.Atoms.Icons.IconContext>
              </td>
              <td>{item?.panelCode}</td>
              <td>{item?.panelName}</td>
              <td>{item?.packageCode}</td>
              <td>{item.serviceType !== "M" ? item.serviceType : ""}</td>
              <td>{item.department}</td>
              <td>{item.section?.code}</td>
              <td>{item.pLab}</td>
              <td>{item.rLab}</td>
              <td>
                <LibraryComponents.Atoms.Form.Toggle
                  label=""
                  value={item?.bill || false}
                  disabled={true}
                  onChange={(bill) => {
                    const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                    pacakgeListM[index] = Object.assign(item, { bill })
                    patientOrderStore.updatePackageList({
                      ...patientOrderStore.packageList,
                      pacakgeListM,
                    })
                  }}
                />
              </td>
              <td>
                <LibraryComponents.Atoms.Form.Input
                  label=""
                  placeholder="Gross Amt"
                  type="number"
                  style={{ width: 120 }}
                  value={item.grossAmt}
                  onChange={(grossAmt) => {
                    const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                    pacakgeListM[index] = Object.assign(item, { grossAmt })
                    patientOrderStore.updatePackageList({
                      ...patientOrderStore.packageList,
                      pacakgeListM,
                    })
                  }}
                />
              </td>
              <td>
                <LibraryComponents.Atoms.Form.Input
                  label=""
                  placeholder="Net Amt"
                  type="number"
                  style={{ width: 120 }}
                  value={item.netAmt}
                  onChange={(netAmt) => {
                    const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                    pacakgeListM[index] = Object.assign(item, { netAmt })
                    patientOrderStore.updatePackageList({
                      ...patientOrderStore.packageList,
                      pacakgeListM,
                    })
                  }}
                />
              </td>
              <td>
                <LibraryComponents.Atoms.Form.Input
                  label=""
                  placeholder="Discount"
                  type="number"
                  style={{ width: 120 }}
                  value={item.discount}
                  onChange={(discount) => {
                    const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                    pacakgeListM[index] = Object.assign(item, { discount })
                    patientOrderStore.updatePackageList({
                      ...patientOrderStore.packageList,
                      pacakgeListM,
                    })
                  }}
                />
              </td>
              <td>
                <LibraryComponents.Atoms.Form.InputDateTime
                  label=""
                  disabled={true}
                  style={{ width: 300 }}
                  placeholder="Due Date"
                  value={item.dueDate}
                  onChange={(dueDate) => {
                    const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                    pacakgeListM[index] = Object.assign(item, { dueDate })
                    patientOrderStore.updatePackageList({
                      ...patientOrderStore.packageList,
                      pacakgeListM,
                    })
                  }}
                />
              </td>
              <td>
                <LibraryComponents.Atoms.Form.InputDateTime
                  label=""
                  disabled={true}
                  style={{ width: 300 }}
                  placeholder="Result Date"
                  value={item.resultDate}
                  onChange={(resultDate) => {
                    const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                    pacakgeListM[index] = Object.assign(item, { resultDate })
                    patientOrderStore.updatePackageList({
                      ...patientOrderStore.packageList,
                      pacakgeListM,
                    })
                  }}
                />
              </td>
              <td>
                <select
                  value={item.orderStatus}
                  className={`leading-4 p-2 focus:outline-none focus:ring block shadow-sm sm:text-base border-2 border-gray-300 rounded-md min-w-120`}
                  onChange={(e) => {
                    const orderStatus = e.target.value
                    const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                    pacakgeListM[index] = Object.assign(item, { orderStatus })
                    patientOrderStore.updatePackageList({
                      ...patientOrderStore.packageList,
                      pacakgeListM,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(
                    routerStore.lookupItems,
                    "PATIENT ORDER - ORDER_STATUS"
                  ).map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {`${item.value} - ${item.code}`}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={item.panelStatus}
                  className={`leading-4 p-2 focus:outline-none focus:ring block shadow-sm sm:text-base border-2 border-gray-300 rounded-md min-w-120`}
                  onChange={(e) => {
                    const panelStatus = e.target.value
                    const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                    pacakgeListM[index] = Object.assign(item, { panelStatus })
                    patientOrderStore.updatePackageList({
                      ...patientOrderStore.packageList,
                      pacakgeListM,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(
                    routerStore.lookupItems,
                    "PATIENT ORDER - PANEL_STATUS"
                  ).map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {`${item.value} - ${item.code}`}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
          {data?.pacakgeListN?.map((item) => (
            <tr key={item.panelCode}>
              <td className="sticky left-0 bg-gray-500">
                {" "}
                <LibraryComponents.Atoms.Icons.IconContext
                  color="#fff"
                  size="20"
                  onClick={() => {
                    onDeletePackage(item._id)
                  }}
                >
                  {LibraryComponents.Atoms.Icons.getIconTag(
                    LibraryComponents.Atoms.Icons.IconBs.BsFillTrashFill
                  )}
                </LibraryComponents.Atoms.Icons.IconContext>
              </td>
              <td>{item?.panelCode}</td>
              <td>{item?.panelName}</td>
              <td>{item?.packageCode}</td>
              <td>{item.serviceType}</td>
              <td>{item.department}</td>
              <td>{item.section?.code}</td>
              <td>{item.pLab}</td>
              <td>{item.rLab}</td>
              <td>
                <LibraryComponents.Atoms.Form.Toggle
                  label=""
                  value={item?.bill || false}
                  disabled={true}
                />
              </td>
              <td>
                <LibraryComponents.Atoms.Form.Input
                  label=""
                  placeholder="Gross Amt"
                  type="number"
                  style={{ width: 120 }}
                  value={item.grossAmt}
                  onChange={(grossAmt) => {
                    console.log({ grossAmt })
                  }}
                />
              </td>
              <td>
                <LibraryComponents.Atoms.Form.Input
                  label=""
                  placeholder="Net Amt"
                  type="number"
                  style={{ width: 120 }}
                  value={item.grossAmt}
                  onChange={(grossAmt) => {
                    console.log({ grossAmt })
                  }}
                />
              </td>
              <td>
                <LibraryComponents.Atoms.Form.Input
                  label=""
                  placeholder="Discount"
                  type="number"
                  style={{ width: 120 }}
                  value={item.grossAmt}
                  onChange={(grossAmt) => {
                    console.log({ grossAmt })
                  }}
                />
              </td>
              <td>
                <LibraryComponents.Atoms.Form.InputDateTime
                  label=""
                  disabled={true}
                  style={{ width: 280 }}
                  placeholder="Due Date"
                  value={item.dueDate}
                  onChange={(dueDate) => {
                    console.log({ dueDate })
                  }}
                />
              </td>
              <td>
                <LibraryComponents.Atoms.Form.InputDateTime
                  label=""
                  disabled={true}
                  style={{ width: 280 }}
                  placeholder="Result Date"
                  value={item.resultDate}
                  onChange={(resultDate) => {
                    console.log({ resultDate })
                  }}
                />
              </td>
              <td>
                <select
                  value={item.orderStatus}
                  className={`leading-4 p-2 focus:outline-none focus:ring block shadow-sm sm:text-base border-2 border-gray-300 rounded-md min-w-120`}
                  onChange={(e) => {
                    const orderStatus = e.target.value
                    console.log({ orderStatus })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(
                    routerStore.lookupItems,
                    "PATIENT ORDER - ORDER_STATUS"
                  ).map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {`${item.value} - ${item.code}`}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={item.panelStatus}
                  className={`leading-4 p-2 focus:outline-none focus:ring block shadow-sm sm:text-base border-2 border-gray-300 rounded-md min-w-120`}
                  onChange={(e) => {
                    const panelStatus = e.target.value
                    console.log({ panelStatus })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(
                    routerStore.lookupItems,
                    "PATIENT ORDER - PANEL_STATUS"
                  ).map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {`${item.value} - ${item.code}`}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
          {data?.pacakgeListK?.map((item) => (
            <tr key={item.panelCode}>
              <td className="sticky left-0 bg-gray-500">
                {item.serviceType === "K" && (
                  <LibraryComponents.Atoms.Icons.IconContext
                    color="#fff"
                    size="20"
                    onClick={() => {
                      onDeletePackage(item._id)
                    }}
                  >
                    {LibraryComponents.Atoms.Icons.getIconTag(
                      LibraryComponents.Atoms.Icons.IconBs.BsFillTrashFill
                    )}
                  </LibraryComponents.Atoms.Icons.IconContext>
                )}
              </td>
              <td>{item?.panelCode}</td>
              <td>{item?.panelName}</td>
              <td>{item?.packageCode}</td>
              <td>{item.serviceType}</td>
              <td>{item.department}</td>
              <td>{item.section?.code}</td>
              <td>{item.pLab}</td>
              <td>{item.rLab}</td>
              <td>
                <LibraryComponents.Atoms.Form.Toggle
                  label=""
                  value={item?.bill || false}
                  disabled={true}
                />
              </td>
              <td>
                <LibraryComponents.Atoms.Form.Input
                  label=""
                  placeholder="Gross Amt"
                  type="number"
                  style={{ width: 120 }}
                  value={item.grossAmt}
                  onChange={(grossAmt) => {
                    console.log({ grossAmt })
                  }}
                />
              </td>
              <td>
                <LibraryComponents.Atoms.Form.Input
                  label=""
                  placeholder="Net Amt"
                  type="number"
                  style={{ width: 120 }}
                  value={item.grossAmt}
                  onChange={(grossAmt) => {
                    console.log({ grossAmt })
                  }}
                />
              </td>
              <td>
                <LibraryComponents.Atoms.Form.Input
                  label=""
                  placeholder="Discount"
                  type="number"
                  style={{ width: 120 }}
                  value={item.grossAmt}
                  onChange={(grossAmt) => {
                    console.log({ grossAmt })
                  }}
                />
              </td>
              <td>
                <LibraryComponents.Atoms.Form.InputDateTime
                  label=""
                  disabled={true}
                  style={{ width: 280 }}
                  placeholder="Due Date"
                  value={item.dueDate}
                  onChange={(dueDate) => {
                    console.log({ dueDate })
                  }}
                />
              </td>
              <td>
                <LibraryComponents.Atoms.Form.InputDateTime
                  label=""
                  disabled={true}
                  style={{ width: 280 }}
                  placeholder="Result Date"
                  value={item.resultDate}
                  onChange={(resultDate) => {
                    console.log({ resultDate })
                  }}
                />
              </td>
              <td>
                <select
                  value={item.orderStatus}
                  className={`leading-4 p-2 focus:outline-none focus:ring block shadow-sm sm:text-base border-2 border-gray-300 rounded-md min-w-120`}
                  onChange={(e) => {
                    const orderStatus = e.target.value
                    console.log({ orderStatus })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(
                    routerStore.lookupItems,
                    "PATIENT ORDER - ORDER_STATUS"
                  ).map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {`${item.value} - ${item.code}`}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={item.panelStatus}
                  className={`leading-4 p-2 focus:outline-none focus:ring block shadow-sm sm:text-base border-2 border-gray-300 rounded-md min-w-120`}
                  onChange={(e) => {
                    const panelStatus = e.target.value
                    console.log({ panelStatus })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(
                    routerStore.lookupItems,
                    "PATIENT ORDER - PANEL_STATUS"
                  ).map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {`${item.value} - ${item.code}`}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
})
