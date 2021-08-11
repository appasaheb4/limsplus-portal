import React, { useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"

import * as Models from "../models"
import * as Utils from "../util"
import {useStores} from '@lp/library/stores'
import { Stores } from "../stores"
import { stores } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const SampleType = observer(() => {
  const {
		loginStore,
	} = useStores();
  const [errors, setErrors] = useState<Models.SampleType>()
  const [errorsMsg, setErrorsMsg] = useState<any>()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)

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
              <LibraryComponents.Atoms.Form.Input
                label="Sample Code"
                placeholder="Sample Code"
                value={Stores.sampleTypeStore.sampleType?.sampleCode}
                onChange={(sampleCode) => {
                  setErrors({
                    ...errors,
                    sampleCode: Utils.validate.single(
                      sampleCode,
                      Utils.sampleType.sampleCode
                    ),
                  })
                  Stores.sampleTypeStore.updateSampleType({
                    ...Stores.sampleTypeStore.sampleType,
                    sampleCode:sampleCode.toUpperCase()
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Sample Type"
                placeholder="Sample Type"
                value={Stores.sampleTypeStore.sampleType?.sampleType}
                onChange={(sampleType) => {
                  setErrors({
                    ...errors,
                    sampleType: Utils.validate.single(
                      sampleType,
                      Utils.sampleType.sampleType
                    ),
                  })
                  Stores.sampleTypeStore.updateSampleType({
                    ...Stores.sampleTypeStore.sampleType,
                    sampleType:sampleType.toUpperCase()
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Sample Group"
                placeholder="Sample Group"
                value={Stores.sampleTypeStore.sampleType?.sampleGroup}
                onChange={(sampleGroup) => {
                  Stores.sampleTypeStore.updateSampleType({
                    ...Stores.sampleTypeStore.sampleType,
                    sampleGroup:sampleGroup.toUpperCase()
                  })
                }}
              />
            </LibraryComponents.Atoms.List>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={5}
                label="Descriptions"
                placeholder="Descriptions"
                value={Stores.sampleTypeStore.sampleType?.descriptions}
                onChange={(descriptions) => {
                  Stores.sampleTypeStore.updateSampleType({
                    ...Stores.sampleTypeStore.sampleType,
                    descriptions,
                  })
                }}
              />
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
                  Stores.sampleTypeStore.sampleType,
                  Utils.sampleType
                )
                setErrorsMsg(error)
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
