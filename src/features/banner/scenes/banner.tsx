import React, { useState } from "react"
import { observer } from "mobx-react"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from "moment"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import Contexts from "@lp/library/stores"
import * as Services from "../services"
import {Stores} from '../stores';

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

const Banner = observer(() => {
  const rootStore = React.useContext(Contexts.rootStore)
  const [deleteItem, setDeleteItem] = useState<any>({})

  return (
    <>
      <LibraryComponents.Header>
        <LibraryComponents.PageHeading
          title="Banner"
          subTitle="Add, Edit & Delete Banner"
        />
      </LibraryComponents.Header>
      <div className="mx-auto flex-wrap">
        <div className="p-2 rounded-lg shadow-xl">
          <LibraryComponents.Grid cols={2}>
            <LibraryComponents.List direction="col" space={4} justify="stretch" fill>
              <LibraryComponents.Form.Input
                label="Title"
                id="title"
                placeholder="Title"
                value={Stores.bannerStore.banner?.title}
                onChange={(title) => {
                  Stores.bannerStore.updateBanner({
                    ...Stores.bannerStore.banner,
                    title,
                  })
                }}
              />
              <LibraryComponents.Form.InputFile
                label="File"
                id="file"
                placeholder="File"
                //value={rootStore.bannerStore.banner?.image}
                onChange={(e) => {
                  const image = e.target.files[0]
                  Stores.bannerStore.updateBanner({
                    ...Stores.bannerStore.banner,
                    image,
                  })
                }}
              />
            </LibraryComponents.List>
          </LibraryComponents.Grid>
          <br />

          <LibraryComponents.List direction="row" space={3} align="center">
            <LibraryComponents.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Icons.Save}
              onClick={() => {
                if (Stores.bannerStore.banner !== undefined) {
                  rootStore.setProcessLoading(true)
                  Services.addBanner(Stores.bannerStore.banner).then((res) => {
                    rootStore.setProcessLoading(false)
                    if (res.status === LibraryModels.StatusCode.CREATED) {
                      LibraryComponents.ToastsStore.success(`Banner created.`)
                      setTimeout(() => {
                        window.location.reload()
                      }, 2000)
                    }
                  })
                } else {
                  alert("Please select image.")
                }
              }}
            >
              Save
            </LibraryComponents.Button>
            <LibraryComponents.Button
              size="medium"
              type="outline"
              icon={LibraryComponents.Icons.Remove}
              onClick={() => {
                window.location.reload()
              }}
            >
              Clear
            </LibraryComponents.Button>
          </LibraryComponents.List>
        </div>
        <br />
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
        <ToolkitProvider
              keyField="id"
              data={Stores.bannerStore.listBanner || []}
              columns={[
                {
                  dataField: "title",
                  text: "Title",
                },
                {
                  dataField: "image",
                  text: "Image",
                  csvExport: false,
                  formatter: (cell, row) => {
                    return (
                      <>
                        <img
                          src={row.image}
                          style={{ width: 200, height: 150 }}
                          alt="banner"
                        />
                      </>
                    )
                  },
                },
                {
                  dataField: "opration",
                  text: "Delete",
                  editable: false,
                  csvExport: false,
                  formatter: (cellContent, row) => (
                    <>
                      <LibraryComponents.Button
                        size="small"
                        type="outline"
                        icon={LibraryComponents.Icons.Remove}
                        onClick={() => {
                          setDeleteItem({
                            show: true,
                            id: row._id,
                            title: "Are you sure?",
                            body: `Delete ${row.title} banner!`,
                          })
                        }}
                      >
                        Delete
                      </LibraryComponents.Button>
                    </>
                  ),
                },
              ]}
              search
              exportCSV={{
                fileName: `banner_${moment(new Date()).format(
                  "YYYY-MM-DD HH:mm"
                )}.csv`,
                noAutoBOM: false,
                blobType: "text/csv;charset=ansi",
              }}
            >
              {(props) => (
                <div>
                  <SearchBar {...props.searchProps} />
                  <ClearSearchButton
                    className={`inline-flex ml-4 bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center`}
                    {...props.searchProps}
                  />
                  <ExportCSVButton
                    className={`inline-flex ml-2 bg-gray-500 items-center  small outline shadow-sm  font-medium  disabled:opacity-50 disabled:cursor-not-allowed text-center`}
                    {...props.csvProps}
                  >
                    Export CSV!!
                  </ExportCSVButton>
                  <hr />
                  <BootstrapTable
                    {...props.baseProps}
                    noDataIndication="Table is Empty"
                    hover
                    pagination={ paginationFactory() }
                    // cellEdit={cellEditFactory({
                    //   mode: "dbclick",
                    //   blurToSave: true,
                    //   // afterSaveCell,
                    // })}
                  />
                </div>
              )}
            </ToolkitProvider>
        </div>
        <LibraryComponents.Modal.ModalConfirm
          {...deleteItem}
          click={() => {
            rootStore.setProcessLoading(true)
            Stores.bannerStore.BannerService.deleteBanner(deleteItem.id).then((res: any) => {
              rootStore.setProcessLoading(false)
              if (res.status === 200) {
                LibraryComponents.ToastsStore.success(`Banner deleted.`)
                setDeleteItem({ show: false })
                Stores.bannerStore.fetchListBanner()
              }
            })
          }}
        />
      </div>
    </>
  )
})

export default Banner
