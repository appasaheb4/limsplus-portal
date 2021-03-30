/* eslint-disable */
import React, { useState, useContext, useEffect } from "react"
import { observer } from "mobx-react"
import * as LibraryComponents from "@lp/library/components"
import { Container } from "reactstrap"
import { Accordion, AccordionItem } from "react-sanfona"
import "./accordion.css"
import { Stores } from "../stores"

import * as Models from "../models"
import RootStoreContext from "@lp/library/stores"
import * as Services from "../services"

import * as Config from "@lp/config"
import * as FeatureComponents from "../components"
import { HostCommunicationFlows } from "../flows"
import { toJS } from "mobx"
import socketIOClient from "socket.io-client"
const SERVER = "http://localhost:8080"
let socket
const HostCommunication = observer(() => {
  const rootStore = useContext(RootStoreContext.rootStore)
  const [errors, setErrors] = useState<Models.IHostCommunication>()
  const [deleteItem, setDeleteItem] = useState<any>({})
  const [modalImportFile, setModalImportFile] = useState({})
  useEffect(() => {}, [Stores.segmentMappingStore.mapping])
  // socket = socketIOClient("http://localhost:8080/")
  // useEffect(() => {
  //   socket.emit("initial_data")
  // }, [])

  return (
    <>
      <Container>
        <LibraryComponents.Header>
          <LibraryComponents.PageHeading title="Host Communication" />
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

                <LibraryComponents.Form.InputWrapper
                  label="Instrument Type"
                  id="instrumentType"
                >
                  <select
                    name="instrumentType"
                    value={
                      Stores.communicationStore.hostCommuication?.instrumentType
                    }
                    className="leading-4 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border border-gray-300 rounded-md"
                    onChange={(e) => {
                      const instrumentType = e.target.value
                      Stores.communicationStore.updateHostCommuication({
                        ...Stores.communicationStore.hostCommuication,
                        instrumentType,
                      })
                      const selectedEncode = Stores.encodeCharacterStore.listEncodeCharacter?.find(
                        (item) => item.instrumentType === instrumentType
                      )
                      Stores.communicationStore.updateHostCommuication({
                        ...Stores.communicationStore.hostCommuication,
                        instrumentName: selectedEncode?.instrumentName,
                      })
                    }}
                  >
                    <option selected>Select</option>
                    {Stores.encodeCharacterStore.listEncodeCharacter?.map(
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
                </LibraryComponents.Form.InputWrapper>

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
                  "Serial Port Communication" && (
                  <FeatureComponents.Atoms.SettingForRS232Table />
                )}
                {Stores.communicationStore.hostCommuication?.modeOfConnection ===
                  "TCP/IP Communication" && (
                  <FeatureComponents.Atoms.SettingForTCP_IPTable />
                )}
              </LibraryComponents.List>

              <LibraryComponents.List
                direction="col"
                space={10}
                align="between"
                justify="center"
              >
                <label>Status : Pending</label>
                <div className="flex">
                  <LibraryComponents.Buttons.Button
                    size="medium"
                    type="solid"
                    onClick={() => {}}
                  >
                    Save Setting
                  </LibraryComponents.Buttons.Button>
                </div>

                <div className="flex mb-2">
                  <LibraryComponents.Buttons.Button
                    size="medium"
                    type="solid"
                    onClick={() => {}}
                  >
                    Generate Driver
                  </LibraryComponents.Buttons.Button>
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
                              disabled={
                                Stores.segmentMappingStore.listSegmentMapping !=
                                  undefined &&
                                Stores.communicationStore.hostCommuication
                                  ?.instrumentType !== undefined
                                  ? Stores.segmentMappingStore.listSegmentMapping
                                      ?.length > 0
                                    ? false
                                    : true
                                  : true
                              }
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
                                if (
                                  SourceRepositoryDataReceivefromInstrument ===
                                  "Phiysical file Location"
                                ) {
                                  Stores.communicationStore.hostCommuication
                                  if (
                                    !Stores.communicationStore.hostCommuication
                                      ?.instrumentType
                                  )
                                    return alert("Please entery instrument type")
                                  setModalImportFile({
                                    show: true,
                                    title: "Import file!",
                                  })
                                }
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
                                disabled={
                                  Stores.segmentMappingStore.listSegmentMapping !=
                                    undefined &&
                                  Stores.communicationStore.hostCommuication
                                    ?.instrumentType !== undefined
                                    ? Stores.segmentMappingStore.listSegmentMapping
                                        ?.length > 0
                                      ? false
                                      : true
                                    : true
                                }
                                value={
                                  Stores.communicationStore.hostCommuication
                                    ?.txtDataReceivefromInstrument
                                }
                                onChange={(txtDataReceivefromInstrument) => {
                                  // Stores.communicationStore.updateHostCommuication({
                                  //   ...Stores.communicationStore.hostCommuication,
                                  //   txtDataReceivefromInstrument,
                                  // })
                                  HostCommunicationFlows.newMessage(
                                    txtDataReceivefromInstrument
                                  )
                                }}
                              />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                              <div>
                                <LibraryComponents.Buttons.Button
                                  size="medium"
                                  type="solid"
                                  onClick={() => {}}
                                >
                                  Receive
                                </LibraryComponents.Buttons.Button>
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
                              <LibraryComponents.Buttons.Button
                                size="medium"
                                type="solid"
                                onClick={() => {}}
                              >
                                Send
                              </LibraryComponents.Buttons.Button>
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
                              onChange={async (e) => {
                                const convertTo = e.target.value
                                Stores.communicationStore.updateHostCommuication({
                                  ...Stores.communicationStore.hostCommuication,
                                  convertTo,
                                  SourceRepositoryDataReceivefromInstrument: "",
                                })
                                await HostCommunicationFlows.convetTo(
                                  convertTo,
                                  Stores.communicationStore.hostCommuication
                                    ?.instrumentType || "",
                                  Stores.communicationStore.hostCommuication
                                    ?.txtDataReceivefromInstrument || ""
                                )
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
                              {Stores.communicationStore.convertTo?.hl7 !==
                                undefined && (
                                <FeatureComponents.Organisms.HL7Table
                                  data={toJS(
                                    Stores.communicationStore.convertTo.hl7
                                  )}
                                />
                              )}
                            </div>
                            <div className="flex flex-col items-center justify-center">
                              <div>
                                <LibraryComponents.Buttons.Button
                                  size="medium"
                                  type="solid"
                                  onClick={() => {}}
                                >
                                  Convert
                                </LibraryComponents.Buttons.Button>
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
                                <LibraryComponents.Buttons.Button
                                  size="medium"
                                  type="solid"
                                  onClick={() => {}}
                                >
                                  Output
                                </LibraryComponents.Buttons.Button>
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
              <LibraryComponents.Buttons.Button
                size="medium"
                type="solid"
                icon={LibraryComponents.Icons.Save}
                onClick={() => {}}
              >
                Save
              </LibraryComponents.Buttons.Button>
              <LibraryComponents.Buttons.Button
                size="medium"
                type="outline"
                icon={LibraryComponents.Icons.Remove}
                onClick={() => {
                  //rootStore.departmentStore.clear();
                  window.location.reload()
                }}
              >
                Clear
              </LibraryComponents.Buttons.Button>
            </LibraryComponents.List>
          </div>
          <br />
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
      <LibraryComponents.Atoms.ModalImportFile
        accept=".csv,.xlsx,.xls,.txt,.hl7"
        {...modalImportFile}
        click={(file: any) => {
          setModalImportFile({ show: false })

          let reader = new FileReader()
          reader.onload = (e: any) => {
            const file = e.target.result
            const lines = file.split(/\r/)
            console.log({ lines })
            let message = lines.join("\n")
            HostCommunicationFlows.newMessage(message)
          }
          reader.onerror = (e: any) => alert(e.target.error.name)
          reader.readAsText(file)
        }}
        close={() => {
          setModalImportFile({ show: false })
        }}
      />
    </>
  )
})

export default HostCommunication
