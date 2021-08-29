import React, { useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"
import { useForm, Controller } from "react-hook-form"

import { useStores } from "@lp/library/stores"
import { Stores } from "../stores"
import { stores } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"

const Deginisation = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm()
  const { loginStore } = useStores()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddDeginisation, setHideAddDeginisation] = useState<boolean>(true)

  const onSubmitDesginiation = () => {
    if (Stores.deginisationStore.checkExitsCode) {
      Stores.deginisationStore.DeginisationService.addDeginisation(
        Stores.deginisationStore.deginisation
      ).then((res) => {
        if (res.status === 200) {
          LibraryComponents.Atoms.Toast.success({
            message: `😊 Deginisation created.`,
          })
          Stores.deginisationStore.fetchListDeginisation()
          Stores.deginisationStore.clear()
        } else {
          LibraryComponents.Atoms.Toast.error({ message: "😔 Please try again" })
        }
      })
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: "😔 Please ente diff code!",
      })
    }
  }

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={stores.routerStore.selectedComponents?.title || ""}
        />
        <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
      </LibraryComponents.Atoms.Header>
      {RouterFlow.checkPermission(stores.routerStore.userPermission, "Add") && (
        <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
          show={hideAddDeginisation}
          onClick={() => setHideAddDeginisation(!hideAddDeginisation)}
        />
      )}
      <div className=" mx-auto flex-wrap">
        <div
          className={
            "p-2 rounded-lg shadow-xl " + (hideAddDeginisation ? "hidden" : "shown")
          }
        >
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
                    label="Code"
                    id="code"
                    placeholder={errors.code ? "Please Enter Code" : "Code"}
                    hasError={errors.code}
                    value={Stores.deginisationStore.deginisation?.code}
                    onChange={(code) => {
                      onChange(code)
                      Stores.deginisationStore.updateDescription({
                        ...Stores.deginisationStore.deginisation,
                        code,
                      })
                    }}
                    onBlur={(code) => {
                      Stores.deginisationStore.DeginisationService.checkExitsCode(
                        code
                      ).then((res) => {
                        console.log({ res })
                        if (res)
                          if (res.length > 0)
                            Stores.deginisationStore.setExitsCode(true)
                          else Stores.deginisationStore.setExitsCode(false)
                      })
                    }}
                  />
                )}
                name="code"
                rules={{ required: true }}
                defaultValue=""
              />
             
              {Stores.deginisationStore.checkExitsCode && (
                <span className="text-red-600 font-medium relative">
                  Code already exits. Please use other code.
                </span>
              )}

              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Description"
                    name="description"
                    placeholder={
                      errors.description ? "Please Enter Description" : "Description"
                    }
                    hasError={errors.description}
                    value={Stores.deginisationStore.deginisation?.description}
                    onChange={(description) => {
                      onChange(description)
                      Stores.deginisationStore.updateDescription({
                        ...Stores.deginisationStore.deginisation,
                        description,
                      })
                    }}
                  />
                )}
                name="description"
                rules={{ required: true }}
                defaultValue=""
              />
               <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                <select
                  value={Stores.deginisationStore.deginisation?.environment}
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                    errors.environment
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-300"
                  } rounded-md`}
                  onChange={(e) => {
                    const environment = e.target.value
                    onChange(environment)
                    Stores.deginisationStore.updateDescription({
                      ...Stores.deginisationStore.deginisation,
                      environment,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(stores.routerStore.lookupItems, "ENVIRONMENT").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
            )}
            name="environment"
            rules={{ required: true }}
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
              onClick={handleSubmit(onSubmitDesginiation)}
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
        <br />
        <div className="p-2 rounded-lg shadow-xl">
          <FeatureComponents.Molecules.DeginisationList
            data={Stores.deginisationStore.listDeginisation || []}
            totalSize={Stores.deginisationStore.listDeginisationCount}
            extraData={{
              lookupItems: stores.routerStore.lookupItems
            }}
            isDelete={RouterFlow.checkPermission(
              stores.routerStore.userPermission,
              "Delete"
            )}
            isEditModify={RouterFlow.checkPermission(
              stores.routerStore.userPermission,
              "Edit/Modify"
            )}
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
                body: `Update deginisation!`,
              })
            }}
            onPageSizeChange={(page,limit)=>{
              Stores.deginisationStore.fetchListDeginisation(page,limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              Stores.deginisationStore.DeginisationService.deleteDeginisation(
                modalConfirm.id
              ).then((res: any) => {
                if (res.status === 200) {
                  LibraryComponents.Atoms.Toast.success({
                    message: `😊 Deginisation deleted.`,
                  })
                  setModalConfirm({ show: false })
                  Stores.deginisationStore.fetchListDeginisation()
                }
              })
            } else if (type === "Update") {
              Stores.deginisationStore.DeginisationService.updateSingleFiled(
                modalConfirm.data
              ).then((res: any) => {
                if (res.status === 200) {
                  LibraryComponents.Atoms.Toast.success({
                    message: `😊 Deginisation updated.`,
                  })
                  setModalConfirm({ show: false })
                  Stores.deginisationStore.fetchListDeginisation()
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

export default Deginisation
