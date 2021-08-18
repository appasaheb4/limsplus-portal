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
import { useForm, Controller } from "react-hook-form"
import { Stores as UserStore } from "@lp/features/users/stores"
import { Stores as LabStore } from "@lp/features/collection/labs/stores"
import { Stores as DepartmentStore } from "@lp/features/collection/department/stores"
import { stores } from "@lp/library/stores"
import {useStores} from '@lp/library/stores'

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const NoticeBoard = observer(() => {
  const {
		loginStore,
	} = useStores();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  // const [errors, setErrors] = useState<Models.NoticeBoard>()
  const [modalConfirm, setModalConfirm] = useState<any>()

  useEffect(() => {
    Stores.noticeBoardStore.fetchNoticeBoards()
  }, [])
  return (
    <>
    <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title={stores.routerStore.selectedComponents?.title || ""}
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
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.InputWrapper label="Lab" id="labs" hasError={errors.lab}>
              <select
                name="variable"
                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                  errors.lab
                    ? "border-red-500"
                    : "border-gray-200"
                } rounded-md`}
                onChange={(e) => {
                  const lab = e.target.value as string
                  onChange(lab)
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
            )}
            name="lab"
            rules={{ required: true }}
            defaultValue=""
           />

        <Controller
           control={control}
            render={({ field: { onChange } }) => (
            <LibraryComponents.Atoms.Form.Input
              label="Header"
              name="lblHeader"
              placeholder={errors.header ? "Please Enter Header" : "Header"}
              //value={Stores.userStore.user.password}
              onChange={(header) => {
               onChange(header)
                Stores.noticeBoardStore.updateNoticeBoard({
                  ...Stores.noticeBoardStore.noticeBoard,
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
            <LibraryComponents.Atoms.Form.InputWrapper label="Action" id="lblAction" hasError={errors.action}>
              <select
                name="action"
                className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                  errors.action
                    ? "border-red-500"
                    : "border-gray-200"
                } rounded-md`}
                onChange={(e) => {
                  const action = e.target.value as "login" | "logout"
                  onChange(action)
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
              //value={Stores.userStore.user.password}
              onChange={(message) => {
                onChange(message)
                Stores.noticeBoardStore.updateNoticeBoard({
                  ...Stores.noticeBoardStore.noticeBoard,
                  message,
                })
              }}
            />
            )}
           name="message"
          rules={{ required: true }}
          defaultValue=""
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
              
              Stores.noticeBoardStore.NoticeBoardService.addNoticeBoard(
                Stores.noticeBoardStore.noticeBoard as Models.NoticeBoard
              ).then((res) => {
                
                if (res.status === 201) {
                  LibraryComponents.Atoms.Toast.success({message :`😊Notice created.`})
                  // Stores.userStore.clear()
                  // Stores.userStore.loadUser()
                  setTimeout(() => {
                    window.location.reload()
                  }, 2000)
                } else {
                  LibraryComponents.Atoms.Toast.warning({
                   message: "😔Notice not create.Please try again"
                  })
                }
              })
            } else {
              LibraryComponents.Atoms.Toast.warning({
               message : "😔Please enter all information!"
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
      <div
        className="p-2 rounded-lg shadow-xl overflow-scroll"
        style={{ overflowX: "scroll" }}
      >
        <FeatureComponents.Molecules.NoticeBoardsList
          data={Stores.noticeBoardStore.noticeBoardList}
          isDelete={RouterFlow.checkPermission(
            toJS(stores.routerStore.userPermission),
            "Delete"
          )}
          isEditModify={RouterFlow.checkPermission(
            toJS(stores.routerStore.userPermission),
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
        />
      </div>

      <LibraryComponents.Molecules.ModalConfirm
        {...modalConfirm}
        click={(type?: string) => {
          if (type === "Delete") {
            
            Stores.noticeBoardStore.NoticeBoardService.deleteNoticeBoards(
              modalConfirm.id
            ).then((res: any) => {
              console.log({ res })

              if (res.status === 200) {
                
                LibraryComponents.Atoms.Toast.success({message:`😊Items deleted.`})
                setModalConfirm({ show: false })
                setTimeout(() => {
                  window.location.reload()
                }, 2000)
              }
            })
          } else if (type === "Update") {
            
            Stores.noticeBoardStore.NoticeBoardService.updateSingleFiled(
              modalConfirm.data  
            ).then((res: any) => {
              
              if (res.status === 200) {
                LibraryComponents.Atoms.Toast.success({message:`Item updated.`})
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
