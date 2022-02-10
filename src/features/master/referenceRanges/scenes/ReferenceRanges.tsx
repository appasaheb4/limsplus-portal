/* eslint-disable */
import React, { useState, useMemo } from "react"
import { observer } from "mobx-react"
import _ from "lodash"
import {
  Toast,
  Header,
  PageHeading,
  PageHeadingLabDetails,
  Buttons,
  List,
  Svg,
  ModalConfirm,
} from "@/library/components"
import {
  CommonInputTable,
  ReferenceRangesList,
  RefRangesInputTable,
} from "../components"
import { ReferenceRangesHoc } from "../hoc"
import { useStores } from "@/stores"

import { RouterFlow } from "@/flows"
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
        if (!refernceRangesStore.checkExitsRecord) {
          refernceRangesStore.referenceRangesService
            .addReferenceRanges({
              input: {
                filter: {
                  refRangesInputList: _.filter(
                    refernceRangesStore.referenceRanges?.refRangesInputList,
                    (a) => {
                      a._id = undefined
                      return a
                    }
                  ),
                },
              },
            })
            .then((res) => {
              if (res.createReferenceRange.success) {
                Toast.success({
                  message: `😊 ${res.createReferenceRange.message}`,
                })
                setTimeout(() => {
                  window.location.reload()
                }, 2000)
              } else {
                Toast.error({
                  message: `😔 ${res.createReferenceRange.message}`,
                })
              }
            })
        } else {
          Toast.warning({
            message: `😔 Duplicate record found!`,
          })
        }
      } else {
        Toast.warning({
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
              onDelete={(rangeId) => {
                const index = _.findIndex(
                  refernceRangesStore.referenceRanges?.refRangesInputList,
                  { rangeId }
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
              onUpdateItems={(items, rangeId) => {
                const index = _.findIndex(
                  refernceRangesStore.referenceRanges?.refRangesInputList,
                  { rangeId }
                )
                console.log({ index })

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
        <Header>
          <PageHeading title={routerStore.selectedComponents?.title || ""} />
          <PageHeadingLabDetails store={loginStore} />
        </Header>
        {RouterFlow.checkPermission(toJS(routerStore.userPermission), "Add") && (
          <Buttons.ButtonCircleAddRemove
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
            <List direction="row" space={3} align="center">
              <Buttons.Button
                size="medium"
                type="solid"
                icon={Svg.Save}
                onClick={() => onSubmitReferenceRanges()}
              >
                Save
              </Buttons.Button>
              <Buttons.Button
                size="medium"
                type="outline"
                icon={Svg.Remove}
                onClick={() => {
                  window.location.reload()
                }}
              >
                Clear
              </Buttons.Button>
            </List>
          </div>
          <div className="p-2 rounded-lg shadow-xl overflow-auto">{tableView}</div>
          <ModalConfirm
            {...modalConfirm}
            click={(type?: string) => {
              if (type === "delete") {
                refernceRangesStore.referenceRangesService
                  .deleteReferenceRanges({ input: { id: modalConfirm.id } })
                  .then((res: any) => {
                    if (res.removeReferenceRange.success) {
                      Toast.success({
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
                      Toast.success({
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
                  rangeId:
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
                  rangeId:
                    refernceRangesStore.referenceRanges?.refRangesInputList.length +
                    1,
                  existsRecordId: modalConfirm.data._id,
                  version: parseInt(modalConfirm.data.version),
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
