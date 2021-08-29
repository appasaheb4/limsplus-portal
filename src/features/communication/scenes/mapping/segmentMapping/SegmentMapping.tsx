/* eslint-disable */
import React, { useState, useContext } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import * as LibraryUtils from "@lp/library/utils"
import * as Models from "../../../models"
import * as XLSX from "xlsx"
import * as Config from "@lp/config"
import * as FeatureComponents from "../../../components"
import SegmentList from "./SegmentList"
import * as Utils from "../../../util"
import { useForm, Controller } from "react-hook-form"
import { useStores } from "@lp/library/stores"
import { Stores } from "../../../stores"
import { stores } from "@lp/library/stores"

import { RouterFlow } from "@lp/flows"
import { toJS } from "mobx"

const SegmentMapping = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { loginStore } = useStores()
  const [modalImportFile, setModalImportFile] = useState({})
  const [hideAddSegmentMapping, setHideAddSegmentMapping] = useState<boolean>(true)
  const [saveTitle, setSaveTitle] = useState("Save")
  const [modalConfirm, setModalConfirm] = useState<any>()

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
        Stores.segmentMappingStore.segmentMappingService
          .importSegmentMapping(uniqueData)
          .then((res) => {
            LibraryComponents.Atoms.Toast.success({
              message: `😊File import success.`,
            })
            Stores.segmentMappingStore.fetchListSegmentMapping()
          })
      }
    }
    reader.readAsBinaryString(file)
  }
    
  const onSubmitSegmentMapiing = () => {
    if (Stores.segmentMappingStore.segmentMappingService) {
      Stores.segmentMappingStore.segmentMappingService
        .addSegmentMapping(Stores.segmentMappingStore.segmentMapping)
        .then((res) => {
          if (res.status === 200) {
            LibraryComponents.Atoms.Toast.success({
              message: `😊Segment Mapping created.`,
            })
            if (saveTitle === "Save") {
              window.location.reload()
            }
            Stores.segmentMappingStore.fetchListSegmentMapping()
          }  
        })
    } else {
      LibraryComponents.Atoms.Toast.warning({
        message: "😔 Please enter all information!",
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
          show={hideAddSegmentMapping}
          onClick={(status) => setHideAddSegmentMapping(!hideAddSegmentMapping)}
        />
      )}

      <div className=" mx-auto flex-wrap">
        <div
          className={
            "p-2 rounded-lg shadow-xl " +
            (hideAddSegmentMapping ? "hidden" : "shown")
          }
        >
          <LibraryComponents.Atoms.Grid cols={3}>
            <LibraryComponents.Atoms.List
              direction="col"
              space={4}
              justify="stretch"
              fill
            >
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="EQUIPMENT TYPE"
                    id="equipment_type"
                    hasError={errors.equipmentType}
                  >
                    <select
                      name="equipment_type"
                      value={
                        Stores.segmentMappingStore.segmentMapping?.equipmentType
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.equipmentType
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const equipmentType = e.target.value
                        onChange(equipmentType)
                        Stores.segmentMappingStore.updateSegmentMapping({
                          ...Stores.segmentMappingStore.segmentMapping,
                          equipmentType,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {Stores.interfaceManagerStore.listEncodeCharacter?.map(
                        (item: any) => (
                          <option
                            key={item.instrumentType}
                            value={item.instrumentType}
                          >
                            {item.instrumentType}
                          </option>
                        )
                      )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="equipmentType"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="DATA FLOW FROM"
                    id="dataFlowFrom"
                    hasError={errors.dataFlowFrom}
                  >
                    <select
                      name="dataFlowFrom"
                      value={Stores.segmentMappingStore.segmentMapping?.dataFlowFrom}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.dataFlowFrom
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const dataFlowFrom = e.target.value
                        onChange(dataFlowFrom)
                        Stores.segmentMappingStore.updateSegmentMapping({
                          ...Stores.segmentMappingStore.segmentMapping,
                          dataFlowFrom,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {Models.options.dataFlowFrom.map(
                        (item: any, index: number) => (
                          <option key={item.title} value={item.title}>
                            {item.title}
                          </option>
                        )
                      )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="dataFlowFrom"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="DATA TYPE"
                    id="data_type"
                    hasError={errors.data_type}
                  >
                    <select
                      name="data_type"
                      value={Stores.segmentMappingStore.segmentMapping?.data_type}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.data_type
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const data_type = e.target.value
                        onChange(data_type)
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
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="data_type"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="SEGMENTS"
                    id="segments"
                    hasError={errors.segments}
                  >
                    <select
                      name="segments"
                      value={Stores.segmentMappingStore.segmentMapping?.segments}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.segments
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const segments = e.target.value
                        onChange(segments)
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
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="segments"
                rules={{ required: true }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper
                    label="SEGMENT USAGE"
                    id="segment_usage"
                    hasError={errors.segment_usage}
                  >
                    <select
                      name="segment_usage"
                      value={
                        Stores.segmentMappingStore.segmentMapping?.segment_usage
                      }
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.segment_usage
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const segment_usage = e.target.value
                        onChange(segment_usage)
                        Stores.segmentMappingStore.updateSegmentMapping({
                          ...Stores.segmentMappingStore.segmentMapping,
                          segment_usage,
                        })
                      }}
                    >
                      <option selected>Select</option>
                      {Models.options.segment_usage.map(
                        (item: any, index: number) => (
                          <option key={item.title} value={item.title}>
                            {item.title}
                          </option>
                        )
                      )}
                    </select>
                  </LibraryComponents.Atoms.Form.InputWrapper>
                )}
                name="segment_usage"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    type="number"
                    label="Field No"
                    name="field_no"
                    placeholder={
                      errors.field_no ? "Please Enter field_no" : "Field No"
                    }
                    hasError={errors.field_no}
                    value={Stores.segmentMappingStore.segmentMapping?.field_no}
                    onChange={(field_no) => {
                      onChange(field_no)
                      Stores.segmentMappingStore.updateSegmentMapping({
                        ...Stores.segmentMappingStore.segmentMapping,
                        field_no: parseFloat(field_no).toFixed(2).toString(),
                      })
                    }}
                  />
                )}
                name="field_no"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    type="number"
                    label="Item No"
                    name="item_no"
                    placeholder={errors.item_no ? "Please Enter item_no" : "Item No"}
                    hasError={errors.item_no}
                    value={Stores.segmentMappingStore.segmentMapping?.item_no}
                    onChange={(item_no) => {
                      onChange(item_no)
                      Stores.segmentMappingStore.updateSegmentMapping({
                        ...Stores.segmentMappingStore.segmentMapping,
                        item_no: parseFloat(item_no).toFixed(2).toString(),
                      })
                    }}
                  />
                )}
                name="item_no"
                rules={{ required: false }}
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
                  <LibraryComponents.Atoms.Form.Toggle
                    label="FIELD REQUIRED"
                    id="field_required"
                    hasError={errors.field_required}
                    value={Stores.segmentMappingStore.segmentMapping?.field_required}
                    onChange={(field_required) => {
                      onChange(field_required)
                      Stores.segmentMappingStore.updateSegmentMapping({
                        ...Stores.segmentMappingStore.segmentMapping,
                        field_required,
                      })
                    }}
                  />
                )}
                name="field_required"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="Element Name"
                    name="element_name"
                    placeholder={
                      errors.element_name
                        ? "Please Enter element_name"
                        : "Element Name"
                    }
                    hasError={errors.element_name}
                    value={Stores.segmentMappingStore.segmentMapping?.element_name}
                    onChange={(element_name) => {
                      onChange(element_name)
                      Stores.segmentMappingStore.updateSegmentMapping({
                        ...Stores.segmentMappingStore.segmentMapping,
                        element_name,
                      })
                    }}
                  />
                )}
                name="element_name"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="TRANSMITTED DATA"
                    name="transmitted_data"
                    placeholder={
                      errors.transmitted_data
                        ? "Please Enter transmitted_data"
                        : "TRANSMITTED DATA"
                    }
                    hasError={errors.transmitted_data}
                    value={
                      Stores.segmentMappingStore.segmentMapping?.transmitted_data
                    }
                    onChange={(transmitted_data) => {
                      onChange(transmitted_data)
                      Stores.segmentMappingStore.updateSegmentMapping({
                        ...Stores.segmentMappingStore.segmentMapping,
                        transmitted_data,
                      })
                    }}
                  />
                )}
                name="transmitted_data"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="FIELD ARRAY"
                    name="field_array"
                    placeholder={
                      errors.field_array ? "Please Enter field_array" : "FIELD ARRAY"
                    }
                    hasError={errors.field_array}
                    value={Stores.segmentMappingStore.segmentMapping?.field_array}
                    onChange={(field_array) => {
                      onChange(field_array)
                      Stores.segmentMappingStore.updateSegmentMapping({
                        ...Stores.segmentMappingStore.segmentMapping,
                        field_array,
                      })
                    }}
                  />
                )}
                name="field_array"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    type="number"
                    label="FIELD LENGTH"
                    name="field_length"
                    placeholder={
                      errors.field_length
                        ? "Please Enter field_length"
                        : "FIELD LENGTH"
                    }
                    hasError={errors.field_length}
                    value={Stores.segmentMappingStore.segmentMapping?.field_length}
                    onChange={(field_length) => {
                      onChange(field_length)
                      Stores.segmentMappingStore.updateSegmentMapping({
                        ...Stores.segmentMappingStore.segmentMapping,
                        field_length: parseFloat(field_length).toFixed(2).toString(),
                      })
                    }}
                  />
                )}
                name="field_length"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="FIELD TYPE"
                    name="field_type"
                    placeholder={
                      errors.field_type ? "Please Enter field_type" : "FIELD TYPE"
                    }
                    hasError={errors.field_type}
                    value={Stores.segmentMappingStore.segmentMapping?.field_type}
                    onChange={(field_type) => {
                      onChange(field_type)
                      Stores.segmentMappingStore.updateSegmentMapping({
                        ...Stores.segmentMappingStore.segmentMapping,
                        field_type,
                      })
                    }}
                  />
                )}
                name="field_type"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Toggle
                    label="REPEAT DELIMITER"
                    id="repeat_delimiter"
                    hasError={errors.repeat_delimiter}
                    value={
                      Stores.segmentMappingStore.segmentMapping?.repeat_delimiter
                    }
                    onChange={(repeat_delimiter) => {
                      onChange(repeat_delimiter)
                      Stores.segmentMappingStore.updateSegmentMapping({
                        ...Stores.segmentMappingStore.segmentMapping,
                        repeat_delimiter,
                      })
                    }}
                  />
                )}
                name="repeat_delimiter"
                rules={{ required: false }}
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
                  <LibraryComponents.Atoms.Form.Toggle
                    label="MANDATORY"
                    id="mandatory"
                    hasError={errors.mandatory}
                    value={Stores.segmentMappingStore.segmentMapping?.mandatory}
                    onChange={(mandatory) => {
                      onChange(mandatory)
                      Stores.segmentMappingStore.updateSegmentMapping({
                        ...Stores.segmentMappingStore.segmentMapping,
                        mandatory,
                      })
                    }}
                  />
                )}
                name="mandatory"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="LIMS DESCRIPTIONS"
                    id="lims_descriptions"
                    placeholder={
                      errors.lims_descriptions
                        ? "Please Enter lims_descriptions"
                        : "LIMS DESCRIPTIONS"
                    }
                    hasError={errors.lims_descriptions}
                    value={
                      Stores.segmentMappingStore.segmentMapping?.lims_descriptions
                    }
                    onChange={(lims_descriptions) => {
                      onChange(lims_descriptions)
                      Stores.segmentMappingStore.updateSegmentMapping({
                        ...Stores.segmentMappingStore.segmentMapping,
                        lims_descriptions,
                      })
                    }}
                  />
                )}
                name="lims_descriptions"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="LIMS TABLES"
                    name="lims_tables"
                    placeholder={
                      errors.lims_tables ? "Please Enter lims_tables" : "Lims Tables"
                    }
                    hasError={errors.lims_tables}
                    value={Stores.segmentMappingStore.segmentMapping?.lims_tables}
                    onChange={(lims_tables) => {
                      onChange(lims_tables)
                      Stores.segmentMappingStore.updateSegmentMapping({
                        ...Stores.segmentMappingStore.segmentMapping,
                        lims_tables,
                      })
                    }}
                  />
                )}
                name="lims_tables"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="LIMS FIELDS"
                    name="lims_fields"
                    placeholder={
                      errors.lims_fields ? "Please Enter lims_fields" : "LIMS FIELDS"
                    }
                    hasError={errors.lims_fields}
                    value={Stores.segmentMappingStore.segmentMapping?.lims_fields}
                    onChange={(lims_fields) => {
                      onChange(lims_fields)
                      Stores.segmentMappingStore.updateSegmentMapping({
                        ...Stores.segmentMappingStore.segmentMapping,
                        lims_fields,
                      })
                    }}
                  />
                )}
                name="lims_fields"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Toggle
                    label="REQUIRED FOR LIMS"
                    id="required_for_lims"
                    hasError={errors.required_for_lims}
                    value={
                      Stores.segmentMappingStore.segmentMapping?.required_for_lims
                    }
                    onChange={(required_for_lims) => {
                      onChange(required_for_lims)
                      Stores.segmentMappingStore.updateSegmentMapping({
                        ...Stores.segmentMappingStore.segmentMapping,
                        required_for_lims,
                      })
                    }}
                  />
                )}
                name="required_for_lims"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.Input
                    label="NOTES"
                    name="notes"
                    placeholder={errors.notes ? "Please Enter notes" : "NOTES"}
                    hasError={errors.notes}
                    value={Stores.segmentMappingStore.segmentMapping?.notes}
                    onChange={(notes) => {
                      onChange(notes)
                      Stores.segmentMappingStore.updateSegmentMapping({
                        ...Stores.segmentMappingStore.segmentMapping,
                        notes,
                      })
                    }}
                  />
                )}
                name="notes"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputFile
                    label="ATTACHMENTS"
                    name="attachments"
                    placeholder={
                      errors.attachments ? "Please Enter attachments" : "ATTACHMENTS"
                    }
                    hasError={errors.attachments}
                    multiple={true}
                    // value={Stores.segmentMappingStore.segmentMapping?.attachments}
                    onChange={(e) => {
                      const attachments = e.target.files
                      onChange(attachments)
                      Stores.segmentMappingStore.updateSegmentMapping({
                        ...Stores.segmentMappingStore.segmentMapping,
                        attachments,
                      })
                    }}
                  />
                )}
                name="attachments"
                rules={{ required: false }}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({ field: { onChange } }) => (
                  <LibraryComponents.Atoms.Form.InputWrapper label="Environment">
                    <select
                      value={Stores.segmentMappingStore.segmentMapping?.environment}
                      className={`leading-4 p-2 focus:outline-none focus:ring block w-full shadow-sm sm:text-base border-2 ${
                        errors.environment
                          ? "border-red-500  focus:border-red-500"
                          : "border-gray-300"
                      } rounded-md`}
                      onChange={(e) => {
                        const environment = e.target.value
                        onChange(environment)
                        Stores.segmentMappingStore.updateSegmentMapping({
                          ...Stores.segmentMappingStore.segmentMapping,
                          environment,
                        })
                      }}
                    >
                      <option selected>Select</option>
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
            </LibraryComponents.Atoms.List>
          </LibraryComponents.Atoms.Grid>
          <br />
          <LibraryComponents.Atoms.List direction="row" space={3} align="center">
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="solid"
              icon={LibraryComponents.Atoms.Icon.Save}
              onClick={handleSubmit(onSubmitSegmentMapiing)}
            >
              {saveTitle}
            </LibraryComponents.Atoms.Buttons.Button>
            <LibraryComponents.Atoms.Buttons.Button
              size="medium"
              type="outline"
              onClick={() => {
                setModalImportFile({
                  show: true,
                  title: "Import excel file!",
                })
              }}
            >
              <LibraryComponents.Atoms.Icon.EvaIcon
                icon="arrowhead-down-outline"
                size="medium"
                color={Config.Styles.COLORS.BLACK}
              />
              Import
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
      </div>

      <div className="p-2 rounded-lg shadow-xl overflow-scroll">
        {/* <FeatureComponents.Molecules.SegmentMappingList
          data={Stores.segmentMappingStore.listSegmentMapping || []}
          totalSize={Stores.segmentMappingStore.listSegmentMappingCount}
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
              body: `Update user!`,
            })
          }}
          onPageSizeChange={(page,limit)=>{
            Stores.segmentMappingStore.fetchListSegmentMapping(page,limit)
          }}
        /> */}
        <div>
          <SegmentList
            duplicate={(item: Models.SegmentMapping) => {
              setSaveTitle("Duplicate")
              setHideAddSegmentMapping(false)
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
