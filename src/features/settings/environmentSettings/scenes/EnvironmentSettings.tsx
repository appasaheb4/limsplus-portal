/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import { Accordion, AccordionItem } from "react-sanfona"
import "@lp/library/assets/css/accordion.css"

import { Stores } from "../stores"
import { Stores as UserStore } from "@lp/features/users/stores"
import { Stores as LabStore } from "@lp/features/collection/labs/stores"
import { Stores as RoleStore } from "@lp/features/collection/roles/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"

import { Stores as RootStore } from "@lp/library/stores"

const grid = 8
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "none",
  display: "flex",
  //flexWrap:'none',
  padding: grid,
  overflow: "auto",
})

const EnvironmentSettings = observer(() => {
  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={RootStore.routerStore.selectedComponents?.title || ""}
        />
      </LibraryComponents.Atoms.Header>
      <Accordion allowMultiple>
        {[{ title: "Session" }].map((item) => {
          return (
            <AccordionItem
              title={`${item.title}`}
              expanded={item.title === "Session"}
            >
              {item.title === "Session" && (
                <>
                  <LibraryComponents.Atoms.Grid cols={2}>
                    <LibraryComponents.Atoms.List
                      direction="col"
                      space={4}
                      justify="stretch"
                      fill
                    >
                      <LibraryComponents.Atoms.Form.InputWrapper
                        label="Lab"
                        id="labs"
                      >
                        <LibraryComponents.Molecules.AutocompleteChecked
                          data={{
                            defulatValues: [],
                            list: LabStore.labStore.listLabs,
                            displayKey: "name",
                            findKey: "code",
                          }}
                          onUpdate={(items) => {
                            console.log({ items })
                            // setErrors({
                            //   ...errors,
                            //   lab: Utils.validate.single(
                            //     items,
                            //     Utils.constraintsUser.lab
                            //   ),
                            // })
                            // Stores.userStore.updateUser({
                            //   ...Stores.userStore.user,
                            //   lab: items,
                            // })
                          }}
                        />
                      </LibraryComponents.Atoms.Form.InputWrapper>

                      {UserStore.userStore.userList && (
                        <LibraryComponents.Atoms.Form.InputWrapper
                          label="Users"
                          id="user"
                        >
                          <LibraryComponents.Molecules.AutocompleteChecked
                            data={{
                              defulatValues: [],
                              list: UserStore.userStore.userList,
                              displayKey: "fullName",
                              findKey: "fullName",
                            }}
                            onUpdate={(items) => {
                              console.log({ items })
                              // setErrors({
                              //   ...errors,
                              //   lab: Utils.validate.single(
                              //     items,
                              //     Utils.constraintsUser.lab
                              //   ),
                              // })
                              // Stores.userStore.updateUser({
                              //   ...Stores.userStore.user,
                              //   lab: items,
                              // })
                            }}
                          />
                        </LibraryComponents.Atoms.Form.InputWrapper>
                      )}
                      <LibraryComponents.Atoms.Form.InputWrapper
                        label="Department"
                        id="department"
                      >
                        <LibraryComponents.Molecules.AutocompleteChecked
                          data={{
                            defulatValues: [],
                            list: DepartmentStore.departmentStore.listDepartment,
                            displayKey: "name",
                            findKey: "code",
                          }}
                          onUpdate={(items) => {
                            // setErrors({
                            //   ...errors,
                            //   department: Utils.validate.single(
                            //     items,
                            //     Utils.constraintsUser.department
                            //   ),
                            // })
                            // console.log({ items })
                            // Stores.userStore.updateUser({
                            //   ...Stores.userStore.user,
                            //   department: items,
                            // })
                          }}
                        />
                      </LibraryComponents.Atoms.Form.InputWrapper>
                    </LibraryComponents.Atoms.List>
                  </LibraryComponents.Atoms.Grid>
                </>
              )}
            </AccordionItem>
          )
        })}
      </Accordion>
    </>
  )
})

export default EnvironmentSettings
