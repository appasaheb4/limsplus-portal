/* eslint-disable */
import React, { useState, useContext, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import filterFactory, { textFilter } from "react-bootstrap-table2-filter"
import moment from "moment"
import * as Models from "../../models"
import RootStoreContext from "@lp/library/stores"
import * as Services from "../../services"
import * as XLSX from "xlsx"
import * as Config from "@lp/config"
import * as FeatureComponents from "../../components"

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport
const selectRow = {
  mode: "checkbox",
  onSelect: (row, isSelect, rowIndex, e) => {
    console.log(row, isSelect)
  },
  onSelectAll: (isSelect, rows, e) => {
    console.log(isSelect)
    console.log(rows)
    console.log(e)
  },
}

import { Stores } from "../../stores"

const SegmentMapping = observer(() => {
  const rootStore = useContext(RootStoreContext.rootStore)
  const [errors, setErrors] = useState<Models.SegmentMapping>()
  const [deleteItem, setDeleteItem] = useState<any>({})
  const [modalImportFile, setModalImportFile] = useState({})
  const [hideAddDiv, setHideAddDiv] = useState(true)

  useEffect(() => {
    Stores.segmentMappingStore.fetchListSegmentMapping()
  }, [])

  const handleFileUpload = (file: any) => {
    const reader = new FileReader()
    reader.onload = (evt: any) => {
      /* Parse data */
      const bstr = evt.target.result
      const wb = XLSX.read(bstr, { type: "binary" })
      /* Get first worksheet */
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 })
      const headers: string[] = []
      const object = new Array()
      let fileImaport: boolean = true
      data.forEach((item: any, index: number) => {
        if (index === 0) {
          headers.push(item)
        } else {
          if (item.length === 19) {
            object.push({
              submitter_submitter: item[0],
              data_type: item[1],
              equipmentType: item[2],
              segments: item[3],
              segment_usage: item[4],
              field_no: item[5],
              item_no: item[6],
              field_required: item[7],
              element_name: item[8],
              transmitted_data: item[9],
              field_array: item[10],
              field_length: item[11],
              field_type: item[12],
              repeat_delimiter: item[13],
              mandatory: item[14],
              lims_descriptions: item[15],
              lims_tables: item[16],
              lims_fields: item[17],
              required_for_lims: item[18],
              notes: item[19],
              attachments: item[20],
            })
          } else {
            fileImaport = false
            alert("Please select correct file!")
            return
          }
        }
      })
      if (fileImaport) {
        rootStore.setProcessLoading(true)
        Stores.segmentMappingStore.segmentMappingService
          .importSegmentMapping(object)
          .then((res) => {
            rootStore.setProcessLoading(false)
            LibraryComponents.ToastsStore.success(`File import success.`)
            Stores.segmentMappingStore.fetchListSegmentMapping()
          })
      }
    }
    reader.readAsBinaryString(file)
  }

  const customTotal = (from, to, size) => {
    return (
      <>
        <div className="clearfix" />
        <span className="ml-2 react-bootstrap-table-pagination-total">
          Showing {from} to {to} of {size} Results
        </span>
      </>
    )
  }

  const sizePerPageRenderer = ({
    options,
    currSizePerPage,
    onSizePerPageChange,
  }) => (
    <div className="btn-group items-center" role="group">
      <LibraryComponents.Buttons.Button
        style={{ height: 10, width: 200 }}
        size="small"
        type="solid"
        onClick={() => setHideAddDiv(!hideAddDiv)}
      >
        <LibraryComponents.Icons.EvaIcon
          icon="trash-outline"
          size="large"
          color={Config.Styles.COLORS.BLACK}
        />
        Remove Selected
      </LibraryComponents.Buttons.Button>
      <input
        type="number"
        min="0"
        placeholder="Number"
        onChange={(e) => {
          if (e.target.value) {
            onSizePerPageChange(e.target.value)
          }
        }}
        className="mr-2 ml-2 leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
      />
      {options.map((option) => (
        <button
          key={option.text}
          type="button"
          onClick={() => onSizePerPageChange(option.page)}
          className={`btn ${
            currSizePerPage === `${option.page}` ? "btn-primary" : "btn-secondary"
          }`}
        >
          {option.text}
        </button>
      ))}
    </div>
  )

  const options = {
    paginationSize: 5,
    pageStartIndex: 0,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    disablePageTitle: true,
    paginationTotalRenderer: customTotal,
    sizePerPageList: [
      {
        text: "10",
        value: 10,
      },
      {
        text: "20",
        value: 20,
      },
      {
        text: "30",
        value: 30,
      },
      {
        text: "40",
        value: 40,
      },
      {
        text: "50",
        value: 50,
      },
      {
        text: "All",
        value: Stores.segmentMappingStore.listSegmentMapping?.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
    onPageChange: (page, sizePerPage) => {
      // console.log(page, sizePerPage)
    },
    sizePerPageRenderer: sizePerPageRenderer,
    onSizePerPageChange: (page, sizePerPage) => {
      //console.log(page, sizePerPage)
    },
  }

  return (
    <>
      <LibraryComponents.Header>
        <LibraryComponents.PageHeading title="Segment Mapping" />
      </LibraryComponents.Header>

      <LibraryComponents.Buttons.ButtonCircleAddRemove
        add={hideAddDiv}
        onClick={(status) => setHideAddDiv(!hideAddDiv)}
      />

      <div className=" mx-auto flex-wrap">
        <div
          className={"p-2 rounded-lg shadow-xl " + (hideAddDiv ? "hidden" : "shown")}
        >
          <LibraryComponents.Grid cols={3}>
            <LibraryComponents.List direction="col" space={4} justify="stretch" fill>
              <LibraryComponents.Form.InputWrapper
                label="SUBMITTER SUBMITTER"
                id="submitter_submitter"
              >
                <select
                  name="submitter_submitter"
                  value={
                    Stores.segmentMappingStore.segmentMapping?.submitter_submitter
                  }
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const submitter_submitter = e.target.value
                    Stores.segmentMappingStore.updateSegmentMapping({
                      ...Stores.segmentMappingStore.segmentMapping,
                      submitter_submitter,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {[{ title: "Host > LIS" }, { title: "LIS > Host" }].map(
                    (item: any, index: number) => (
                      <option key={item.title} value={item.title}>
                        {item.title}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Form.InputWrapper>

              <LibraryComponents.Form.InputWrapper label="DATA TYPE" id="data_type">
                <select
                  name="data_type"
                  value={Stores.segmentMappingStore.segmentMapping?.data_type}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const data_type = e.target.value
                    Stores.segmentMappingStore.updateSegmentMapping({
                      ...Stores.segmentMappingStore.segmentMapping,
                      data_type,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {[{ title: "HL7" }, { title: "ASTM" }, { title: "HEX" }].map(
                    (item: any, index: number) => (
                      <option key={item.title} value={item.title}>
                        {item.title}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Form.InputWrapper>

              <LibraryComponents.Form.InputWrapper
                label="EQUIPMENT TYPE"
                id="equipment_type"
              >
                <select
                  name="equipment_type"
                  value={Stores.segmentMappingStore.segmentMapping?.equipmentType}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const equipmentType = e.target.value
                    Stores.segmentMappingStore.updateSegmentMapping({
                      ...Stores.segmentMappingStore.segmentMapping,
                      equipmentType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {[{ title: "ERP" }, { title: "HORIBA" }].map(
                    (item: any, index: number) => (
                      <option key={item.title} value={item.title}>
                        {item.title}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Form.InputWrapper>

              <LibraryComponents.Form.InputWrapper label="SEGMENTS" id="segments">
                <select
                  name="segments"
                  value={Stores.segmentMappingStore.segmentMapping?.segments}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const segments = e.target.value
                    Stores.segmentMappingStore.updateSegmentMapping({
                      ...Stores.segmentMappingStore.segmentMapping,
                      segments,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {[
                    { title: "MSH" },
                    { title: "PID" },
                    { title: "ORC" },
                    { title: "OBR" },
                    { title: "H" },
                    { title: "P" },
                    { title: "O" },
                    { title: "R" },
                    { title: "C" },
                    { title: "Q" },
                    { title: "M" },
                    { title: "L" },
                  ].map((item: any, index: number) => (
                    <option key={item.title} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Form.InputWrapper>

              <LibraryComponents.Form.InputWrapper
                label="SEGMENT USAGE"
                id="segment_usage"
              >
                <select
                  name="segment_usage"
                  value={Stores.segmentMappingStore.segmentMapping?.segment_usage}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const segment_usage = e.target.value
                    Stores.segmentMappingStore.updateSegmentMapping({
                      ...Stores.segmentMappingStore.segmentMapping,
                      segment_usage,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {[{ title: "Required" }, { title: "Optional" }].map(
                    (item: any, index: number) => (
                      <option key={item.title} value={item.title}>
                        {item.title}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Form.InputWrapper>

              <LibraryComponents.Form.Input
                type="number"
                label="Field No"
                name="field_no"
                placeholder="Field No"
                value={Stores.segmentMappingStore.segmentMapping?.field_no}
                onChange={(field_no) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    field_no,
                  })
                }}
              />
              <LibraryComponents.Form.Input
                type="number"
                label="Item No"
                name="item_no"
                placeholder="Item No"
                value={Stores.segmentMappingStore.segmentMapping?.item_no}
                onChange={(item_no) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    item_no,
                  })
                }}
              />
            </LibraryComponents.List>

            <LibraryComponents.List direction="col" space={4} justify="stretch" fill>
              <LibraryComponents.Form.Toggle
                label="FIELD REQUIRED"
                id="field_required"
                value={Stores.segmentMappingStore.segmentMapping?.field_required}
                onChange={(field_required) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    field_required,
                  })
                }}
              />
              <LibraryComponents.Form.Input
                label="Element Name"
                name="element_name"
                placeholder="Element Name"
                value={Stores.segmentMappingStore.segmentMapping?.element_name}
                onChange={(element_name) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    element_name,
                  })
                }}
              />
              <LibraryComponents.Form.Input
                label="TRANSMITTED DATA"
                name="transmitted_data"
                placeholder="TRANSMITTED DATA"
                value={Stores.segmentMappingStore.segmentMapping?.transmitted_data}
                onChange={(transmitted_data) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    transmitted_data,
                  })
                }}
              />
              <LibraryComponents.Form.Input
                label="FIELD ARRAY"
                name="field_array"
                placeholder="FIELD ARRAY"
                value={Stores.segmentMappingStore.segmentMapping?.field_array}
                onChange={(field_array) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    field_array,
                  })
                }}
              />
              <LibraryComponents.Form.Input
                type="number"
                label="FIELD LENGTH"
                name="field_length"
                placeholder="FIELD LENGTH"
                value={Stores.segmentMappingStore.segmentMapping?.field_length}
                onChange={(field_length) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    field_length,
                  })
                }}
              />

              <LibraryComponents.Form.Input
                label="FIELD TYPE"
                name="field_type"
                placeholder="FIELD TYPE"
                value={Stores.segmentMappingStore.segmentMapping?.field_type}
                onChange={(field_type) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    field_type,
                  })
                }}
              />
              <LibraryComponents.Form.Toggle
                label="REPEAT DELIMITER"
                id="repeat_delimiter"
                value={Stores.segmentMappingStore.segmentMapping?.repeat_delimiter}
                onChange={(repeat_delimiter) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    repeat_delimiter,
                  })
                }}
              />
            </LibraryComponents.List>

            <LibraryComponents.List direction="col" space={4} justify="stretch" fill>
              <LibraryComponents.Form.Toggle
                label="MANDATORY"
                id="mandatory"
                value={Stores.segmentMappingStore.segmentMapping?.mandatory}
                onChange={(mandatory) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    mandatory,
                  })
                }}
              />
              <LibraryComponents.Form.Input
                label="LIMS DESCRIPTIONS"
                id="lims_descriptions"
                placeholder="LIMS DESCRIPTIONS"
                value={Stores.segmentMappingStore.segmentMapping?.lims_descriptions}
                onChange={(lims_descriptions) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    lims_descriptions,
                  })
                }}
              />
              <LibraryComponents.Form.Input
                label="LIMS TABLES"
                name="lims_fields"
                placeholder="Lims fields"
                value={Stores.segmentMappingStore.segmentMapping?.lims_fields}
                onChange={(lims_fields) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    lims_fields,
                  })
                }}
              />
              <LibraryComponents.Form.Input
                label="LIMS FIELDS"
                name="lims_fields"
                placeholder="LIMS FIELDS"
                value={Stores.segmentMappingStore.segmentMapping?.lims_fields}
                onChange={(lims_fields) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    lims_fields,
                  })
                }}
              />

              <LibraryComponents.Form.Toggle
                label="REQUIRED FOR LIMS"
                id="required_for_lims"
                value={Stores.segmentMappingStore.segmentMapping?.required_for_lims}
                onChange={(required_for_lims) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    required_for_lims,
                  })
                }}
              />

              <LibraryComponents.Form.Input
                label="NOTES"
                name="notes"
                placeholder="NOTES"
                value={Stores.segmentMappingStore.segmentMapping?.notes}
                onChange={(notes) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    notes,
                  })
                }}
              />
              <LibraryComponents.Form.Input
                label="ATTACHMENTS"
                name="attachments"
                placeholder="ATTACHMENTS"
                value={Stores.segmentMappingStore.segmentMapping?.attachments}
                onChange={(attachments) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    attachments,
                  })
                }}
              />
            </LibraryComponents.List>
          </LibraryComponents.Grid>
          <br />
          <LibraryComponents.List direction="row" space={3} align="center">
            <LibraryComponents.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Icons.Save}
              onClick={() => {
                // if (
                //   Util.validate(Stores.labStore.labs, Util.constraintsLabs) ===
                //   undefined && !Stores.labStore.checkExitsCode
                // ) {
                //   rootStore.setProcessLoading(true)
                //   Services.addLab(Stores.labStore.labs).then(() => {
                //     rootStore.setProcessLoading(false)
                //     LibraryComponents.ToastsStore.success(`Lab created.`)
                //     Stores.labStore.fetchListLab()
                //     Stores.labStore.clear()
                //   })
                // } else {
                //   LibraryComponents.ToastsStore.warning(
                //     "Please enter all information!"
                //   )
                // }
              }}
            >
              Save
            </LibraryComponents.Buttons.Button>
            <LibraryComponents.Buttons.Button
              size="medium"
              type="outline"
              onClick={() => {
                setModalImportFile({
                  show: true,
                  title: "Note: Before all collection remove.",
                })
              }}
            >
              <LibraryComponents.Icons.EvaIcon
                icon="arrowhead-down-outline"
                size="medium"
                color={Config.Styles.COLORS.BLACK}
              />
              Import
            </LibraryComponents.Buttons.Button>
            <LibraryComponents.Buttons.Button
              size="medium"
              type="outline"
              icon={LibraryComponents.Icons.Remove}
              onClick={() => {
                window.location.reload()
              }}
            >
              Clear
            </LibraryComponents.Buttons.Button>
          </LibraryComponents.List>
        </div>

        <br />
        <div className="p-2 rounded-lg shadow-xl  overflow-auto">
          <ToolkitProvider
            keyField="_id"
            bootstrap4
            data={Stores.segmentMappingStore.listSegmentMapping || []}
            columns={[
              {
                dataField: "_id",
                text: "no",
                hidden: true,
              },
              {
                dataField: "equipmentType",
                text: "EQUIPMENT TYPE",
                sort: true,
                filter: textFilter(),
                headerStyle: { minWidth: "230px" },
              },
              {
                dataField: "submitter_submitter",
                text: "SUBMITTER SUBMITTER",
                sort: true,
                filter: textFilter(),
                headerStyle: { minWidth: "230px" },
                formatter: (cellContent, row) => (
                  <>
                    <label>{row.submitter_submitter.split('&gt;').join('>')}</label>
                  </>
                ),
              },
              {
                dataField: "data_type",
                text: "DATA TYPE",
                sort: true,
                filter: textFilter(),
                headerStyle: { minWidth: "230px" },
              },

              {
                dataField: "segments",
                text: "SEGMENTS",
                sort: true,
                filter: textFilter(),
                headerStyle: { minWidth: "230px" },
              },
              {
                dataField: "segment_usage",
                text: "SEGMENT USAGE",
              },
              {
                dataField: "field_no",
                text: "FIELD NO",
                sort: true,
                filter: textFilter(),
                headerStyle: { minWidth: "230px" },
              },
              {
                dataField: "item_no",
                text: "ITEM NO",
                sort: true,
                filter: textFilter(),
                headerStyle: { minWidth: "230px" },
              },
              {
                dataField: "field_required",
                text: "FIELD REQUIRED",
              },
              {
                dataField: "element_name",
                text: "ELEMENT NAME",
                sort: true,
                filter: textFilter(),
                headerStyle: { minWidth: "230px" },
              },
              {
                dataField: "transmitted_data",
                text: "TRANSMITTED DATA",
                sort: true,
                filter: textFilter(),
                headerStyle: { minWidth: "230px" },
              },

              {
                dataField: "field_array",
                text: "FIELD ARRAY",
                sort: true,
                filter: textFilter(),
                headerStyle: { minWidth: "230px" },
              },
              {
                dataField: "field_length",
                text: "FIELD LENGTH",
                sort: true,
                filter: textFilter(),
                headerStyle: { minWidth: "230px" },
              },
              {
                dataField: "field_type",
                text: "FIELD TYPE",
                sort: true,
                filter: textFilter(),
                headerStyle: { minWidth: "230px" },
              },
              {
                dataField: "repeat_delimiter",
                text: "REPEAT DELIMITER",
              },
              {
                dataField: "mandatory",
                text: "MANDATORY",
              },
              {
                dataField: "lims_descriptions",
                text: "LIMS DESCRIPTIONS",
                sort: true,
                filter: textFilter(),
                headerStyle: { minWidth: "230px" },
              },
              {
                dataField: "lims_tables",
                text: "LIMS TABLES",
                sort: true,
                filter: textFilter(),
                headerStyle: { minWidth: "230px" },
              },

              {
                dataField: "lims_fields",
                text: "LIMS FIELDS",
                sort: true,
                filter: textFilter(),
                headerStyle: { minWidth: "230px" },
              },

              {
                dataField: "required_for_lims",
                text: "REQUIRED FOR LIMS",
              },
              {
                dataField: "notes",
                text: "NOTES",
                sort: true,
                filter: textFilter(),
                headerStyle: { minWidth: "230px" },
              },

              {
                dataField: "attachments",
                text: "ATTACHMENTS",
              },

              {
                dataField: "opration",
                text: "Delete",
                editable: false,
                csvExport: false,
                formatter: (cellContent, row) => (
                  <>
                    <LibraryComponents.Buttons.Button
                      size="small"
                      type="outline"
                      icon={LibraryComponents.Icons.Remove}
                      onClick={() => {
                        setDeleteItem({
                          show: true,
                          id: row._id,
                          title: "Are you sure?",
                          body: `Delete ${row.name} lab!`,
                        })
                      }}
                    >
                      Delete
                    </LibraryComponents.Buttons.Button>
                  </>
                ),
              },
            ]}
            search
            exportCSV={{
              fileName: `segmentMapping_${moment(new Date()).format(
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
                <br />
                <BootstrapTable
                  {...props.baseProps}
                  noDataIndication="Table is Empty"
                  hover
                  pagination={paginationFactory(options)}
                  filter={filterFactory()}
                  selectRow={selectRow}
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
      </div>

      <FeatureComponents.Atoms.ModalImportFile
        {...modalImportFile}
        click={(file: any) => {
          setModalImportFile({ show: false })
          handleFileUpload(file)
        }}
      />
    </>
  )
})

export default SegmentMapping
