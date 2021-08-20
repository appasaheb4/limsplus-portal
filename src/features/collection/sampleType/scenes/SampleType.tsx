import React, { useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"

import * as Utils from "../util"
import { useForm, Controller } from "react-hook-form"
import {useStores} from '@lp/library/stores'
import { Stores } from "../stores"
import { stores } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const SampleType = observer(() => {
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm()
  const {
		loginStore,
	} = useStores();
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)

  const onSubmitSampleType = () =>{
    const error = Utils.validate(
      Stores.sampleTypeStore.sampleType,
      Utils.sampleType
    )
    if (!error) {
      
      Stores.sampleTypeStore.sampleTypeService
        .addSampleType(Stores.sampleTypeStore.sampleType)
        .then(() => {
          
          LibraryComponents.Atoms.Toast.success({
            message: `😊 Sample type created.`,
          })
          Stores.sampleTypeStore.fetchSampleTypeList()
        })
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: "😔Please enter all information!",
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
      {RouterFlow.checkPermission(
        toJS(stores.routerStore.userPermission),
        "Add"
      ) && (
        <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
          show={hideAddLab}
          onClick={() => setHideAddLab(!hideAddLab)}
        />
      )}
      <div className="mx-auto flex-wrap">
        <div
          className={"p-2 rounded-lg shadow-xl " + (hideAddLab ? "shown" : "shown")}
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
                label="Sample Code"
                hasError={errors.sampleCode}
                placeholder={errors.sampleCode ? "Please Enter Sample Code" : "Sample Code"}
                value={Stores.sampleTypeStore.sampleType?.sampleCode}
                onChange={(sampleCode) => {
                  onChange(sampleCode)
                  Stores.sampleTypeStore.updateSampleType({
                    ...Stores.sampleTypeStore.sampleType,
                    sampleCode:sampleCode.toUpperCase()
                  })
                }}
              />
              )}
              name="sampleCode"
              rules={{ required: true }}
               defaultValue=""
              />

              <Controller
                 control={control}
                  render={({ field: { onChange } }) => (  
              <LibraryComponents.Atoms.Form.Input
                label="Sample Type"
                hasError={errors.sampleType}
                placeholder={errors.sampleType ? "Please Enter Sample Type" : "Sample Type"}
                value={Stores.sampleTypeStore.sampleType?.sampleType}
                onChange={(sampleType) => {
                 onChange(sampleType)
                  Stores.sampleTypeStore.updateSampleType({
                    ...Stores.sampleTypeStore.sampleType,
                    sampleType:sampleType.toUpperCase()
                  })
                }}
              />
              )}
              name="sampleType"
              rules={{ required: true }}
               defaultValue=""
             />
             <Controller
                 control={control}
                 render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Sample Group"
                placeholder={errors.sampleGroup?"Please Enter sampleGroup":"Sample Group"}
                hasError={errors.sampleGroup}
                value={Stores.sampleTypeStore.sampleType?.sampleGroup}
                onChange={(sampleGroup) => {
                  onChange(sampleGroup)
                  Stores.sampleTypeStore.updateSampleType({
                    ...Stores.sampleTypeStore.sampleType,
                    sampleGroup:sampleGroup.toUpperCase()
                  })
                }}
              />
              )}
              name="sampleGroup"
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
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={5}
                label="Descriptions"
                placeholder={errors.descriptions?"Please Enter descriptions":"Descriptions"}
                hasError={errors.descriptions}
                value={Stores.sampleTypeStore.sampleType?.descriptions}
                onChange={(descriptions) => {
                  onChange(descriptions)
                  Stores.sampleTypeStore.updateSampleType({
                    ...Stores.sampleTypeStore.sampleType,
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
          </LibraryComponents.Atoms.Grid>
          <br />
          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={handleSubmit(onSubmitSampleType)}
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
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <FeatureComponents.Molecules.SampleTypeList
            data={Stores.sampleTypeStore.listSampleType || []}
            isDelete={RouterFlow.checkPermission(
              toJS(stores.routerStore.userPermission),
              "Delete"
            )}   
            isEditModify={RouterFlow.checkPermission(
              toJS(stores.routerStore.userPermission),
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
                body: `Update lab!`,
              })
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              
              Stores.sampleTypeStore.sampleTypeService
                .deleteSampleType(modalConfirm.id)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Sample type deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.sampleTypeStore.fetchSampleTypeList()
                  }
                })
            } else if (type === "Update") {
              
              Stores.sampleTypeStore.sampleTypeService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Sample type updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.sampleTypeStore.fetchSampleTypeList()
                    window.location.reload();
                  }
                })
            }
          }}
          onClose={() => {
            setModalConfirm({ show: false })
          }}
        />
      </div>
    </>
  )
})

export default SampleType
