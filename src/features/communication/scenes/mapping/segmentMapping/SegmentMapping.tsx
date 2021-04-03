/* eslint-disable */
import React, { useState, useContext } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as Models from "../../../models"
import * as XLSX from "xlsx"
import * as Config from "@lp/config"
import * as FeatureComponents from "../../../components"
import SegmentList from "./SegmentList"
import * as Utils from "../../../util"

import { Stores } from "../../../stores"
import { Stores as RootStore } from "@lp/library/stores"
import { toJS } from "mobx"

const SegmentMapping = observer(() => {
  const [errors, setErrors] = useState<Models.SegmentMapping>()
  const [modalImportFile, setModalImportFile] = useState({})
  const [hideAddDiv, setHideAddDiv] = useState(true)
  const [saveTitle, setSaveTitle] = useState("Save")

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
      const defaultHeader: string[] = [
        "EQUIPMENT TYPE",
        "DATA FLOW FROM",
        "DATA TYPE",
        "SEGMENTS",
        "SEGMENT USAGE",
        "FIELD NO",
        "ITEM NO",
        "FIELD REQUIRED",
        "ELEMENT NAME",
        "TRANSMITTED DATA",
        "FIELD ARRAY",
        "FIELD LENGTH",
        "FIELD TYPE",
        "REPEAT DELIMITER",
        "MANDATORY",
        "LIMS DESCRIPTIONS",
        "LIMS TABLES",
        "LIMS FIELDS",
        "REQUIRED FOR LIMS",
        "NOTES",
        "ATTACHMENTS",
      ]
      const headers: any = []
      let object = new Array()
      let fileImaport: boolean = false
      data.forEach((item: any, index: number) => {
        if (index === 0) {
          headers.push(item)
          if (JSON.stringify(headers[0]) !== JSON.stringify(defaultHeader))
            return alert("Please select correct file!")
        } else {
          if (JSON.stringify(headers[0]) === JSON.stringify(defaultHeader)) {
            object.push({
              equipmentType: item[0],
              dataFlowFrom: item[1],
              data_type: item[2],
              segments: item[3],
              segment_usage: item[4],
              field_no: parseFloat(item[5]).toFixed(2).toString(),
              item_no: parseFloat(item[6]).toFixed(2).toString(),
              field_required: item[7] === "Yes" ? true : false,
              element_name:
                item[8] !== undefined
                  ? item[8]
                      .toString()
                      .replace(/&amp;/g, "&")
                      .replace(/&gt;/g, ">")
                      .replace(/&lt;/g, "<")
                      .replace(/&quot;/g, '"')
                      .replace(/â/g, "’")
                      .replace(/â¦/g, "…")
                      .toString()
                  : undefined,
              transmitted_data:
                item[9] !== undefined
                  ? item[9]
                      .toString()
                      .replace(/&amp;/g, "&")
                      .replace(/&gt;/g, ">")
                      .replace(/&lt;/g, "<")
                      .replace(/&quot;/g, '"')
                      .replace(/â/g, "’")
                      .replace(/â¦/g, "…")
                      .toString()
                  : undefined,
              field_array: item[10],
              field_length:
                item[11] !== undefined
                  ? parseFloat(item[11]).toFixed(2).toString()
                  : undefined,
              field_type: item[12],
              repeat_delimiter: item[13] === "Yes" ? true : false,
              mandatory: item[14] === "Yes" ? true : false,
              lims_descriptions: item[15],
              lims_tables: item[16],
              lims_fields: item[17],
              required_for_lims: item[18] === "Yes" ? true : false,
              notes: item[19],
              attachments: item[20],
            })
            fileImaport = true
          }
        }
      })
      object = JSON.parse(JSON.stringify(object))
      //console.log({ object })
      // let listSegmentMapping = toJS(Stores.segmentMappingStore.listSegmentMapping)
      // listSegmentMapping?.forEach(function (v) {
      //   delete v._id, delete v.dateOfEntry, delete v.lastUpdated, delete v.__v
      // })
      // listSegmentMapping = listSegmentMapping?.map((item) => {
      //   item.dataFlowFrom =
      //     item.dataFlowFrom !== undefined
      //       ? item.dataFlowFrom.split("&gt;").join(">")
      //       : ""
      //   return item
      // })
      console.log({ object })
      //object = object.concat(listSegmentMapping)
      const uniqueData = object.reduce((filtered, item) => {
        if (
          !filtered.some(
            (filteredItem) => JSON.stringify(filteredItem) == JSON.stringify(item)
          )
        )
          filtered.push(item)
        return filtered
      }, [])
      console.log({ uniqueData })
      if (fileImaport) {
        RootStore.rootStore.setProcessLoading(true)
        Stores.segmentMappingStore.segmentMappingService
          .importSegmentMapping(uniqueData)
          .then((res) => {
            RootStore.rootStore.setProcessLoading(false)
            LibraryComponents.ToastsStore.success(`File import success.`)
            Stores.segmentMappingStore.fetchListSegmentMapping()
          })
      }
    }
    reader.readAsBinaryString(file)
  }

  return (
    <>
      <LibraryComponents.Header>
        <LibraryComponents.PageHeading title="Data Segment Mapping" />
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
                label="EQUIPMENT TYPE"
                id="equipment_type"
              >
                <select
                  name="equipment_type"
                  value={Stores.segmentMappingStore.segmentMapping?.equipmentType}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const equipmentType = e.target.value
                    setErrors({
                      ...errors,
                      equipmentType: Utils.validate.single(
                        equipmentType,
                        Utils.constraintsSegmentMapping.equipmentType
                      ),
                    })
                    Stores.segmentMappingStore.updateSegmentMapping({
                      ...Stores.segmentMappingStore.segmentMapping,
                      equipmentType,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {Stores.encodeCharacterStore.listEncodeCharacter?.map(
                    (item: any) => (
                      <option key={item.instrumentType} value={item.instrumentType}>
                        {item.instrumentType}
                      </option>
                    )
                  )}
                </select>
              </LibraryComponents.Form.InputWrapper>
              {errors?.equipmentType && (
                <span className="text-red-600 font-medium relative">
                  {errors.equipmentType}
                </span>
              )}
              <LibraryComponents.Form.InputWrapper
                label="DATA FLOW FROM"
                id="dataFlowFrom"
              >
                <select
                  name="dataFlowFrom"
                  value={Stores.segmentMappingStore.segmentMapping?.dataFlowFrom}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const dataFlowFrom = e.target.value
                    setErrors({
                      ...errors,
                      dataFlowFrom: Utils.validate.single(
                        dataFlowFrom,
                        Utils.constraintsSegmentMapping.dataFlowFrom
                      ),
                    })
                    Stores.segmentMappingStore.updateSegmentMapping({
                      ...Stores.segmentMappingStore.segmentMapping,
                      dataFlowFrom,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {Models.options.dataFlowFrom.map((item: any, index: number) => (
                    <option key={item.title} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Form.InputWrapper>
              {errors?.dataFlowFrom && (
                <span className="text-red-600 font-medium relative">
                  {errors.dataFlowFrom}
                </span>
              )}
              <LibraryComponents.Form.InputWrapper label="DATA TYPE" id="data_type">
                <select
                  name="data_type"
                  value={Stores.segmentMappingStore.segmentMapping?.data_type}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const data_type = e.target.value
                    setErrors({
                      ...errors,
                      data_type: Utils.validate.single(
                        data_type,
                        Utils.constraintsSegmentMapping.data_type
                      ),
                    })
                    Stores.segmentMappingStore.updateSegmentMapping({
                      ...Stores.segmentMappingStore.segmentMapping,
                      data_type,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {Models.options.data_type.map((item: any, index: number) => (
                    <option key={item.title} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Form.InputWrapper>
              {errors?.data_type && (
                <span className="text-red-600 font-medium relative">
                  {errors.data_type}
                </span>
              )}
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
                  {Models.options.segments.map((item: any, index: number) => (
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
                  {Models.options.segment_usage.map((item: any, index: number) => (
                    <option key={item.title} value={item.title}>
                      {item.title}
                    </option>
                  ))}
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
                    field_no: parseFloat(field_no).toFixed(2).toString(),
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
                    item_no: parseFloat(item_no).toFixed(2).toString(),
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
                    field_length: parseFloat(field_length).toFixed(2).toString(),
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
                name="lims_tables"
                placeholder="Lims Tables"
                value={Stores.segmentMappingStore.segmentMapping?.lims_tables}
                onChange={(lims_tables) => {
                  Stores.segmentMappingStore.updateSegmentMapping({
                    ...Stores.segmentMappingStore.segmentMapping,
                    lims_tables,
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
              <LibraryComponents.Form.InputFile
                label="ATTACHMENTS"
                name="attachments"
                placeholder="ATTACHMENTS"
                multiple={true}
                // value={Stores.segmentMappingStore.segmentMapping?.attachments}
                onChange={(e) => {
                  const attachments = e.target.files
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
                if (
                  Utils.validate(
                    Stores.segmentMappingStore.segmentMapping,
                    Utils.constraintsSegmentMapping
                  ) === undefined
                ) {
                  RootStore.rootStore.setProcessLoading(true)
                  Stores.segmentMappingStore.segmentMappingService
                    .addSegmentMapping(Stores.segmentMappingStore.segmentMapping)
                    .then((res) => {
                      RootStore.rootStore.setProcessLoading(false)
                      if (res.status === 200) {
                        LibraryComponents.ToastsStore.success(
                          `Segment Mapping created.`
                        )
                        if (saveTitle === "Save") {
                          window.location.reload()
                        }
                        Stores.segmentMappingStore.fetchListSegmentMapping()
                      }
                    }) 
                } else {
                  LibraryComponents.ToastsStore.warning(
                    "Please enter all information!"
                  )
                }
              }}
            >
              {saveTitle}
            </LibraryComponents.Buttons.Button>
            <LibraryComponents.Buttons.Button
              size="medium"
              type="outline"
              onClick={() => {
                setModalImportFile({
                  show: true,
                  title: "Import excel file!",
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
      </div>

      <div className="p-2 rounded-lg shadow-xl overflow-scroll">
        <div>
          <SegmentList
            duplicate={(item: Models.SegmentMapping) => {
              setSaveTitle("Duplicate")
              setHideAddDiv(false)
              Stores.segmentMappingStore.updateSegmentMapping({
                ...item,
                dataFlowFrom:
                  item.dataFlowFrom !== undefined
                    ? item.dataFlowFrom.split("&gt;").join(">")
                    : "",
                attachments: "",
              })
            }}  
          />
        </div>
      </div>
      <LibraryComponents.Atoms.ModalImportFile
        accept=".csv,.xlsx,.xls"
        {...modalImportFile}
        click={(file: any) => {
          setModalImportFile({ show: false })
          handleFileUpload(file)
        }}
        close={() => {
          setModalImportFile({ show: false })
        }}
      />
    </>
  )
})

export default SegmentMapping
