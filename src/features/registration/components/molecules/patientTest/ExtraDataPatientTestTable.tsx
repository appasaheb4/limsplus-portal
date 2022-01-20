/* eslint-disable */
import React, { useEffect, useState } from "react"
import { Table } from "reactstrap"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import _ from "lodash"

interface ExtraDataPatientTestTableProps {
  data: any
}

export const ExtraDataPatientTestTable = observer(
  ({ data }: ExtraDataPatientTestTableProps) => {
    const { patientOrderStore, routerStore } = useStores()
    const [packages, setPackages] = useState(data)

    useEffect(() => {
      const panelStatus = LibraryUtils.getDefaultLookupItem(
        routerStore.lookupItems,
        "PATIENT ORDER - PANEL_STATUS"
      )
      const orderStatus = LibraryUtils.getDefaultLookupItem(
        routerStore.lookupItems,
        "PATIENT ORDER - ORDER_STATUS"
      )
      let pacakgeListS = data?.pacakgeListS
      if (data.pacakgeListS) {
        pacakgeListS = _.map(data.pacakgeListS, (o) =>
          _.extend({ panelStatus, orderStatus }, o)
        )
      }
      let pacakgeListM = data.pacakgeListM
      if (data.pacakgeListM) {
        pacakgeListM = _.map(data.pacakgeListM, (o) =>
          _.extend({ panelStatus, orderStatus }, o)
        )
      }
      let pacakgeListN = data.pacakgeListN
      if (data.pacakgeListN) {
        pacakgeListN = _.map(data.pacakgeListN, (o) =>
          _.extend({ panelStatus, orderStatus }, o)
        )
      }
      let pacakgeListK = data.pacakgeListK
      if (data.pacakgeListK) {
        pacakgeListK = _.map(data.pacakgeListK, (o) =>
          _.extend({ panelStatus, orderStatus }, o)
        )
      }
      data = {
        ...data,
        pacakgeListS,
        pacakgeListM,
        pacakgeListN,
        pacakgeListK,
      }
      setPackages(data)
    }, [data])

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
              <th className="text-white sticky left-0 z-10">Panel Code</th>
              <th className="text-white sticky left-16 z-10">Panel Name</th>
              <th className="text-white">Priority</th>
              <th className="text-white">Outsource Lab</th>
              <th className="text-white">Force Out Source</th>
              <th className="text-white">OS Received Date</th>
              <th className="text-white">OS ReceivedBy</th>
              <th className="text-white">Out source Status</th>
              <th className="text-white">Recevied ByDept</th>
              <th className="text-white">Analysis Done Date</th>
              <th className="text-white">Auto Release</th>
              <th className="text-white">ABNormal</th>
              <th className="text-white">Critical</th>
              <th className="text-white">Rep</th>
              <th className="text-white">Eqid</th>
              <th className="text-white">Eq type</th>
              <th className="text-white">MethodOn</th>
              <th className="text-white">Method Name</th>
              <th className="text-white">Porder</th>
              <th className="text-white">Confidential</th>
              <th className="text-white">Workflow</th>
              <th className="text-white">Login Servgrp</th>
              <th className="text-white">Current Servgrp</th>
              <th className="text-white">Routing Status</th>
              <th className="text-white">Recv Time</th>
              <th className="text-white">Out Source Ordno</th>
              <th className="text-white">Dept Out Source</th>
              <th className="text-white">Comment</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {packages?.pacakgeListS?.map((item, index) => (
              <tr key={item.panelCode}>
                <td className="sticky left-0 bg-gray-500 text-white">
                  {item?.panelCode}
                </td>
                <td className="sticky left-16 bg-gray-500 text-white">
                  {item?.panelName}
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Priority"
                    value={item?.extraData?.priority}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(priority) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: { ...pacakgeListS[index].extraData, priority },
                      })
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
                    placeholder="Out Source Lab"
                    value={item?.extraData?.outsourceLab}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(outsourceLab) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          outsourceLab,
                        },
                      })
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
                    placeholder="Force Out Source"
                    value={item?.extraData?.forceOutSource}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(forceOutSource) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          forceOutSource,
                        },
                      })
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
                    placeholder="OS Received Date"
                    value={item?.extraData?.osReceivedDate}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(osReceivedDate) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          osReceivedDate,
                        },
                      })
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
                    placeholder="OS ReceivedBy"
                    value={item?.extraData?.osReceivedBy}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(osReceivedBy) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          osReceivedBy,
                        },
                      })
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
                    placeholder="Out Source Status"
                    value={item?.extraData?.outsourceStatus}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(outsourceStatus) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          outsourceStatus,
                        },
                      })
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
                    placeholder="Recevied By Dept"
                    value={item?.extraData?.receviedByDept}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(receviedByDept) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          receviedByDept,
                        },
                      })
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
                    placeholder="Analysis Done Date"
                    value={item?.extraData?.analysisDoneDate}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(analysisDoneDate) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          analysisDoneDate,
                        },
                      })
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
                    placeholder="Auto Release"
                    value={item?.extraData?.analysisDoneDate}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(analysisDoneDate) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          analysisDoneDate,
                        },
                      })
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
                    placeholder="ABNormal"
                    value={item?.extraData?.abNormal}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(abNormal) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          abNormal,
                        },
                      })
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
                    placeholder="Critical"
                    value={item?.extraData?.critical}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(critical) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          critical,
                        },
                      })
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
                    placeholder="Rep"
                    value={item?.extraData?.rep}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(rep) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          rep,
                        },
                      })
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
                    placeholder="Rqid"
                    value={item?.extraData?.eqid}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(eqid) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          eqid,
                        },
                      })
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
                    placeholder="Eqtype"
                    value={item?.extraData?.eqtype}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(eqtype) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          eqtype,
                        },
                      })
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
                    placeholder="Method On"
                    value={item?.extraData?.methodOn}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(methodOn) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          methodOn,
                        },
                      })
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
                    placeholder="Method Name"
                    value={item?.extraData?.methodName}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(methodName) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          methodName,
                        },
                      })
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
                    placeholder="Porder"
                    value={item?.extraData?.porder}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(porder) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          porder,
                        },
                      })
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
                    placeholder="Confidential"
                    value={item?.extraData?.confidential}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(confidential) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          confidential,
                        },
                      })
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
                    placeholder="Workflow"
                    value={item?.extraData?.workflow}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(workflow) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          workflow,
                        },
                      })
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
                    placeholder="Login Servgrp"
                    value={item?.extraData?.loginServgrp}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(loginServgrp) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          loginServgrp,
                        },
                      })
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
                    placeholder="Current Servgrp"
                    value={item?.extraData?.currentServgrp}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(currentServgrp) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          currentServgrp,
                        },
                      })
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
                    placeholder="Routing Status"
                    value={item?.extraData?.routingStatus}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(routingStatus) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          routingStatus,
                        },
                      })
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
                    placeholder="Recv Time"
                    value={item?.extraData?.recvTime}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(recvTime) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          recvTime,
                        },
                      })
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
                    placeholder="Out Source Ordno"
                    value={item?.extraData?.outSourceOrdno}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(outSourceOrdno) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          outSourceOrdno,
                        },
                      })
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
                    placeholder="Dept Out Source"
                    value={item?.extraData?.deptOutSource}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(deptOutSource) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          deptOutSource,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListS,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.MultilineInput
                    rows={4}
                    label=""
                    placeholder="Comment"
                    style={{ width: 200 }}
                    value={item?.extraData?.comment}
                    onChange={(comment) => {
                      const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                      pacakgeListS[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListS[index].extraData,
                          comment,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListS,
                      })
                    }}
                  />
                </td>
              </tr>
            ))}
            {packages?.pacakgeListM?.map((item, index) => (
              <tr key={item.panelCode}>
                <td className="sticky left-0 bg-gray-500 text-white">
                  {item?.panelCode}
                </td>
                <td className="sticky left-16 bg-gray-500 text-white">
                  {item?.panelName}
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Priority"
                    value={item?.extraData?.priority}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(priority) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: { ...pacakgeListM[index].extraData, priority },
                      })
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
                    placeholder="Out Source Lab"
                    value={item?.extraData?.outsourceLab}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(outsourceLab) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          outsourceLab,
                        },
                      })
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
                    placeholder="Force Out Source"
                    value={item?.extraData?.forceOutSource}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(forceOutSource) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          forceOutSource,
                        },
                      })
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
                    placeholder="OS Received Date"
                    value={item?.extraData?.osReceivedDate}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(osReceivedDate) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          osReceivedDate,
                        },
                      })
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
                    placeholder="OS ReceivedBy"
                    value={item?.extraData?.osReceivedBy}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(osReceivedBy) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          osReceivedBy,
                        },
                      })
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
                    placeholder="Out Source Status"
                    value={item?.extraData?.outsourceStatus}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(outsourceStatus) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          outsourceStatus,
                        },
                      })
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
                    placeholder="Recevied By Dept"
                    value={item?.extraData?.receviedByDept}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(receviedByDept) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          receviedByDept,
                        },
                      })
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
                    placeholder="Analysis Done Date"
                    value={item?.extraData?.analysisDoneDate}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(analysisDoneDate) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          analysisDoneDate,
                        },
                      })
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
                    placeholder="Auto Release"
                    value={item?.extraData?.analysisDoneDate}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(analysisDoneDate) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          analysisDoneDate,
                        },
                      })
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
                    placeholder="ABNormal"
                    value={item?.extraData?.abNormal}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(abNormal) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          abNormal,
                        },
                      })
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
                    placeholder="Critical"
                    value={item?.extraData?.critical}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(critical) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          critical,
                        },
                      })
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
                    placeholder="Rep"
                    value={item?.extraData?.rep}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(rep) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          rep,
                        },
                      })
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
                    placeholder="Rqid"
                    value={item?.extraData?.eqid}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(eqid) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          eqid,
                        },
                      })
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
                    placeholder="Eqtype"
                    value={item?.extraData?.eqtype}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(eqtype) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          eqtype,
                        },
                      })
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
                    placeholder="Method On"
                    value={item?.extraData?.methodOn}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(methodOn) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          methodOn,
                        },
                      })
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
                    placeholder="Method Name"
                    value={item?.extraData?.methodName}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(methodName) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          methodName,
                        },
                      })
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
                    placeholder="Porder"
                    value={item?.extraData?.porder}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(porder) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          porder,
                        },
                      })
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
                    placeholder="Confidential"
                    value={item?.extraData?.confidential}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(confidential) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          confidential,
                        },
                      })
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
                    placeholder="Workflow"
                    value={item?.extraData?.workflow}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(workflow) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          workflow,
                        },
                      })
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
                    placeholder="Login Servgrp"
                    value={item?.extraData?.loginServgrp}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(loginServgrp) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          loginServgrp,
                        },
                      })
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
                    placeholder="Current Servgrp"
                    value={item?.extraData?.currentServgrp}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(currentServgrp) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          currentServgrp,
                        },
                      })
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
                    placeholder="Routing Status"
                    value={item?.extraData?.routingStatus}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(routingStatus) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          routingStatus,
                        },
                      })
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
                    placeholder="Recv Time"
                    value={item?.extraData?.recvTime}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(recvTime) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          recvTime,
                        },
                      })
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
                    placeholder="Out Source Ordno"
                    value={item?.extraData?.outSourceOrdno}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(outSourceOrdno) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          outSourceOrdno,
                        },
                      })
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
                    placeholder="Dept Out Source"
                    value={item?.extraData?.deptOutSource}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(deptOutSource) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          deptOutSource,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListM,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.MultilineInput
                    rows={4}
                    label=""
                    placeholder="Comment"
                    style={{ width: 200 }}
                    value={item?.extraData?.comment}
                    onChange={(comment) => {
                      const pacakgeListM = patientOrderStore.packageList.pacakgeListM
                      pacakgeListM[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListM[index].extraData,
                          comment,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListM,
                      })
                    }}
                  />
                </td>
              </tr>
            ))}
            {packages?.pacakgeListN?.map((item, index) => (
              <tr key={item.panelCode}>
                <td className="sticky left-0 bg-gray-500 text-white">
                  {item?.panelCode}
                </td>
                <td className="sticky left-16 bg-gray-500 text-white">
                  {item?.panelName}
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Priority"
                    value={item?.extraData?.priority}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(priority) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: { ...pacakgeListN[index].extraData, priority },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Out Source Lab"
                    value={item?.extraData?.outsourceLab}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(outsourceLab) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          outsourceLab,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Force Out Source"
                    value={item?.extraData?.forceOutSource}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(forceOutSource) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          forceOutSource,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="OS Received Date"
                    value={item?.extraData?.osReceivedDate}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(osReceivedDate) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          osReceivedDate,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="OS ReceivedBy"
                    value={item?.extraData?.osReceivedBy}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(osReceivedBy) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          osReceivedBy,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Out Source Status"
                    value={item?.extraData?.outsourceStatus}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(outsourceStatus) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          outsourceStatus,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Recevied By Dept"
                    value={item?.extraData?.receviedByDept}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(receviedByDept) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          receviedByDept,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Analysis Done Date"
                    value={item?.extraData?.analysisDoneDate}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(analysisDoneDate) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          analysisDoneDate,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Auto Release"
                    value={item?.extraData?.analysisDoneDate}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(analysisDoneDate) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          analysisDoneDate,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="ABNormal"
                    value={item?.extraData?.abNormal}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(abNormal) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          abNormal,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Critical"
                    value={item?.extraData?.critical}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(critical) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          critical,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Rep"
                    value={item?.extraData?.rep}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(rep) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          rep,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Rqid"
                    value={item?.extraData?.eqid}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(eqid) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          eqid,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Eqtype"
                    value={item?.extraData?.eqtype}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(eqtype) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          eqtype,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Method On"
                    value={item?.extraData?.methodOn}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(methodOn) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          methodOn,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Method Name"
                    value={item?.extraData?.methodName}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(methodName) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          methodName,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Porder"
                    value={item?.extraData?.porder}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(porder) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          porder,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Confidential"
                    value={item?.extraData?.confidential}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(confidential) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          confidential,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Workflow"
                    value={item?.extraData?.workflow}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(workflow) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          workflow,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Login Servgrp"
                    value={item?.extraData?.loginServgrp}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(loginServgrp) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          loginServgrp,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Current Servgrp"
                    value={item?.extraData?.currentServgrp}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(currentServgrp) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          currentServgrp,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Routing Status"
                    value={item?.extraData?.routingStatus}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(routingStatus) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          routingStatus,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Recv Time"
                    value={item?.extraData?.recvTime}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(recvTime) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          recvTime,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Out Source Ordno"
                    value={item?.extraData?.outSourceOrdno}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(outSourceOrdno) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          outSourceOrdno,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Dept Out Source"
                    value={item?.extraData?.deptOutSource}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(deptOutSource) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          deptOutSource,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.MultilineInput
                    rows={4}
                    label=""
                    placeholder="Comment"
                    style={{ width: 200 }}
                    value={item?.extraData?.comment}
                    onChange={(comment) => {
                      const pacakgeListN = patientOrderStore.packageList.pacakgeListN
                      pacakgeListN[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListN[index].extraData,
                          comment,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListN,
                      })
                    }}
                  />
                </td>
              </tr>
            ))}
            {packages?.pacakgeListK?.map((item, index) => (
              <tr key={item.panelCode}>
                <td className="sticky left-0 bg-gray-500 text-white">
                  {item?.panelCode}
                </td>
                <td className="sticky left-16 bg-gray-500 text-white">
                  {item?.panelName}
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Priority"
                    value={item?.extraData?.priority}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(priority) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: { ...pacakgeListK[index].extraData, priority },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Out Source Lab"
                    value={item?.extraData?.outsourceLab}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(outsourceLab) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          outsourceLab,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Force Out Source"
                    value={item?.extraData?.forceOutSource}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(forceOutSource) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          forceOutSource,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="OS Received Date"
                    value={item?.extraData?.osReceivedDate}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(osReceivedDate) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          osReceivedDate,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="OS ReceivedBy"
                    value={item?.extraData?.osReceivedBy}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(osReceivedBy) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          osReceivedBy,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Out Source Status"
                    value={item?.extraData?.outsourceStatus}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(outsourceStatus) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          outsourceStatus,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Recevied By Dept"
                    value={item?.extraData?.receviedByDept}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(receviedByDept) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          receviedByDept,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Analysis Done Date"
                    value={item?.extraData?.analysisDoneDate}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(analysisDoneDate) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          analysisDoneDate,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Auto Release"
                    value={item?.extraData?.analysisDoneDate}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(analysisDoneDate) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          analysisDoneDate,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="ABNormal"
                    value={item?.extraData?.abNormal}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(abNormal) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          abNormal,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Critical"
                    value={item?.extraData?.critical}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(critical) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          critical,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Rep"
                    value={item?.extraData?.rep}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(rep) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          rep,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Rqid"
                    value={item?.extraData?.eqid}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(eqid) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          eqid,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Eqtype"
                    value={item?.extraData?.eqtype}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(eqtype) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          eqtype,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Method On"
                    value={item?.extraData?.methodOn}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(methodOn) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          methodOn,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Method Name"
                    value={item?.extraData?.methodName}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(methodName) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          methodName,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Porder"
                    value={item?.extraData?.porder}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(porder) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          porder,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Confidential"
                    value={item?.extraData?.confidential}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(confidential) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          confidential,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Workflow"
                    value={item?.extraData?.workflow}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(workflow) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          workflow,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Login Servgrp"
                    value={item?.extraData?.loginServgrp}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(loginServgrp) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          loginServgrp,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Current Servgrp"
                    value={item?.extraData?.currentServgrp}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(currentServgrp) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          currentServgrp,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Routing Status"
                    value={item?.extraData?.routingStatus}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(routingStatus) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          routingStatus,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Recv Time"
                    value={item?.extraData?.recvTime}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(recvTime) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          recvTime,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Out Source Ordno"
                    value={item?.extraData?.outSourceOrdno}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(outSourceOrdno) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          outSourceOrdno,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.Input
                    label=""
                    placeholder="Dept Out Source"
                    value={item?.extraData?.deptOutSource}
                    style={{ width: 100 }}
                    disabled={true}
                    onChange={(deptOutSource) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          deptOutSource,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
                <td>
                  <LibraryComponents.Atoms.Form.MultilineInput
                    rows={4}
                    label=""
                    placeholder="Comment"
                    style={{ width: 200 }}
                    value={item?.extraData?.comment}
                    onChange={(comment) => {
                      const pacakgeListK = patientOrderStore.packageList.pacakgeListK
                      pacakgeListK[index] = Object.assign(item, {
                        extraData: {
                          ...pacakgeListK[index].extraData,
                          comment,
                        },
                      })
                      patientOrderStore.updatePackageList({
                        ...patientOrderStore.packageList,
                        pacakgeListK,
                      })
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    )
  }
)
