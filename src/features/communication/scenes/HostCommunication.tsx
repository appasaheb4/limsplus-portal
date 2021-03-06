/* eslint-disable */
import React, { useState, useContext } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider, { Search, CSVExport } from "react-bootstrap-table2-toolkit"
import moment from "moment"
import { Container } from "reactstrap"
import { Accordion, AccordionItem } from "react-sanfona"
import "./accordion.css"

// convert
//import { HoribaPentra60Reader, HoribaPentra60Parser } from "node-astm"
import * as SerialPort from "serialport"

// var fs=require('fs');
var parser = require("./index.js")
var serializer = require("./index.js")
var translate = require("./lib/translate.js")


//console.log(data);

// import hl7 from "hl7"
import { assert, expect, should } from "chai"

// var parsed = hl7.parseString(data);

// const result = assert.equal("185L29839X64489JLPF", hl7[3][3][0][0])
// console.log({ result })

import * as Models from "../models"
import * as Util from "../util"
import RootStoreContext from "@lp/library/stores"
import * as Services from "../services"

import { SettingForRS232Table, SettingForTCP_IPTable } from "../components/atoms"

const { SearchBar, ClearSearchButton } = Search
const { ExportCSVButton } = CSVExport

import { Stores } from "../stores"

const HostCommunication = observer(() => {
  const rootStore = useContext(RootStoreContext.rootStore)
  const [errors, setErrors] = useState<Models.IHostCommunication>()
  const [deleteItem, setDeleteItem] = useState<any>({})

  return (
    <>
      <Container>
        <LibraryComponents.Header>
          <LibraryComponents.PageHeading title="Host Communication" />
          <LibraryComponents.Button
            size="medium"
            type="solid"
            onClick={() => {
              window.location.href = "/dashboard/default"
            }}
          >
            Dashboard
          </LibraryComponents.Button>
        </LibraryComponents.Header>
        <div className="mx-auto">
          <div className="p-2 rounded-lg shadow-xl">
            <LibraryComponents.Grid cols={3}>
              <LibraryComponents.List
                direction="col"
                space={4}
                justify="stretch"
                fill
              >
                <LibraryComponents.Grid cols={2}>
                  <LibraryComponents.Form.Toggle
                    label="Manual Mode"
                    id="manualAutomaticMode"
                    value={
                      Stores.communicationStore.hostCommuication?.manualAutomaticMode
                    }
                    onChange={(manualAutomaticMode) => {
                      Stores.communicationStore.updateHostCommuication({
                        ...Stores.communicationStore.hostCommuication,
                        manualAutomaticMode,
                      })
                    }}
                  />
                  <div>
                    <label>
                      Connection Estabilished :{" "}
                      {`${
                        Stores.communicationStore.hostCommuication
                          ?.manualAutomaticMode
                          ? `On`
                          : `Off`
                      }`}
                    </label>
                    <label
                      style={{
                        color: Stores.communicationStore.hostCommuication
                          ?.manualAutomaticMode
                          ? "green"
                          : "red",
                      }}
                    >
                      Connection estabilished success.
                    </label>
                  </div>
                </LibraryComponents.Grid>
                <LibraryComponents.Form.Input
                  label="Instrument Type"
                  id="instrumentType"
                  placeholder="Instrument Type"
                  value={Stores.communicationStore.hostCommuication?.instrumentType}
                  onChange={(instrumentType) => {
                    Stores.communicationStore.updateHostCommuication({
                      ...Stores.communicationStore.hostCommuication,
                      instrumentType,
                    })
                  }}
                />
                {/* {errors?.fullName && (
                  <span className="text-red-600 font-medium relative">
                    {errors.fullName}
                  </span>
                )} */}
                <LibraryComponents.Form.Input
                  label="Instrument Name"
                  id="instrumentName"
                  placeholder="Instrument Name"
                  value={Stores.communicationStore.hostCommuication?.instrumentName}
                  onChange={(instrumentName) => {
                    Stores.communicationStore.updateHostCommuication({
                      ...Stores.communicationStore.hostCommuication,
                      instrumentName,
                    })
                  }}
                />
                {/* {errors?.fullName && (
                  <span className="text-red-600 font-medium relative">
                    {errors.fullName}
                  </span>
                )} */}
                <LibraryComponents.Form.InputWrapper
                  label="Mode of Communication"
                  id="modeOfCommunication"
                >
                  <select
                    name="defualtLab"
                    value={
                      Stores.communicationStore.hostCommuication?.modeOfCommunication
                    }
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const modeOfCommunication = e.target.value
                      Stores.communicationStore.updateHostCommuication({
                        ...Stores.communicationStore.hostCommuication,
                        modeOfCommunication,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {[
                      { title: "Broadcasting" },
                      { title: "Host Query" },
                      { title: "File based" },
                    ].map((item: any, index: number) => (
                      <option key={item.title} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Form.InputWrapper>
                <LibraryComponents.Form.InputWrapper
                  label="Type of Query"
                  id="typeOfQuery"
                >
                  <select
                    name="defualtLab"
                    value={Stores.communicationStore.hostCommuication?.typeOfQuery}
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const typeOfQuery = e.target.value
                      Stores.communicationStore.updateHostCommuication({
                        ...Stores.communicationStore.hostCommuication,
                        typeOfQuery,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {[
                      { title: "Unidirectional" },
                      { title: "Bidirectional" },
                      { title: "Host Query " },
                    ].map((item: any, index: number) => (
                      <option key={item.title} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Form.InputWrapper>
              </LibraryComponents.List>

              <LibraryComponents.List
                direction="col"
                space={4}
                justify="stretch"
                fill
              >
                <LibraryComponents.Form.InputWrapper
                  label="Mode of Connection "
                  id="modeOfConnection"
                >
                  <select
                    name="defualtLab"
                    value={
                      Stores.communicationStore.hostCommuication?.modeOfConnection
                    }
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const modeOfConnection = e.target.value
                      Stores.communicationStore.updateHostCommuication({
                        ...Stores.communicationStore.hostCommuication,
                        modeOfConnection,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {[
                      { title: "Serial Port Communication" },
                      { title: "TCP/IP Communication" },
                    ].map((item: any, index: number) => (
                      <option key={item.title} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </LibraryComponents.Form.InputWrapper>
                {Stores.communicationStore.hostCommuication?.modeOfConnection ===
                  "Serial Port Communication" && <SettingForRS232Table />}
                {Stores.communicationStore.hostCommuication?.modeOfConnection ===
                  "TCP/IP Communication" && <SettingForTCP_IPTable />}
              </LibraryComponents.List>

              <LibraryComponents.List
                direction="col"
                space={10}
                align="between"
                justify="center"
              >
                <label>Status : Pending</label>
                <div className="flex">
                  <LibraryComponents.Button
                    size="medium"
                    type="solid"
                    onClick={() => {}}
                  >
                    Save Setting
                  </LibraryComponents.Button>
                </div>

                <div className="flex mb-2">
                  <LibraryComponents.Button
                    size="medium"
                    type="solid"
                    onClick={() => {}}
                  >
                    Generate Driver
                  </LibraryComponents.Button>
                </div>
              </LibraryComponents.List>

              <div className="clearfix"></div>
            </LibraryComponents.Grid>

            <LibraryComponents.Grid cols={2}>
              <LibraryComponents.Form.InputWrapper
                label="Apply Filtr on"
                id="applyFiltrOn"
              >
                <select
                  name="defualtLab"
                  value={Stores.communicationStore.hostCommuication?.applyFiltrOn}
                  className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                  onChange={(e) => {
                    const applyFiltrOn = e.target.value
                    Stores.communicationStore.updateHostCommuication({
                      ...Stores.communicationStore.hostCommuication,
                      applyFiltrOn,
                    })
                  }}
                >
                  <option selected>Select</option>
                  {[
                    { title: "Patient Data / QC Data" },
                    { title: "Output Filter" },
                    { title: "Import" },
                  ].map((item: any, index: number) => (
                    <option key={item.title} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </LibraryComponents.Form.InputWrapper>
              <LibraryComponents.Form.Input
                label="Log File"
                id="logFileDataReceivefromInstrument"
                placeholder="Log File"
                //value={rootStore.userStore.user.fullName}
                onChange={(logFileDataReceivefromInstrument) => {
                  Stores.communicationStore.updateHostCommuication({
                    ...Stores.communicationStore.hostCommuication,
                    logFileDataReceivefromInstrument,
                  })
                }}
              />
              <div className="clerfix" />
            </LibraryComponents.Grid>

            <Accordion allowMultiple>
              {[
                { title: "Source File" },
                { title: "Send data to Intrument" },
                { title: "Convert to" },
                { title: "Output in" },
              ].map((item) => {
                return (
                  <AccordionItem title={`${item.title}`}>
                    {item.title === "Source File" && (
                      <>
                        <LibraryComponents.Grid cols={2}>
                          <LibraryComponents.Form.InputWrapper
                            label="Source File"
                            id="sourceFileDataReceivefromInstrument"
                          >
                            <select
                              name="defualtLab"
                              value={
                                Stores.communicationStore.hostCommuication
                                  ?.sourceFileDataReceivefromInstrument
                              }
                              className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                              onChange={(e) => {
                                const sourceFileDataReceivefromInstrument =
                                  e.target.value
                                Stores.communicationStore.updateHostCommuication({
                                  ...Stores.communicationStore.hostCommuication,
                                  sourceFileDataReceivefromInstrument,
                                })
                                // //convert
                                // let machine = new HoribaPentra60Reader()
                                // machine.on("log", (...args) => {
                                //   console.log(...args)
                                // })
                                // machine.on("error", (error) => {
                                //   console.log(error)
                                // })
                                // machine.on("parse-error", (error) => {
                                //   console.log(error)
                                // })
                                // machine.on("data", (transmission) => {
                                //   let string = machine.summarizeTransmission(
                                //     transmission
                                //   )
                                //   let parser = new HoribaPentra60Parser()
                                //   let results = parser.parse(string)
                                //   console.log(results) // outputs { testResultList, suspectedPathologyList }
                                // })
                                // machine.initiate("COM4")
                              }}
                            >
                              <option selected>Select</option>
                              {[
                                { title: "Hex decimal" },
                                { title: "HL7" },
                                { title: "ASTM" },
                              ].map((item: any, index: number) => (
                                <option key={item.title} value={item.title}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </LibraryComponents.Form.InputWrapper>

                          <LibraryComponents.Form.InputWrapper
                            label="Source Repository"
                            id="SourceRepositoryDataReceivefromInstrument"
                          >
                            <select
                              name="defualtLab"
                              value={
                                Stores.communicationStore.hostCommuication
                                  ?.SourceRepositoryDataReceivefromInstrument
                              }
                              className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                              onChange={(e) => {
                                const SourceRepositoryDataReceivefromInstrument =
                                  e.target.value
                                Stores.communicationStore.updateHostCommuication({
                                  ...Stores.communicationStore.hostCommuication,
                                  SourceRepositoryDataReceivefromInstrument,
                                })
                              }}
                            >
                              <option selected>Select</option>
                              {[
                                { title: "Phiysical file Location" },
                                { title: "Collection of a database" },
                              ].map((item: any, index: number) => (
                                <option key={item.title} value={item.title}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </LibraryComponents.Form.InputWrapper>
                          <div className="clearfix"></div>
                        </LibraryComponents.Grid>
                        <LibraryComponents.List
                          direction="col"
                          space={4}
                          justify="stretch"
                          fill
                        >
                          <div className={`grid grid-cols-3 gap-4`}>
                            <div className="col-span-2">
                              <LibraryComponents.Form.MultilineInput
                                label=""
                                id="txtDataReceivefromInstrument"
                                placeholder="Source file (Data Received Data from Instrument)"
                                value={
                                  Stores.communicationStore.hostCommuication
                                    ?.txtDataReceivefromInstrument
                                }
                                onChange={(txtDataReceivefromInstrument) => {
                                  Stores.communicationStore.updateHostCommuication({
                                    ...Stores.communicationStore.hostCommuication,
                                    txtDataReceivefromInstrument,
                                  })
                                  var hl7 = parser.parseString(txtDataReceivefromInstrument)
                                  console.log({ hl7 })
                                  var text = serializer.serializeJSON(hl7)
                                  console.log(text.split("\r").join("\n"))
                                  console.log()
                                  console.log(text == txtDataReceivefromInstrument)
                                  Stores.communicationStore.updateHostCommuication({
                                    ...Stores.communicationStore.hostCommuication,
                                    txtConvertedfile:text,
                                  })
                                  //console.log(JSON.stringify(hl7,null,4));
                                  // console.log(
                                  //   JSON.stringify(translate.translate(hl7), null, 4)
                                  // )

                                  // var parsed = hl7.parseString(txtDataReceivefromInstrument);
                                  // console.log({parsed});
                                }}
                              />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                              <div>
                                <LibraryComponents.Button
                                  size="medium"
                                  type="solid"
                                  onClick={() => {}}
                                >
                                  Receive
                                </LibraryComponents.Button>
                              </div>
                            </div>
                          </div>

                          <div className="clearfix" />
                        </LibraryComponents.List>
                      </>
                    )}
                    {item.title === "Send data to Intrument" && (
                      <>
                        <div className={`grid grid-cols-3 gap-4`}>
                          <div className="col-span-2">
                            <LibraryComponents.Form.MultilineInput
                              label=""
                              id="txtSendDatafromInstrument"
                              placeholder="Send data to Instrument"
                              value={
                                Stores.communicationStore.hostCommuication
                                  ?.txtSendDatafromInstrument
                              }
                              onChange={(txtSendDatafromInstrument) => {
                                Stores.communicationStore.updateHostCommuication({
                                  ...Stores.communicationStore.hostCommuication,
                                  txtSendDatafromInstrument,
                                })
                              }}
                            />
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <div>
                              <LibraryComponents.Button
                                size="medium"
                                type="solid"
                                onClick={() => {}}
                              >
                                Send
                              </LibraryComponents.Button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {item.title === "Convert to" && (
                      <>
                        <LibraryComponents.Grid cols={2}>
                          <LibraryComponents.Form.InputWrapper
                            label="Convert to"
                            id="convertTo"
                          >
                            <select
                              name="defualtLab"
                              value={
                                Stores.communicationStore.hostCommuication?.convertTo
                              }
                              className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                              onChange={(e) => {
                                const convertTo = e.target.value
                                Stores.communicationStore.updateHostCommuication({
                                  ...Stores.communicationStore.hostCommuication,
                                  convertTo,
                                })
                              }}
                            >
                              <option selected>Select</option>
                              {[
                                { title: "Hex decimal" },
                                { title: "HL7" },
                                { title: "ASTM" },
                              ].map((item: any, index: number) => (
                                <option key={item.title} value={item.title}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </LibraryComponents.Form.InputWrapper>

                          <LibraryComponents.Form.InputWrapper
                            label="Output Repository"
                            id="outputRepository"
                          >
                            <select
                              name="defualtLab"
                              value={
                                Stores.communicationStore.hostCommuication
                                  ?.outputRepository
                              }
                              className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                              onChange={(e) => {
                                const outputRepository = e.target.value
                                Stores.communicationStore.updateHostCommuication({
                                  ...Stores.communicationStore.hostCommuication,
                                  outputRepository,
                                })
                              }}
                            >
                              <option selected>Select</option>
                              {[
                                { title: "Phiysical file Location" },
                                { title: "Collection of a database" },
                              ].map((item: any, index: number) => (
                                <option key={item.title} value={item.title}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </LibraryComponents.Form.InputWrapper>
                          <div className="clearfix"></div>
                        </LibraryComponents.Grid>
                        <LibraryComponents.List
                          direction="col"
                          space={4}
                          justify="stretch"
                          fill
                        >
                          <div className={`grid grid-cols-3 gap-4`}>
                            <div className="col-span-2">
                              <LibraryComponents.Form.MultilineInput
                                id="txtConvertedfile"
                                placeholder="Converted file"
                                value={
                                  Stores.communicationStore.hostCommuication
                                    ?.txtConvertedfile
                                }
                                onChange={(txtConvertedfile) => {
                                  Stores.communicationStore.updateHostCommuication({
                                    ...Stores.communicationStore.hostCommuication,
                                    txtConvertedfile,
                                  })
                                }}
                              />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                              <div>
                                <LibraryComponents.Button
                                  size="medium"
                                  type="solid"
                                  onClick={() => {}}
                                >
                                  Convert
                                </LibraryComponents.Button>
                              </div>
                            </div>
                          </div>

                          <div className="clearfix" />
                        </LibraryComponents.List>
                      </>
                    )}
                    {item.title === "Output in" && (
                      <>
                        <LibraryComponents.List
                          direction="col"
                          space={4}
                          justify="start"
                        >
                          <LibraryComponents.Form.InputWrapper
                            label="Output in"
                            id="outPutIn"
                          >
                            <select
                              name="defualtLab"
                              value={
                                Stores.communicationStore.hostCommuication?.outPutIn
                              }
                              className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                              onChange={(e) => {
                                const outPutIn = e.target.value
                                Stores.communicationStore.updateHostCommuication({
                                  ...Stores.communicationStore.hostCommuication,
                                  outPutIn,
                                })
                              }}
                            >
                              <option selected>Select</option>
                              {[
                                { title: "PDF" },
                                { title: "CSV" },
                                { title: "TXT" },
                                { title: "Table/Collection" },
                                { title: "API" },
                                { title: "Graph" },
                              ].map((item: any, index: number) => (
                                <option key={item.title} value={item.title}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </LibraryComponents.Form.InputWrapper>
                          <div className="clearfix"></div>
                        </LibraryComponents.List>
                        <LibraryComponents.List
                          direction="col"
                          space={4}
                          justify="stretch"
                          fill
                        >
                          <div className={`grid grid-cols-3 gap-4`}>
                            <div className="col-span-2">
                              <LibraryComponents.Form.MultilineInput
                                id="txtOutputin"
                                placeholder="Output in"
                                value={
                                  Stores.communicationStore.hostCommuication
                                    ?.txtOutputin
                                }
                                onChange={(txtOutputin) => {
                                  Stores.communicationStore.updateHostCommuication({
                                    ...Stores.communicationStore.hostCommuication,
                                    txtOutputin,
                                  })
                                }}
                              />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                              <div>
                                <LibraryComponents.Button
                                  size="medium"
                                  type="solid"
                                  onClick={() => {}}
                                >
                                  Output
                                </LibraryComponents.Button>
                              </div>
                            </div>
                          </div>
                          <div className="clearfix" />
                        </LibraryComponents.List>

                        <LibraryComponents.Grid cols={2}>
                          <LibraryComponents.Form.InputWrapper
                            label="Output for Third party Software"
                            id="outputforThirdpartySoftware"
                          >
                            <select
                              name="defualtLab"
                              value={
                                Stores.communicationStore.hostCommuication
                                  ?.outputforThirdpartySoftware
                              }
                              className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                              onChange={(e) => {
                                const outputforThirdpartySoftware = e.target.value
                                Stores.communicationStore.updateHostCommuication({
                                  ...Stores.communicationStore.hostCommuication,
                                  outputforThirdpartySoftware,
                                })
                              }}
                            >
                              <option selected>Select</option>
                              {[
                                { title: "Serial to Serial" },
                                { title: "HL7" },
                                { title: "ASTM" },
                              ].map((item: any, index: number) => (
                                <option key={item.title} value={item.title}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </LibraryComponents.Form.InputWrapper>
                          {/* <LibraryComponents.Form.Input
                label="Log File"
                id="logFileThiredPartySoftare"
                placeholder="Log File"
                value={
                  Stores.communicationStore.hostCommuication
                    ?.logFileThiredPartySoftare
                }
                onChange={(logFileThiredPartySoftare) => {
                  Stores.communicationStore.updateHostCommuication({
                    ...Stores.communicationStore.hostCommuication,
                    logFileThiredPartySoftare,
                  })
                }}
              /> */}
                          <LibraryComponents.Form.InputWrapper
                            label="Output Repository"
                            id="SourceRepositoryThiredPartySoftare"
                          >
                            <select
                              name="defualtLab"
                              value={
                                Stores.communicationStore.hostCommuication
                                  ?.SourceRepositoryThiredPartySoftare
                              }
                              className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                              onChange={(e) => {
                                const SourceRepositoryThiredPartySoftare =
                                  e.target.value
                                Stores.communicationStore.updateHostCommuication({
                                  ...Stores.communicationStore.hostCommuication,
                                  SourceRepositoryThiredPartySoftare,
                                })
                              }}
                            >
                              <option selected>Select</option>
                              {[
                                { title: "Phiysical file Location" },
                                { title: "Collection of a database" },
                              ].map((item: any, index: number) => (
                                <option key={item.title} value={item.title}>
                                  {item.title}
                                </option>
                              ))}
                            </select>
                          </LibraryComponents.Form.InputWrapper>
                          <div className="clearfix"></div>
                        </LibraryComponents.Grid>
                      </>
                    )}
                  </AccordionItem>
                )
              })}
            </Accordion>

            <br />
            <LibraryComponents.List direction="row" space={3} align="center">
              <LibraryComponents.Button
                size="medium"
                type="solid"
                icon={LibraryComponents.Icons.Save}
                onClick={() => {}}
              >
                Save
              </LibraryComponents.Button>
              <LibraryComponents.Button
                size="medium"
                type="outline"
                icon={LibraryComponents.Icons.Remove}
                onClick={() => {
                  //rootStore.departmentStore.clear();
                  window.location.reload()
                }}
              >
                Clear
              </LibraryComponents.Button>
            </LibraryComponents.List>
          </div>
          <br />
          <div className="p-2 rounded-lg shadow-xl overflow-auto">
            {/* <ToolkitProvider
              keyField="id"
              data={rootStore.departmentStore.listDepartment || []}
              columns={[
                {
                  dataField: "lab",
                  text: "Lab",
                  sort: true,
                },
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
                fileName: `department_${moment(new Date()).format(
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
                    // cellEdit={cellEditFactory({
                    //   mode: "dbclick",
                    //   blurToSave: true,
                    //   // afterSaveCell,
                    // })}
                  />
                </div>
              )}
            </ToolkitProvider> */}
          </div>
          <LibraryComponents.Modal.ModalConfirm
            {...deleteItem}
            click={() => {
              rootStore.setProcessLoading(true)
              Services.deletedepartment(deleteItem.id).then((res: any) => {
                rootStore.setProcessLoading(false)
                if (res.status === 200) {
                  LibraryComponents.ToastsStore.success(`Department deleted.`)
                  setDeleteItem({ show: false })
                  // rootStore.departmentStore.fetchListDepartment()
                }
              })
            }}
          />
        </div>
      </Container>
    </>
  )
})

export default HostCommunication
