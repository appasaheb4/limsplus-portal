/* eslint-disable */
import React from "react"
import * as LibraryUtils from "@lp/library/utils"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"

interface LibraryListProps {
  data: any
  totalSize: number
  extraData:any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedItem: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onVersionUpgrade?: (item: any) => void
  onDuplicate?: (item: any) => void
  onPageSizeChange?: (page:number,totalSize: number) => void
  onFilter?: (type: string, filter: any, page: number, totalSize: number) => void
}

export const LibraryList = (props: LibraryListProps) => {
 
  const editorCell = (row: any) => {
    return row.status !== "I" ? true : false
  }
  return (
    <>
      <div style={{ position: "relative" }}>
        <LibraryComponents.Organisms.TableBootstrap
          id="_id"
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
              dataField: "code",
              text: "Code",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable:false,
            },
            {
              dataField: "description",
              text: "Description",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "usageType",
              text: "Usage Type",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.InputWrapper label="Usage Type">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const usageType = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(usageType,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(props.extraData.lookupItems, "USAGE_TYPE").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "libraryType",
              text: "Library Type",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                 <LibraryComponents.Atoms.Form.InputWrapper label="Library Type">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const libraryType = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(libraryType,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(props.extraData.lookupItems, "LIBRARY_TYPE").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "commentType",
              text: "Comment Type",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.InputWrapper label="Comment Type">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const commentType = e.target.value
                      props.onUpdateItem && 
                        props.onUpdateItem(commentType,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(props.extraData.lookupItems, "COMMENT_TYPE").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "lab",
              text: "Lab",
              headerClasses: "textHeader1",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.InputWrapper label="Lab">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const lab = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(lab,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {props.extraData.listLabs &&
                    props.extraData.listLabs.map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.code} - ${item.name}`}
                      </option>
                    ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "department",
              text: "Department",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.InputWrapper label="Department">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const department = e.target.value
                      props.onUpdateItem && 
                      props.onUpdateItem(department,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {props.extraData.listDepartment &&
                   props.extraData.listDepartment.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.code} - ${item.name}`}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "commentsTarget",
              text: "CommentsTarget",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.InputWrapper label="Comments Target">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const commentsTarget = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(commentsTarget,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(props.extraData.lookupItems, "COMMENTS_TARGET").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "details",
              text: "Details",
              headerClasses: "textHeader3",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "parameter",
              text: "Parameter",
              headerClasses: "textHeader3",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.InputWrapper label="Parameter">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const parameter = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(parameter,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(props.extraData.lookupItems, "PARAMETER").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "action",
              text: "Action",
              headerClasses: "textHeader2",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.InputWrapper label="Action">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const action = e.target.value
                    props.onUpdateItem &&
                      props.onUpdateItem(action,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(props.extraData.lookupItems, "ACTION").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "results",
              text: "Aesults",
              headerClasses: "textHeader2",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.InputWrapper label="Results">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const results = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(results,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(props.extraData.lookupItems, "RESULTS").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "value",
              text: "Value",
              headerClasses: "textHeader2",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {  
              dataField: "reflex",
              text: "Reflex",
              headerClasses: "textHeader3",
              sort: true,
              //filter: LibraryComponents.Organisms.Utils.textFilter(),
              formatter: (cellContent, row) => (
                <>
                 <div className="flex flex-row">
                    {row.reflex.map((item) => (
                      <div className="mb-2 ml-2">
                        <LibraryComponents.Atoms.Buttons.Button
                          size="medium"
                          type="solid"
                          onClick={() => {}}
                        >
                          {`Panel Name: ${item.panelName} 
                           Panel Code: ${item.panelCode}`}
                        </LibraryComponents.Atoms.Buttons.Button>
                      </div>
                    ))}
                    </div>
                </>
              ),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                   <LibraryComponents.Atoms.Form.InputWrapper label="Reflex">
                <LibraryComponents.Molecules.AutoCompleteCheckMultiFilterKeys
                  placeholder="Search by panel name or panel code"
                  data={{
                    defulatValues: [],
                    list: props.extraData.listMasterPanel || [],
                    displayKey: ["panelName", "panelCode"],
                    findKey: ["panelName", "panelCode"],
                  }}
                  onUpdate={(items) => {
                    props.onUpdateItem &&
                      props.onUpdateItem(items,column.dataField,row._id)
                  }}
                />
              </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "analyte",
              text: "Analyte",
              headerClasses: "textHeader2",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "rule",
              text: "Rule",
              headerClasses: "textHeader2",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "abNormal",
              text: "AbNormal",
              sort: true,
              formatter: (cell, row) => {
                return <>  <LibraryComponents.Atoms.Form.Toggle
               
                value={row.abNormal}
                onChange={(abNormal) => {
                  props.onUpdateItem &&
                    props.onUpdateItem(abNormal,'abNormal',row._id)
                }}
              /></>
              },
             
            },
            {
              dataField: "status",
              text: "Status",
              headerClasses: "textHeader2",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.InputWrapper label="Status">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const status = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(status,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(props.extraData.lookupItems, "STATUS").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "organismGroup",
              text: "Organism Group",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "organismClass",
              text: "Organism Class",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "loAge",
              text: "LO Age",
              headerClasses: "textHeader2",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "hiAge",
              text: "HI Age",
              headerClasses: "textHeader2",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
            },
            {
              dataField: "sex",
              text: "Sex",
              headerClasses: "textHeader2",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.InputWrapper label="Sex">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sex = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(sex,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(props.extraData.lookupItems, "SEX").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "sexAction",
              text: "Sex Action",
              headerClasses: "textHeader4",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editable: (content, row, rowIndex, columnIndex) => editorCell(row),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.InputWrapper label="Sex Action">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sexAction = e.target.value
                      props.onUpdateItem &&
                        props.onUpdateItem(sexAction,column.dataField,row._id)
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(props.extraData.lookupItems, "SEX_ACTION").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "environment",
              text: "Environment",
              headerClasses: "textHeader3",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                    <select
                      value={row.environment}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                      onChange={(e) => {
                        const environment = e.target.value
                        props.onUpdateItem && props.onUpdateItem(environment,column.dataField,row._id)
                        
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(props.extraData.lookupItems, "ENVIRONMENT").map(
                        (item: any, index: number) => (
                          <option key={index} value={item.code}>
                            {`${item.value} - ${item.code}`}
                          </option>
                        )
                      )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
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
                    <LibraryComponents.Atoms.Tooltip tooltipText="Delete" position="top">
                      <LibraryComponents.Atoms.Icons.IconContext
                        color="#fff"
                        size="20"
                        onClick={() =>
                          props.onDelete &&
                          props.onDelete({
                            type: "Delete",
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
              headerClasses: "sticky right-0  bg-gray-500 text-white",
          classes: (cell, row, rowIndex, colIndex) => {
            return "sticky right-0 bg-gray-500"
          },
            },
          ]}
          isEditModify={props.isEditModify}
          isSelectRow={true}
          fileName="Library"
          onSelectedRow={(rows) => {
            props.onSelectedRow &&
              props.onSelectedRow(rows.map((item: any) => item._id))
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            props.onUpdateItem && props.onUpdateItem(value, dataField, id)
          }}
          onPageSizeChange={(page,size)=>{
            props.onPageSizeChange && props.onPageSizeChange(page,size)
          }}
          onFilter={(type, filter, page, size) => {
            props.onFilter && props.onFilter(type, filter, page, size)
          }}
        />
      </div>
    </>
  )
}
