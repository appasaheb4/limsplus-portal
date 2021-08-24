/* eslint-disable */
import React, { useState, useContext, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as FeatureComponents from "../../../components"
import BootstrapTable from "react-bootstrap-table-next"
import cellEditFactory, { Type } from "react-bootstrap-table2-editor"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import moment from "moment"

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport
import {useStores} from '@lp/library/stores'
import { Stores } from "../../../stores"
import { stores } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const ConversationMapping = observer(() => {
  const {
		loginStore,
	} = useStores();
  const [modalConfirm, setModalConfirm] = useState<any>()
  const [
    hideAddConversationMapping,
    setHideAddConversationMapping,
  ] = useState<boolean>(true)

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
              <LibraryComponents.Atoms.Form.Input
                type="text"
                label="Hexa Decimal"
                id="hexadecimal"
                name="hexadecimal"
                placeholder="Hexa Decimal"
                value={
                  Stores.conversationMappingStore.conversationMapping?.hexadecimal
                }
                onChange={(hexadecimal) => {
                  Stores.conversationMappingStore.updateConversationMapping({
                    ...Stores.conversationMappingStore.conversationMapping,
                    hexadecimal,
                  })
                }}
              />

              <LibraryComponents.Atoms.Form.Input
                type="text"
                label="Binary"
                id="binary"
                name="binary"
                placeholder="Binary"
                value={Stores.conversationMappingStore.conversationMapping?.binary}
                onChange={(binary) => {
                  Stores.conversationMappingStore.updateConversationMapping({
                    ...Stores.conversationMappingStore.conversationMapping,
                    binary,
                  })
                }}
              />

              <LibraryComponents.Atoms.Form.Input
                type="text"
                label="ASCII"
                id="ascii"
                name="ascii"
                placeholder="ASCII"
                value={Stores.conversationMappingStore.conversationMapping?.ascii}
                onChange={(ascii) => {
                  Stores.conversationMappingStore.updateConversationMapping({
                    ...Stores.conversationMappingStore.conversationMapping,
                    ascii,
                  })
                }}
              />
              <div className="clearfix" />
            </LibraryComponents.Atoms.List>
          </LibraryComponents.Atoms.Grid>
          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={() => {
                if (
                  Stores.conversationMappingStore.conversationMapping !== undefined
                ) {
                  
                  Stores.conversationMappingStore.conversationMappingService
                    .addConversationMapping(
                      Stores.conversationMappingStore.conversationMapping
                    )
                    .then((res) => {
                      
                      if (res.status === 200) {
                        LibraryComponents.Atoms.Toast.success({
                         message : `😊Conversation Mapping created.`
                        })
                        window.location.reload()
                        //Stores.conversationMappingStore.()
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
            <div className="clearfix" />
          </LibraryComponents.Atoms.List>
        </div>
        <div className="p-2 rounded-lg shadow-xl overflow-scroll">
          <FeatureComponents.Molecules.ConversationMappingList
            data={Stores.conversationMappingStore.listConversationMapping || []}
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
            onPageSizeChange={(page,limit)=>{
              Stores.conversationMappingStore.fetchConversationMapping(page,limit)
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
                    LibraryComponents.Atoms.Toast.success({message :`😊Items deleted.`})
                  }
                })
            } else if (type == "Update") {
              Stores.conversationMappingStore.conversationMappingService
                .updateConversationMappingUpdateSingleFiled(modalConfirm.data)
                .then((res) => {
                  
                  setModalConfirm({ show: false })
                  if (res.status === 200) {
                    Stores.conversationMappingStore.fetchConversationMapping()
                    LibraryComponents.Atoms.Toast.success({message :`😊Updated.`})
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
