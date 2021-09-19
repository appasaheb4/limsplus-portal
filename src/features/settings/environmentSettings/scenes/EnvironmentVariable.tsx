/* eslint-disable */
import React, { useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"

import * as FeatureComponents from "../components"
import { Accordion, AccordionItem } from "react-sanfona"
import "@lp/library/assets/css/accordion.css"
import { Stores } from "../stores"
import { Stores as LoginStore } from "@lp/features/login/stores"
import { useForm, Controller } from "react-hook-form"
import { stores } from "@lp/stores"
import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"
interface EnvironmentVariableProps {
  onModalConfirm?: (item: any) => void
}

const EnvironmentVariable = observer((props: EnvironmentVariableProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  useEffect(() => {
    // if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
    //   Stores.enviromentSettingsStore.updateSessionManagement({
    //     ...Stores.enviromentSettingsStore.sessionManagement,
    //     environment: stores.loginStore.login.environment,
    //   })
    //   setValue("environment", stores.loginStore.login.environment)
    // }
  }, [stores.loginStore.login])

  const onSubmitEnvironmentVariable = () => {
    // api calling
  }
  return (
    <>
      <div className="p-2 rounded-lg shadow-xl">
        <LibraryComponents.Atoms.Grid cols={2}>
          <LibraryComponents.Atoms.List
            direction="col"
            space={4}
            justify="stretch"
            fill
          >
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Input
                  label="Environment Variables"
                  name="txtEnvironmentVariable"
                  hasError={errors.environmentVariable}
                  placeholder={
                    errors.environmentVariable
                      ? "Please Enter Environment Variable"
                      : "Environment Variable"
                  }
                  onChange={(environmentVariable) => {
                    onChange(environmentVariable)
                    Stores.enviromentSettingsStore.updatEnvironmentVariable({
                      ...Stores.enviromentSettingsStore.environmentVariable,
                      environmentVariable: environmentVariable.toUpperCase(),
                    })
                  }}
                />
              )}
              name="environmentVariable"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Category"
                  hasError={errors.category}
                >
                  <select
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.category
                        ? "border-red-500  "
                        : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const category = e.target.value as string
                      onChange(category)
                      Stores.enviromentSettingsStore.updatEnvironmentVariable({
                        ...Stores.enviromentSettingsStore.environmentVariable,
                        category,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {LibraryUtils.lookupItems(
                      stores.routerStore.lookupItems,
                      "ENVIRONMENT_VARIABLES_CATEGORY"
                    ).map((item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="category"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.MultilineInput
                  rows={3}
                  label="Description"
                  name="lblDescription"
                  placeholder={
                    errors.descriptions ? "Please Enter descriptions" : "Description"
                  }
                  hasError={errors.descriptions}
                  //value={Stores.userStore.user.password}
                  onChange={(descriptions) => {
                    onChange(descriptions)
                    Stores.enviromentSettingsStore.updatEnvironmentVariable({
                      ...Stores.enviromentSettingsStore.environmentVariable,
                      descriptions,
                    })
                  }}
                />
              )}
              name="descriptions"
              rules={{ required: false }}
              defaultValue=""
            />
          </LibraryComponents.Atoms.List>
          <LibraryComponents.Atoms.List
            direction="col"
            space={4}
            justify="stretch"
            fill
          >
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Input
                  label="Entered By"
                  placeholder={
                    errors.userId ? "Please Enter Entered By" : "Entered By"
                  }
                  hasError={errors.userId}
                  value={LoginStore.loginStore.login?.userId}
                  disabled={true}
                />
              )}
              name="userId"
              rules={{ required: false }}
              defaultValue=""
            />
          </LibraryComponents.Atoms.List>
        </LibraryComponents.Atoms.Grid>
        <br />
        <LibraryComponents.Atoms.List direction="row" space={3} align="center">
          <LibraryComponents.Atoms.Buttons.Button
            size="medium"
            type="solid"
            icon={LibraryComponents.Atoms.Icon.Save}
            onClick={handleSubmit(onSubmitEnvironmentVariable)}
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
      </div>
      <div
        className="p-2 rounded-lg shadow-xl overflow-scroll"
        style={{ overflowX: "scroll" }}
      >
        <FeatureComponents.Molecules.EnvironmentVariableList
          data={Stores.enviromentSettingsStore.environmentVariableList}
          totalSize={Stores.enviromentSettingsStore.environmentVariableListCount}
          extraData={{
            lookupItems: stores.routerStore.lookupItems,
          }}
          isDelete={RouterFlow.checkPermission(
            toJS(stores.routerStore.userPermission),
            "Delete"
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(stores.routerStore.userPermission),
            "Edit/Modify"
          )}
          onDelete={(selectedUser) =>
            props.onModalConfirm && props.onModalConfirm(selectedUser)
          }
          onSelectedRow={(rows) => {
            props.onModalConfirm &&
              props.onModalConfirm({
                show: true,
                type: "Delete",
                id: rows,
                title: "Are you sure?",
                body: `Delete selected items!`,
              })
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            props.onModalConfirm &&
              props.onModalConfirm({
                show: true,
                type: "Update",
                data: { value, dataField, id },
                title: "Are you sure?",
                body: `Update recoard!`,
              })
          }}
          onPageSizeChange={(page, limit) => {
            // Stores.enviromentSettingsStore.fetchSessionManagementList(page, limit)
          }}
        />
      </div>
    </>
  )
})
export default EnvironmentVariable
