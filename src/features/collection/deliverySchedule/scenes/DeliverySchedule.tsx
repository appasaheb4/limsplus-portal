/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import * as FeatureComponents from "../components"
import { useForm, Controller } from "react-hook-form"
import { ScheduleFrequency } from "../components/molecules"

// import * as Models from "../models"
import * as Utils from "../util"
import Storage from "@lp/library/modules/storage"
import {useStores} from '@lp/library/stores'
import { Stores } from "../stores"
import { stores } from "@lp/library/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const DeliverySchedule = observer(() => {
  const {
    control,
    // handleSubmit,
    formState: { errors },
    // setValue,
  } = useForm()
  const {
		loginStore,
	} = useStores();
  // const [errors, setErrors] = useState<Models.DeliverySchedule>()
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
                label="Sch Code"
                placeholder={errors.schCode ? "Please Enter Sch Code" : "Sch Code"}
                hasError={errors.schCode}
                value={Stores.deliveryScheduleStore.deliverySchedule?.schCode}
                onChange={(schCode) => {
                  onChange(schCode)
                  Stores.deliveryScheduleStore.updateDeliverySchedule({
                    ...Stores.deliveryScheduleStore.deliverySchedule,
                    schCode,
                  })
                }}
              />
              )}
               name="schCode"
                rules={{ required: true }}
                 defaultValue=""
               />
               <Controller
                 control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Clock
                label="P Start Time"
                hasError={errors.pStartTime}
                value={Stores.deliveryScheduleStore.deliverySchedule?.pStartTime}
                onChange={(pStartTime) => {
                  onChange(pStartTime)
                  Stores.deliveryScheduleStore.updateDeliverySchedule({
                    ...Stores.deliveryScheduleStore.deliverySchedule,
                    pStartTime,
                  })
                }}
              />
              )}
              name="pStartTime"
               rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                 control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Clock
                label="P End Time"
                hasError={errors.pEndTime}
                value={Stores.deliveryScheduleStore.deliverySchedule?.pEndTime}
                onChange={(pEndTime) => {
                  onChange(pEndTime)
                  Stores.deliveryScheduleStore.updateDeliverySchedule({
                    ...Stores.deliveryScheduleStore.deliverySchedule,
                    pEndTime,
                  })
                }}
              />
              )}
              name="pEndTime"
               rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                 control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Clock
                label="Cutof Time"
                hasError={errors.cutofTime}
                value={Stores.deliveryScheduleStore.deliverySchedule?.cutofTime}
                onChange={(cutofTime) => {
                  onChange(cutofTime)
                  Stores.deliveryScheduleStore.updateDeliverySchedule({
                    ...Stores.deliveryScheduleStore.deliverySchedule,
                    cutofTime,
                  })
                }}
              />
              )}
              name="cutofTime"
               rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                 control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Clock
                label="Secound Cutof Time"
                hasError={errors.secoundCutofTime}
                value={
                  Stores.deliveryScheduleStore.deliverySchedule?.secoundCutofTime
                }
                onChange={(secoundCutofTime) => {
                  onChange(secoundCutofTime)
                  Stores.deliveryScheduleStore.updateDeliverySchedule({
                    ...Stores.deliveryScheduleStore.deliverySchedule,
                    secoundCutofTime,
                  })
                }}
              />
              )}
              name="secoundCutofTime"
               rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                 control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Processing Type" hasError={errors.processingType}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.processingType
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const processingType = e.target.value as string
                    onChange(processingType)
                    console.log({processingType});
                    
                    Stores.deliveryScheduleStore.updateDeliverySchedule({
                      ...Stores.deliveryScheduleStore.deliverySchedule,
                      processingType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "PROCESSING_TYPE").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {LibraryUtils.lookupValue(item)}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
               )}
               name="processingType"
                rules={{ required: false }}
                 defaultValue=""
               />


            <Controller
              control={control}
                render={({ field: { onChange } }) => (
              <ScheduleFrequency
                type={Stores.deliveryScheduleStore.deliverySchedule?.processingType ||''}
                onChnage={(schFrequency)=>{
                  console.log({schFrequency});
                  onChange(schFrequency)
                  Stores.deliveryScheduleStore.updateDeliverySchedule({
                    ...Stores.deliveryScheduleStore.deliverySchedule,
                    schFrequency,
                  })
                }}
              />
              )}
              name="schFrequency"
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
                label="Report on"
                placeholder={errors.reportOn ? "Please Enter ReportOn" : "ReportOn"}
                hasError={errors.reportOn}
                value={Stores.deliveryScheduleStore.deliverySchedule?.reportOn}
                onChange={(reportOn) => {
                  onChange(reportOn)
                  Stores.deliveryScheduleStore.updateDeliverySchedule({
                    ...Stores.deliveryScheduleStore.deliverySchedule,
                    reportOn,
                  })
                }}
              />
              )}
              name="reportOn"
               rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                 control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Dynamic RT"
                placeholder={errors.dynamicRT ? "Please Enter DynamicRT " : "DynamicRT"}
                hasError={errors.dynamicRT}
                value={Stores.deliveryScheduleStore.deliverySchedule?.dynamicRT}
                onChange={(dynamicRT) => {
                  onChange(dynamicRT)
                  Stores.deliveryScheduleStore.updateDeliverySchedule({
                    ...Stores.deliveryScheduleStore.deliverySchedule,
                    dynamicRT,
                  })
                }}
              />
              )}
              name="dynamicRT"
               rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                 control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Dynamic TU" hasError={errors.dynamicTU}>
                <select
                  value={Stores.deliveryScheduleStore.deliverySchedule?.dynamicTU}
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.dynamicTU 
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const dynamicTU = e.target.value
                    onChange(dynamicTU)
                    Stores.deliveryScheduleStore.updateDeliverySchedule({
                      ...Stores.deliveryScheduleStore.deliverySchedule,
                      dynamicTU,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "DYNAMIC_TU").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
               )}
               name="dynamicTU"
                rules={{ required: false }}
                 defaultValue=""
               />

              <Controller
              control={control}
             render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Fixed RT"
                placeholder={errors.fixedRT ? "Please Enter fixedRT" : "fixedRT"}
                hasError={errors.fixedRT}
                value={Stores.deliveryScheduleStore.deliverySchedule?.fixedRT}
                onChange={(fixedRT) => {
                  onChange(fixedRT)
                  Stores.deliveryScheduleStore.updateDeliverySchedule({
                    ...Stores.deliveryScheduleStore.deliverySchedule,
                    fixedRT,
                  })
                }}
              />
              )}
              name="fixedRT"
               rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                 control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Sch For DEPT"
                placeholder={errors.schForDept ? "Please Enter schForDept" : "schForDept"}
                hasError={errors.schForDept}
                value={Stores.deliveryScheduleStore.deliverySchedule?.schForDept}
                onChange={(schForDept) => {
                  onChange(schForDept)
                  Stores.deliveryScheduleStore.updateDeliverySchedule({
                    ...Stores.deliveryScheduleStore.deliverySchedule,
                    schForDept,
                  })
                }}
              />
              )}
              name="schForDept"
               rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                 control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Sch For PAT"
                placeholder={errors.schForPat ? "Please Enter schForPat" : "schForPat"}
                hasError={errors.schForPat}
                value={Stores.deliveryScheduleStore.deliverySchedule?.schForPat}
                onChange={(schForPat) => {
                  onChange(schForPat)
                  Stores.deliveryScheduleStore.updateDeliverySchedule({
                    ...Stores.deliveryScheduleStore.deliverySchedule,
                    schForPat,
                  })
                }}
              />
              )}
              name="schForPat"
               rules={{ required: false }}
                defaultValue=""
              />

              <LibraryComponents.Atoms.Grid cols={5}>
                <Controller
                 control={control}
                render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                  label="Sunday Processing"
                  hasError={errors.sundayProcessing}
                  value={
                    Stores.deliveryScheduleStore.deliverySchedule?.sundayProcessing
                  }
                  onChange={(sundayProcessing) => {
                    onChange(sundayProcessing)
                    Stores.deliveryScheduleStore.updateDeliverySchedule({
                      ...Stores.deliveryScheduleStore.deliverySchedule,
                      sundayProcessing,
                    })
                  }}
                />
                )}
                name="sundayProcessing"
                 rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                 control={control}
                render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                  label="Holiday Processing"
                  hasError={errors.holidayProcessing}
                  value={
                    Stores.deliveryScheduleStore.deliverySchedule?.holidayProcessing
                  }
                  onChange={(holidayProcessing) => {
                    onChange(holidayProcessing)
                    Stores.deliveryScheduleStore.updateDeliverySchedule({
                      ...Stores.deliveryScheduleStore.deliverySchedule,
                      holidayProcessing,
                    })
                  }}
                />
                )}
                name="holidayProcessing"
                 rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                 control={control}
                render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                hasError={errors.sundayReporting}
                  label="Sunday Reporting"
                  value={
                    Stores.deliveryScheduleStore.deliverySchedule?.sundayReporting
                  }
                  onChange={(sundayReporting) => {
                    onChange(sundayReporting)
                    Stores.deliveryScheduleStore.updateDeliverySchedule({
                      ...Stores.deliveryScheduleStore.deliverySchedule,
                      sundayReporting,
                    })
                  }}
                />
                )}
                name="sundayReporting"
                 rules={{ required: false }}
                  defaultValue=""
                />
                <Controller
                 control={control}
                render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                  label="Holiday Reporting"
                  hasError={errors.holidayReporting}
                  value={
                    Stores.deliveryScheduleStore.deliverySchedule?.holidayReporting
                  }
                  onChange={(holidayReporting) => {
                    onChange(holidayReporting)
                    Stores.deliveryScheduleStore.updateDeliverySchedule({
                      ...Stores.deliveryScheduleStore.deliverySchedule,
                      holidayReporting,
                    })
                  }}
                />
                )}
                name="holidayReporting"
                 rules={{ required: false}}
                  defaultValue=""
                />
                <Controller
                 control={control}
                render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                  label="On Time"
                  hasError={errors.onTime}
                  value={Stores.deliveryScheduleStore.deliverySchedule?.onTime}
                  onChange={(onTime) => {
                    onChange(onTime)
                    Stores.deliveryScheduleStore.updateDeliverySchedule({
                      ...Stores.deliveryScheduleStore.deliverySchedule,
                      onTime,
                    })
                  }}
                />
                )}
                name="onTime"
                 rules={{ required: false }}
                  defaultValue=""
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
                  Stores.deliveryScheduleStore.deliverySchedule,
                  Utils.deliverySchedule
                )
                setErrorsMsg(error)
                if (!error) {
                  
                  Stores.deliveryScheduleStore.deliveryScheduleService
                    .addDeliverySchdule(
                      Stores.deliveryScheduleStore.deliverySchedule
                    )
                    .then(() => {
                      
                      LibraryComponents.Atoms.Toast.success({
                        message: `😊 Delivery Schdule record created.`,
                      })
                     setTimeout(() => {
                      window.location.reload()
                     }, 2000);
                    })
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
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <FeatureComponents.Molecules.DeliverySchduleList
            data={Stores.deliveryScheduleStore.listDeliverySchedule || []}
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
              
              Stores.deliveryScheduleStore.deliveryScheduleService
                .deleteDeliverySchdule(modalConfirm.id)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Record deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.deliveryScheduleStore.fetchDeliverySchedule()
                  }
                })
            } else if (type === "Update") {
              
              Stores.deliveryScheduleStore.deliveryScheduleService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Record updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.deliveryScheduleStore.fetchDeliverySchedule()
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

export default DeliverySchedule
