/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import * as FeatureComponents from "../components"

// import * as Models from "../models"
import * as Utils from "../util"
import Storage from "@lp/library/modules/storage"
import { useForm, Controller } from "react-hook-form"
import {useStores} from '@lp/library/stores'
import { Stores } from "../stores"
//import { Stores as LabStores } from "@lp/features/collection/labs/stores"
import { stores } from "@lp/library/stores"
import { Stores as LoginStore } from "@lp/features/login/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"
import { Stores as LabStore } from "@lp/features/collection/labs/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { Stores as LoginStores } from "@lp/features/login/stores"
import { Stores as DeliveryScheduleStore } from "@lp/features/collection/deliverySchedule/stores"

import { RouterFlow } from "@lp/flows"
import { has, toJS } from "mobx"

const TestMater = observer(() => {
  const {control,
    handleSubmit,
    formState: { errors },
    } = useForm()
  const {
		loginStore,
	} = useStores();
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [hideAddLab, setHideAddLab] = useState<boolean>(true)
  const [lookupItems, setLookupItems] = useState<any[]>([])

  console.log({ LoginStores })

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
        const status = items
          .find((fileds) => {
            return fileds.fieldName === "STATUS"
          })
          ?.arrValue?.find((statusItem) => statusItem.code === "A")
        if (status) {
          Stores.testMasterStore.updateTestMaster({
            ...Stores.testMasterStore.testMaster,
            status: status.code,
          })
        }
        setLookupItems(items)
      }
    }
  }

  useEffect(() => {
    getLookupValues()
  }, [LookupStore.lookupStore.listLookup])

  const onSubmitTestMaster = () =>{
    const error = Utils.validate(
      Stores.testMasterStore.testMaster,
      Utils.testMaster
    )
    if (error === undefined) {
      
      if (
        !Stores.testMasterStore.testMaster?.existsVersionId &&
        !Stores.testMasterStore.testMaster?.existsRecordId
      ) {
        Stores.testMasterStore.testMasterService
          .addTestMaster({
            ...Stores.testMasterStore.testMaster,
            enteredBy: LoginStore.loginStore.login?._id,
          })
          .then(() => {
            
            LibraryComponents.Atoms.Toast.success({
              message: `😊 Test master created.`,
            })
          })
      }else if(
        Stores.testMasterStore.testMaster?.existsVersionId &&
        !Stores.testMasterStore.testMaster?.existsRecordId
      ){
        Stores.testMasterStore.testMasterService
        .versionUpgradeTestMaster({
          ...Stores.testMasterStore.testMaster,
          enteredBy: LoginStore.loginStore.login?._id,
        })
        .then(() => {
          
          LibraryComponents.Atoms.Toast.success({
            message: `😊 Test master version upgrade.`,
          })
        })
      }else if(
        !Stores.testMasterStore.testMaster
        ?.existsVersionId &&
      Stores.testMasterStore.testMaster?.existsRecordId
      ){
        Stores.testMasterStore.testMasterService
        .duplicateTestMaster({
          ...Stores.testMasterStore.testMaster,
          enteredBy: LoginStore.loginStore.login?._id,
        })
        .then(() => {
          
          LibraryComponents.Atoms.Toast.success({
            message: `😊 Test master duplicate created.`,
          })
        })
      }
      setTimeout(() => {
        window.location.reload()
      }, 2000)
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
          <LibraryComponents.Atoms.Grid cols={3}>
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
              label="RLab"
              hasError={errors.rLab}
              >
                <select
                  value={LoginStores.loginStore.login?.lab}
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                    errors.rLab
                      ? "border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const rLab = e.target.value as string
                    onChange(rLab)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      rLab,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LoginStores.loginStore.login?.labList &&
                    LoginStores.loginStore.login?.labList.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {item.name}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="rLab"
              rules={{ required: true }}
              defaultValue=""
             />
            

            <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper 
              label="PLab"
              hasError={errors.pLab}
              >
                <select
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                    errors.pLab
                      ? "border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const pLab = e.target.value as string
                    onChange(pLab)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      pLab,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LabStore.labStore.listLabs.map((item: any, index: number) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="pLab"
              rules={{ required: true }}
              defaultValue=""
             />


            
           <Controller
              control={control}
               render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper 
              label="Department"
              hasError={errors.department}
              >
                <select
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                    errors.department
                      ? "border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const department = e.target.value as string
                    onChange(department)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      department,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {DepartmentStore.departmentStore.listDepartment.map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.code} - ${item.name}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="department"
              rules={{ required: true }}
              defaultValue=""
             />
             <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Section" hasError={errors.section}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.section
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const section = e.target.value as string
                    onChange(section)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      section,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Section 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="section"
              rules={{ required: false }}
              defaultValue=""
             />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Test Code"
                placeholder={errors.testCode?"Please Enter testCode":"Test Code"}
                hasError={errors.testCode}
                value={Stores.testMasterStore.testMaster?.testCode}
                onChange={(testCode) => {
                  onChange(testCode)
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    testCode: testCode.toUpperCase(),
                  })
                }}
              />
              )}
              name="testCode"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Test Name"
                placeholder={errors.testName?"Please Enter testName":"Test Name"}
                hasError={errors.testName}
                value={Stores.testMasterStore.testMaster?.testName}
                onChange={(testName) => {
                  onChange(testName)
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    testName: testName.toUpperCase(),
                  })
                }}
              />
              )}
              name="testName"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={3}
                label="Description"
                placeholder={errors.description?"Please Enter description":"Description"}
                hasError={errors.description}
                value={Stores.testMasterStore.testMaster?.description}
                onChange={(description) => {
                  onChange(description)
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    description,
                  })
                }}
              />
              )}
              name="description"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Short Name"
                placeholder={errors.shortName?"Please Enter shortName":"Short Name"}
                hasError={errors.shortName}
                value={Stores.testMasterStore.testMaster?.shortName}
                onChange={(shortName) => {
                  onChange(shortName)
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    shortName: shortName.toUpperCase(),
                  })
                }}
              />
              )}
              name="shortName"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Price"
                placeholder={errors.price?"Please Enter price":"Price"}
                type="number"
                hasError={errors.price}
                value={Stores.testMasterStore.testMaster?.price}
                onChange={(price) => {
                  onChange(price)
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    price,
                  })
                }}
              />
              )}
              name="price"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Schedule" hasError={errors.schedule}> 
                <select
                 className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                  errors.schedule
                    ? "border-red-500  focus:border-red-500"
                    : "border-gray-200"
                } rounded-md`}
                  onChange={(e) => {
                    const schedule = e.target.value as string
                    onChange(schedule)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      schedule,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {DeliveryScheduleStore.deliveryScheduleStore
                    .listDeliverySchedule &&
                    DeliveryScheduleStore.deliveryScheduleStore.listDeliverySchedule
                      ?.length > 0 &&
                    DeliveryScheduleStore.deliveryScheduleStore.listDeliverySchedule?.map(
                      (item: any, index: number) => (
                        <option key={index} value={item.schCode}>
                          {`${item.schCode}`}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="schedule"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="TAT"
                placeholder={errors.tat?"Please Enter tat":"TAT"}
                value={Stores.testMasterStore.testMaster?.tat}
                onChange={(tat) => {
                  onChange(tat)
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    tat: tat.toUpperCase(),
                  })
                }}
              />
              )}
              name="tat"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Validation Level" hasError={errors.validationLevel}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.validationLevel
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const validationLevel: any = e.target.value
                    onChange(validationLevel)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      validationLevel,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="validationLevel"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Result Order"
                placeholder={errors.resultOrder?"Please Enter resultOrder":"Result Order"}
                hasError={errors.resultOrder}
                value={Stores.testMasterStore.testMaster?.resultOrder}
                onChange={(resultOrder) => {
                  onChange(resultOrder)
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    resultOrder: resultOrder.toUpperCase(),
                  })
                }}
              />
              )}
              name="resultOrder"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Processing" hasError={errors.processing}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.processing
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const processing = e.target.value as
                      | "MANUAL"
                      | "AEMI"
                      | "AUTOMATIC"
                      onChange(processing)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      processing,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["MANUAL", "AEMI", "AUTOMATIC"].map(
                    (item: any, index: number) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="processing"
              rules={{ required: false }}
              defaultValue=""
            />
              <LibraryComponents.Atoms.Grid cols={5}>
                <Controller
                control={control}
                render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                  label="Bill"
                  id="modeBill"
                  hasError={errors.bill}
                  value={Stores.testMasterStore.testMaster?.bill}
                  onChange={(bill) => {
                    onChange(bill)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      bill,
                    })
                  }}
                />
                )}
              name="bill"
              rules={{ required: false }}
              defaultValue=""
            />
                <Controller
                control={control}
                render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                  label="AutoFinish"
                  id="modeAutoFinish"
                  hasError={errors.autoFinish}
                  value={Stores.testMasterStore.testMaster?.autoFinish}
                  onChange={(autoFinish) => {
                    onChange(autoFinish)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      autoFinish,
                    })
                  }}
                />
                )}
              name="autoFinish"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                  label="Hold OOS"
                  id="modeHoldOOS"
                  hasError={errors.holdOOS}
                  value={Stores.testMasterStore.testMaster?.holdOOS}
                  onChange={(holdOOS) => {
                    onChange(holdOOS)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      holdOOS,
                    })
                  }}
                />
                )}
              name="holdOOS"
              rules={{ required: false }}
              defaultValue=""
            />
                <Controller
                control={control}
                render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                  label="Confidential"
                  hasError={errors.confidential}
                  value={Stores.testMasterStore.testMaster?.confidential}
                  onChange={(confidential) => {
                    onChange(confidential)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      confidential,
                    })
                  }}
                />
                )}
              name="confidential"
              rules={{ required: false }}
              defaultValue=""
            />
                <Controller
                control={control}
                render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                  label="Urgent"
                  hasError={errors.urgent}
                  value={Stores.testMasterStore.testMaster?.urgent}
                  onChange={(urgent) => {
                    onChange(urgent)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      urgent,
                    })
                  }}
                />
                )}
              name="urgent"
              rules={{ required: false }}
              defaultValue=""
            />
              </LibraryComponents.Atoms.Grid>
            </LibraryComponents.Atoms.List>

            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              
              {/* <LibraryComponents.Atoms.Form.Input
                label="Report Group"
                placeholder="Report Group"
                value={Stores.testMasterStore.testMaster?.reportGroup}
                onChange={(reportGroup) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    reportGroup,
                  })
                }}
              /> */}
              

              {/* <LibraryComponents.Atoms.Form.Input
                label="Tube Groups"
                placeholder="Tube Groups"
                value={Stores.testMasterStore.testMaster?.tubeGroup}
                onChange={(tubeGroup) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    tubeGroup,
                  })
                }}
              />
              <LibraryComponents.Atoms.Form.Input
                label="Label Instruction"
                placeholder="Label Instruction"
                value={Stores.testMasterStore.testMaster?.labelInstruction}
                onChange={(labelInstruction) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    labelInstruction,
                  })
                }}
              /> */}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Panel Method"
                placeholder={errors.panelMethod?"Please Enter panelMethod":"Panel Method"}
                hasError={errors.panelMethod}
                value={Stores.testMasterStore.testMaster?.panelMethod}
                onChange={(panelMethod) => {
                  onChange(panelMethod)
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    panelMethod,
                  })
                }}
              />
              )}
              name="panelMethod"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Sample Run On" hasError={errors.sampleRunOn}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.sampleRunOn
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const sampleRunOn = e.target.value as "LABID" | "SAMPLEID"
                    onChange(sampleRunOn)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      sampleRunOn,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["LABID", "SAMPLEID"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="sampleRunOn"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Workflow" hasError={errors.workflow}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.workflow
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const workflow = e.target.value as string
                    onChange(workflow)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      workflow,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "WORKFLOW").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="workflow"
              rules={{ required: false }}
              defaultValue=""
            />
              {/* <LibraryComponents.Atoms.Form.Input
                label="Sample Type"
                placeholder="Sample Type"
                value={Stores.testMasterStore.testMaster?.sampleType}
                onChange={(sampleType) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    sampleType,
                  })
                }}
              /> */}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Speical Instruction"
                hasError={errors.speicalInstructions}
                placeholder={errors.speicalInstructions?"Please Enter speicalInstructions":"Speical Instrcution"}
                value={Stores.testMasterStore.testMaster?.speicalInstructions}
                onChange={(speicalInstructions) => {
                  onChange(speicalInstructions)
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    speicalInstructions: speicalInstructions.toUpperCase(),
                  })
                }}
              />
              )}
              name="speicalInstructions"
              rules={{ required: false }}
              defaultValue=""
            />
              {/* <LibraryComponents.Atoms.Form.Input
                label="Disease"
                placeholder="Disease"
                value={Stores.testMasterStore.testMaster?.disease}
                onChange={(disease) => {
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    disease,
                  })
                }}
              /> */}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Disease" hasError={errors.disease}>
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const disease = e.target.value as string
                    onChange(disease)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      disease,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "DISEASE").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="disease"
              rules={{ required: false }}
              defaultValue=""
             />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Category" hasError={errors.category}>
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const category = e.target.value as string
                    onChange(category)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      category,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "CATEGORY").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="category"
              rules={{ required: false }}
              defaultValue=""
             />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Test Type" hasError={errors.testType}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.testType
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const testType = e.target.value as string
                    onChange(testType)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      testType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "TEST_TYPE").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="testType"
              rules={{ required: false }}
              defaultValue=""
             />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Workflow Code" hasError={errors.workflowCode}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.workflowCode
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const workflowCode = e.target.value as string
                    onChange(workflowCode)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      workflowCode,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Workflow Code 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="workflowCode"
              rules={{ required: false }}
              defaultValue=""
             />
              {/* <LibraryComponents.Atoms.Form.InputWrapper label="Worklist Code">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const worklistCode = e.target.value as string
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      worklistCode,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Worklist Code 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper> */}
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="CPT Code"
                placeholder={errors.cptCode?"Please Enter cptCode":"CPT Code"}
                hasError={errors.cptCode}
                value={Stores.testMasterStore.testMaster?.cptCode}
                onChange={(cptCode) => {
                  onChange(cptCode)
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    cptCode: cptCode.toUpperCase(),
                  })
                }}
              />
              )}
                name="cptCode"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Prefix" hasError={errors.prefix}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.prefix
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const prefix = e.target.value
                    onChange(prefix)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      prefix,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "PREFIX").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="prefix"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Sufix" hasError={errors.sufix}>
                <select
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.sufix
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const sufix = e.target.value
                    onChange(sufix)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      sufix,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "SUFIX").map(
                    (item: any, index: number) => (
                      <option key={index} value={item.code}>
                        {`${item.value} - ${item.code}`}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="sufix"
              rules={{ required: false }}
              defaultValue=""
            />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Delevery Schedule"
                placeholder={errors.deleverySchedule?"Please Enter deleverySchedule":"Delevery Schedule"}
                hasError={errors.deleverySchedule}
                value={Stores.testMasterStore.testMaster?.deleverySchedule}
                onChange={(deleverySchedule) => {
                  onChange(deleverySchedule)
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    deleverySchedule: deleverySchedule.toUpperCase(),
                  })
                }}
              />
              )}
                name="deleverySchedule"
                rules={{ required: false }}
                defaultValue=""
              />

              <LibraryComponents.Atoms.Grid cols={5}>
                <Controller
                control={control}
                render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                  label="Instant Result"
                  hasError={errors.instantResult}
                  value={Stores.testMasterStore.testMaster?.instantResult}
                  onChange={(instantResult) => {
                    onChange(instantResult)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      instantResult,
                    })
                  }}
                />
                )}
                name="instantResult"
                rules={{ required: false }}
                defaultValue=""
              />
                <Controller
                control={control}
                render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                  label="Accredited"
                  hasError={errors.accredited}
                  value={Stores.testMasterStore.testMaster?.accredited}
                  onChange={(accredited) => {
                    onChange(accredited)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      accredited,
                    })
                  }}
                />
                )}
                name="accredited"
                rules={{ required: false }}
                defaultValue=""
              />
                <Controller
                control={control}
                render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                  label="Cretical"
                  hasError={errors.cretical}
                  value={Stores.testMasterStore.testMaster?.cretical}
                  onChange={(cretical) => {
                    onChange(cretical)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      cretical,
                    })
                  }}
                />
                )}
                name="cretical"
                rules={{ required: false }}
                defaultValue=""
              />
                <Controller
                control={control}
                render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                  label="Repetition"
                  hasError={errors.repitation}
                  value={Stores.testMasterStore.testMaster?.repitation}
                  onChange={(repitation) => {
                    onChange(repitation)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      repitation,
                    })
                  }}
                />
                )}
                name="repitation"
                rules={{ required: false }}
                defaultValue=""
              />
                <Controller
                control={control}
                render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                  label="Print Label"
                  hasError={errors.printLabel}
                  value={Stores.testMasterStore.testMaster?.printLabel}
                  onChange={(printLabel) => {
                    onChange(printLabel)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      printLabel,
                    })
                  }}
                />
                )}
                name="printLabel"
                rules={{ required: false }}
                defaultValue=""
              />
              </LibraryComponents.Atoms.Grid>
            </LibraryComponents.Atoms.List>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              
              
              {/* <LibraryComponents.Atoms.Form.InputWrapper label="Collection Container">
                <select
                  className="leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const collectionContainer = e.target.value
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      collectionContainer,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {["Collection Container 1"].map((item: any, index: number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper> */}
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Holding Days"
                placeholder={errors.holdingDays?"Please Enter holdingDays":"Holding Days"}
                hasError={errors.holdingDays}
                value={Stores.testMasterStore.testMaster?.holdingDays}
                onChange={(holdingDays) => {
                  onChange(holdingDays)
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    holdingDays: holdingDays.toUpperCase(),
                  })
                }}
              />
              )}
                name="holdingDays"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Status" hasError={errors.status}>
                <select
                  value={Stores.testMasterStore.testMaster?.status}
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.status
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const status = e.target.value
                    onChange(status)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      status,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "STATUS").map(
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
              <LibraryComponents.Atoms.Form.Input
                label="Entered By"
                placeholder={errors.dateCreation?"Please Enter dateCreation":"Entered By"}
                hasError={errors.dateCreation}
                value={LoginStore.loginStore.login?.userId}
                disabled={true}
              />
              )}
                name="dateCreation"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Creation"
                placeholder={errors.dateCreation?"Please Enter dateCreation":"Date Creation"}
                hasError={errors.dateCreation}
                value={LibraryUtils.moment
                  .unix(Stores.testMasterStore.testMaster?.dateCreation || 0)
                  .format("YYYY-MM-DD")}
                disabled={true}
              />
              )}
                name="dateCreation"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Active"
                placeholder={errors.dateActiveFrom?"Please Enter dateActiveFrom":"Date Active"}
                hasError={errors.dateActiveFrom}
                value={LibraryUtils.moment
                  .unix(Stores.testMasterStore.testMaster?.dateActiveFrom || 0)
                  .format("YYYY-MM-DD")}
                disabled={true}
              />
              )}
                name="dateActiveFrom"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputDate
                label="Date Expire"
                placeholder={errors.dateActiveTo?"Please Enter dateActiveTo":"Date Expire"}
                hasError={errors.dateActiveTo}
                value={LibraryUtils.moment
                  .unix(Stores.testMasterStore.testMaster?.dateActiveTo || 0)
                  .format("YYYY-MM-DD")}
                onChange={(e) => {
                  const schedule = new Date(e.target.value)
                  onChange(schedule)
                  Stores.testMasterStore.updateTestMaster({
                    ...Stores.testMasterStore.testMaster,
                    dateActiveTo: LibraryUtils.moment(schedule).unix(),
                  })
                }}
              />
              )}
                name="dateActiveTo"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Version"
                placeholder={errors.version?"Please Enter version":"Version"}
                hasError={errors.version}
                value={Stores.testMasterStore.testMaster?.version}
                disabled={true}
              />
              )}
                name="version"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Key Num"
                placeholder={errors.keyNum?"Please Enter keyNum":"Key Num"}
                hasError={errors.keyNum}
                value={Stores.testMasterStore.testMaster?.keyNum}
                disabled={true}
              />
              )}
                name="keyNum"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                 control={control}
                  render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Environment" hasError={errors.environment}>
                <select
                  value={Stores.testMasterStore.testMaster?.environment}
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.environment
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const environment = e.target.value
                    onChange(environment)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      environment,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {LibraryUtils.lookupItems(lookupItems, "ENVIRONMENT").map(
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
              rules={{ required: false }}
              defaultValue=""
             />
              <LibraryComponents.Atoms.Grid cols={6}>
              <Controller
                 control={control}
                  render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                  label="Method"
                  hasError={errors.method}
                  value={Stores.testMasterStore.testMaster?.method}
                  onChange={(method) => {
                    onChange(method)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      method,
                    })
                  }}
                />
                )}
                name="method"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                 control={control}
                  render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                  label="Cumulative"
                  hasError={errors.cumulative}
                  value={Stores.testMasterStore.testMaster?.cumulative}
                  onChange={(cumulative) => {
                    onChange(cumulative)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      cumulative,
                    })
                  }}
                />
                )}
                name="cumulative"
                rules={{ required: false }}
                defaultValue=""
              />
                <Controller
                 control={control}
                  render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                  label="QC Hold"
                  hasError={errors.qcHold}
                  value={Stores.testMasterStore.testMaster?.qcHold}
                  onChange={(qcHold) => {
                    onChange(qcHold)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      qcHold,
                    })
                  }}
                />
                )}
                 name="qcHold"
                 rules={{ required: false }}
                 defaultValue=""
               />
                <Controller
                 control={control}
                  render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                  label="OOS Hold"
                  hasError={errors.oosHold}
                  value={Stores.testMasterStore.testMaster?.oosHold}
                  onChange={(oosHold) => {
                    onChange(oosHold)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      oosHold,
                    })
                  }}
                />
                )}
               name=" oosHold"
               rules={{ required: false }}
                defaultValue=""
              />
                <Controller
                 control={control}
                  render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                  label="Delta Hold"
                  hasError={errors.deltaHold}
                  value={Stores.testMasterStore.testMaster?.deltaHold}
                  onChange={(deltaHold) => {
                    onChange(deltaHold)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      deltaHold,
                    })
                  }}
                />
                )}
               name="deltaHold"
               rules={{ required: false }}
                defaultValue=""
              />
                <Controller
                 control={control}
                  render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Toggle
                  label="Allow Partial"
                  hasError={errors.allowPartial}
                  value={Stores.testMasterStore.testMaster?.allowPartial}
                  onChange={(allowPartial) => {
                    onChange(allowPartial)
                    Stores.testMasterStore.updateTestMaster({
                      ...Stores.testMasterStore.testMaster,
                      allowPartial,
                    })
                  }}
                />
                )}
               name="allowPartial"
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
              onClick={handleSubmit(onSubmitTestMaster)}
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
          <FeatureComponents.Molecules.TestMasterList
            data={Stores.testMasterStore.listTestMaster || []}
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
            onVersionUpgrade={(item) => {
              setModalConfirm({
                show: true,
                type: "versionUpgrade",
                data: item,
                title: "Are you version upgrade?",
                body: `Version upgrade this record`,
              })
            }}
            onDuplicate={(item) => {
              setModalConfirm({
                show: true,
                type: "duplicate",
                data: item,
                title: "Are you duplicate?",
                body: `Duplicate this record`,
              })
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              
              Stores.testMasterStore.testMasterService
                .deleteTestMaster(modalConfirm.id)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Test master deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.testMasterStore.fetchTestMaster()
                  }
                })
            } else if (type === "Update") {
              
              Stores.testMasterStore.testMasterService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Test master updated.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.testMasterStore.fetchTestMaster()
                    window.location.reload()
                  }
                })
            } else if (type === "versionUpgrade") {
              Stores.testMasterStore.updateTestMaster({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: modalConfirm.data._id,
                existsRecordId: undefined,
                version: modalConfirm.data.version + 1,
                dateActiveFrom: LibraryUtils.moment().unix(),
              })
            } else if (type === "duplicate") {
              Stores.testMasterStore.updateTestMaster({
                ...modalConfirm.data,
                _id: undefined,
                existsVersionId: undefined,
                existsRecordId: modalConfirm.data._id,
                version: 1,
                dateActiveFrom: LibraryUtils.moment().unix(),
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

export default TestMater
