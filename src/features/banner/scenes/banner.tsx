import React, { useState } from "react"
import { observer } from "mobx-react"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import moment from "moment"

import * as LibraryComponents from "@lp/library/components"
import * as LibraryModels from "@lp/library/models"
import * as Services from "../services"

import { Stores } from "../stores"
import { Stores as RootStore } from "@lp/library/stores"

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

const Banner = observer(() => {
  const [deleteItem, setDeleteItem] = useState<any>({})

  return (
    <>
      <LibraryComponents.Atoms.Header>
        <LibraryComponents.Atoms.PageHeading
          title="Banner"
          subTitle="Add, Edit & Delete Banner"
        />
      </LibraryComponents.Atoms.Header>
      <div className="mx-auto flex-wrap">
        <div className="p-2 rounded-lg shadow-xl">
          <LibraryComponents.Atoms.Grid cols={2}>
            <LibraryComponents.Atoms.List direction="col" space={4} justify="stretch" fill>
              <LibraryComponents.Atoms.Form.Input
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
              <LibraryComponents.Atoms.Form.InputFile
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
            </LibraryComponents.Atoms.List>
          </LibraryComponents.Atoms.Grid>
          <br />

          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icons.Save}
              onClick={() => {
                if (Stores.bannerStore.banner !== undefined) {
                  RootStore.rootStore.setProcessLoading(true)
                  Services.addBanner(Stores.bannerStore.banner).then((res) => {
                    RootStore.rootStore.setProcessLoading(false)
                    if (res.status === LibraryModels.StatusCode.CREATED) {
                      LibraryComponents.Atoms.ToastsStore.success(`Banner created.`)
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
            </LibraryComponents.Atoms.Buttons.Button>
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="outline"
              icon={LibraryComponents.Atoms.Icons.Remove}
              onClick={() => {
                window.location.reload()
              }}
            >
              Clear
            </LibraryComponents.Atoms.Buttons.Button>
          </LibraryComponents.Atoms.List>
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
                dataField: "operation",
                text: "Delete",
                editable: false,
                csvExport: false,
                formatter: (cellContent, row) => (
                  <>
                    <LibraryComponents.Atoms.Buttons.Button
                      size="small"
                      type="outline"
                      icon={LibraryComponents.Atoms.Icons.Remove}
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
                    </LibraryComponents.Atoms.Buttons.Button>
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
                  pagination={paginationFactory()}
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
        <LibraryComponents.Molecules.ModalConfirm
          {...deleteItem}
          click={() => {
            RootStore.rootStore.setProcessLoading(true)
            Stores.bannerStore.BannerService.deleteBanner(deleteItem.id).then(
              (res: any) => {
                RootStore.rootStore.setProcessLoading(false)
                if (res.status === 200) {
                  LibraryComponents.Atoms.ToastsStore.success(`Banner deleted.`)
                  setDeleteItem({ show: false })
                  Stores.bannerStore.fetchListBanner()
                }
              }
            )
          }}
        />
      </div>
    </>
  )
})

export default Banner
