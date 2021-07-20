/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import { SalesTeamList } from "../components/molecules"
import * as LibraryUtils from "@lp/library/utils"

import * as Models from "../models"
import * as Utils from "../util"
import Storage from "@lp/library/modules/storage"

import { Stores } from "../stores"
import { stores } from "@lp/library/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"
import { Stores as AdministrativeDivStore } from "@lp/features/collection/administrativeDivisions/stores"
import { Stores as UserStore } from "@lp/features/users/stores"

import { RouterFlow } from "@lp/flows"

export const SalesTeam = observer(() => {
  const [errors, setErrors] = useState<Models.SalesTeam>()
  const [errorsMsg, setErrorsMsg] = useState<any>()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddSection, setHideAddSection] = useState<boolean>(true)
  const [lookupItems, setLookupItems] = useState<any[]>([])

  const getLookupValues = async () => {
    const listLookup = LookupStore.lookupStore.listLookup
    if (listLookup.length > 0) {
      const selectedCategory: any = await Storage.getItem(
        `__persist_mobx_stores_routerStore_SelectedCategory__`
      )
      const items = listLookup.filter((item: any) => {
        if (
          item.documentName.name === selectedCategory.category &&
          item.documentName.children.name === selectedCategory.item
        )
          return item
      })
      if (items) {
        setLookupItems(items)
      }
    }
  }

  useEffect(() => {
    getLookupValues()
  }, [LookupStore.lookupStore.listLookup])

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={stores.routerStore.selectedComponents?.title || ""}
        />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(stores.routerStore.userPermission, "Add") && (
        <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
          show={hideAddSection}
          onClick={() => setHideAddSection(!hideAddSection)}
        />
      )}
      <div className=" mx-auto flex-wrap">
        <div
          className={
            "p-2 rounded-lg shadow-xl " + (hideAddSection ? "shown" : "shown")
          }
        >
          <LibraryComponents.Atoms.Grid cols={2}>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.InputWrapper label="Sales Hierarchy">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const salesHierarchy = e.target.value
                    setErrors({
                      ...errors,
                      salesHierarchy: Utils.validate.single(
                        salesHierarchy,
                        Utils.salesTeam.salesHierarchy
                      ),
                    })
                    Stores.salesTeamStore.updateSalesTeam({
                      ...Stores.salesTeamStore.salesTeam,
                      salesHierarchy,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "SALES_HIERARCHY").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Sales Territory">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const salesTerritory = JSON.parse(e.target.value)
                    Stores.salesTeamStore.updateSalesTeam({
                      ...Stores.salesTeamStore.salesTeam,
                      salesTerritory,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {AdministrativeDivStore.administrativeDivStore
                    .listAdministrativeDiv &&
                    AdministrativeDivStore.administrativeDivStore.listAdministrativeDiv.map(
                      (item: any, index: number) => (
                        <option key={index} value={JSON.stringify(item)}>
                          {`${item.area}`}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Employee code">
                <select
                  //value={Stores.salesTeamStore.salesTeam?.empCode}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const userDetials = JSON.parse(e.target.value) as any
                    Stores.salesTeamStore.updateSalesTeam({
                      ...Stores.salesTeamStore.salesTeam,
                      empCode: userDetials.empCode,
                      empName: userDetials.empName,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {UserStore.userStore.userList &&
                    Utils.filterUsersItems(
                      UserStore.userStore.userList,
                      "role",
                      "code",
                      "SALES"
                    ).map((item: any, index: number) => (
                      <option key={index} value={JSON.stringify(item)}>
                        {`${item.empCode} -${item.empName}`}
                      </option>
                    ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
            </LibraryComponents.Atoms.List>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.InputWrapper label="Employee Name">
                <select
                  //value={Stores.salesTeamStore.salesTeam?.empName}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const userDetials = JSON.parse(e.target.value) as any
                    Stores.salesTeamStore.updateSalesTeam({
                      ...Stores.salesTeamStore.salesTeam,
                      empCode: userDetials.empCode,
                      empName: userDetials.empName,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {UserStore.userStore.userList &&
                    Utils.filterUsersItems(
                      UserStore.userStore.userList,
                      "role",
                      "code",
                      "SALES"
                    ).map((item: any, index: number) => (
                      <option key={index} value={JSON.stringify(item)}>
                        {`${item.empCode} -${item.empName}`}
                      </option>
                    ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Reporting To">
                <select
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const userDetials = JSON.parse(e.target.value) as any
                    Stores.salesTeamStore.updateSalesTeam({
                      ...Stores.salesTeamStore.salesTeam,
                      reportingTo: userDetials.empCode,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {UserStore.userStore.userList &&
                    Utils.filterUsersItems(
                      UserStore.userStore.userList,
                      "role",
                      "code",
                      "SALES"
                    ).map((item: any, index: number) => (
                      <option key={index} value={JSON.stringify(item)}>
                        {`${item.empCode} -${item.empName}`}
                      </option>
                    ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
            </LibraryComponents.Atoms.List>
          </LibraryComponents.Atoms.Grid>
          <br />
          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={() => {
                const error = Utils.validate(
                  Stores.salesTeamStore.salesTeam,
                  Utils.salesTeam
                )
                setErrorsMsg(error)
                if (error === undefined) {
                  
                  Stores.salesTeamStore.salesTeamService
                    .addSalesTeam(Stores.salesTeamStore.salesTeam)
                    .then((res) => {
                      
                      if (res.status === 200) {
                        LibraryComponents.Atoms.Toast.success({
                          message: `😊 Sales team created.`,
                        })
                      }
                    })
                  setTimeout(() => {
                    window.location.reload()
                  }, 2000)
                } else {
                  LibraryComponents.Atoms.Toast.warning({
                    message: `😔 Please enter all information!`,
                  })
                }
              }}
            >
              Save
            </LibraryComponents.Atoms.Buttons.Button>
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="outline"
              icon={LibraryComponents.Atoms.Icon.Remove}
              onClick={() => {
                window.location.reload()
              }}
            >
              Clear
            </LibraryComponents.Atoms.Buttons.Button>
          </LibraryComponents.Atoms.List>
          <div>
            {errorsMsg &&
              Object.entries(errorsMsg).map((item, index) => (
                <h6 className="text-red-700" key={index}>
                  {_.upperFirst(item.join(" : "))}
                </h6>
              ))}
          </div>
        </div>
        <br />
        <div className="p-2 rounded-lg shadow-xl">
          <SalesTeamList
            data={Stores.salesTeamStore.listSalesTeam || []}
            isDelete={RouterFlow.checkPermission(
              stores.routerStore.userPermission,
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              stores.routerStore.userPermission,
              "Edit/Modify"
            )}
            // isEditModify={false}
            onDelete={(selectedItem) => setModalConfirm(selectedItem)}
            onSelectedRow={(rows) => {
              setModalConfirm({
                show: true,
                type: "Delete",
                id: rows,
                title: "Are you sure?",
                body: `Delete selected items!`,
              })
            }}
            onUpdateItem={(value: any, dataField: string, id: string) => {
              setModalConfirm({
                show: true,
                type: "Update",
                data: { value, dataField, id },
                title: "Are you sure?",
                body: `Update Section!`,
              })
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              
              Stores.salesTeamStore.salesTeamService
                .deleteSalesTeam(modalConfirm.id)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Sales team record deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.salesTeamStore.fetchSalesTeam()
                  }
                })
            } else if (type === "Update") {
              
              Stores.salesTeamStore.salesTeamService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Sales team record updated.`,
                    })
                    setModalConfirm({ show: false })
                    window.location.reload()
                  }
                })
            }
          }}
          onClose={() => setModalConfirm({ show: false })}
        />
      </div>
    </>
  )
})
export default SalesTeam
