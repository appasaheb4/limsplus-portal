/* eslint-disable */
import React, { useState, useMemo } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import * as LibraryComponents from "@lp/library/components"
import {
  CommonInputTable,
  ReferenceRangesList,
  RefRangesInputTable,
} from "../components"
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
      
    const [modalConfirm, setModalConfirm] = useState<any>()
    const [hideAddLab, setHideAddLab] = useState<boolean>(true)
    const onSubmitReferenceRanges = () => {
      if (refernceRangesStore.referenceRanges?.refRangesInputList?.length > 0) {
        refernceRangesStore.referenceRangesService
          .addReferenceRanges({
            input: {
              filter: {
                refRangesInputList: _.filter(
                  refernceRangesStore.referenceRanges?.refRangesInputList,
                  (a) => {
                    a.id = undefined
                    a._id = undefined
                    return a
                  }
                ),
              },
            },
          })
          .then((res) => {
            if (res.createReferenceRange.success) {
              LibraryComponents.Atoms.Toast.success({
                message: `😊 ${res.createReferenceRange.message}`,
              })
            }
          })
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        LibraryComponents.Atoms.Toast.warning({
          message: `😔 Records not found.`,
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

    const refRangesInputTable = useMemo(
      () =>
        refernceRangesStore.referenceRanges?.refRangesInputList.length > 0 && (
          <div className="p-2 rounded-lg shadow-xl overflow-auto">
            <RefRangesInputTable
              data={toJS(refernceRangesStore.referenceRanges?.refRangesInputList)}
              extraData={routerStore}
              onDelete={(id) => {
                const index = _.findIndex(
                  refernceRangesStore.referenceRanges?.refRangesInputList,
                  { id: id }
                )
                const firstArr =
                  refernceRangesStore.referenceRanges?.refRangesInputList?.slice(
                    0,
                    index
                  ) || []
                const secondArr =
                  refernceRangesStore.referenceRanges?.refRangesInputList?.slice(
                    index + 1
                  ) || []
                const finalArray = [...firstArr, ...secondArr]
                refernceRangesStore.updateReferenceRanges({
                  ...refernceRangesStore.referenceRanges,
                  refRangesInputList: finalArray,
                })
              }}
              onUpdateItems={(items, id) => {
                const index = _.findIndex(
                  refernceRangesStore.referenceRanges?.refRangesInputList,
                  { id: id }
                )
                const refRangesInputList =
                  refernceRangesStore.referenceRanges?.refRangesInputList
                refRangesInputList[index] = {
                  ...refRangesInputList[index],
                  ...items,
                }
                refernceRangesStore.updateReferenceRanges({
                  ...refernceRangesStore.referenceRanges,
                  refRangesInputList,
                  refreshList: !refernceRangesStore.referenceRanges?.refreshList,
                })
              }}
            />
          </div>
        ),
      [
        refernceRangesStore.referenceRanges?.refRangesInputList.length,
        refernceRangesStore.referenceRanges?.refreshList,
      ]
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
            <CommonInputTable />
            {refRangesInputTable}
            <br />
            <LibraryComponents.Atoms.List direction="row" space={3} align="center">
              <LibraryComponents.Atoms.Buttons.Button
                size="medium"
                type="solid"
                icon={LibraryComponents.Atoms.Icon.Save}
                onClick={() => onSubmitReferenceRanges()}
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
                let refRangesInputList =
                  refernceRangesStore.referenceRanges?.refRangesInputList
                refRangesInputList.push({
                  ...modalConfirm.data,
                  id:
                    refernceRangesStore.referenceRanges?.refRangesInputList.length +
                    1,
                  existsRecordId: modalConfirm.data._id,
                  version: parseInt(modalConfirm.data.version + 1),
                  type: "versionUpgrade",
                })
                refernceRangesStore.updateReferenceRanges({
                  ...refernceRangesStore.referenceRanges,
                  refRangesInputList,
                })
              } else if (type === "duplicate") {
                let refRangesInputList =
                  refernceRangesStore.referenceRanges?.refRangesInputList
                refRangesInputList.push({
                  ...modalConfirm.data,
                  id:
                    refernceRangesStore.referenceRanges?.refRangesInputList.length +
                    1,
                  existsRecordId: modalConfirm.data._id,
                  version: parseInt(modalConfirm.data.version + 1),
                  type: "duplicate",
                })
                refernceRangesStore.updateReferenceRanges({
                  ...refernceRangesStore.referenceRanges,
                  refRangesInputList,
                })
                setHideAddLab(!hideAddLab)
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
