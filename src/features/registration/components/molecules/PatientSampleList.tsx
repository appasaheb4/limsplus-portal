/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
interface PatientSampleListProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}
const PatientSampleList  = observer((props:PatientSampleListProps)=>{
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
                  csvExport: false,
                },
                {
                  dataField: "specimenId",
                  text: "Specimen Id",
                  headerClasses: "textHeader1",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  
                },
                {
                  dataField: "pLab",
                  text: "PLab",
                  headerClasses: "textHeader1",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  
                },
                {
                  dataField: "rLab",
                  text: "RLab",
                  headerClasses: "textHeader1",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  
                },
                {
                  dataField: "outSourceLab",
                  text: "Out Source Lab",
                  headerClasses: "textHeader2",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  
                },
                {
                  dataField: "outSourceStatus",
                  text: "Out Source Status",
                  headerClasses: "textHeader2",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  
                },
                {
                  dataField: "department",
                  text: "Department",
                  headerClasses: "textHeader1",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  
                },
                {
                  dataField: "section",
                  text: "Section",
                  headerClasses: "textHeader1",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  
                },
                {
                  dataField: "containerId",
                  text: "Container Id",
                  headerClasses: "textHeader1",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  
                },
                {
                  dataField: "sampleType",
                  text: "Sample Type",
                  headerClasses: "textHeader2",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  
                },
                {
                  dataField: "receivedDate",
                  text: "Received Date",
                  headerClasses: "textHeader1",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  
                },
                {
                  dataField: "collectionDate",
                  text: "Collection Date",
                  headerClasses: "textHeader2",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  
                },
                {
                  dataField: "methodCollection",
                  text: "Method Collection",
                  headerClasses: "textHeader1",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  
                },
                {
                  dataField: "dateCollection",
                  text: "Date Collection",
                  headerClasses: "textHeader2",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  
                },
                {
                  dataField: "status",
                  text: "Status",
                  headerClasses: "textHeader1",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                  
                },
                {
                  dataField: "environment",
                  text: "Environment",
                  headerClasses: "textHeader1",
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
              fileName="PatientOrder"
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
export default PatientSampleList