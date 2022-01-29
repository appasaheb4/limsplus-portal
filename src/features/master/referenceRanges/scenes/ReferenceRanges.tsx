/* eslint-disable */
import React, { useState, useMemo } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import { CommonInputTable, ReferenceRangesList } from "../components"
import { useForm } from "react-hook-form"

import { ReferenceRangesHoc } from "../hoc"
import { useStores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const ReferenceRanges = ReferenceRangesHoc(
  observer(() => {
    const {
      loginStore,
      interfaceManagerStore,
      labStore,
      masterAnalyteStore,
      departmentStore,
      refernceRangesStore,
      routerStore,
    } = useStores()
   
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      clearErrors,
    } = useForm()
  
    setValue("lab", loginStore.login.lab)
    setValue("environment", loginStore.login.environment)
    const [modalConfirm, setModalConfirm] = useState<any>()
    const [hideAddLab, setHideAddLab] = useState<boolean>(true)
    const onSubmitReferenceRanges = () => {
      if (!refernceRangesStore.checkExitsRecord) {
        if (
          !refernceRangesStore.referenceRanges?.existsVersionId &&
          !refernceRangesStore.referenceRanges?.existsRecordId
        ) {
          refernceRangesStore.referenceRangesService
            .addReferenceRanges({
              input: {
                ...refernceRangesStore.referenceRanges,
                enteredBy: loginStore.login.userId,
              },
            })
            .then((res) => {
              if (res.createReferenceRange.success) {
                LibraryComponents.Atoms.Toast.success({
                  message: `😊 ${res.createReferenceRange.message}`,
                })
              }
            })
        } else if (
          refernceRangesStore.referenceRanges?.existsVersionId &&
          !refernceRangesStore.referenceRanges?.existsRecordId
        ) {
          refernceRangesStore.referenceRangesService
            .versionUpgradeReferenceRanges({
              input: {
                ...refernceRangesStore.referenceRanges,
                enteredBy: loginStore.login.userId,
                __typename: undefined,
              },
            })
            .then((res) => {
              if (res.versionUpgradeReferenceRange.success) {
                LibraryComponents.Atoms.Toast.success({
                  message: `😊 ${res.versionUpgradeReferenceRange.message}`,
                })
              }
            })
        } else if (
          !refernceRangesStore.referenceRanges?.existsVersionId &&
          refernceRangesStore.referenceRanges?.existsRecordId
        ) {
          refernceRangesStore.referenceRangesService
            .duplicateReferenceRanges({
              input: {
                ...refernceRangesStore.referenceRanges,
                enteredBy: loginStore.login.userId,
                __typename: undefined,
              },
            })
            .then((res) => {
              if (res.duplicateReferenceRange.success) {
                LibraryComponents.Atoms.Toast.success({
                  message: `😊 ${res.duplicateReferenceRange.message}`,
                })
              }
            })
        }
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        LibraryComponents.Atoms.Toast.warning({
          message: `😔 Please enter diff code`,
        })
      }
    }

    const tableView = useMemo(
      () => (
        <ReferenceRangesList
          data={refernceRangesStore.listReferenceRanges || []}
          totalSize={refernceRangesStore.listReferenceRangesCount}
          extraData={{
            lookupItems: routerStore.lookupItems,
            listMasterAnalyte: masterAnalyteStore.listMasterAnalyte,
            listDepartment: departmentStore.listDepartment,
            listLabs: labStore.listLabs,
            listInterfaceManager: interfaceManagerStore.listInterfaceManager,
          }}
          isDelete={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            "Delete"
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            "Edit/Modify"
          )}
          onDelete={(selectedItem) => setModalConfirm(selectedItem)}
          onSelectedRow={(rows) => {
            setModalConfirm({
              show: true,
              type: "delete",
              id: rows,
              title: "Are you sure?",
              body: `Delete selected items!`,
            })
          }}
          onUpdateItem={(value: any, dataField: string, id: string) => {
            setModalConfirm({
              show: true,
              type: "update",
              data: { value, dataField, id },
              title: "Are you sure?",
              body: `Update item!`,
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
          onPageSizeChange={(page, limit) => {
            refernceRangesStore.fetchListReferenceRanges(page, limit)
          }}
          onFilter={(type, filter, page, limit) => {
            refernceRangesStore.referenceRangesService.filter({
              input: { type, filter, page, limit },
            })
          }}
        />
      ),
      [refernceRangesStore.listReferenceRanges]
    )
    return (
      <>
        <LibraryComponents.Atoms.Header>
          <LibraryComponents.Atoms.PageHeading
            title={routerStore.selectedComponents?.title || ""}
          />
          <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
        </LibraryComponents.Atoms.Header>
        {RouterFlow.checkPermission(toJS(routerStore.userPermission), "Add") && (
          <LibraryComponents.Atoms.Buttons.ButtonCircleAddRemove
            show={hideAddLab}
            onClick={() => setHideAddLab(!hideAddLab)}
          />
        )}

        <div className="mx-auto flex-wrap">
          <div
            className={
              "p-2 rounded-lg shadow-xl " + (hideAddLab ? "shown" : "shown")
            }
          >
            <div className="flex flex-row gap-2 items-center">
            <CommonInputTable data={{}} />
            <LibraryComponents.Atoms.Buttons.Button
                  size="medium"
                  type="solid"
                  onClick={() => {
                    // const value = lookupStore.localInput.value
                    // const code = lookupStore.localInput.code
                    // let arrValue = lookupStore.lookup?.arrValue || []
                    // if (value === undefined || code === undefined)
                    //   return alert("Please enter value and code.")
                    // if (value !== undefined) {
                    //   console.log({ len: arrValue.length })
                    //   arrValue !== undefined
                    //     ? arrValue.push({
                    //         value,
                    //         code,
                    //       })
                    //     : (arrValue = [
                    //         {
                    //           value,
                    //           code,
                    //         },
                    //       ])
                    //   lookupStore.updateLookup({
                    //     ...lookupStore.lookup,
                    //     arrValue,
                    //   })
                    //   lookupStore.updateLocalInput({
                    //     ...lookupStore.localInput,
                    //     value: "",
                    //     code: "",
                    //   })
                    // }
                  }}
                >
                  <LibraryComponents.Atoms.Icon.EvaIcon icon="plus-circle-outline" />
                  {`Add`}
                </LibraryComponents.Atoms.Buttons.Button>
            </div>
           
            <br />
            <LibraryComponents.Atoms.List direction="row" space={3} align="center">
              <LibraryComponents.Atoms.Buttons.Button
                size="medium"
                type="solid"
                icon={LibraryComponents.Atoms.Icon.Save}
                onClick={handleSubmit(onSubmitReferenceRanges)}
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
          <div className="p-2 rounded-lg shadow-xl overflow-auto">{tableView}</div>
          <LibraryComponents.Molecules.ModalConfirm
            {...modalConfirm}
            click={(type?: string) => {
              if (type === "delete") {
                refernceRangesStore.referenceRangesService
                  .deleteReferenceRanges({ input: { id: modalConfirm.id } })
                  .then((res: any) => {
                    if (res.removeReferenceRange.success) {
                      LibraryComponents.Atoms.Toast.success({
                        message: `😊 ${res.removeReferenceRange.message}`,
                      })
                      setModalConfirm({ show: false })
                      refernceRangesStore.fetchListReferenceRanges()
                    }
                  })
              } else if (type === "update") {
                refernceRangesStore.referenceRangesService
                  .updateSingleFiled({
                    input: {
                      _id: modalConfirm.data.id,
                      [modalConfirm.data.dataField]: modalConfirm.data.value,
                    },
                  })
                  .then((res: any) => {
                    if (res.updateReferenceRange.success) {
                      LibraryComponents.Atoms.Toast.success({
                        message: `😊 ${res.updateReferenceRange.message}`,
                      })
                      setModalConfirm({ show: false })
                      refernceRangesStore.fetchListReferenceRanges()
                    }
                  })
              } else if (type === "versionUpgrade") {
                refernceRangesStore.updateReferenceRanges({
                  ...modalConfirm.data,
                  _id: undefined,
                  existsVersionId: modalConfirm.data._id,
                  existsRecordId: undefined,
                  version: parseInt(modalConfirm.data.version + 1),
                })
                setValue("analyteCode", modalConfirm.data.analyteCode)
                setValue("analyteName", modalConfirm.data.analyteName)
                setValue("department", modalConfirm.data.department)
                setValue("species", modalConfirm.data.species)
                setValue("sex", modalConfirm.data.sex)
                setValue("rangeSetOn", modalConfirm.data.rangeSetOn)
                setValue("lab", modalConfirm.data.lab)
                setValue("rangType", modalConfirm.data.rangType)
                setValue("age", modalConfirm.data.age)
                setValue("low", modalConfirm.data.low)
                setValue("high", modalConfirm.data.high)
                setValue("alpha", modalConfirm.data.alpha)
                setValue("status", modalConfirm.data.status)
                setValue("environment", modalConfirm.data.environment)
                setValue("deltarang_tetype", modalConfirm.data.deltarang_tetype)
                setValue("deltaInterval", modalConfirm.data.deltaInterval)
                setValue("formalResultScript", modalConfirm.data.formatResultScript)
                setValue("reportDefault", modalConfirm.data.reportDefault)
              } else if (type === "duplicate") {
                refernceRangesStore.updateReferenceRanges({
                  ...modalConfirm.data,
                  _id: undefined,
                  existsVersionId: undefined,
                  existsRecordId: modalConfirm.data._id,
                  version: parseInt(modalConfirm.data.version + 1),
                })
                setHideAddLab(!hideAddLab)
                setValue("analyteCode", modalConfirm.data.analyteCode)
                setValue("analyteName", modalConfirm.data.analyteName)
                setValue("department", modalConfirm.data.department)
                setValue("species", modalConfirm.data.species)
                setValue("sex", modalConfirm.data.sex)
                setValue("rangeSetOn", modalConfirm.data.rangeSetOn)
                setValue("lab", modalConfirm.data.lab)
                setValue("rangType", modalConfirm.data.rangType)
                setValue("age", modalConfirm.data.age)
                setValue("low", modalConfirm.data.low)
                setValue("high", modalConfirm.data.high)
                setValue("alpha", modalConfirm.data.alpha)
                setValue("status", modalConfirm.data.status)
                setValue("environment", modalConfirm.data.environment)
                setValue("deltarang_tetype", modalConfirm.data.deltarang_tetype)
                setValue("deltaInterval", modalConfirm.data.deltaInterval)
                setValue("formalResultScript", modalConfirm.data.formatResultScript)
                setValue("reportDefault", modalConfirm.data.reportDefault)
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
)
export default ReferenceRanges
