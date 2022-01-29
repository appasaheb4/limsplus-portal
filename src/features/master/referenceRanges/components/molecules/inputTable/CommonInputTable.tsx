/* eslint-disable */
import React, { useEffect, useState } from "react"
import { Table } from "reactstrap"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import { observer } from "mobx-react"
import { useStores } from "@lp/stores"
import _ from "lodash"

interface CommonInputTableProps {
  data: any
}

export const CommonInputTable = observer(({ data }: CommonInputTableProps) => {
    const {loading,refernceRangesStore,masterAnalyteStore,departmentStore } = useStores()
  const onRemoveItem = ( index) => {
    
  }
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
                        refernceRangesStore.updateCommonInput({
                          ...refernceRangesStore.commonInput,
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
                        refernceRangesStore.updateCommonInput({
                          ...refernceRangesStore.commonInput,
                          department: item.code,
                        })
                        departmentStore.updateDepartmentList(
                          departmentStore.listDepartmentCopy
                        )
                      }}
                    />
              </td>
              <td>
                {/* <LibraryComponents.Atoms.Form.Input
                  label=""
                  placeholder="Net Amt"
                  type="number"
                  style={{ width: 120 }}
                  value={item.netAmt}
                  disabled={true}
                  onChange={(netAmt) => {
                    const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                    pacakgeListS[index] = Object.assign(item, {
                      netAmt: parseFloat(netAmt),
                    })
                    patientOrderStore.updatePackageList({
                      ...patientOrderStore.packageList,
                      pacakgeListS,
                    })
                  }}
                /> */}
              </td>
              <td>
                {/* <LibraryComponents.Atoms.Form.Input
                  label=""
                  placeholder="Discount"
                  type="number"
                  style={{ width: 120 }}
                  value={item.discount}
                  disabled={true}
                  onChange={(discount) => {
                    const pacakgeListS = patientOrderStore.packageList.pacakgeListS
                    pacakgeListS[index] = Object.assign(item, {
                      discount: parseFloat(discount),
                    })
                    patientOrderStore.updatePackageList({
                      ...patientOrderStore.packageList,
                      pacakgeListS,
                    })
                  }}
                /> */}
              </td>
              <td>
                {/* <LibraryComponents.Atoms.Form.InputDateTime
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
                /> */}
              </td>
              <td>
                {/* <LibraryComponents.Atoms.Form.InputDateTime
                  label=""
                  disabled={true}
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
                /> */}
              </td>
            </tr>
        </tbody>
      </Table>
    </>
  )
})
