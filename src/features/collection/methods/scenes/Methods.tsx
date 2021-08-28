/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"
import Storage from "@lp/library/modules/storage"
import { useForm, Controller } from "react-hook-form"
import {useStores} from '@lp/library/stores'
import { Stores } from "../stores"
import { stores } from "@lp/library/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

import { RouterFlow } from "@lp/flows"

const Methods = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const {
		loginStore,
	} = useStores();
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddSection, setHideAddSection] = useState<boolean>(true)


  const onSubmitMethods = () =>{
    if (Stores.methodsStore.methods) {
      
      Stores.methodsStore.methodsService
        .addMethods(Stores.methodsStore.methods)
        .then((res) => {
          
          if (res.status === 200) {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 Methods created.`,
            })
            Stores.methodsStore.fetchMethods()
          }
        })
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: `😔 Please enter all information!`,
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
              <Controller
               control={control}
                 render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Method Code"
                placeholder={errors.methodsCode ? "Please Enter Method Code" : "Method Code"}
                hasError={errors.methodsCode}
                value={Stores.methodsStore.methods?.methodsCode}
                onChange={(methodsCode) => {
                 onChange(methodsCode)
                  Stores.methodsStore.updateMethods({
                    ...Stores.methodsStore.methods,
                    methodsCode,
                  })
                }}
              />
              )}
               name="methodCode"
                rules={{ required: true }}
                defaultValue=""
             />

              <Controller
                control={control}
                 render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Method Name"
                placeholder={errors.methodsName ? "Please Enter Methods Name" : "Methods Name"}
                value={Stores.methodsStore.methods?.methodsName}
                onChange={(methodsName) => {
                  onChange(methodsName)
                  Stores.methodsStore.updateMethods({
                    ...Stores.methodsStore.methods,
                    methodsName,
                  })
                }}
              />
              )}
              name="methodName"
            rules={{ required: true }}
            defaultValue=""
            />
            <Controller
               control={control}
                 render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={4}
                label="Description"
                placeholder={errors.description?"Please Enter  Description":"Description"}
                hasError={errors.description}
                value={Stores.methodsStore.methods?.description}
                onChange={(description) => {
                  onChange( description)
                  Stores.methodsStore.updateMethods({
                    ...Stores.methodsStore.methods,
                    description,
                  })
                }}
              />
              )}
               name=" description"
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
              <LibraryComponents.Atoms.Form.InputWrapper label="Status" hasError={errors.status}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.status
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const status = e.target.value
                    onChange(status)
                    Stores.methodsStore.updateMethods({
                      ...Stores.methodsStore.methods,
                      status,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(stores.routerStore.lookupItems, "STATUS").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="status"
               rules={{ required: false }}
               defaultValue=""
            />
             <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                <select
                  value={Stores.methodsStore.methods?.environment}
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.environment
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const environment = e.target.value
                    onChange(environment)
                    Stores.methodsStore.updateMethods({
                      ...Stores.methodsStore.methods,
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
              onClick={handleSubmit(onSubmitMethods)}
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
          <FeatureComponents.Molecules.MethodsList
            data={Stores.methodsStore.listMethods || []}
            totalSize={Stores.methodsStore.listMethodsCount}
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
            onPageSizeChange={(page,limit)=>{
              Stores.methodsStore.fetchMethods(page,limit)
            }}

          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              
              Stores.methodsStore.methodsService
                .deleteMethods(modalConfirm.id)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Methods record deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.methodsStore.fetchMethods()
                  }
                })
            } else if (type === "Update") {
              
              Stores.methodsStore.methodsService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Methods record updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.methodsStore.fetchMethods()
                    window.location.reload();
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

export default Methods
