/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import { Accordion, AccordionItem } from "react-sanfona"
import "@lp/library/assets/css/accordion.css"
import * as Utils from "../utils"
import * as Models from "../models"

import { Stores } from "../stores"
import { Stores as UserStore } from "@lp/features/users/stores"
import { Stores as LabStore } from "@lp/features/collection/labs/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { Stores as RootStore } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const NoticeBoard = observer(() => {
  const [errors, setErrors] = useState<Models.NoticeBoard>()
  const [modalConfirm, setModalConfirm] = useState<any>()

  useEffect(() => {
    Stores.noticeBoardStore.fetchNoticeBoards()
  }, [])
  return (
    <>
      <div className="p-2 rounded-lg shadow-xl">
        <LibraryComponents.Atoms.Grid cols={2}>
          <LibraryComponents.Atoms.List
            direction="col"
            space={4}
            justify="stretch"
            fill
          >
            <LibraryComponents.Atoms.Form.InputWrapper label="Lab" id="labs">
              <select
                name="variable"
                className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                onChange={(e) => {
                  const lab = e.target.value as string
                  setErrors({
                    ...errors,
                    lab: Utils.validate.single(
                      lab,
                      Utils.constraintsNoticeBoard.lab
                    ),
                  })
                  Stores.noticeBoardStore.updateNoticeBoard({
                    ...Stores.noticeBoardStore.noticeBoard,
                    lab,
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
            <LibraryComponents.Atoms.Form.Input
              label="Header"
              name="lblHeader"
              placeholder="Header"
              //value={Stores.userStore.user.password}
              onChange={(header) => {
                setErrors({
                  ...errors,
                  header: Utils.validate.single(
                    header,
                    Utils.constraintsNoticeBoard.header
                  ),
                })
                Stores.noticeBoardStore.updateNoticeBoard({
                  ...Stores.noticeBoardStore.noticeBoard,
                  header,
                })
              }}
            />

            <LibraryComponents.Atoms.Form.InputWrapper label="Action" id="lblAction">
              <select
                name="action"
                className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                onChange={(e) => {
                  const action = e.target.value as "login" | "logout"
                  setErrors({
                    ...errors,
                    action: Utils.validate.single(
                      action,
                      Utils.constraintsNoticeBoard.action
                    ),
                  })
                  Stores.noticeBoardStore.updateNoticeBoard({
                    ...Stores.noticeBoardStore.noticeBoard,
                    action,
                  })
                }}
              >
                <option selected>Select</option>
                {["login", "logout"].map((item: any, index: number) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </LibraryComponents.Atoms.Form.InputWrapper>
          </LibraryComponents.Atoms.List>
          <LibraryComponents.Atoms.List
            direction="col"
            space={4}
            justify="stretch"
            fill
          >
            <LibraryComponents.Atoms.Form.MultilineInput
              rows={7}
              label="Message"
              name="lblMessage"
              placeholder="Message"
              //value={Stores.userStore.user.password}
              onChange={(message) => {
                setErrors({
                  ...errors,
                  message: Utils.validate.single(
                    message,
                    Utils.constraintsNoticeBoard.message
                  ),
                })
                Stores.noticeBoardStore.updateNoticeBoard({
                  ...Stores.noticeBoardStore.noticeBoard,
                  message,
                })
              }}
            />
          </LibraryComponents.Atoms.List>
        </LibraryComponents.Atoms.Grid>
      </div>
      <br />

      <LibraryComponents.Atoms.List direction="row" space={3} align="center">
        <LibraryComponents.Atoms.Buttons.Button
          size="medium"
          type="solid"
          icon={LibraryComponents.Atoms.Icon.Save}
          onClick={() => {
            if (
              Utils.validate(
                Stores.noticeBoardStore.noticeBoard,
                Utils.constraintsNoticeBoard
              ) === undefined
            ) {
              RootStore.rootStore.setProcessLoading(true)
              Stores.noticeBoardStore.NoticeBoardService.addNoticeBoard(
                Stores.noticeBoardStore.noticeBoard as Models.NoticeBoard
              ).then((res) => {
                RootStore.rootStore.setProcessLoading(false)
                if (res.status === 201) {
                  LibraryComponents.Atoms.ToastsStore.success(`Notice created.`)
                  // Stores.userStore.clear()
                  // Stores.userStore.loadUser()
                  setTimeout(() => {
                    window.location.reload()
                  }, 2000)
                } else {
                  LibraryComponents.Atoms.ToastsStore.warning(
                    "Notice not create.Please try again"
                  )
                }
              })
            } else {
              LibraryComponents.Atoms.ToastsStore.warning(
                "Please enter all information!"
              )
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
      <div
        className="p-2 rounded-lg shadow-xl overflow-scroll"
        style={{ overflowX: "scroll" }}
      >
        <FeatureComponents.Molecules.NoticeBoardsList
          data={Stores.noticeBoardStore.noticeBoardList}
          isDelete={RouterFlow.checkPermission(
            toJS(RootStore.routerStore.userPermission),
            "Delete"
          )}
          // isEditModify={RouterFlow.checkPermission(
          //   toJS(RootStore.routerStore.userPermission),
          //   "Edit/Modify"
          // )}
          isEditModify={false}
          onDelete={(selectedUser) => setModalConfirm(selectedUser)}
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
              body: `Update recoard!`,
            })
          }}
        />
      </div>

      <LibraryComponents.Molecules.ModalConfirm
        {...modalConfirm}
        click={(type?: string) => {
          if (type === "Delete") {
            RootStore.rootStore.setProcessLoading(true)
            Stores.noticeBoardStore.NoticeBoardService.deleteNoticeBoards(
              modalConfirm.id
            ).then((res: any) => {
              console.log({ res })

              if (res.status === 200) {
                RootStore.rootStore.setProcessLoading(false)
                LibraryComponents.Atoms.ToastsStore.success(`Items deleted.`)
                setModalConfirm({ show: false })
                setTimeout(() => {
                  window.location.reload()
                }, 2000)
              }
            })
          } else if (type === "Update") {
            // RootStore.rootStore.setProcessLoading(true)
            // Stores.userStore.UsersService.updateSingleFiled(modalConfirm.data).then(
            //   (res: any) => {
            //     RootStore.rootStore.setProcessLoading(false)
            //     if (res.status === 200) {
            //       LibraryComponents.Atoms.ToastsStore.success(`User updated.`)
            //       setModalConfirm({ show: false })
            //       setTimeout(() => {
            //         window.location.reload()
            //       }, 1000)
            //     }
            //   }
            // )
          }
        }}
        onClose={() => setModalConfirm({ show: false })}
      />
    </>
  )
})
export default NoticeBoard
