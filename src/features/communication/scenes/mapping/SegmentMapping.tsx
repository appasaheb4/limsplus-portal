/* eslint-disable */
import React, { useState, useContext } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import paginationFactory from "react-bootstrap-table2-paginator"
import moment from "moment"
import * as Models from "../../models"
import RootStoreContext from "@lp/library/stores"
import * as Services from "../../services"
import * as XLSX from "xlsx"

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

import { Stores } from "../../stores"

const SegmentMapping = observer(() => {
  const rootStore = useContext(RootStoreContext.rootStore)
  const [errors, setErrors] = useState<Models.SegmentMapping>()
  const [deleteItem, setDeleteItem] = useState<any>({})

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (evt: any) => {
      /* Parse data */
      console.log({ evt })

      const bstr = evt.target.result
      const wb = XLSX.read(bstr, { type: "binary" })
      /* Get first worksheet */
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 })
      const headers: string[] = []
      const object = new Array()
      data.forEach((item: any, index: number) => {
        if (index === 0) {
          headers.push(item)
        } else {
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
            attachments: item[20]
          })
        }
      })  
      console.log({object});
      Stores.segmentMappingStore.segmentMappingService
        .importSegmentMapping(object)
        .then((res) => {
          console.log({ res })
        })
      console.log({ headers, object })
    }
    reader.readAsBinaryString(file)
  }

  return (
    <>
      <LibraryComponents.Header>
        <LibraryComponents.PageHeading title="Segment Mapping" />
      </LibraryComponents.Header>
      <div className=" mx-auto  flex-wrap">

        {/* <div className="p-2 rounded-lg shadow-xl">
          <LibraryComponents.Grid cols={3}>
            <LibraryComponents.List direction="col" space={4} justify="stretch" fill>
              <LibraryComponents.Form.InputWrapper
                label="Source Data"
                id="sourceData"
              >
                <select
                  name="sourceData"
                  value={Stores.segmentMappingStore.segmentMapping?.sourceData}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const sourceData = e.target.value
                    Stores.segmentMappingStore.updateSegmentMapping({
                      ...Stores.segmentMappingStore.segmentMapping,
                      sourceData,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {[
                    { title: "HL7" },
                    { title: "ASTM" },
                    { title: "Hex Decimal" },
                  ].map((item: any, index: number) => (
                    <option key={item.title} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Form.InputWrapper>
              <LibraryComponents.Form.Input
                label="EQUIPMENT TYPE"
                id="equipment_type"
                placeholder="EQUIPMENT TYPE"
                value={Stores.segmentMappingStore.segmentMapping?.equipmentType}
                onChange={(equipmentType) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    equipmentType,
                  })
                }}
              />
              {errors?.equipmentType && (
                <span className="text-red-600 font-medium relative">
                  {errors.equipmentType}
                </span>
              )}
              <LibraryComponents.Form.Input
                label="Segments"
                name="segments"
                placeholder="Segments"
                value={Stores.segmentMappingStore.segmentMapping?.segments}
                onChange={(segments) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    segments,
                  })
                }}
              />
              <LibraryComponents.Form.Input
                label="Usate"
                name="usate"
                placeholder="Usate"
                value={Stores.segmentMappingStore.segmentMapping?.usate}
                onChange={(usate) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    usate,
                  })
                }}
              />
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
              <LibraryComponents.Form.Input
                label="Required For"
                id="required_for"
                placeholder="Required For"
                value={Stores.segmentMappingStore.segmentMapping?.required_for}
                onChange={(required_for) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    required_for,
                  })
                }}
              />
              {errors?.equipmentType && (
                <span className="text-red-600 font-medium relative">
                  {errors.equipmentType}
                </span>
              )}
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
                label="Example for field content"
                name="example_for_field_content"
                placeholder="Example for field content"
                value={
                  Stores.segmentMappingStore.segmentMapping
                    ?.example_for_field_content
                }
                onChange={(example_for_field_content) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    example_for_field_content,
                  })
                }}
              />
              <LibraryComponents.Form.Input
                label="Sub field"
                name="sub_field"
                placeholder="Sub field"
                value={Stores.segmentMappingStore.segmentMapping?.sub_field}
                onChange={(sub_field) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    sub_field,
                  })
                }}
              />
              <LibraryComponents.Form.Input
                label="Lims descriptions"
                name="lims_descriptions"
                placeholder="Lims descriptions"
                value={Stores.segmentMappingStore.segmentMapping?.lims_descriptions}
                onChange={(lims_descriptions) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    lims_descriptions,
                  })
                }}
              />
            </LibraryComponents.List>

            <LibraryComponents.List direction="col" space={4} justify="stretch" fill>
              <LibraryComponents.Form.Input
                label="Lims table name"
                id="limstablename"
                placeholder="lims table name"
                value={Stores.segmentMappingStore.segmentMapping?.limstablename}
                onChange={(limstablename) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    limstablename,
                  })
                }}
              />
              {errors?.equipmentType && (
                <span className="text-red-600 font-medium relative">
                  {errors.equipmentType}
                </span>
              )}
              <LibraryComponents.Form.Input
                label="Lims fields"
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
                label="Required for lims"
                name="required_for_lims"
                placeholder="Required for lims"
                value={Stores.segmentMappingStore.segmentMapping?.required_for_lims}
                onChange={(required_for_lims) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    required_for_lims,
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
        </div> */}



        <br />
        <div className="p-2 rounded-lg shadow-xl overflow-auto">
          <ToolkitProvider
            keyField="id"
            data={Stores.segmentMappingStore.listSegmentMapping || []}
            columns={[
              {
                dataField: "code",
                text: "Code",
                sort: true,
              },
              {
                dataField: "name",
                text: "name",
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
                          body: `Delete ${row.name} lab!`,
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
              fileName: `labs_${moment(new Date()).format("YYYY-MM-DD HH:mm")}.csv`,
              noAutoBOM: false,
              blobType: "text/csv;charset=ansi",
            }}
          >
            {(props) => (
              <div>
                <div className="row">
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
                  <div className="ml-2 -mt-3 h-6">
                    <LibraryComponents.Form.InputFile
                      label="Import"
                      id="file"
                      accept=".csv,.xlsx,.xls"
                      placeholder="Import File"
                      onChange={handleFileUpload}
                    />
                    {/* const file = e.target.files[0]
                      console.log({file}); 
                        
                        const reader = new FileReader()
                        reader.onload = (evt:any) => {
                        
                          console.log({evt});
                          
                          const bstr = evt.target.result 
                          const wb = XLSX.read(bstr, { type: "binary" })
                         
                          const wsname = wb.SheetNames[0]
                          const ws = wb.Sheets[wsname]

                          console.log({wsname,ws});
                          
                  
                          const data = XLSX.utils.sheet_to_csv(ws)
                          console.log({data});
                          
                          //processData(data)
                        }

                        //just pass the fileObj as parameter
                        // readXlsxFile(e.target.files[0]).then((rows) => {
                        //   // `rows` is an array of rows
                        //   // each row being an array of cells.
                        //   console.log({ rows })
                        // })
                        // const image = e.target.files[0]
                        // Stores.bannerStore.updateBanner({
                        //   ...Stores.bannerStore.banner,
                        //   image,
                        // })
                      }}
                      */}
                  </div>
                  <div className="clerfix" />
                </div>
                <br />
                <br />
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
      </div>
    </>
  )
})

export default SegmentMapping
