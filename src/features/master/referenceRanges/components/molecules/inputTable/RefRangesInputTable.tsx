/* eslint-disable */
import React, { useEffect, useState } from "react"
import { Table } from "reactstrap"
import * as LibraryComponents from "@lp/library/components"
import { lookupItems } from "@lp/library/utils"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import _ from "lodash"

interface RefRangesInputTableProps {
  data: any
}

export const RefRangesInputTable = observer(({ data }: RefRangesInputTableProps) => {
  const {
    loading,
    refernceRangesStore,
    masterAnalyteStore,
    departmentStore,
    routerStore,
    interfaceManagerStore,
    labStore,
  } = useStores()
  const onRemoveItem = (index) => {}

  return (
    <>
      <Table striped bordered>
        <thead>
          <tr className="p-0 text-xs">
            <th className="text-white sticky left-0 z-10">Analyte</th>
            <th className="text-white">Department</th>
            <th className="text-white">Species</th>
            <th className="text-white">Range_Set_On</th>
            <th className="text-white">Equipment_Type</th>
            <th className="text-white">Lab</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          <tr>
            <td>
              <LibraryComponents.Molecules.AutoCompleteFilterSingleSelectMultiFieldsDisplay
                loader={loading}
                placeholder="Search by code or name"
                data={{
                  list: masterAnalyteStore.listMasterAnalyte,
                  displayKey: ["analyteCode", "analyteName"],
                }}
                onFilter={(value: string) => {
                  masterAnalyteStore.masterAnalyteService.filterByFields({
                    input: {
                      filter: {
                        fields: ["analyteCode", "analyteName"],
                        srText: value,
                      },
                      page: 0,
                      limit: 10,
                    },
                  })
                }}
                onSelect={(item) => {
                  refernceRangesStore.updateReferenceRanges({
                    ...refernceRangesStore.referenceRanges,
                    analyteCode: item.analyteCode,
                    analyteName: item.analyteName,
                  })
                  masterAnalyteStore.updateMasterAnalyteList(
                    masterAnalyteStore.listMasterAnalyteCopy
                  )
                }}
              />
            </td>
            <td>
              <LibraryComponents.Molecules.AutoCompleteFilterSingleSelectMultiFieldsDisplay
                loader={loading}
                placeholder="Search by code or name"
                data={{
                  list: departmentStore.listDepartment,
                  displayKey: ["code", "name"],
                }}
                onFilter={(value: string) => {
                  departmentStore.DepartmentService.filterByFields({
                    input: {
                      filter: {
                        fields: ["code", "name"],
                        srText: value,
                      },
                      page: 0,
                      limit: 10,
                    },
                  })
                }}
                onSelect={(item) => {
                  refernceRangesStore.updateReferenceRanges({
                    ...refernceRangesStore.referenceRanges,
                    department: item.code,
                  })
                  departmentStore.updateDepartmentList(
                    departmentStore.listDepartmentCopy
                  )
                }}
              />
            </td>
            <td>
              <select
                value={refernceRangesStore.referenceRanges?.species}
                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                onChange={(e) => {
                  const species = e.target.value as string
                  refernceRangesStore.updateReferenceRanges({
                    ...refernceRangesStore.referenceRanges,
                    species,
                  })
                }}
              >
                <option selected>Select</option>
                {lookupItems(routerStore.lookupItems, "SPECIES").map(
                  (item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {`${item.value} - ${item.code}`}
                    </option>
                  )
                )}
              </select>
            </td>
            <td>
              <select
                value={refernceRangesStore.referenceRanges?.rangeSetOn}
                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                onChange={(e) => {
                  const rangeSetOn = e.target.value as string
                  refernceRangesStore.updateReferenceRanges({
                    ...refernceRangesStore.referenceRanges,
                    rangeSetOn,
                  })
                }}
              >
                <option selected>Select</option>
                {lookupItems(routerStore.lookupItems, "RANGE_SET_ON").map(
                  (item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {`${item.value} - ${item.code}`}
                    </option>
                  )
                )}
              </select>
            </td>
            <td>
              <LibraryComponents.Molecules.AutoCompleteFilterSingleSelectMultiFieldsDisplay
                loader={loading}
                placeholder="Search by instrumentType"
                data={{
                  list: interfaceManagerStore.listInterfaceManager,
                  displayKey: ["instrumentType"],
                }}
                onFilter={(value: string) => {
                  interfaceManagerStore.interfaceManagerService.filterByFields({
                    input: {
                      filter: {
                        fields: ["instrumentType"],
                        srText: value,
                      },
                      page: 0,
                      limit: 10,
                    },
                  })
                }}
                onSelect={(item) => {
                  refernceRangesStore.updateReferenceRanges({
                    ...refernceRangesStore.referenceRanges,
                    equipmentType: item.instrumentType,
                  })
                  interfaceManagerStore.updateInterfaceManagerList(
                    interfaceManagerStore.listInterfaceManagerCopy
                  )
                }}
              />
            </td>
            <td>
              <LibraryComponents.Molecules.AutoCompleteFilterSingleSelectMultiFieldsDisplay
                loader={loading}
                placeholder="Search by code or name"
                data={{
                  list: labStore.listLabs,
                  displayKey: ["code", "name"],
                }}
                onFilter={(value: string) => {
                  labStore.LabService.filterByFields({
                    input: {
                      filter: {
                        fields: ["code", "name"],
                        srText: value,
                      },
                      page: 0,
                      limit: 10,
                    },
                  })
                }}  
                onSelect={(item) => {
                  refernceRangesStore.updateReferenceRanges({
                    ...refernceRangesStore.referenceRanges,
                    lab: item.code,
                  })
                  labStore.updateLabList(labStore.listLabsCopy)
                }}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  )
})
