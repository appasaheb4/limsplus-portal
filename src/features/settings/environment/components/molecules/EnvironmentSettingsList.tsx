/* eslint-disable */
import React, { useState } from "react"
import { observer } from "mobx-react"
import moment from "moment"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"

import * as LibraryModels from "@lp/library/models"

import * as Services from "../../services"

import { Stores as LabStore } from "@lp/features/collection/labs/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { toJS } from "mobx"

interface SessionManagementListProps {
  data: any
  extraData: any
  totalSize: number
  isDelete?: boolean
  isEditModify?: boolean
  onDelete?: (selectedUser: LibraryModels.Confirm) => void
  onSelectedRow?: (selectedItem: any) => void
  onUpdateItem?: (value: any, dataField: string, id: string) => void
  onPageSizeChange?: (page: number, totalSize: number) => void
}

const EnvironmentSettingsList = observer((props: SessionManagementListProps) => {
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
              dataField: "lab",
              text: "Labs",
              sort: true,
              //   filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
              formatter: (cellContent, row) => (
                <>
                  <ul style={{ listStyle: "inside" }}>
                    {row.lab.map((item, index) => (
                      <li key={index}>{item.name}</li>
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
                   
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Lab"
                  id="labs"
                  
                >
                  <LibraryComponents.Molecules.AutocompleteCheck
                    data={{
                      defulatValues: [],
                      list: props.extraData.listLabs,
                      displayKey: "name",
                      findKey: "code",
                    }}
                    // hasError={errors.lab}
                    onUpdate={(items) => {
                      props.onUpdateItem && props.onUpdateItem(items,column.dataField,row._id)
                    }}
                  />
                </LibraryComponents.Atoms.Form.InputWrapper>
              
                </>
              ),
            },
            {
              dataField: "user",
              text: "Users",
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
              formatter: (cellContent, row) => (
                <>
                  <ul style={{ listStyle: "inside" }}>
                    {row.user.map((item, index) => (
                      <li key={index}>{item.fullName}</li>
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
                 <LibraryComponents.Molecules.AutoCompleteFilterMutiSelect
                      loader={props.extraData.loading}
                      data={{
                        list: props.extraData.userFilterList,
                        selected:props.extraData?.users,
                        displayKey: "fullName",
                        findKey: "fullName",
                      }}
                      hasError={props.extraData.user}
                      onUpdate={(item) => {
                        const items = props.extraData?.users
                        // onChange(items)
                        props.extraData.updateEnvironmentSettings({
                          ...props.extraData.environmentSettings,
                          user: items,
                        })
                        
                        props.extraData.updateUserFilterList(props.extraData.userList)
                      }}
                      onFilter={(value: string) => {
                        props.extraData.userFilterByKey({
                          input: { filter: { key: "fullName", value } },
                        })
                      }}
                      onSelect={(item) => {
                        // console.log({ item })
                        let users = row.users
                        if (!item.selected) {
                          if (users && users.length > 0) {
                            users.push(item)
                          }
                          if (!users) users = [item]
                        } else {
                          users = users.filter((items) => {
                            return items._id !== item._id
                          })
                        }
                        props.onUpdateItem && props.onUpdateItem(users,column.dataField,row._id)
                        // console.log({ users })
                        // props.extraData.updateSelectedItems({
                        //   ...props.extraData.selectedItems,
                        //   users,
                        // })
                      }}
                    />
                </>
              ),
            },
            {
              dataField: "department",
              text: "Departments",
              sort: true,
              headerStyle: { minWidth: "200px" },
              formatter: (cellContent, row) => (
                <>
                  <ul style={{ listStyle: "inside" }}>
                    {row.department &&
                      row.department.map((item, index) => (
                        <li key={index}>{item.name}</li>
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
                      defulatValues: toJS(row.department || []),
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
              dataField: "variable",
              text: "Variable",
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
                  label="Variable"
                  
                >
                  <select
                    name="variable"
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 rounded-md`}
                    onChange={(e) => {
                      const variable = e.target.value as string
                      props.onUpdateItem && props.onUpdateItem(variable,column.dataField,row._id)
                    }}
                  >
                    <option selected>Select</option>
                    {props.extraData.environmentVariableList &&
                      props.extraData.environmentVariableList.map(
                        (item: any, index: number) => (
                          <option key={index} value={item.environmentVariable}>
                            {item.environmentVariable}
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
              sort: true,
              filter: LibraryComponents.Organisms.Utils.textFilter(),
              headerStyle: { minWidth: "200px" },
            },
            {
              dataField: "description",
              text: "Description",
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
                  <LibraryComponents.Atoms.Form.MultilineInput
                    rows={5}
                    name="description"
                    placeholder="Description"
                    onBlur={(description) => {
                      if (row.description !== description && description) {
                        props.onUpdateItem &&
                          props.onUpdateItem(description, column.dataField, row._id)
                      }
                    }}
                  />
                </>
              ),
            },
            {
              dataField: "environment",
              text: "Environment",
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
                        props.onUpdateItem &&
                          props.onUpdateItem(environment, column.dataField, row._id)
                      }}
                    >
                      <option selected>Select</option>
                      {LibraryUtils.lookupItems(
                        props.extraData.lookupItems,
                        "ENVIRONMENT"
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
              dataField: "opration",
              text: "Action",
              editable: false,
              csvExport: false,
              hidden: !props.isDelete,
              formatter: (cellContent, row) => (
                <>
                  <div className="flex flex-row">
                    <LibraryComponents.Atoms.Tooltip tooltipText="Delete" position='top'>
                      <LibraryComponents.Atoms.Icons.IconContext
                        color="#fff"
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
              headerClasses: "sticky right-0  bg-gray-500 text-white",
             classes: (cell, row, rowIndex, colIndex) => {
            return "sticky right-0 bg-gray-500"
          },
            },
          ]}
          isEditModify={props.isEditModify}
          isSelectRow={true}
          fileName="Session_Environment_Settings"
          onSelectedRow={(rows) => {
            props.onSelectedRow &&
              props.onSelectedRow(rows.map((item: any) => item._id))
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            console.log({id});
            
            props.onUpdateItem && props.onUpdateItem(value, dataField, id)
          }}
          onPageSizeChange={(page, size) => {
            props.onPageSizeChange && props.onPageSizeChange(page, size)
          }}
        />
      </div>
    </>
  )
})

export default EnvironmentSettingsList
