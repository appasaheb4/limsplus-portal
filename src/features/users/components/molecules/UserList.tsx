/* eslint-disable */
import React, { useState ,useEffect} from "react"
import { observer } from "mobx-react"
import dayjs from "dayjs"
import moment from "moment"
import * as LibraryUtils from "@lp/library/utils"

import * as LibraryComponents from "@lp/library/components"
import { useForm, Controller } from "react-hook-form"
import * as LibraryModels from "@lp/library/models"

import { Stores } from "@lp/features/users/stores"
import { toJS } from "mobx"

interface UserListProps {  
  data: any
  totalSize: number
  extraData: any
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedUser: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onUpdateImage?: (value: any, dataField: string, id: string) => void
  onChangePassword?: (id: string)=> void
  onPageSizeChange?: (page:number,totalSize: number) => void
}

export const UserList = observer((props: UserListProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const [labs, setLabs] = useState<any>()
  
  let count = 0

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
              dataField: "userId",
              text: "UserId",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
              editable: false,
            },
            {
              dataField: "empCode",
              text: "Emp Code",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
            },
            {
              dataField: "defaultLab",
              text: "Default Lab",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.InputWrapper
                      label="Default Lab"
                    >
                      <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.defaultLab
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                        onChange={(e) => {
                          const defaultLab = e.target.value
                          props.onUpdateItem &&
                          props.onUpdateItem(defaultLab,column.dataField,row._id)
                        }}
                      >
                        <option selected>Select</option>
                        {props.extraData.listLabs.map(
                          (item: any, index: number) => (
                            <option key={item.name} value={item.code}>
                              {item.name}
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
              sort: true,
              headerStyle: { minWidth: "200px" },
              formatter: (cellContent, row) => (
                <>
                  <ul style={{ listStyle: "inside" }}>
                    {row.lab.map((item, index) => (
                      <li key={index}>{item.code}</li>
                    ))}
                  </ul>
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
                  <LibraryComponents.Molecules.AutocompleteCheck
                    data={{
                      defulatValues: toJS(row.lab),
                      list: props.extraData.listLabs,
                      displayKey: "name",
                      findKey: "code",
                    }}
                    onUpdate={(items) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(items, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            
            {
              dataField: "deginisation",
              text: "Deginisation",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <select
                    name="deginisation"
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.deginisation
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const deginisation = e.target.value

                      props.onUpdateItem &&
                        props.onUpdateItem(deginisation, column.dataField, row._id)
                    }}
                  >
                    <option selected>{row.deginisation}</option>
                    {props.extraData.listDeginisation.map(
                      (item: any, index: number) => (
                        <option key={item.description} value={item.code}>
                          {item.description}
                        </option>
                      )
                    )}
                  </select>
                </>
              ),
            },
            {
              dataField: "department",
              text: "Department",
              sort: true,
              headerStyle: { minWidth: "200px" },
              formatter: (cellContent, row) => (
                <>
                  <ul style={{ listStyle: "inside" }}>
                    {row.department.map((item, index) => (
                      <li key={index}>{item.code}</li>
                    ))}
                  </ul>
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
                  <LibraryComponents.Molecules.AutoCompleteCheckTwoTitleKeys
                    data={{
                      defulatValues: toJS(row.department),
                      list: props.extraData.listDepartment,
                      displayKey: "name",
                      findKey: "code",
                    }}
                    titleKey={{ key1: "code", key2: "name" }}
                    onUpdate={(items) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(items, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "validationLevel",
              text: "Validation Level",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.InputWrapper
                      label="Validation Level"
                    >
                      <select
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.validationLevel
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                        onChange={(e) => {
                          const validationLevel = (e.target.value || 0) as number
                          props.onUpdateItem &&
                          props.onUpdateItem(validationLevel,column.dataField,row._id)
                        }}
                      >
                        <option selected>Select</option>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item: any) => (
                          <option key={item.description} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "workStation",
              text: "Work Station",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
            },
            {
              dataField: "ipAddress",
              text: "IP Address",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
            },
            {
              dataField: "fullName",
              text: "Full Name",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
            },
            {
              dataField: "mobileNo",
              text: "Mobile No",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
            },
            {
              dataField: "contactNo",
              text: "Contact No",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
            },
            {
              dataField: "email",
              text: "Email",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
            },
            {
              dataField: "userDegree",
              text: "User Degree",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
            },
            {
              dataField: "birthDay",
              text: "BirthDay",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
              formatter: (cell, row) => {
                return dayjs.unix(row.exipreDate).format("YYYY-MM-DD")
              },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.InputDate
                      label="Birthday Date"
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.birthDay
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      value={dayjs
                        .unix(row.dateOfBirth || 0)
                        .format("YYYY-MM-DD")}
                      onChange={(e: any) => {
                        let date = new Date(e.target.value)
                          props.onUpdateItem &&
                          props.onUpdateItem(date,column.dataField,row._id)
                      }}
                    />
                </>
              ),
            },
            {
              dataField: "marriageAnniversyDate",
              text: "Marriage Anniversery Date",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
              formatter: (cell, row) => {
                return dayjs.unix(row.exipreDate).format("YYYY-MM-DD")
              },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.InputDate
                      label="Marriage Anniversary Date"
                     
                      value={dayjs
                        .unix(row.dateOfBirth || 0)
                        .format("YYYY-MM-DD")}
                      onChange={(e: any) => {
                        let date = new Date(e.target.value)
                          props.onUpdateItem &&
                          props.onUpdateItem(date,column.dataField,row._id)
                      }}
                    />
                </>
              ),
            },
           
            {
              text: "Exipre Date",
              dataField: "exipreDate",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
              formatter: (cell, row) => {
                return dayjs.unix(row.exipreDate).format("YYYY-MM-DD")
              },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.InputDate
                    label="Exipre Date"
                    id="exipreData"
                    value={dayjs.unix(row.exipreDate).format("YYYY-MM-DD")}
                    onChange={(e: any) => {
                      let date = new Date(e.target.value)
                      props.onUpdateItem &&
                        props.onUpdateItem(
                          dayjs(new Date(date)).unix(),
                          column.dataField,
                          row._id
                        )
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "role",
              text: "Role",
              sort: true,
              headerStyle: { minWidth: "200px" },
              formatter: (cellContent, row) => (
                <>
                  <ul style={{ listStyle: "inside" }}>
                    {row.role.map((item, index) => (
                      <li key={index}>{item.code}</li>
                    ))}
                  </ul>
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
                  <LibraryComponents.Molecules.AutocompleteCheck
                    data={{
                      defulatValues: toJS(row.role),
                      list: props.extraData.listRole,
                      displayKey: "description",
                      findKey: "code",
                    }}
                    onUpdate={(items) => {
                      props.onUpdateItem &&
                        props.onUpdateItem(items, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "confidential",
              text: "Confidential",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
              formatter: (cellContent, row) => (
                <>
                   <LibraryComponents.Atoms.Form.Toggle
                      value={row.confidential}
                      onChange={(confidential) => {
                        props.onUpdateItem &&
                        props.onUpdateItem(confidential,"confidential",row._id)
                      }}
                    />
                </>
              ),
            },
            {
              dataField: "dateCreation",
              text: "Date Creation",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
              editable:false,
              formatter: (cell, row) => {
                return (
                  <>
                     {dayjs
                      .unix(row.dateOfEntry || 0)
                      .format("YYYY-MM-DD")}
                  </>
                )
              },
            },
            {
              dataField: "createdBy",
              text: "Created  By",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
              editable:false,
              
            },
            {
              dataField: "signature",
              text: "Signature",
              csvExport: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <img
                      src={row.signature}
                      alt="signature"
                      className="object-fill h-35 w-40 rounded-md"
                    />
                  </>
                )
              },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.InputFile
                    label="File"
                    placeholder="File"
                    onChange={(e) => {
                      const signature = e.target.files[0]
                      props.onUpdateImage &&
                        props.onUpdateImage(signature, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "picture",
              text: "Picture",
              csvExport: false,
              formatter: (cell, row) => {
                return (
                  <>
                    <img
                      src={row.picture}
                      alt="picture"
                      className="object-fill h-35 w-40 rounded-md"
                    />
                  </>
                )
              },
              editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
              ) => (
                <>
                  <LibraryComponents.Atoms.Form.InputFile
                    label="Picture"
                    onChange={(e) => {
                      const picture = e.target.files[0]
                      props.onUpdateImage &&
                        props.onUpdateImage(picture, column.dataField, row._id)
                    }}
                  />
                </>
              ),
            },
            {
              text: "Status",
              dataField: "status",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
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
                          props.onUpdateItem(status, column.dataField, row._id)
                      }}
                    >   
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "STATUS"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                </>
              ),
            },
            {
              dataField: "environment",
              text: "Environment",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
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
                    className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const environment = e.target.value
                        props.onUpdateItem &&
                        props.onUpdateItem(environment,column.dataField,row._id)
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
              dataField: "confirguration",
              text: "Confirguration",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
              formatter: (cellContent, row) => (
                <>
                   <LibraryComponents.Atoms.Form.Toggle
                      value={row.confirguration}
                      onChange={(confirguration) => {
                        props.onUpdateItem &&
                        props.onUpdateItem(confirguration,"confirguration",row._id)
                      }}
                    />
                </>
              ),
            },
            {
              dataField: "opration",
              text: "Password Re-Send",
              headerStyle: { minWidth: "200px" },
              editable: false,
              csvExport: false,
              formatter: (cellContent, row) => (
                <>
                  <LibraryComponents.Atoms.Buttons.Button
                    size="small"
                    type="outline"
                    icon={LibraryComponents.Atoms.Icon.ReSendPassword}
                    onClick={async () => {
                      Stores.userStore.UsersService.reSendPassword({
                        userId: row.userId,
                        lab: row.lab[0].code,
                        role: row.role[0].code,
                        email: row.email,
                      }).then((res) => {
                        console.log({ res })
                        if (res.status === 200) {
                          LibraryComponents.Atoms.Toast.success({
                            message: `😊 Password re-send successfully.`,
                          })
                        } else {
                          LibraryComponents.Atoms.Toast.error({
                            message: `😔 Password re-send not successfully please try again.`,
                          })
                        }
                      })
                    }}
                  >
                    Send
                  </LibraryComponents.Atoms.Buttons.Button>
                </>
              ),
            },
            {
              dataField: "opration",
              text: "Change Password",
              headerStyle: { minWidth: "200px" },
              csvExport: false,
              editable: false,
              formatter: (cellContent, row) => (
                <>
                <LibraryComponents.Atoms.Buttons.Button
                    size="small"
                    type="outline"
                    icon={LibraryComponents.Atoms.Icon.ReSendPassword}
                    onClick={()=>{
                      props.onChangePassword && props.onChangePassword(row._id)
                    }}
                  >
                    Change Password
                  </LibraryComponents.Atoms.Buttons.Button>
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
                    <LibraryComponents.Atoms.Tooltip tooltipText="Delete">
                      <LibraryComponents.Atoms.Icons.IconContext
                        color="#000"
                        size="20"
                        onClick={() => {
                          console.log("delete")
                          props.onDelete &&
                            props.onDelete({
                              type: "Delete",
                              show: true,
                              id: [row._id],
                              title: "Are you sure?",
                              body: `Delete item`,
                            })
                        }}
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
          fileName="User"
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
        />
      </div>
    </>
  )
})
