/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import * as LibraryUtils from "@lp/library/utils"

import * as Models from "../models"
import * as Utils from "../util"
import Storage from "@lp/library/modules/storage"
import { useForm, Controller } from "react-hook-form"
import {useStores} from '@lp/library/stores'
import { Stores } from "../stores"
import { stores } from "@lp/library/stores"
import { Stores as TestMasterStore } from "@lp/features/collection/testMaster/stores"
import { Stores as SampleTypeStore } from "@lp/features/collection/sampleType/stores"
import { Stores as SampleContainerStore } from "@lp/features/collection/sampleContainer/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const TestSampleMapping = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  const {
		loginStore,
	} = useStores();
  // const [errors, setErrors] = useState<Models.TestSampleMapping>()
  const [errorsMsg, setErrorsMsg] = useState<any>()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)
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
      setLookupItems(items)
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
              <LibraryComponents.Atoms.Form.InputWrapper 
              label="Test Code"
              hasError={errors.testCode}
              >
                <select
                 className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                  errors.testCode
                    ? "border-red-500"
                    : "border-gray-200"
                } rounded-md`}
                  onChange={(e) => {
                    const testCode = e.target.value as string
                    onChange(testCode)
                    Stores.testSampleMappingStore.updateSampleType({
                      ...Stores.testSampleMappingStore.testSampleMapping,
                      testCode,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {TestMasterStore.testMasterStore.listTestMaster &&
                    TestMasterStore.testMasterStore.listTestMaster.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.testCode}>
                          {item.testCode}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="testCode"
              rules={{ required: true }}
              defaultValue=""
             />

          <Controller
           control={control}
            render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper 
              label="Sample Code"
              hasError={errors.sampleCode}
              >
                <select
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                    errors.sampleCode
                      ? "border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const sampleCode = e.target.value as string
                    onChange(sampleCode)
                    Stores.testSampleMappingStore.updateSampleType({
                      ...Stores.testSampleMappingStore.testSampleMapping,
                      sampleCode,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {SampleTypeStore.sampleTypeStore.listSampleType &&
                    SampleTypeStore.sampleTypeStore.listSampleType.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.sampleCode}>
                          {item.sampleCode}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="sampleCode"
              rules={{ required: true }}
              defaultValue=""
             />
            
              <LibraryComponents.Atoms.Form.InputWrapper label="Sample Type">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sampleType = e.target.value as string
                    Stores.testSampleMappingStore.updateSampleType({
                      ...Stores.testSampleMappingStore.testSampleMapping,
                      sampleType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {SampleTypeStore.sampleTypeStore.listSampleType &&
                    SampleTypeStore.sampleTypeStore.listSampleType.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.sampleType}>
                          {item.sampleType}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Sample Group">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sampleGroup = e.target.value as string
                    Stores.testSampleMappingStore.updateSampleType({
                      ...Stores.testSampleMappingStore.testSampleMapping,
                      sampleGroup,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {SampleTypeStore.sampleTypeStore.listSampleType &&
                    SampleTypeStore.sampleTypeStore.listSampleType.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.sampleGroup}>
                          {item.sampleGroup}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Coll Container Code">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const collContainerCode = e.target.value as string
                    Stores.testSampleMappingStore.updateSampleType({
                      ...Stores.testSampleMappingStore.testSampleMapping,
                      collContainerCode,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {SampleContainerStore.sampleContainerStore.listSampleContainer &&
                    SampleContainerStore.sampleContainerStore.listSampleContainer.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.containerCode}>
                          {item.containerCode}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Coll Container Name">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const collContainerName = e.target.value as string
                    Stores.testSampleMappingStore.updateSampleType({
                      ...Stores.testSampleMappingStore.testSampleMapping,
                      collContainerName,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {SampleContainerStore.sampleContainerStore.listSampleContainer &&
                    SampleContainerStore.sampleContainerStore.listSampleContainer.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.containerName}>
                          {item.containerName}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>

              <LibraryComponents.Atoms.Form.InputWrapper label="Test Container Code">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const testContainerCode = e.target.value as string
                    Stores.testSampleMappingStore.updateSampleType({
                      ...Stores.testSampleMappingStore.testSampleMapping,
                      testContainerCode,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {SampleContainerStore.sampleContainerStore.listSampleContainer &&
                    SampleContainerStore.sampleContainerStore.listSampleContainer.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.containerCode}>
                          {item.containerCode}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.InputWrapper label="Test Container Name">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const testContainerName = e.target.value as string
                    Stores.testSampleMappingStore.updateSampleType({
                      ...Stores.testSampleMappingStore.testSampleMapping,
                      testContainerName,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {SampleContainerStore.sampleContainerStore.listSampleContainer &&
                    SampleContainerStore.sampleContainerStore.listSampleContainer.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.containerName}>
                          {item.containerName}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="Min Draw Vol"
                placeholder="Min Draw Vol"
                value={Stores.testSampleMappingStore.testSampleMapping?.minDrawVol}
                onChange={(minDrawVol) => {
                  Stores.testSampleMappingStore.updateSampleType({
                    ...Stores.testSampleMappingStore.testSampleMapping,
                    minDrawVol,
                  })
                }}
              />
              <LibraryComponents.Atoms.Grid cols={4}>
                <LibraryComponents.Atoms.Form.Toggle
                  label="Primary Container"
                  value={
                    Stores.testSampleMappingStore.testSampleMapping?.primaryContainer
                  }
                  onChange={(primaryContainer) => {
                    Stores.testSampleMappingStore.updateSampleType({
                      ...Stores.testSampleMappingStore.testSampleMapping,
                      primaryContainer,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Unique Container"
                  value={
                    Stores.testSampleMappingStore.testSampleMapping?.uniqueContainer
                  }
                  onChange={(uniqueContainer) => {
                    Stores.testSampleMappingStore.updateSampleType({
                      ...Stores.testSampleMappingStore.testSampleMapping,
                      uniqueContainer,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Centrifue"
                  value={
                    Stores.testSampleMappingStore.testSampleMapping?.centerIfuge
                  }
                  onChange={(centerIfuge) => {
                    Stores.testSampleMappingStore.updateSampleType({
                      ...Stores.testSampleMappingStore.testSampleMapping,
                      centerIfuge,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Aliquot"
                  value={Stores.testSampleMappingStore.testSampleMapping?.aliquot}
                  onChange={(aliquot) => {
                    Stores.testSampleMappingStore.updateSampleType({
                      ...Stores.testSampleMappingStore.testSampleMapping,
                      aliquot,
                    })
                  }}
                />
              </LibraryComponents.Atoms.Grid>
            </LibraryComponents.Atoms.List>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <LibraryComponents.Atoms.Form.InputWrapper label="Min Draw Vol Unit">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const minDrawVolUnit = e.target.value as string
                    Stores.testSampleMappingStore.updateSampleType({
                      ...Stores.testSampleMappingStore.testSampleMapping,
                      minDrawVolUnit,
                    })
                  }}
                >   
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "MIN_DRAW_VOL_UNIT").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {LibraryUtils.lookupValue(item)}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="Min Test Vol"
                placeholder="Min Test Vol"
                value={Stores.testSampleMappingStore.testSampleMapping?.minTestVol}
                onChange={(minTestVol) => {
                  Stores.testSampleMappingStore.updateSampleType({
                    ...Stores.testSampleMappingStore.testSampleMapping,
                    minTestVol,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Min Test Vol Unit">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const minTestVolUnit = e.target.value as string
                    Stores.testSampleMappingStore.updateSampleType({
                      ...Stores.testSampleMappingStore.testSampleMapping,
                      minTestVolUnit,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "MIN_TEST_VOL_UNIT").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {LibraryUtils.lookupValue(item)}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="Condition"
                placeholder="Condition"
                value={Stores.testSampleMappingStore.testSampleMapping?.condition}
                onChange={(condition) => {
                  Stores.testSampleMappingStore.updateSampleType({
                    ...Stores.testSampleMappingStore.testSampleMapping,
                    condition,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Retention Period"
                placeholder="Retention Period"
                value={
                  Stores.testSampleMappingStore.testSampleMapping?.repentionPeriod
                }
                onChange={(repentionPeriod) => {
                  Stores.testSampleMappingStore.updateSampleType({
                    ...Stores.testSampleMappingStore.testSampleMapping,
                    repentionPeriod,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.InputWrapper label="Repention Units">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const repentionUnits = e.target.value as string
                    Stores.testSampleMappingStore.updateSampleType({
                      ...Stores.testSampleMappingStore.testSampleMapping,
                      repentionUnits,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "RETENTION_UNITS").map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              <LibraryComponents.Atoms.Form.Input
                label="Label Inst"
                placeholder="Label Inst"
                value={Stores.testSampleMappingStore.testSampleMapping?.labelInst}
                onChange={(labelInst) => {
                  Stores.testSampleMappingStore.updateSampleType({
                    ...Stores.testSampleMappingStore.testSampleMapping,
                    labelInst,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Info"
                placeholder="Info"
                value={Stores.testSampleMappingStore.testSampleMapping?.info}
                onChange={(info) => {
                  Stores.testSampleMappingStore.updateSampleType({
                    ...Stores.testSampleMappingStore.testSampleMapping,
                    info,
                  })
                }}
              />
              <LibraryComponents.Atoms.Grid cols={4}>
                <LibraryComponents.Atoms.Form.Toggle
                  label="Lab Specfic"
                  value={Stores.testSampleMappingStore.testSampleMapping?.labSpecfic}
                  onChange={(labSpecfic) => {
                    Stores.testSampleMappingStore.updateSampleType({
                      ...Stores.testSampleMappingStore.testSampleMapping,
                      labSpecfic,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Department Specfic"
                  value={
                    Stores.testSampleMappingStore.testSampleMapping
                      ?.departmentSpecfic
                  }
                  onChange={(departmentSpecfic) => {
                    Stores.testSampleMappingStore.updateSampleType({
                      ...Stores.testSampleMappingStore.testSampleMapping,
                      departmentSpecfic,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Shared Sample"
                  value={
                    Stores.testSampleMappingStore.testSampleMapping?.sharedSample
                  }
                  onChange={(sharedSample) => {
                    Stores.testSampleMappingStore.updateSampleType({
                      ...Stores.testSampleMappingStore.testSampleMapping,
                      sharedSample,
                    })
                  }}
                />
                <LibraryComponents.Atoms.Form.Toggle
                  label="Print Label"
                  value={
                    Stores.testSampleMappingStore.testSampleMapping?.printLabels
                  }
                  onChange={(printLabels) => {
                    Stores.testSampleMappingStore.updateSampleType({
                      ...Stores.testSampleMappingStore.testSampleMapping,
                      printLabels,
                    })
                  }}
                />
              </LibraryComponents.Atoms.Grid>
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
                  Stores.testSampleMappingStore.testSampleMapping,
                  Utils.testSampleMapping
                )
                setErrorsMsg(error)
                if (!error) {
                  
                  Stores.testSampleMappingStore.testSampleMappingService
                    .addTestSampleMapping(
                      Stores.testSampleMappingStore.testSampleMapping
                    )
                    .then(() => {
                      
                      LibraryComponents.Atoms.Toast.success({
                        message: `😊 Test sample mapping created.`,
                      })
                      Stores.testSampleMappingStore.fetchSampleTypeList()
                    })
                } else {
                  LibraryComponents.Atoms.Toast.warning({
                    message: "😔 Please enter all information!",
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
          <FeatureComponents.Molecules.TestSampleMappingList
            data={Stores.testSampleMappingStore.listTestSampleMapping || []}
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
              
              Stores.testSampleMappingStore.testSampleMappingService
                .deleteTestSampleMapping(modalConfirm.id)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Test sample mapping deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.testSampleMappingStore.fetchSampleTypeList()
                  }
                })
            } else if (type === "Update") {
              
              Stores.testSampleMappingStore.testSampleMappingService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Test sample mapping updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.testSampleMappingStore.fetchSampleTypeList()
                    window.location.reload()
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

export default TestSampleMapping
