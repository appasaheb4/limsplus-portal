/* eslint-disable */
import React, { useState, useContext, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../../../components"
import * as LibraryUtils from "@lp/library/utils"
import BootstrapTable from "react-bootstrap-table-next"
import cellEditFactory, { Type } from "react-bootstrap-table2-editor"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import moment from "moment"

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport
import { useForm, Controller } from "react-hook-form"
import { useStores } from "@lp/stores"
import { Stores } from "../../../stores"
import { stores } from "@lp/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const ConversationMapping = observer(() => {
  const { loginStore } = useStores()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [
    hideAddConversationMapping,
    setHideAddConversationMapping,
  ] = useState<boolean>(true)
  useEffect(() => {
    if (stores.loginStore.login && stores.loginStore.login.role !== "SYSADMIN") {
      Stores.conversationMappingStore.updateConversationMapping({
        ...Stores.conversationMappingStore.conversationMapping,
        environment: stores.loginStore.login.environment,
      })
      setValue("environment", stores.loginStore.login.environment)
    }
  }, [stores.loginStore.login])
  const onSubmitConversationMapping = () => {
    if (Stores.conversationMappingStore.conversationMapping !== undefined) {
      Stores.conversationMappingStore.conversationMappingService
        .addConversationMapping(Stores.conversationMappingStore.conversationMapping)
        .then((res) => {
          if (res.status === 200) {
            LibraryComponents.Atoms.Toast.success({
              message: `😊Conversation Mapping created.`,
            })
            window.location.reload()
            //Stores.conversationMappingStore.()
          }
        })
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: "😔Please enter all information!",
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
          show={hideAddConversationMapping}
          onClick={(status) =>
            setHideAddConversationMapping(!hideAddConversationMapping)
          }
        />
      )}
      <div className=" mx-auto  flex-wrap">
        <div
          className={
            "p-2 rounded-lg shadow-xl " +
            (hideAddConversationMapping ? "hidden" : "shown")
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
                  <LibraryComponents.Atoms.Form.Input
                    type="text"
                    label="Hexa Decimal"
                    id="hexadecimal"
                    name="hexadecimal"
                    placeholder={
                      errors.hexadecimal
                        ? "Please Enter hexadecimal"
                        : "Hexa Decimal"
                    }
                    hasError={errors.hexadecimal}
                    value={
                      Stores.conversationMappingStore.conversationMapping
                        ?.hexadecimal
                    }
                    onChange={(hexadecimal) => {
                      onChange(hexadecimal)
                      Stores.conversationMappingStore.updateConversationMapping({
                        ...Stores.conversationMappingStore.conversationMapping,
                        hexadecimal,
                      })
                    }}
                  />
                )}
                name="hexadecimal"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    type="text"
                    label="Binary"
                    id="binary"
                    name="binary"
                    placeholder={errors.binary ? "Please Enter Binary" : "Binary"}
                    hasError={errors.binary}
                    value={
                      Stores.conversationMappingStore.conversationMapping?.binary
                    }
                    onChange={(binary) => {
                      onChange(binary)
                      Stores.conversationMappingStore.updateConversationMapping({
                        ...Stores.conversationMappingStore.conversationMapping,
                        binary,
                      })
                    }}
                  />
                )}
                name="binary"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    type="text"
                    label="ASCII"
                    id="ascii"
                    name="ascii"
                    placeholder={errors.ascii ? "Please Enter ascii" : "ASCII"}
                    hasError={errors.ascii}
                    value={
                      Stores.conversationMappingStore.conversationMapping?.ascii
                    }
                    onChange={(ascii) => {
                      onChange(ascii)
                      Stores.conversationMappingStore.updateConversationMapping({
                        ...Stores.conversationMappingStore.conversationMapping,
                        ascii,
                      })
                    }}
                  />
                )}
                name="ascii"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                    <select
                      value={
                        Stores.conversationMappingStore.conversationMapping
                          ?.environment
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.environment
                          ? "border-red-500  "
                          : "border-gray-300"
                      } rounded-md`}
                      disabled={
                        stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        const environment = e.target.value
                        onChange(environment)
                        Stores.conversationMappingStore.updateConversationMapping({
                          ...Stores.conversationMappingStore.conversationMapping,
                          environment,
                        })
                      }}
                    >
                      <option selected>
                        {stores.loginStore.login &&
                        stores.loginStore.login.role !== "SYSADMIN"
                          ? `Select`
                          : Stores.conversationMappingStore.conversationMapping
                              ?.environment || `Select`}
                      </option>
                      {LibraryUtils.lookupItems(
                        stores.routerStore.lookupItems,
                        "ENVIRONMENT"
                      ).map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {`${item.value} - ${item.code}`}
                        </option>
                      ))}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="environment"
                rules={{ required: true }}
                defaultValue=""
              />
              <div className="clearfix" />
            </LibraryComponents.Atoms.List>
          </LibraryComponents.Atoms.Grid>
          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={handleSubmit(onSubmitConversationMapping)}
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
            <div className="clearfix" />
          </LibraryComponents.Atoms.List>
        </div>
        <div className="p-2 rounded-lg shadow-xl overflow-scroll">
          <FeatureComponents.Molecules.ConversationMappingList
            data={Stores.conversationMappingStore.listConversationMapping || []}
            extraData={{ lookupItems: stores.routerStore.lookupItems }}
            totalSize={Stores.conversationMappingStore.listConversationMappingCount}
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
                body: `Update conversation mapping!`,
              })
            }}
            onPageSizeChange={(page, limit) => {
              Stores.conversationMappingStore.fetchConversationMapping(page, limit)
            }}
          />
        </div>
        <LibraryComponents.Molecules.ModalConfirm
          {...modalConfirm}
          click={(type?: string) => {
            if (type === "Delete") {
              Stores.conversationMappingStore.conversationMappingService
                .deleteConversationMapping(modalConfirm.id)
                .then((res) => {
                  setModalConfirm({ show: false })
                  if (res.status === 200) {
                    Stores.conversationMappingStore.fetchConversationMapping()
                    LibraryComponents.Atoms.Toast.success({
                      message: `😊Items deleted.`,
                    })
                  }
                })
            } else if (type == "Update") {
              Stores.conversationMappingStore.conversationMappingService
                .updateConversationMappingUpdateSingleFiled(modalConfirm.data)
                .then((res) => {
                  setModalConfirm({ show: false })
                  if (res.status === 200) {
                    Stores.conversationMappingStore.fetchConversationMapping()
                    LibraryComponents.Atoms.Toast.success({ message: `😊Updated.` })
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

export default ConversationMapping
