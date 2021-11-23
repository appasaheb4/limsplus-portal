/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
interface ExtraDataPatientResultProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}
const ExtraDataPatientResultList = observer((props:ExtraDataPatientResultProps)=>{
    return(
        <>
            <div style={{position:'relative'}}>
                <LibraryComponents.Organisms.TableBootstrap
                  id='_id'
                  data={props.data}
                  totalSize={props.totalSize}
                  columns={[
                    {
                        dataField: "_id",
                        text: "Id",
                        hidden: true,
                        csvExport: false
                    },
                    {
                        dataField: "analyteType",
                        text: "Analyte Type",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "picture",
                        text: "Picture",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "testVersion",
                        text: "Test Version",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "analyteVersion",
                        text: "Analyte Version",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "calcFlag",
                        text: "Calc Flag",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "calciName",
                        text: "Calci Name",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "calculation",
                        text: "Calculation",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "formula",
                        text: "Formula",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "reTest",
                        text: "ReTest",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "reRun",
                        text: "ReRun",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "dilutionValue",
                        text: "Dilution Value",
                        headerClasses: "textHeader1",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "repitation",
                        text: "Repitation",
                        headerClasses: "textHeader1",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "instrumentType",
                        text: "Instrument Type",
                        headerClasses: "textHeader1",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "instrumentId",
                        text: "Instrument Id",
                        headerClasses: "textHeader1",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "instrumenttResult",
                        text: "Instrument Result",
                        headerClasses: "textHeader2",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "analyzedDate",
                        text: "Analyzed Date",
                        headerClasses: "textHeader1",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "instrumentUnit",
                        text: "Instrument Unit",
                        headerClasses: "textHeader2",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "confidental",
                        text: "Confidental",
                        sort: true,
                        // filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "workFlow",
                        text: "WorkFlow",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "attachment",
                        text: "Attachment",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "loniCode",
                        text: "LoniCode",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "price",
                        text: "Price",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "resultReportable",
                        text: "Result Reportable",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "rangeReportable",
                        text: "Range Reportable",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "pLaterRunno",
                        text: "PLaterRunno",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "runno",
                        text: "Runno",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "cupno",
                        text: "Cupno",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "species",
                        text: "Species",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "deltaFlag",
                        text: "Delta Flag",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "deltaValue",
                        text: "Delta Value",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "qcFlag",
                        text: "QcFlag",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "qcStatus",
                        text: "Qc Status",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "byPassEln",
                        text: "By Pass Eln",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "color",
                        text: "Color",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "environment",
                        text: "Environment",
                        headerClasses: "textHeader",
                        sort: true,
                        filter: LibraryComponents.Organisms.Utils.textFilter(),
                    },
                    {
                        dataField: "opration",
                        text: "Action",
                        editable: false,
                        csvExport: false,
                        hidden: !props.isDelete,
                        formatter: (cellContent, row) => (   
                          <>
                            <div className="flex flex-row">
                              <LibraryComponents.Atoms.Tooltip tooltipText="Delete">
                                <LibraryComponents.Atoms.Icons.IconContext
                                  color="#000"
                                  size="20"
                                  onClick={() =>
                                    props.onDelete &&
                                    props.onDelete({
                                      type: "delete",
                                      show: true,
                                      id: [row._id],
                                      title: "Are you sure?",
                                      body: `Delete item`,
                                    })
                                  }
                                >
                                  {LibraryComponents.Atoms.Icons.getIconTag(
                                    LibraryComponents.Atoms.Icons.IconBs.BsFillTrashFill
                                  )}
                                </LibraryComponents.Atoms.Icons.IconContext>
                              </LibraryComponents.Atoms.Tooltip>
                            </div>
                          </>
                        ),
                      },
                  ]}
                  isEditModify={props.isEditModify}
                     isSelectRow={true}
                    fileName="ExtraDataPatientResult"
                    onSelectedRow={(rows) => {
                          props.onSelectedRow &&
                         props.onSelectedRow(rows.map((item: any) => item._id))
                    }}
                     onUpdateItem={(value: any, dataField: string, id: string) => {
                          props.onUpdateItem && props.onUpdateItem(value, dataField, id)
                    }}
                />
            </div>
        </>
    )
})
export default ExtraDataPatientResultList