/* eslint-disable */
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../components"
import "@lp/library/assets/css/accordion.css"
import * as Models from "../models"
import { useForm, Controller } from "react-hook-form"

import { useStores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const NoticeBoard = observer(() => {
  const { loginStore, labStore, noticeBoardStore, routerStore } = useStores()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const [modalConfirm, setModalConfirm] = useState<any>()

  useEffect(() => {
    if (loginStore.login && loginStore.login.role !== "SYSADMIN") {
      noticeBoardStore.updateNoticeBoard({
        ...noticeBoardStore.noticeBoard,
        lab: loginStore.login.lab,
      })
      setValue("lab", loginStore.login.lab)
    }
  }, [loginStore.login])

  useEffect(() => {
    noticeBoardStore.fetchNoticeBoards()
  }, [])

  const onNoticeBoardSubmit = () => {
    noticeBoardStore.NoticeBoardService.addNoticeBoard({
      input: {
        ...noticeBoardStore.noticeBoard,
      },
    }).then((res) => {
      if (res.createNoticeBoard.success) {
        LibraryComponents.Atoms.Toast.success({
          message: `😊 ${res.createNoticeBoard.message}`,
        })
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        LibraryComponents.Atoms.Toast.warning({
          message: "😔 Notice not create.Please try again",
        })
      }
    })
  }

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={routerStore.selectedComponents?.title || ""}
        />
        <LibraryComponents.Atoms.PageHeadingLabDetails store={loginStore} />
      </LibraryComponents.Atoms.Header>
      <div className="p-2 rounded-lg shadow-xl">
        <LibraryComponents.Atoms.Grid cols={2}>
          <LibraryComponents.Atoms.List
            direction="col"
            space={4}
            justify="stretch"
            fill
          >
            {labStore.listLabs && (
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="Lab"
                    id="labs"
                    hasError={errors.lab}
                  >
                    <select
                      value={noticeBoardStore.noticeBoard?.lab}
                      disabled={
                        loginStore.login && loginStore.login.role !== "SYSADMIN"
                          ? true
                          : false
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.lab ? "border-red-500" : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const lab = e.target.value as string
                        onChange(lab)
                        noticeBoardStore.updateNoticeBoard({
                          ...noticeBoardStore.noticeBoard,
                          lab,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {labStore.listLabs.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="lab"
                rules={{ required: true }}
                defaultValue=""
              />
            )}

            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.Input
                  label="Header"
                  name="lblHeader"
                  placeholder={errors.header ? "Please Enter Header" : "Header"}
                  hasError={errors.header}
                  //value={userStore.user.password}
                  onChange={(header) => {
                    onChange(header)
                    noticeBoardStore.updateNoticeBoard({
                      ...noticeBoardStore.noticeBoard,
                      header,
                    })
                  }}
                />
              )}
              name="header"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <LibraryComponents.Atoms.Form.InputWrapper
                  label="Action"
                  id="lblAction"
                  hasError={errors.action}
                >
                  <select
                    name="action"
                    className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                      errors.action ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                    onChange={(e) => {
                      const action = e.target.value as "login" | "logout"
                      onChange(action)
                      noticeBoardStore.updateNoticeBoard({
                        ...noticeBoardStore.noticeBoard,
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
              )}
              name="action"
              rules={{ required: true }}
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
                  rows={7}
                  label="Message"
                  name="lblMessage"
                  hasError={errors.message}
                  placeholder={errors.message ? "Please Enter Message" : "Message"}
                  //value={userStore.user.password}
                  onChange={(message) => {
                    onChange(message)
                    noticeBoardStore.updateNoticeBoard({
                      ...noticeBoardStore.noticeBoard,
                      message,
                    })
                  }}
                />
              )}
              name="message"
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
            onClick={handleSubmit(onNoticeBoardSubmit)}
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

      <div
        className="p-2 rounded-lg shadow-xl overflow-scroll"
        style={{ overflowX: "scroll" }}
      >
        <FeatureComponents.Molecules.NoticeBoardsList
          data={noticeBoardStore.noticeBoardList}
          totalSize={noticeBoardStore.noticeBoardListCount}
          isDelete={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            "Delete"
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(routerStore.userPermission),
            "Edit/Modify"
          )}
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
          onPageSizeChange={(page, limit) => {
            noticeBoardStore.fetchNoticeBoards(page, limit)
          }}
        />
      </div>

      <LibraryComponents.Molecules.ModalConfirm
        {...modalConfirm}
        click={(type?: string) => {
          if (type === "Delete") {
            noticeBoardStore.NoticeBoardService.deleteNoticeBoards({
              input: { id: modalConfirm.id },
            }).then((res: any) => {
              if (res.removeNoticeBoard.success) {
                LibraryComponents.Atoms.Toast.success({
                  message: `😊 ${res.removeNoticeBoard.message}`,
                })
                setModalConfirm({ show: false })
                noticeBoardStore.fetchNoticeBoards()
              }
            })
          } else if (type === "Update") {
            noticeBoardStore.NoticeBoardService.updateSingleFiled({
              input: {
                _id: modalConfirm.data.id,
                [modalConfirm.data.dataField]: modalConfirm.data.value,
              },
            }).then((res: any) => {  
              if (res.updateNoticeBoard.success) {
                LibraryComponents.Atoms.Toast.success({
                  message: `😊 ${res.updateNoticeBoard.message}`,
                })
                setModalConfirm({ show: false })
                setTimeout(() => {
                  window.location.reload()
                }, 1000)
              }
            })
          }
        }}
        onClose={() => setModalConfirm({ show: false })}
      />
    </>
  )
})
export default NoticeBoard
