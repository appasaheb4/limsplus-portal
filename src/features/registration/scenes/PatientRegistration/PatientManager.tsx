/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import { Accordion, AccordionItem } from "react-sanfona"
import "@lp/library/assets/css/accordion.css"
import * as Utils from "../../utils"
import * as Models from "../../models"

import { Stores } from "../../stores"
import { Stores as UserStore } from "@lp/features/users/stores"
import { Stores as LabStore } from "@lp/features/collection/labs/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { Stores as RootStore } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

interface PatientManagerProps {
  onModalConfirm?: (item: any) => void
}

const PatientManager = observer((props: PatientManagerProps) => {
  const [errors, setErrors] = useState<Models.SessionManagement>()
  return (
    <>
      <div className="p-2 rounded-lg shadow-xl">
        <LibraryComponents.Atoms.Grid cols={3}>
          <LibraryComponents.Atoms.List
            direction="col"
            space={4}
            justify="stretch"
            fill
          >
              <LibraryComponents.Atoms.Form.Input
              label="INTERNAL PID"
              name="txtInternalPid"
              placeholder="INTERNAL PID"
              //value={Stores.userStore.user.password}
              onChange={(value) => {
                setErrors({
                  ...errors,
                  value: Utils.validate.single(
                    value,
                    Utils.constraintsSessionManagement.value
                  ),
                })
                // Stores.enviromentSettingsStore.updateSessionManagement({
                //   ...Stores.enviromentSettingsStore.sessionManagement,
                //   value,
                // })
              }}
            />
            <LibraryComponents.Atoms.Form.InputWrapper label="Lab" id="labs">
              <LibraryComponents.Molecules.AutocompleteChecked
                data={{
                  defulatValues: [],
                  list: LabStore.labStore.listLabs,
                  displayKey: "name",
                  findKey: "code",
                }}
                onUpdate={(items) => {
                  setErrors({
                    ...errors,
                    lab: Utils.validate.single(
                      items,
                      Utils.constraintsSessionManagement.lab
                    ),
                  })
                  // Stores.enviromentSettingsStore.updateSessionManagement({
                  //   ...Stores.enviromentSettingsStore.sessionManagement,
                  //   lab: items,
                  // })
                }}
              />
            </LibraryComponents.Atoms.Form.InputWrapper>

            
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
                  setErrors({
                    ...errors,
                    department: Utils.validate.single(
                      items,
                      Utils.constraintsSessionManagement.department
                    ),
                  })
                  // Stores.enviromentSettingsStore.updateSessionManagement({
                  //   ...Stores.enviromentSettingsStore.sessionManagement,
                  //   department: items,
                  // })
                }}
              />
            </LibraryComponents.Atoms.Form.InputWrapper>
            <LibraryComponents.Atoms.Form.InputWrapper
              label="Variable"
              id="lblVariable"
            >
              <select
                name="variable"
                className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                onChange={(e) => {
                  const variable = e.target.value as string
                  setErrors({
                    ...errors,
                    variable: Utils.validate.single(
                      variable,
                      Utils.constraintsSessionManagement.variable
                    ),
                  })
                  // Stores.enviromentSettingsStore.updateSessionManagement({
                  //   ...Stores.enviromentSettingsStore.sessionManagement,
                  //   variable,
                  // })
                }}
              >
                <option selected>Select</option>
                {["SESSION_TIMEOUT", "SESSION_ALLOWED"].map(
                  (item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  )
                )}
              </select>
            </LibraryComponents.Atoms.Form.InputWrapper>
          </LibraryComponents.Atoms.List>
          <LibraryComponents.Atoms.List
            direction="col"
            space={4}
            justify="stretch"
            fill
          >
            <LibraryComponents.Atoms.Form.Input
              label="Value"
              name="lblValue"
              placeholder="Value"
              type="number"
              //value={Stores.userStore.user.password}
              onChange={(value) => {
                setErrors({
                  ...errors,
                  value: Utils.validate.single(
                    value,
                    Utils.constraintsSessionManagement.value
                  ),
                })
                // Stores.enviromentSettingsStore.updateSessionManagement({
                //   ...Stores.enviromentSettingsStore.sessionManagement,
                //   value,
                // })
              }}
            />
            <LibraryComponents.Atoms.Form.MultilineInput
              rows={7}
              label="Description"
              name="lblDescription"
              placeholder="Description"
              //value={Stores.userStore.user.password}
              onChange={(descriptions) => {
                // Stores.enviromentSettingsStore.updateSessionManagement({
                //   ...Stores.enviromentSettingsStore.sessionManagement,
                //   descriptions,
                // })
              }}
            />
          </LibraryComponents.Atoms.List>
        </LibraryComponents.Atoms.Grid>
      </div>
      <br />

      <LibraryComponents.Atoms.List direction="row" space={3} align="center">
        <LibraryComponents.Atoms.Buttons.Button
          size="medium"
          type="solid"
          icon={LibraryComponents.Atoms.Icon.Save}
          onClick={() => {
            // if (
            //   Utils.validate(
            //     Stores.enviromentSettingsStore.sessionManagement,
            //     Utils.constraintsSessionManagement
            //   ) === undefined
            // ) {
            //   RootStore.rootStore.setProcessLoading(true)
            //   Stores.enviromentSettingsStore.EnvironmentSettingsService.addSessionManagement(
            //     Stores.enviromentSettingsStore
            //       .sessionManagement as Models.SessionManagement
            //   ).then((res) => {
            //     RootStore.rootStore.setProcessLoading(false)
            //     if (res.status === 201) {
            //       LibraryComponents.Atoms.ToastsStore.success(`Session created.`)
            //       // Stores.userStore.clear()
            //       // Stores.userStore.loadUser()
            //       setTimeout(() => {
            //         window.location.reload()
            //       }, 2000)
            //     } else {
            //       LibraryComponents.Atoms.ToastsStore.warning(
            //         "Session not create.Please try again"
            //       )
            //     }
            //   })
            // } else {
            //   LibraryComponents.Atoms.ToastsStore.warning(
            //     "Please enter all information!"
            //   )
            // }
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
      <div
        className="p-2 rounded-lg shadow-xl overflow-scroll"
        style={{ overflowX: "scroll" }}
      ></div>
    </>
  )
})
export default PatientManager
