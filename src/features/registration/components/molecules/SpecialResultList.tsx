/* eslint-disable */
import React from "react"
import { observer } from "mobx-react"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
interface SpecialResultProps {
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
}
const SpecialResultList = observer((props:SpecialResultProps)=>{
    return(
        <>
          <div style={{position:'relative'}}>
            <LibraryComponents.Organisms.TableBootstrap
              id='_id'
              data = {props.data}
              totalSize={props.totalSize}
              columns={[
                {
                  dataField: "_id",
                  text: "Id",
                  hidden: true,
                  csvExport: false
                },
                {
                  dataField: "visitId",
                  text: "Visit Id",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "patientResult",
                  text: "Patient Result",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "analyteCode",
                  text: "Analyte Code",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "resultType",
                  text: "Result Type",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "lineNo",
                  text: "Line No",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "resultTest",
                  text: "Result Test",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "ruler",
                  text: "Ruler",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "abNormal",
                  text: "Ab Normal",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "enteredBy",
                  text: "Entered By",
                  sort: true,
                  filter: LibraryComponents.Organisms.Utils.textFilter(),
                },
                {
                  dataField: "environment",
                  text: "Environment",
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
              fileName="SpecialResult"
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
export default SpecialResultList