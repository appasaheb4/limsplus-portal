/* eslint-disable */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"

import {SectionList} from '../components/molecules'
import Storage from "@lp/library/modules/storage"
import {useStores} from '@lp/library/stores'
import { useForm, Controller } from "react-hook-form"
import { Stores } from "../stores"
import { stores } from "@lp/library/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { Stores as LookupStore } from "@lp/features/collection/lookup/stores"

import { RouterFlow } from "@lp/flows"

const Section = observer(() => {
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
  

  const onSubmitSection = () =>{
    if (Stores.sectionStore.section) {
      
      Stores.sectionStore.sectionService
        .addSection(Stores.sectionStore.section)
        .then((res) => {
          
          if (res.status === 200) {
            LibraryComponents.Atoms.Toast.success({
              message: `😊 Section created.`,
            })
          } else {
            LibraryComponents.Atoms.Toast.error({
              message: `😔 Please try again`,
            })
          }
        })
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } else {
      LibraryComponents.Atoms.Toast.error({
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
              <LibraryComponents.Atoms.Form.InputWrapper 
              label="Department Code"
              hasError={errors.departmentCode}
              >
                <select
                  className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                    errors.departmentCode
                      ? "border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const departmentCode = e.target.value as string
                    onChange(departmentCode)
                    Stores.sectionStore.updateSection({
                      ...Stores.sectionStore.section,
                      departmentCode,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {DepartmentStore.departmentStore.listDepartment &&
                    DepartmentStore.departmentStore.listDepartment.map(
                      (item: any, key: number) => (
                        <option key={key} value={item.code}>
                          {`${item.code} - ${item.name}`}
                        </option>
                      )
                    )}
                </select>
              </LibraryComponents.Atoms.Form.InputWrapper>
              )}
              name="departmentCode"
              rules={{ required: true }}
              defaultValue=""
             />

          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Code"
                id="code"
                hasError={errors.code}
                placeholder={errors.code ? "Please Enter Code" : "Code"}
                value={Stores.sectionStore.section?.code}
                onChange={(code) => {
                  onChange(code)
                  Stores.sectionStore.updateSection({
                    ...Stores.sectionStore.section,
                    code,
                  })
                }}
              />
              )}
              name="code"
              rules={{ required: true }}
              defaultValue=""
              />

            <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Name"
                hasError={errors.name}
                placeholder={errors.name ? "Please Enter Name" : "Name"}
                value={Stores.sectionStore.section?.name}
                onChange={(name) => {
                  onChange(name)
                  Stores.sectionStore.updateSection({
                    ...Stores.sectionStore.section,
                    name,
                  })
                }}
              />
              )}
             name="name"
             rules={{ required: true }}
             defaultValue=""
             />

            <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                label="Short Name"
                placeholder={errors.shortName?"Please Enter shortName":"Short Name"}
                hasError={errors.shortName}
                value={Stores.sectionStore.section?.shortName}
                onChange={(shortName) => {
                  onChange(shortName)
                  Stores.sectionStore.updateSection({
                    ...Stores.sectionStore.section,
                    shortName,
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
                label="Section In Charge"
                placeholder={errors.sectionInCharge?"Please Enter sectionInCharge":"Section In Charge"}
                hasError={errors.sectionInCharge}
                value={Stores.sectionStore.section?.sectionInCharge}
                onChange={(sectionInCharge) => {
                  onChange(sectionInCharge)
                  Stores.sectionStore.updateSection({
                    ...Stores.sectionStore.section,
                    sectionInCharge,
                  })
                }}
              />
              )}
             name="sectionInCharge"
             rules={{ required: false }}
             defaultValue=""
             />
             <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                type="number"
                label="Mobile No"
                placeholder={errors.mobieNo?"Please Enter mobieNo":"Mobile No"}
                value={Stores.sectionStore.section?.mobieNo}
                hasError={errors.mobieNo}
                onChange={(mobieNo) => {
                  onChange(mobieNo)
                  Stores.sectionStore.updateSection({
                    ...Stores.sectionStore.section,
                    mobieNo,
                  })
                }}
              />
              )}
             name="mobieNo"
             rules={{ required: false }}
             defaultValue=""
             />
             <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.Input
                type="number"
                label="Contact No"
                placeholder={errors.contactNo?"Please Enter contactNo":"Contact No"}
                hasError={errors.contactNo}
                value={Stores.sectionStore.section?.contactNo}
                onChange={(contactNo) => {
                  onChange(contactNo)
                  Stores.sectionStore.updateSection({
                    ...Stores.sectionStore.section,
                    contactNo,
                  })
                }}
              />
              )}
              name="contactNo"
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
                rows={3}
                label="FYI line"
                placeholder={errors.fyiLine?"Please Enter fyiLine":"FYI line"}
                value={Stores.sectionStore.section?.fyiLine}
                onChange={(fyiLine) => {
                  onChange(fyiLine)
                  Stores.sectionStore.updateSection({
                    ...Stores.sectionStore.section,
                    fyiLine,
                  })
                }}
              />
              )}
              name="fyiLine"
              rules={{ required: false }}
              defaultValue=""
              />
               <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.MultilineInput
                rows={3}
                label="Work line"
                placeholder={errors.workLine?"Please Enter workLine":"Work line"}
                hasError={errors.workLine}
                value={Stores.sectionStore.section?.workLine}
                onChange={(workLine) => {
                  onChange(workLine)
                  Stores.sectionStore.updateSection({
                    ...Stores.sectionStore.section,
                    workLine,
                  })
                }}
              />
              )}
              name="workLine"
              rules={{ required: false }}
              defaultValue=""
              />
              <Controller
              control={control}
              render={({ field: { onChange } }) => (
              <LibraryComponents.Atoms.Form.InputWrapper label="Status" hasError={errors.status}>
                <select
                  value={Stores.sectionStore.section?.status}
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.status
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const status = e.target.value
                    onChange(status)
                    Stores.sectionStore.updateSection({
                      ...Stores.sectionStore.section,
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
                  value={Stores.sectionStore.section?.environment}
                  className={`leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-2 ${
                    errors.environment
                      ? "border-red-500  focus:border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                  onChange={(e) => {
                    const environment = e.target.value
                    onChange(environment)
                    Stores.sectionStore.updateSection({
                      ...Stores.sectionStore.section,
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
              onClick={handleSubmit(onSubmitSection)}
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
          <SectionList
            data={Stores.sectionStore.listSection || []}
            totalSize={Stores.sectionStore.listSectionCount}
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
                body: `Update Section!`,
              })
            }}
            onPageSizeChange={(page,limit)=>{
              Stores.sectionStore.fetchSections(page,limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              
              Stores.sectionStore.sectionService
                .deleteSection(modalConfirm.id)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Section deleted.`,
                    })
                    setModalConfirm({ show: false })
                    Stores.sectionStore.fetchSections()
                  }
                })
            } else if (type === "Update") {
              
              Stores.sectionStore.sectionService
                .updateSingleFiled(modalConfirm.data)
                .then((res: any) => {
                  
                  if (res.status === 200) {
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊 Section updated.`,
                    })
                    setModalConfirm({ show: false })
                    setTimeout(() => {
                      window.location.reload()
                    }, 2000)
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

export default Section
